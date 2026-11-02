// Rebuilds songs.json from the song list written in index.html.
// Usage: node build-songs.js [path/to/index.html] [path/to/songs.json]
const fs=require('fs'),vm=require('vm');
const src=process.argv[2]||'index.html',out=process.argv[3]||'songs.json';
const html=fs.readFileSync(src,'utf8');
const a=html.indexOf('/*SONGS-START'),b=html.indexOf('/*SONGS-END*/');
if(a<0||b<0)throw new Error('Song markers not found in '+src);
const code=html.slice(html.indexOf('*/',a)+2,b);
const ctx={};vm.createContext(ctx);vm.runInContext(code+';this.PIECES=PIECES;',ctx);
const pieces=JSON.parse(JSON.stringify(ctx.PIECES)).sort((x,y)=>x.number-y.number);
for(const p of pieces){if(!p.id||!p.title||!Array.isArray(p.notes)||!p.notes.length)throw new Error('Bad piece: '+p.id);
 const beats=p.lines.flatMap(l=>l.bars).map(bar=>p.notes.filter(n=>n.bar===bar).reduce((s,n)=>s+n.b,0));
 if(beats.some(x=>x!==4))throw new Error(`${p.title}: a bar does not add up to 4 beats (${beats})`);}
fs.writeFileSync(out,JSON.stringify({updated:new Date().toISOString().slice(0,10),count:pieces.length,pieces},null,1)+'\n');
console.log(`${out}: ${pieces.length} songs (${pieces.map(p=>p.number).join(', ')})`);
