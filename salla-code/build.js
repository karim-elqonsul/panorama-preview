const fs=require('fs'), postcss=require('postcss'), prefixer=require('postcss-prefix-selector');
const {PurgeCSS}=require('purgecss'); const csso=require('csso'); const {minify}=require('terser');
const ASSETS=process.env.PP_ASSETS||'https://cdn.jsdelivr.net/gh/karim-elqonsul/panorama-preview@c6cec677d595d7030c7e3e948b4d995e68e2d335/salla';
(async()=>{
  let css=fs.readFileSync('extract/preview.css','utf8');
  css=css.slice(css.indexOf('/* Layout'));               // drop skeleton reset line
  const pre=await postcss([prefixer({prefix:'.pp',transform(prefix,sel,prefixed){
    if(/^(:root|html|body)$/.test(sel)) return '.pp';
    if(/^body::before/.test(sel)) return '.pp-never';
    if(/^html\.reduce\b/.test(sel)) return sel.replace(/^html\.reduce/,'html.reduce .pp');
    if(/^\.reduce\b/.test(sel)) return sel.replace(/^\.reduce/,'.reduce .pp');
    if(/^(html|body)\s/.test(sel)) return sel.replace(/^(html|body)\s/,'.pp ');
    return prefixed;
  }})]).process(css,{from:undefined});
  const home=fs.readFileSync('src/home.html','utf8'), js=fs.readFileSync('src/pp.js','utf8');
  const tb='<div class="tapebreak"><div class="tape tb-org"><div class="track"><div class="trow"><span></span><svg class="star4"></svg></div></div></div><div class="tape tb-grad"></div></div>';
  const purged=await new PurgeCSS().purge({
    content:[{raw:home+tb+'<div class="pp"><a class="fchip"></a><button class="fchip"></button></div>',extension:'html'},{raw:js,extension:'js'}],
    css:[{raw:pre.css}],
    safelist:{standard:[/^pp/,'is-on','open','reduce','tapebreak','tape','track','trow','tb-org','tb-grad','star4','fchip','pp-contents'],greedy:[/aria-/]},
    keyframes:true, variables:true
  });
  let sec=purged[0].css;
  const raed=fs.readFileSync('src/raed.css','utf8');
  const fonts="@import url('https://fonts.googleapis.com/css2?family=Alexandria:wght@400;500;600;700;800;900&display=swap');\n";
  const full=fonts+'/* Panorama Print · sections */\n'+sec+'\n/* Panorama Print · Raed overrides */\n'+raed;
  fs.mkdirSync('dist',{recursive:true});
  const min=csso.minify(full,{restructure:false}).css;
  fs.writeFileSync('dist/panorama.css',min);
  // JS
  const sprite=fs.readFileSync('extract/sprite.svg','utf8').replace(/\s+/g,' ');
  let out=js.replace("'__HOME__'",JSON.stringify(home.replace(/\n\s*/g,'\n'))).replace("'__SPRITE__'",JSON.stringify(sprite)).replace(/__ASSETS__/g,ASSETS);
  const m=await minify(out,{compress:true,mangle:true,format:{comments:/^!|KQ/}});
  fs.writeFileSync('dist/panorama.js',m.code);
  fs.writeFileSync('dist/panorama.readable.js',out);
  console.log('css',full.length,'→',min.length,'| js',out.length,'→',m.code.length);
})().catch(e=>{console.error(e);process.exit(1)});
