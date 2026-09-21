export const categories=[
{id:'home',name:'خانهٔ دکّان',icon:'home'},
{id:'pens',name:'خودکار و روان‌نویس',icon:'pen',art:0,subtitle:'برای قصه‌های هنوز ننوشته',description:'یک همراه خوش‌دست برای یادداشت‌های هر روز و ایده‌های ناگهانی.'},
{id:'pencils',name:'مداد و مداد رنگی',icon:'pencil',art:1,subtitle:'دنیات رو به رنگ خودت بکش',description:'برای طراحی، رنگ‌آمیزی و جان‌دادن به خیال‌های کوچک و بزرگ.'},
{id:'notebooks',name:'دفتر و دفترچه',icon:'book',art:2,subtitle:'خانهٔ کوچکِ فکرهای بزرگ',description:'جایی برای نگه‌داشتن فکرها، خاطره‌ها و خط‌خطی‌های دوست‌داشتنی.'},
{id:'art',name:'لوازم هنری',icon:'palette',art:3,subtitle:'کمی رنگ، کمی جسارت',description:'ابزارهایی برای کشف رنگ‌ها و لذت ساختن یک اثر تازه.'},
{id:'glue',name:'چسب و اصلاح',icon:'glue',art:4,subtitle:'بساز، بچسبون، از نو شروع کن',description:'همراه کاردستی‌ها و اصلاح‌های کوچک روی میزت.'},
{id:'cases',name:'کیف و جامدادی',icon:'case',art:5,subtitle:'یک خانه برای دوست‌های رنگی',description:'برای جمع‌وجور کردن نوشت‌افزارهای دوست‌داشتنی و همراه‌بردن آن‌ها.'},
{id:'office',name:'لوازم اداری',icon:'clip',art:6,subtitle:'میز مرتب، خیال راحت',description:'انتخاب‌هایی کاربردی برای میز کار و مرتب‌کردن برگه‌ها.'},
{id:'paper',name:'کاغذ و مقوا',icon:'paper',art:7,subtitle:'هر برگ، یک شروع تازه',description:'برای نوشتن، برش‌زدن و ساختن ایده‌هایی که روی کاغذ جان می‌گیرند.'},
{id:'school',name:'ابزار دانش‌آموزی',icon:'ruler',art:8,subtitle:'برای فرداهای پر از یادگرفتن',description:'همراه‌های کوچک برای کلاس، تکلیف و کشف چیزهای تازه.'},
{id:'gifts',name:'هدایا و لوازم فانتزی',icon:'gift',art:8,subtitle:'یک بهانهٔ کوچک برای لبخند',description:'یک یادگاری رنگی برای خودت یا کسی که دوستش داری.'}
];
const lists={
pens:[['خودکار آبی کلاسیک',25000],['روان‌نویس نیمه‌شب',58000],['خودکار ژله‌ای یاسی',45000],['روان‌نویس باران',68000],['خودکار سبز جنگلی',32000],['ست خودکار پاستلی',95000],['روان‌نویس نوک‌باریک',72000],['خودکار مشکی روزانه',25000],['خودکار صورتی خیال',39000],['روان‌نویس آبی دریا',64000],['ست نوشتن بهجت',125000],['خودکار قرمز کلاسیک',25000]],
pencils:[['مداد رنگی ۱۲ رنگ',85000],['مداد رنگی ۲۴ رنگ',165000],['مداد گرافیتی HB',18000],['مداد طراحی B2',22000],['مداد رنگی پاستلی',138000],['مداد طراحی B6',28000],['ست مداد طراحی',195000],['مداد رنگی ۳۶ رنگ',248000]],
notebooks:[['دفتر سیمی یاسی',75000],['دفترچه جیبی سبز',48000],['دفتر نقطه‌ای خیال',110000],['دفتر یادداشت مرجانی',85000],['دفتر نقاشی A4',69000],['دفتر برنامه‌ریزی',145000],['دفتر شطرنجی',62000],['دفتر خاطرات کوچک',98000]],
art:[['آبرنگ ۱۲ رنگ',185000],['ست قلم‌موی نرم',120000],['پالت نقاشی',55000],['گواش ۶ رنگ',165000],['رنگ اکریلیک آبی',78000],['ست قلم‌موی تخت',95000],['آبرنگ ۲۴ رنگ',285000],['دفتر مخصوص آبرنگ',135000]],
glue:[['چسب ماتیکی',35000],['غلط‌گیر نواری',48000],['چسب مایع کاردستی',28000],['چسب کاغذی',32000],['چسب دوطرفه',42000],['ست چسب رنگی',68000],['غلط‌گیر قلمی',39000],['چسب شفاف',25000]],
cases:[['جامدادی پاستلی',195000],['جامدادی سبز نعنایی',165000],['جامدادی دو زیپ',215000],['کیف کوچک ابزار',185000],['جامدادی پارچه‌ای',145000],['کیف نوشت‌افزار',245000],['جامدادی صورتی',175000],['جامدادی رولی',225000]],
office:[['منگنهٔ رومیزی',125000],['بسته گیرهٔ کاغذ',35000],['قیچی رومیزی',78000],['کلیپس رنگی',45000],['پانچ کوچک',95000],['ست میز کار',285000],['سوزن منگنه',25000],['نگهدارندهٔ کاغذ',115000]],
paper:[['کاغذ رنگی ۲۰ برگ',55000],['مقوای پاستلی',68000],['کاغذ اوریگامی',45000],['کاغذ کرافت',39000],['مقوای طراحی',85000],['کاغذ یادداشت رنگی',48000],['کاغذ سفید A4',145000],['کاغذ دست‌ساز',95000]],
school:[['پاک‌کن فانتزی',28000],['تراش مخزن‌دار',45000],['خط‌کش ۲۰ سانتی',25000],['ست هندسه',115000],['مداد مشکی مدرسه',18000],['ست پاک‌کن پاستلی',58000],['قیچی دانش‌آموزی',62000],['بسته برچسب دفتر',35000]],
gifts:[['ست هدیهٔ لبخند',245000],['پاک‌کن‌های رنگین‌کمان',68000],['مداد فانتزی ستاره',38000],['ست خیال صورتی',185000],['بسته برچسب باغچه',45000],['بوک‌مارک رنگی',35000],['ست نوشت‌افزار بهجت',295000],['بستهٔ کوچک شادی',165000]]
};
export const products=Object.entries(lists).flatMap(([category,items])=>items.map(([name,price],i)=>({id:`${category}-${i+1}`,name,price,category,art:categories.find(c=>c.id===category).art,description:categories.find(c=>c.id===category).description,variant:i})));
export const money=n=>new Intl.NumberFormat('fa-IR').format(n)+' تومان';
export const fa=n=>new Intl.NumberFormat('fa-IR').format(n);
export const normalize=s=>String(s).replaceAll('ي','ی').replaceAll('ك','ک').replace(/[\u200c\s]+/g,' ').trim().toLowerCase();
export function sanitizeCart(raw){const clean={};if(!raw||typeof raw!=='object'||Array.isArray(raw))return clean;for(const [id,q] of Object.entries(raw)){if(products.some(p=>p.id===id)&&Number.isInteger(q)&&q>0)clean[id]=Math.min(99,q);}return clean;}
export function cartTotals(cart){return Object.entries(sanitizeCart(cart)).reduce((out,[id,q])=>({count:out.count+q,total:out.total+products.find(p=>p.id===id).price*q}),{count:0,total:0});}
export function selectProducts({category='all',query='',favorites=null,sort='default'}={}){const q=normalize(query);let selected=products.filter(p=>(category==='all'||p.category===category)&&(!favorites||favorites.includes(p.id))&&(!q||normalize(p.name+' '+categories.find(c=>c.id===p.category).name).includes(q)));if(sort==='low')selected.sort((a,b)=>a.price-b.price);if(sort==='high')selected.sort((a,b)=>b.price-a.price);return selected;}
