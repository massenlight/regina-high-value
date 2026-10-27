import {readFileSync,readdirSync} from 'node:fs';
import {join,extname,resolve} from 'node:path';
import {createHash} from 'node:crypto';
const edition=process.argv[3]||'regina-atelier';
if(!['regina-atelier','regina-editorial'].includes(edition))throw Error('Unknown edition');
const dir=resolve(import.meta.dirname,'../../04_交付與輸出',edition),files={};
function walk(folder,prefix=''){for(const e of readdirSync(folder,{withFileTypes:true})){if(e.name.startsWith('.'))continue;const name=prefix+'/'+e.name;if(e.isDirectory())walk(join(folder,e.name),name);else{const bytes=readFileSync(join(folder,e.name));files[name]={hash:createHash('md5').update(bytes).update(extname(e.name)).digest('hex'),size:bytes.length};}}}
walk(dir);
if(process.argv[2]==='manifest')process.stdout.write(JSON.stringify(files));
else if(process.argv[2]==='upload'){
 let input='';for await(const chunk of process.stdin){input+=chunk;if(input.includes('\n'))break;}
 const session=JSON.parse(input);let completion='';
 const types={'.js':'application/javascript','.css':'text/css','.html':'text/html','.png':'image/png','.jpg':'image/jpeg'};
 for(const bucket of session.buckets){const form=new FormData();for(const h of bucket){const path=Object.keys(files).find(p=>files[p].hash===h);form.append(h,new Blob([readFileSync(join(dir,path)).toString('base64')],{type:types[extname(path)]||'application/octet-stream'}),h);}
 const r=await fetch('https://api.cloudflare.com/client/v4/accounts/5505c344b1102dbb6452bee19ad81e77/workers/assets/upload?base64=true',{method:'POST',headers:{Authorization:'Bearer '+session.jwt},body:form}),d=await r.json();if(!r.ok||!d.success)throw Error('Asset upload failed: '+r.status);if(d.result?.jwt)completion=d.result.jwt;}
 process.stdout.write(JSON.stringify({jwt:completion||session.jwt,uploaded:session.buckets.flat().length}));
}
