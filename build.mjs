import {build} from 'esbuild';
import {mkdir,readdir,cp,writeFile} from 'node:fs/promises';
await mkdir('dist/client',{recursive:true});await mkdir('dist/server',{recursive:true});
for(const file of await readdir('dist'))if(!['client','server','.openai'].includes(file))await cp('dist/'+file,'dist/client/'+file,{recursive:true});
await build({entryPoints:['server/worker.mjs'],outfile:'dist/server/index.js',bundle:true,format:'esm',platform:'neutral',external:['node:crypto','node:buffer'],target:'es2022'});
console.log('Worker and client built.');
