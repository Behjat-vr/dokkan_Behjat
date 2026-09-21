"""Original, deterministic ambient composition. No sampled or licensed music."""
from pathlib import Path
import wave
import numpy as np

RATE = 22050
BAR = 4.0
DURATION = BAR * 16
size = int(RATE * DURATION)
mix = np.zeros((size, 2), dtype=np.float64)

def note(midi, start, duration, level, pan=0.0, pad=False):
    t = np.arange(int(duration * RATE)) / RATE
    f = 440 * 2 ** ((midi - 69) / 12)
    if pad:
        signal = np.sin(2*np.pi*f*t) + .24*np.sin(2*np.pi*f*2*t+.2)
        envelope = (1-np.exp(-t/1.4)) * np.exp(-t/4.5) * np.minimum(1, (duration-t)/1.7)
    else:
        signal = (np.sin(2*np.pi*f*t) + .25*np.sin(2*np.pi*f*2*t)*np.exp(-t*1.8)
                  + .1*np.sin(2*np.pi*f*3*t)*np.exp(-t*3.5))
        envelope = (1-np.exp(-t*100)) * np.exp(-t/1.7) * np.minimum(1,(duration-t)/.4)
    signal *= envelope * level
    for delay, gain, spread in [(0,1,pan),(.19,.15,-pan),(.39,.12,pan),(.67,.09,-pan),(.93,.06,pan)]:
        positions = (int((start+delay)*RATE) + np.arange(len(t))) % size
        np.add.at(mix[:,0], positions, signal*gain*np.sqrt((1-spread)/2))
        np.add.at(mix[:,1], positions, signal*gain*np.sqrt((1+spread)/2))

chords = [(48,55,60,64),(45,52,57,60),(41,48,53,57),(43,50,55,59)]
melodies = [[72,76,79,76],[72,69,76,72],[69,72,77,76],[74,71,67,72]]
for bar in range(16):
    chord = chords[bar % 4]
    for j,n in enumerate(chord):
        note(n,bar*BAR,7,.017,(j-1.5)/4,True)
    for i in range(8):
        note(chord[i%4]+12,bar*BAR+i*.5,5,.044 if i%2 else .055,(i%3-1)*.32)
    for i,n in enumerate(melodies[bar%4]):
        if (bar+i)%3 != 1:
            note(n+(12 if bar>=12 and i==3 else 0),bar*BAR+.25+i,5,.043,(i-1.5)*.22)

# Circular reverb tails keep the 64-second composition seamless when looped.
mix = np.tanh(mix*1.6)
mix *= .64/max(.64,np.abs(mix).max())
out=Path(__file__).parent/'dist/assets/behjat-evening.wav'
with wave.open(str(out),'wb') as f:
    f.setnchannels(2); f.setsampwidth(2); f.setframerate(RATE)
    f.writeframes((mix*32767).astype('<i2').tobytes())
print(f'Created original ambient piano loop: {DURATION}s, {out.stat().st_size} bytes')
