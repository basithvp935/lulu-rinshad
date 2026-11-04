(function(){
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const NS='http://www.w3.org/2000/svg';
const rnd=(a,b)=>a+Math.random()*(b-a);
const $=id=>document.getElementById(id);


/* ---------- illustration helpers ---------- */
function rose(x,y,s,pink,rot){
  // layered spiral rose
  const fill=pink?'url(#petalPink)':'url(#petal)', dark=pink?'#B86A73':'#5E0E1A', mid=pink?'#E5A0A8':'#A42638';
  let g=`<g transform="translate(${x} ${y}) rotate(${rot||0}) scale(${s})">`;
  for(let i=0;i<7;i++){const a=i*51;g+=`<path transform="rotate(${a})" d="M0 0 C-16 -6 -20 -26 -4 -30 C6 -32 16 -22 12 -10 C10 -4 6 -1 0 0z" fill="${fill}" stroke="${dark}" stroke-opacity=".35" stroke-width=".6"/>`;}
  for(let i=0;i<5;i++){const a=i*72+20;g+=`<path transform="rotate(${a}) scale(.62)" d="M0 0 C-16 -6 -20 -26 -4 -30 C6 -32 16 -22 12 -10 C10 -4 6 -1 0 0z" fill="${mid}" stroke="${dark}" stroke-opacity=".4" stroke-width=".8"/>`;}
  g+=`<path d="M-7 -2 C-8 -11 7 -12 7 -3 C6 4 -6 5 -7 -2z" fill="${dark}"/><path d="M-3 -4 C-2 -8 4 -7 3 -3" fill="none" stroke="${mid}" stroke-width="1.2"/></g>`;
  return g;
}
function leaf(x,y,s,rot,c){
  return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})"><path d="M0 0 C8 -10 26 -10 34 0 C26 10 8 10 0 0z" fill="${c||'#6F7F5C'}"/><path d="M0 0 L32 0" stroke="#4E5A3E" stroke-width=".7" opacity=".7"/></g>`;
}
function bloom(x,y,s){ // small white filler flower
  let g=`<g transform="translate(${x} ${y}) scale(${s})">`;
  for(let i=0;i<5;i++)g+=`<ellipse transform="rotate(${i*72}) translate(0 -5)" rx="3.2" ry="5" fill="#FFF8F2" stroke="#E5CFC6" stroke-width=".4"/>`;
  return g+`<circle r="2" fill="#E6C27A"/></g>`;
}
function vine(x1,y1,x2,y2,n,flip){
  let g=`<path d="M${x1} ${y1} Q${(x1+x2)/2+(flip?-30:30)} ${(y1+y2)/2} ${x2} ${y2}" stroke="#6A7752" stroke-width="1.2" fill="none"/>`;
  for(let i=1;i<n;i++){const t=i/n,px=x1+(x2-x1)*t+(flip?-1:1)*Math.sin(t*Math.PI)*15,py=y1+(y2-y1)*t;g+=leaf(px,py,.35,rnd(-180,180),i%2?'#7C8A6A':'#5F6D4E');}
  return g;
}
function cluster(cx,cy,scale,dir){
  let g='';
  for(let i=0;i<9;i++)g+=leaf(cx+rnd(-60,60)*scale,cy+rnd(-30,40)*scale,rnd(.6,.9)*scale,rnd(0,360),i%3?'#6F7F5C':'#4F5E42');
  g+=rose(cx,cy,1.25*scale,false,rnd(0,60));
  g+=rose(cx+dir*48*scale,cy+20*scale,.85*scale,true,rnd(0,60));
  g+=rose(cx-dir*40*scale,cy+26*scale,.8*scale,false,rnd(0,60));
  g+=rose(cx+dir*14*scale,cy-38*scale,.62*scale,true,rnd(0,60));
  for(let i=0;i<5;i++)g+=bloom(cx+rnd(-70,70)*scale,cy+rnd(-40,50)*scale,rnd(.6,1)*scale);
  return g;
}
function swan(x,y,s,flip){
  return `<g transform="translate(${x} ${y}) scale(${flip?-s:s} ${s})">
    <path d="M0 0 C-4 -18 -2 -40 10 -46 C18 -50 24 -44 20 -38 C17 -34 12 -36 10 -32 C6 -24 8 -12 14 -6 C24 -10 44 -12 56 -4 C62 0 58 8 48 10 C30 14 8 12 0 0z" fill="url(#swanG)" stroke="#CFC3B5" stroke-width=".8"/><path d="M22 -6 C30 -16 46 -16 54 -6 C46 -10 34 -10 22 -6z M26 -2 C34 -10 46 -10 52 -3" fill="#EFE8DE" stroke="#D6CABB" stroke-width=".6"/>
    <path d="M20 -38 l9 3 -8 3z" fill="#E06A2C"/><circle cx="16" cy="-40" r="1.1" fill="#222"/>
    <path d="M18 -4 C30 -10 44 -8 52 -2" fill="none" stroke="#E2D8CC" stroke-width="1.2"/></g>`;
}

/* ---------- envelope: debossed damask + gold-foil florals ---------- */
(function(){
  const sv=$('emboss');
  const motif=`<g fill="#54121D" filter="url(#deboss)">
      <path d="M30 6 C38 16 40 26 30 34 C20 26 22 16 30 6z"/>
      <path d="M30 34 C42 30 52 38 50 48 C42 46 36 42 30 34z"/><path d="M30 34 C18 30 8 38 10 48 C18 46 24 42 30 34z"/>
      <path d="M30 40 v30 M22 58 q8 -6 16 0" stroke="#54121D" stroke-width="2" fill="none"/>
      <circle cx="0" cy="40" r="3"/><circle cx="60" cy="40" r="3"/><circle cx="30" cy="78" r="2"/></g>`;
  const swirl=(x,y,s,r)=>`<g transform="translate(${x} ${y}) rotate(${r}) scale(${s})" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round"><path d="M0 0 C20 -10 40 0 38 18 C36 30 20 30 20 20 C20 12 30 12 30 18"/><path d="M0 0 C-14 8 -18 24 -6 30"/></g>`;
  let f='';
  // bottom garland
  f+=vine(120,850,360,850,10,false)+cluster(240,842,.66,1)+cluster(178,862,.45,1)+cluster(302,862,.45,-1);
  sv.innerHTML=`<defs><pattern id="dmk" width="60" height="80" patternUnits="userSpaceOnUse">${motif}</pattern></defs>
    <rect width="480" height="900" fill="url(#dmk)" opacity=".75"/>
    <g filter="url(#goldfoil)">${f}</g>`;
  // dried flower sprig tucked under the seal
  const sp=$('sprig');if(sp){let g='';
    const stem=(a,len)=>{const r=a*Math.PI/180,ex=Math.cos(r)*len,ey=Math.sin(r)*len;let t=`<path d="M0 0 Q${ex*.5+ey*.15} ${ey*.5-ex*.15} ${ex} ${ey}" stroke="#8B9472" stroke-width="1.3" fill="none"/>`;
      for(let i=1;i<6;i++){const k=i/6;t+=leaf(ex*k,ey*k,.32,a+(i%2?35:-35),i%2?'#9AA584':'#7D8A66');}
      for(let i=0;i<5;i++)t+=`<circle cx="${ex+rnd(-9,9)}" cy="${ey+rnd(-9,9)}" r="${rnd(1.6,2.8)}" fill="#FFF8EE"/>`;return t;};
    [-150,-120,-60,-30,-95].forEach((a,i)=>g+=stem(a,rnd(70,95)));
    g+=rose(-40,-44,.42,true,20)+rose(46,-40,.36,false,60);
    sp.innerHTML=`<g filter="url(#petalLight)">${g}</g>`;}
})();

/* ---------- hero scene: garden arch, pond, swans ---------- */
(function(){
  const s=$('scene');if(!s)return;let g=`<defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F6EAD8"/><stop offset=".55" stop-color="#EBD9BF"/><stop offset="1" stop-color="#D9C3A2"/></linearGradient>
    <linearGradient id="stone" x1="0" x2="1"><stop offset="0" stop-color="#CDB89A"/><stop offset=".5" stop-color="#EFE3CF"/><stop offset="1" stop-color="#C2AB8A"/></linearGradient>
    <linearGradient id="water" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#C9D2C0"/><stop offset="1" stop-color="#9FAF9A"/></linearGradient>
    <radialGradient id="haze" cx="50%" cy="40%" r="60%"><stop offset="0" stop-color="#FFF8EC"/><stop offset="1" stop-color="#FFF8EC" stop-opacity="0"/></radialGradient>
  </defs>`;
  g+=`<rect width="480" height="900" fill="url(#sky)"/>`;
  // distant trees
  // far palace + cypress (blurred for depth)
  g+=`<g filter="url(#far)" opacity=".55"><path d="M150 560 V470 h30 v-30 h20 v-40 l40 -40 l40 40 v40 h20 v30 h30 v90z" fill="#C9B497"/>
      <circle cx="240" cy="360" r="22" fill="#D3C0A2"/></g>`;
  for(let i=0;i<16;i++)g+=`<ellipse filter="url(#far)" cx="${rnd(40,440)}" cy="${rnd(520,610)}" rx="${rnd(30,60)}" ry="${rnd(40,80)}" fill="${['#9FA884','#B3B892','#8E9A76'][i%3]}" opacity="${rnd(.35,.6)}"/>`;
  [[118,600],[362,600],[150,610],[330,610]].forEach(([x,y])=>{g+=`<path filter="url(#mid)" d="M${x} ${y} C${x-14} ${y-60} ${x-6} ${y-150} ${x} ${y-190} C${x+6} ${y-150} ${x+14} ${y-60} ${x} ${y}z" fill="#6E7D5A" opacity=".75"/>`;});
  // fountain
  g+=`<g filter="url(#mid)" opacity=".85"><ellipse cx="240" cy="640" rx="70" ry="12" fill="#D8C8AE"/><rect x="232" y="590" width="16" height="50" fill="#E3D5BE"/><ellipse cx="240" cy="590" rx="30" ry="6" fill="#E3D5BE"/>
      <path d="M240 588 C226 560 214 572 206 600 M240 588 C254 560 266 572 274 600" stroke="#F4F8F6" stroke-width="2" fill="none" opacity=".8"/></g>`;
  // hedges
  g+=`<path filter="url(#mid)" d="M70 650 Q120 620 170 648 Q200 630 240 646 Q280 630 310 648 Q360 620 410 650 V700 H70z" fill="#7F8D66"/>`;
  g+=`<rect y="0" width="480" height="900" fill="url(#haze)"/>`;
  // sun bloom + god rays through the arch
  g+=`<radialGradient id="sun" cx="50%" cy="22%" r="45%"><stop offset="0" stop-color="#FFF6DD" stop-opacity=".95"/><stop offset="1" stop-color="#FFF6DD" stop-opacity="0"/></radialGradient>
      <rect width="480" height="900" fill="url(#sun)"/>
      <g class="rays-h" opacity=".35">${[...Array(7)].map((_,i)=>`<path d="M240 120 L${60+i*60} 700 L${90+i*60} 700z" fill="#FFF3D0"/>`).join('')}</g>`;
  // pond
  g+=`<path d="M0 690 Q240 660 480 690 V900 H0z" fill="url(#water)"/>`;
  for(let i=0;i<9;i++)g+=`<path d="M${rnd(40,380)} ${rnd(710,860)} h${rnd(30,80)}" stroke="#F4F1EA" stroke-opacity=".5" stroke-width="1.2"/>`;
  // swans + reflections (heart)
  g+=swan(196,780,1.05,false)+swan(284,780,1.05,true);
  g+=`<g opacity=".25" transform="translate(0 1562) scale(1 -1)">${swan(196,780,1.05,false)+swan(284,780,1.05,true)}</g>`;
  // arch frame (stone) — outer mask with archway opening
  g+=`<path fill-rule="evenodd" fill="url(#stone)" filter="url(#stoneTex)" d="M0 0H480V900H0Z M70 900 V300 C70 150 150 70 240 62 C330 70 410 150 410 300 V900 Z"/>`;
  g+=`<path d="M70 900 V300 C70 150 150 70 240 62 C330 70 410 150 410 300 V900" fill="none" stroke="#5E4A33" stroke-opacity=".35" stroke-width="10" filter="url(#mid)"/>`;
  g+=`<path d="M70 900 V300 C70 150 150 70 240 62 C330 70 410 150 410 300 V900" fill="none" stroke="#A58F6E" stroke-width="3"/>`;
  g+=`<path d="M52 900 V296 C52 138 140 46 240 40 C340 46 428 138 428 296 V900" fill="none" stroke="#BFA885" stroke-width="2" opacity=".8"/>`;
  // carved panels
  for(let y=110;y<660;y+=60){g+=`<rect x="14" y="${y}" width="26" height="44" rx="3" fill="none" stroke="#B09A78" stroke-opacity=".6"/><rect x="440" y="${y}" width="26" height="44" rx="3" fill="none" stroke="#B09A78" stroke-opacity=".6"/>`;}
  // columns
  [[58,0],[422,0]].forEach(([x])=>{g+=`<rect x="${x-14}" y="300" width="28" height="600" fill="url(#stone)" stroke="#A58F6E" stroke-opacity=".7"/><rect x="${x-20}" y="290" width="40" height="14" fill="#E6D8C1" stroke="#A58F6E" stroke-opacity=".7"/>`;});
  // keystone ornament
  g+=`<path d="M226 34 h28 l-6 34 h-16z" fill="#E9DCC6" stroke="#A58F6E"/>`;
  // vines + flowers on arch
  let fl=vine(70,520,120,140,12,false)+vine(410,520,360,140,12,true);
  fl+=cluster(110,170,.55,1)+cluster(372,170,.55,-1);
  for(let i=0;i<8;i++)fl+=bloom(rnd(60,140),rnd(200,520),rnd(.6,1))+bloom(rnd(340,420),rnd(200,520),rnd(.6,1));
  fl+=cluster(40,820,1,1)+cluster(450,820,1,-1)+cluster(70,700,.6,1)+cluster(420,700,.6,-1);
  g+=`<g filter="url(#petalLight)">${fl}</g>`;
  s.innerHTML=`<g filter="url(#paint)">${g}</g>`;
})();

/* ---------- florals top / bottom ---------- */
(function(){
  if(!$('topFlorals'))return;
  let t=`<rect width="480" height="250" fill="#C7D2C2" opacity=".35"/>`;
  t+=`<path d="M0 120 Q240 100 480 120 V250 H0z" fill="#F5E6E0" opacity=".2"/>`;
  t+=swan(205,96,.7,false)+swan(275,96,.7,true);
  t+=`<g opacity=".25" transform="translate(0 196) scale(1 -1)">${swan(205,96,.7,false)+swan(275,96,.7,true)}</g>`;
  t+=`<rect y="140" width="480" height="110" fill="url(#fadeDown)"/>`;
  t=`<defs><linearGradient id="fadeDown" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F5E6E0" stop-opacity="0"/><stop offset="1" stop-color="#F5E6E0"/></linearGradient></defs>`+t;
  t+=cluster(40,60,1.05,1)+cluster(440,70,1.05,-1)+cluster(120,20,.6,1)+cluster(360,18,.6,-1);
  t+=vine(70,110,150,210,7,false)+vine(410,110,330,210,7,true);
  $('topFlorals').innerHTML=`<g filter="url(#petalLight)">${t}</g>`;
  let b='';
  b+=vine(0,140,120,40,8,false)+vine(480,140,360,40,8,true);
  b+=cluster(70,180,1.1,1)+cluster(410,180,1.1,-1)+cluster(160,210,.8,1)+cluster(320,210,.8,-1)+cluster(240,230,.7,1);
  $('bottomFlorals').innerHTML=`<g filter="url(#petalLight)">${b}</g>`;
})();

/* ---------- building sketch (sepia line drawing of a Kerala mandapam) ---------- */
(function(){
  const ink='#7A5A3E';let g=`<g fill="none" stroke="${ink}" stroke-width="1.1" stroke-linecap="round">`;
  // ground + trees
  g+=`<path d="M0 238 Q240 228 480 238" />`;
  [[40,150],[440,150],[400,170]].forEach(([x,h])=>{g+=`<path d="M${x} 238 V${238-h*.6}"/><path d="M${x} ${238-h*.6} q-28 -12 -38 4 M${x} ${238-h*.6} q28 -12 38 4 M${x} ${238-h*.6} q-14 -30 -34 -30 M${x} ${238-h*.6} q14 -30 34 -30 M${x} ${238-h*.6} q0 -30 4 -40"/>`;});
  // main hall
  g+=`<rect x="110" y="140" width="260" height="98" fill="#F3E4D3"/>`;
  g+=`<path d="M80 144 L240 70 L400 144 Z" fill="#E6CDB2"/><path d="M120 120 L240 40 L360 120" fill="#D7B898"/><path d="M168 76 L240 28 L312 76" fill="#E6CDB2"/>`;
  for(let i=0;i<14;i++){const x=96+i*21;g+=`<path d="M${x} ${144-(i<7?i:13-i)*10} l8 4" opacity=".6"/>`;}
  g+=`<path d="M240 28 v-12"/><circle cx="240" cy="13" r="3" fill="#C9A46A"/>`;
  // pillars + arches
  for(let i=0;i<7;i++){const x=122+i*39;g+=`<path d="M${x} 150 V238"/><path d="M${x+6} 238 V170 Q${x+19.5} 152 ${x+33} 170 V238" fill="#E8D3BC"/>`;}
  g+=`<path d="M100 238 h280 v-6 h-280z" fill="#E6CDB2"/>`;
  // lamp post
  g+=`<path d="M250 238 v-40 M240 198 h20 M244 198 l6 -12 l6 12"/>`;
  // sign
  g+=`<rect x="200" y="152" width="80" height="14" fill="#F8EEE2"/></g>`;
  g+=`<text x="240" y="163" text-anchor="middle" font-family="Cormorant Garamond,serif" font-size="9" letter-spacing="2" fill="${ink}">KALYANA MANDAPAM</text>`;
  // falling golden leaves already float on top; add a few sketch shrubs
  for(let i=0;i<10;i++)g+=`<ellipse cx="${rnd(90,390)}" cy="${rnd(232,240)}" rx="${rnd(8,16)}" ry="${rnd(4,7)}" fill="#A9B08F" opacity=".5"/>`;
  if($('building'))$('building').innerHTML=`<g filter="url(#paint)">${g}</g>`;
})();

/* ---------- stylised map ---------- */
(function(){
  let g=`<rect width="380" height="230" fill="#EEF0E8"/>`;
  g+=`<path d="M250 0 C230 60 300 90 280 150 C268 190 300 210 300 230 H380 V0z" fill="#A9CBE6"/>`;
  g+=`<path d="M0 60 C80 80 160 40 250 70 M20 0 L120 230 M0 170 C100 150 200 190 290 160 M180 0 C170 80 200 150 170 230" stroke="#fff" stroke-width="7" fill="none"/>`;
  g+=`<path d="M0 120 C120 110 200 130 260 115" stroke="#F6D77A" stroke-width="6" fill="none"/>`;
  for(let i=0;i<10;i++)g+=`<rect x="${rnd(10,220)}" y="${rnd(10,210)}" width="${rnd(14,30)}" height="${rnd(10,22)}" rx="2" fill="#DADDD2"/>`;
  g+=`<rect x="40" y="180" width="60" height="34" rx="4" fill="#CFE3C4"/>`;
  g+=`<text x="300" y="60" font-family="system-ui,sans-serif" font-size="9" fill="#4A6E8C">Backwaters</text>`;
  g+=`<text x="44" y="200" font-family="system-ui,sans-serif" font-size="8" fill="#4F7A45">Temple Pond</text>`;
  g+=`<g transform="translate(176 104)"><path d="M0 0 C-10 -14 -10 -28 0 -30 C10 -28 10 -14 0 0z" fill="#D93B3B"/><circle cx="0" cy="-20" r="4" fill="#fff"/></g>`;
  g+=`<text x="190" y="96" font-family="system-ui,sans-serif" font-size="9" font-weight="600" fill="#B03030">Mandapam</text>`;
  if($('map'))$('map').innerHTML=g;
})();

/* ---------- dress-code guests ---------- */
(function(){
  const colors=['#2B1A1C','#6E1A26','#1E1416','#7A1A28','#2A1B1D','#5A1420'];
  let g='';const n=6;
  for(let i=0;i<n;i++){
    const x=50+i*64,y=50+(i%2)*8,c=colors[i],woman=i%2===0;
    const skin=['#C68B6A','#A8705A','#D9A383'][i%3];
    g+=`<g transform="translate(${x} ${y})">`;
    g+=`<circle cx="0" cy="0" r="12" fill="${skin}"/><path d="M-12 -2 C-12 -16 12 -16 12 -2 C${woman?'12 20 6 30':'10 -8 -10 -8'} ${woman?'8 30':'-10 -2'}" fill="#241416"/>`;
    if(woman){g+=`<path d="M-4 12 h8 l2 8 C18 40 14 60 22 190 H-22 C-14 60 -18 40 -6 20z" fill="${c}"/><path d="M-6 22 C-14 50 -26 90 -24 100" stroke="${skin}" stroke-width="5" fill="none"/>`;}
    else{g+=`<path d="M-5 12 h10 v6 h-10z" fill="${skin}"/><path d="M-18 20 C-10 16 10 16 18 20 L20 100 H-20z" fill="#1A1112"/><path d="M-4 20 L0 60 L4 20z" fill="#F4EEE8"/><path d="M-1 22 h2 l1 6 h-4z" fill="${c}"/><path d="M-16 100 L-14 190 H-3 L0 110 L3 190 H14 L16 100z" fill="#1A1112"/>`;}
    g+=`</g>`;
  }
  g+=cluster(10,220,.6,1)+cluster(410,220,.6,-1);
  if($('guests'))$('guests').innerHTML=`<g filter="url(#petalLight)">${g}</g>`;
})();

/* swap in artwork where provided */

/* ---------- fit each painting to its section like background-size:cover ---------- */
function fitCovers(){document.querySelectorAll('.frame-page[data-iw]').forEach(sec=>{
  const c=sec.querySelector('.cover');if(!c)return;
  const W=sec.clientWidth,H=sec.clientHeight,iw=+sec.dataset.iw,ih=+sec.dataset.ih;
  const k=Math.max(W/iw,H/ih),cw=iw*k,ch=ih*k,ax=+(sec.dataset.ax||.5),ay=+(sec.dataset.ay||.5);
  Object.assign(c.style,{width:cw+'px',height:ch+'px',left:((W-cw)*ax)+'px',top:((H-ch)*ay)+'px'});
});}
fitCovers();addEventListener('resize',fitCovers);addEventListener('orientationchange',()=>setTimeout(fitCovers,300));
if('ResizeObserver' in window){const ro=new ResizeObserver(fitCovers);document.querySelectorAll('.frame-page[data-iw]').forEach(x=>ro.observe(x));}

/* ---------- lantern / candle glows on the painted frames ---------- */
const GLOWS={
  // [x%, y%, size in cqw] measured on each painting
  arch:[[16.6,8.4,10],[23.8,5.4,9],[9.2,19.1,12],[77.2,5.4,9],[84.9,8.4,10],[91.4,20.3,12],[14.9,84.5,11],[33.3,85.3,7],[66.6,84.9,7],[84.9,84.5,11],[89.7,83.8,9],[13.6,61.2,9],[88.3,61.2,9]],
  venue:[[5.6,72,14],[28.5,67,10],[70.8,67,10],[92.8,70.6,14],[8.4,82,8],[91.6,82,8],[50,64,8]],
  gold:[[40.2,9.9,5],[42.8,8.9,5],[45.2,9.9,5],[48.1,9.3,5],[50.5,8.3,6],[53.2,9.3,5],[55.8,9.9,5],[58.2,8.9,5],[61.1,9.9,5],[50.5,14.5,16]]
};
document.querySelectorAll('[data-glows]').forEach(box=>{
  (GLOWS[box.dataset.glows]||[]).forEach(([x,y,sz],i)=>{const d=document.createElement('span');d.className='gl';d.style.cssText=`left:${x}%;top:${y}%;--s:${sz}cqw;--t:${rnd(1.6,3.2).toFixed(2)}s;--dl:${(-rnd(0,3)).toFixed(2)}s`;box.appendChild(d);});
});
// chandelier crystal twinkles
(function(){const box=document.querySelector('.page-gold .glows');if(!box)return;
  for(let i=0;i<16;i++){const t=document.createElement('span');t.className='tw';t.style.cssText=`left:${rnd(40,61)}%;top:${rnd(9,19)}%;--s:${rnd(5,10).toFixed(0)}px;--t:${rnd(1.4,2.8).toFixed(2)}s;--dl:${(-rnd(0,3)).toFixed(2)}s`;box.appendChild(t);}
})();
// golden sparkles drifting in the palace arch
(function(){const box=document.querySelector('.fx-sparkles');if(!box)return;
  for(let i=0;i<22;i++){const t=document.createElement('span');t.className='tw';t.style.cssText=`left:${rnd(10,90)}%;top:${rnd(6,92)}%;--s:${rnd(4,9).toFixed(0)}px;--t:${rnd(2,4).toFixed(2)}s;--dl:${(-rnd(0,4)).toFixed(2)}s`;box.appendChild(t);}
})();
// blush petals drifting over the gold invitation frame
(function(){const box=document.querySelector('.pink-petals');if(!box||reduce)return;
  for(let i=0;i<12;i++){const p=document.createElement('span');p.className='rp';p.style.cssText=`left:${rnd(2,96)}%;--s:${rnd(8,13).toFixed(0)}px;--t:${rnd(8,13).toFixed(1)}s;--dl:${(-rnd(0,12)).toFixed(1)}s;--dx:${rnd(-50,50).toFixed(0)}px`;box.appendChild(p);}
})();
// red petals falling from the flowers on the damask frame
(function(){const box=document.querySelector('.red-petals');if(!box||reduce)return;
  for(let i=0;i<16;i++){const p=document.createElement('span');p.className='rp';p.style.cssText=`left:${rnd(2,96)}%;--s:${rnd(8,14).toFixed(0)}px;--t:${rnd(7,12).toFixed(1)}s;--dl:${(-rnd(0,12)).toFixed(1)}s;--dx:${rnd(-60,60).toFixed(0)}px`;box.appendChild(p);}
})();
// parallax on the painted frames + light sweep on the gold frame
const fpBgs=[...document.querySelectorAll('.frame-page .bg')];
function parallax(){if(reduce)return;
  const vi=document.querySelector('.vp-inner img');if(vi){const r=vi.parentElement.getBoundingClientRect();if(r.bottom>0&&r.top<innerHeight){const off=((r.top+r.height/2)-innerHeight/2);vi.style.setProperty('--py',(off*-.08).toFixed(1)+'px');}}
  const cp=$('colprog');if(cp){const h=document.documentElement.scrollHeight-innerHeight;cp.style.transform=`scaleX(${h>0?scrollY/h:0})`;}fpBgs.forEach(b=>{const r=b.parentElement.getBoundingClientRect();if(r.bottom<0||r.top>innerHeight)return;const c=(r.top+r.height/2-innerHeight/2)/innerHeight;b.style.transform=`translateY(${(c*-6).toFixed(2)}%)`;});}
addEventListener('scroll',()=>requestAnimationFrame(parallax),{passive:true});parallax();
(function(){const sw=document.querySelector('.sweep');if(!sw||!('IntersectionObserver' in window))return;
  new IntersectionObserver((es,o)=>{if(es[0].isIntersecting){setTimeout(()=>sw.classList.add('go'),500);o.disconnect();}},{threshold:.4}).observe(sw);})();

/* ---------- draped silk panels for the dress code ---------- */
function hex(h){h=h.replace('#','');return[parseInt(h.slice(0,2),16),parseInt(h.slice(2,4),16),parseInt(h.slice(4,6),16)];}
function drawSilk(cv){
  const W=300,H=420;cv.width=W;cv.height=H;const x=cv.getContext('2d');
  const B=hex(cv.dataset.base),D=hex(cv.dataset.deep),HI=hex(cv.dataset.hi),kas=cv.dataset.zari==='kasavu';
  const img=x.createImageData(W,H),d=img.data;
  for(let yy=0;yy<H;yy++){
    const sway=Math.sin(yy*.012)*14+Math.sin(yy*.031+1)*5;
    for(let xx=0;xx<W;xx++){
      const u=xx+sway*(1-yy/H*.4);
      // layered folds
      let f=.5+.32*Math.sin(u*.055+yy*.004)+.18*Math.sin(u*.13+1.7)+.08*Math.sin(u*.29+yy*.01);
      f=Math.max(0,Math.min(1,f));
      const spec=Math.pow(Math.max(0,Math.sin(u*.055+yy*.004+.9)),18)*.7;
      const i=(yy*W+xx)*4;
      for(let c=0;c<3;c++){let v=D[c]+(B[c]-D[c])*f;v+= (HI[c]-v)*spec;d[i+c]=v;}
      d[i+3]=255;
    }
  }
  x.putImageData(img,0,0);
  // fine weave noise
  for(let k=0;k<2600;k++){x.fillStyle=`rgba(255,255,255,${Math.random()*.06})`;x.fillRect(Math.random()*W,Math.random()*H,1,1);}
  // border band (kasavu: gold stripes; zari: gold band with motifs)
  const by=H-86;
  const g=x.createLinearGradient(0,by,0,by+60);g.addColorStop(0,'#8E5F26');g.addColorStop(.25,'#F3D9A4');g.addColorStop(.5,'#C4974F');g.addColorStop(.75,'#F6DFA8');g.addColorStop(1,'#8E5F26');
  x.save();x.beginPath();
  for(let xx=0;xx<=W;xx+=4){const yy=by+Math.sin(xx*.05)*4;xx?x.lineTo(xx,yy):x.moveTo(xx,yy);}
  x.lineTo(W,by+60);for(let xx=W;xx>=0;xx-=4)x.lineTo(xx,by+60+Math.sin(xx*.05)*4);x.closePath();x.fillStyle=g;x.fill();x.clip();
  if(kas){x.fillStyle='rgba(120,80,30,.35)';for(let i=0;i<4;i++)x.fillRect(0,by+8+i*13,W,2);}
  else{x.fillStyle='rgba(110,18,34,.55)';for(let xx=10;xx<W;xx+=26){x.beginPath();x.moveTo(xx,by+30);x.lineTo(xx+8,by+18);x.lineTo(xx+16,by+30);x.lineTo(xx+8,by+42);x.closePath();x.fill();}
    x.fillStyle='rgba(255,240,200,.8)';for(let xx=23;xx<W;xx+=26){x.beginPath();x.arc(xx,by+30,2,0,7);x.fill();}}
  x.restore();
  // butta motifs scattered on the body
  x.fillStyle=kas?'rgba(201,164,106,.55)':'rgba(233,199,126,.55)';
  for(let yy=40;yy<by-20;yy+=46)for(let xx=(yy/46%2?30:52);xx<W;xx+=46){x.save();x.translate(xx,yy);for(let a=0;a<4;a++){x.rotate(Math.PI/2);x.beginPath();x.ellipse(0,-4,2,4,0,0,7);x.fill();}x.restore();}
}
document.querySelectorAll('canvas.silk').forEach(drawSilk);
// sparkles over the venue lake
(function(){const box=document.querySelector('.vp-twinkles');if(!box)return;
  for(let i=0;i<12;i++){const t=document.createElement('span');t.className='tw';t.style.cssText=`left:${rnd(15,85)}%;top:${rnd(45,72)}%;--s:${rnd(4,8).toFixed(0)}px;--t:${rnd(1.6,3.4).toFixed(2)}s;--dl:${(-rnd(0,3)).toFixed(2)}s`;box.appendChild(t);}
})();

/* ---------- gold corner ornaments on framed paper sections ---------- */
const cornerSVG=`<svg viewBox="0 0 62 62" fill="none" aria-hidden="true"><defs><linearGradient id="cg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#9C6B2E"/><stop offset=".5" stop-color="#F3D9A4"/><stop offset="1" stop-color="#9C6B2E"/></linearGradient></defs>
  <g stroke="url(#cg)" stroke-width="1.4" stroke-linecap="round"><path d="M6 56V20Q6 6 20 6h36"/><path d="M12 56V24q0-12 12-12h32"/><path d="M16 30c0-8 6-14 14-14M20 20c4 4 2 10-3 10s-5-7 0-9"/></g>
  <circle cx="12" cy="12" r="3" fill="url(#cg)"/><circle cx="6" cy="56" r="1.8" fill="url(#cg)"/><circle cx="56" cy="6" r="1.8" fill="url(#cg)"/></svg>`;
document.querySelectorAll('.sheet.lux').forEach(sec=>{['tl','tr','bl','br'].forEach(c=>{const d=document.createElement('span');d.className='lux-corner '+c;d.innerHTML=cornerSVG;sec.appendChild(d);});});

/* ---------- scratch to reveal ---------- */
(function(){
  const sec=$('save-date');if(!sec)return;
  const cards=[...sec.querySelectorAll('.scratch')];
  const conf=$('confetti'),cc=conf.getContext('2d');let bits=[],confRun=false;
  function paintFoil(cv){
    const d=Math.min(2,devicePixelRatio||1),w=cv.offsetWidth,h=cv.offsetHeight;
    if(!w||!h)return; // no size yet: the observer below paints it once the page is laid out
    cv.dataset.painted='1';
    cv.width=w*d;cv.height=h*d;const x=cv.getContext('2d');x.setTransform(d,0,0,d,0,0);
    const g=x.createLinearGradient(0,0,w,h);g.addColorStop(0,'#A77A3C');g.addColorStop(.3,'#F6DFA8');g.addColorStop(.5,'#C4974F');g.addColorStop(.72,'#F3D9A4');g.addColorStop(1,'#93652B');
    x.fillStyle=g;x.fillRect(0,0,w,h);
    for(let i=0;i<500;i++){x.fillStyle=`rgba(${Math.random()<.5?'255,250,230':'120,80,30'},${Math.random()*.25})`;x.fillRect(Math.random()*w,Math.random()*h,1.2,1.2);}
    x.strokeStyle='rgba(255,245,220,.6)';x.lineWidth=1;x.beginPath();x.arc(w/2,h/2,w/2-8,0,7);x.stroke();
    x.fillStyle='rgba(110,70,25,.75)';x.textAlign='center';x.font=`${Math.round(w*.13)}px "Cormorant Garamond", Georgia, serif`;
    x.fillText('SCRATCH',w/2,h/2+w*.03);
    x.font=`${Math.round(w*.2)}px "Great Vibes", cursive`;x.fillStyle='rgba(110,70,25,.45)';x.fillText('♥',w/2,h/2+w*.27);
  }
  function burst(cx,cy,n){
    const r=sec.getBoundingClientRect();const cols=['#8E1B2C','#C2475A','#E7A9B0','#E8C48A','#F3D9A4','#FFFFFF'];
    for(let i=0;i<n;i++){const a=Math.random()*Math.PI*2,sp=rnd(2,7);bits.push({x:cx-r.left,y:cy-r.top,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp-3,r:rnd(3,6),c:cols[i%cols.length],rot:rnd(0,6),vr:rnd(-.2,.2),life:rnd(70,120)});}
    if(!confRun){confRun=true;loopC();}
  }
  function loopC(){
    const r=sec.getBoundingClientRect(),d=Math.min(2,devicePixelRatio||1);
    if(conf.width!==Math.round(r.width*d)){conf.width=r.width*d;conf.height=r.height*d;}
    cc.setTransform(d,0,0,d,0,0);cc.clearRect(0,0,r.width,r.height);
    bits=bits.filter(b=>b.life>0);
    bits.forEach(b=>{b.x+=b.vx;b.y+=b.vy;b.vy+=.12;b.vx*=.99;b.rot+=b.vr;b.life--;cc.save();cc.translate(b.x,b.y);cc.rotate(b.rot);cc.globalAlpha=Math.min(1,b.life/40);cc.fillStyle=b.c;cc.beginPath();cc.ellipse(0,0,b.r,b.r*.6,0,0,7);cc.fill();cc.restore();});
    if(bits.length)requestAnimationFrame(loopC);else{confRun=false;cc.clearRect(0,0,r.width,r.height);}
  }
  function clearCard(card){
    if(card.classList.contains('cleared'))return;card.classList.add('cleared');
    const b=card.getBoundingClientRect();if(!reduce)burst(b.left+b.width/2,b.top+b.height/2,40);
    if(cards.every(c=>c.classList.contains('cleared'))){sec.classList.add('all');if(!reduce){const s=sec.getBoundingClientRect();setTimeout(()=>burst(s.left+s.width/2,s.top+s.height*.55,140),300);}}
  }
  cards.forEach(card=>{
    const cv=card.querySelector('canvas');paintFoil(cv);
    const x=cv.getContext('2d');let down=false,last=null,moves=0;
    function pos(e){const r=cv.getBoundingClientRect(),k=cv.offsetWidth/r.width;return[(e.clientX-r.left)*k,(e.clientY-r.top)*k];}
    function scratch(p){x.globalCompositeOperation='destination-out';x.lineCap='round';x.lineJoin='round';x.lineWidth=cv.offsetWidth*.22;
      x.beginPath();if(last){x.moveTo(last[0],last[1]);}else{x.moveTo(p[0],p[1]);}x.lineTo(p[0]+.1,p[1]+.1);x.stroke();last=p;
      if(++moves%8===0)check();}
    function check(){const d=x.getImageData(0,0,cv.width,cv.height).data;let clear=0,tot=0;for(let i=3;i<d.length;i+=32){tot++;if(d[i]<40)clear++;}if(clear/tot>.45)clearCard(card);}
    cv.addEventListener('pointerdown',e=>{down=true;last=null;cv.setPointerCapture(e.pointerId);scratch(pos(e));});
    cv.addEventListener('pointermove',e=>{if(down)scratch(pos(e));});
    ['pointerup','pointercancel'].forEach(t=>cv.addEventListener(t,()=>{down=false;last=null;check();}));
    cv.tabIndex=0;cv.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();clearCard(card);}});
  });
  $('revealAll').addEventListener('click',()=>cards.forEach((c,i)=>setTimeout(()=>clearCard(c),i*250)));
  // repaint foil after fonts load so the label uses the right typeface
  if(document.fonts)document.fonts.ready.then(()=>cards.forEach(c=>{if(!c.classList.contains('cleared'))paintFoil(c.querySelector('canvas'));}));
  // if the page loaded before it had a size, paint each foil as soon as it gets one
  if('ResizeObserver' in window)cards.forEach(c=>{const cv=c.querySelector('canvas');new ResizeObserver((_,o)=>{if(!cv.offsetWidth)return;if(!cv.dataset.painted)paintFoil(cv);o.disconnect();}).observe(cv);});
})();

/* ---------- torn paper edges ---------- */
document.querySelectorAll('[data-torn]').forEach(el=>{
  const bg=getComputedStyle(el.parentElement).backgroundColor;
  let d='M0 24 L0 14';for(let x=0;x<=480;x+=8){d+=` L${x} ${rnd(4,16).toFixed(1)}`;}d+=' L480 24 Z';
  let d2='M0 24 L0 18';for(let x=0;x<=480;x+=12){d2+=` L${x} ${rnd(11,20).toFixed(1)}`;}d2+=' L480 24 Z';
  const svg=`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 480 24' preserveAspectRatio='none'><path d='${d}' fill='rgba(255,255,255,.55)'/><path d='${d2}' fill='${bg}'/></svg>`;
  el.style.backgroundImage=`url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`;
});

/* envelope opening is handled below after all helpers are defined */

/* ---------- scroll reveals ---------- */
function startReveals(){
  if(reduce||!('IntersectionObserver' in window))return;
  document.documentElement.classList.add('anim');
  // headings that "write in" are clipped to nothing at first, which hides them from the observer,
  // so their parent is watched instead and reveals them
  const CLIP='.h-script,.fp-script,.fp-names,.hope,.venue-name',proxies=new Map();
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;const list=proxies.get(e.target);
    if(list){const top=e.boundingClientRect.top;list.forEach(el=>{if(el.getBoundingClientRect().top<innerHeight*.92)el.classList.add('in');});
      const left=list.filter(el=>!el.classList.contains('in'));if(left.length){proxies.set(e.target,left);return;}proxies.delete(e.target);}
    else e.target.classList.add('in');
    io.unobserve(e.target);}),{threshold:[0,.12,.3,.6,1],rootMargin:'0px 0px -30px 0px'});
  addEventListener('scroll',()=>{proxies.forEach((list,par)=>{list.forEach(el=>{if(el.getBoundingClientRect().top<innerHeight*.9)el.classList.add('in');});});},{passive:true});
  const so=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('seen');so.unobserve(e.target);}}),{threshold:.08});
  document.querySelectorAll('.sheet.lux,.rsvp-card').forEach(el=>so.observe(el));
  document.querySelectorAll('.rv,.rv-frame').forEach(el=>{
    const r=el.getBoundingClientRect();if(r.top<innerHeight*.9&&r.bottom>0){el.classList.add('in');return;}
    if(el.matches(CLIP)){const par=el.parentElement;if(!proxies.has(par)){proxies.set(par,[]);io.observe(par);}proxies.get(par).push(el);}
    else io.observe(el);
  });
}

/* ---------- countdown ---------- */
const target=new Date('2026-12-19T17:00:00+05:30').getTime();const E={d:$('cD'),h:$('cH'),m:$('cM'),s:$('cS')},P={};
const pad=n=>String(n).padStart(2,'0');
function tick(){const t=Math.max(0,target-Date.now());const v={d:String(Math.floor(t/864e5)),h:pad(Math.floor(t/36e5)%24),m:pad(Math.floor(t/6e4)%60),s:pad(Math.floor(t/1e3)%60)};
  for(const k in v){if(P[k]!==v[k]){E[k].textContent=v[k];if(P[k]!==undefined&&!reduce){E[k].classList.remove('flip');void E[k].offsetWidth;E[k].classList.add('flip');}P[k]=v[k];}}}
tick();setInterval(tick,1000);

/* ---------- rose that travels down the schedule ---------- */
const sched=$('sched'),rows=[...sched.querySelectorAll('.row-ev')],roseM=$('roseMarker');
function placeRose(){
  const mid=innerHeight*.55;let best=0,bd=1e9;
  rows.forEach((r,i)=>{const b=r.getBoundingClientRect();const c=b.top+b.height/2;const d=Math.abs(c-mid);if(d<bd){bd=d;best=i;}});
  const r=rows[best];const y=r.offsetTop+r.offsetHeight/2-22;
  roseM.style.transform=`translateY(${y}px)`;
  rows.forEach((x,i)=>{x.classList.toggle('on',i===best);x.classList.toggle('past',i<=best);});
  const fill=$('schedFill');if(fill){const line=fill.parentElement;fill.style.setProperty('--h',Math.max(0,y+22-line.offsetTop)+'px');}
}
let tk=false;addEventListener('scroll',()=>{if(!tk){requestAnimationFrame(()=>{placeRose();tk=false;});tk=true;}},{passive:true});
addEventListener('resize',placeRose);placeRose();

/* ---------- envelope open ---------- */
document.body.classList.add('locked');
let opened=false;
function openEnvelope(){
  if(opened)return;
  opened=true;
  const envBox=$('envBox'),envEl=$('env'),inv=$('invite');
  envBox.classList.add('opening');
  // flash effect after flap opens
  setTimeout(()=>envBox.classList.add('flash'),700);
  // hide envelope overlay and reveal invitation
  setTimeout(()=>{
    envEl.classList.add('done');
    if(inv){inv.classList.remove('pre');inv.classList.add('revealed');}
    document.body.classList.remove('locked');
    startReveals();
    startMusic();
    startLeaves();
    // trigger the hero bgi zoom-out
    const bgi=document.querySelector('.page-arch .bgi');
    if(bgi)bgi.style.transform='scale(1)';
  },1400);
}
const sealBtn=$('sealBtn');
if(sealBtn){
  sealBtn.addEventListener('click',openEnvelope);
  sealBtn.addEventListener('touchend',e=>{e.preventDefault();openEnvelope();});
}

/* ---------- falling golden leaves ---------- */
const cv=$('leaves'),cx=cv.getContext('2d');let W,H;
function size(){const d=Math.min(2,devicePixelRatio||1);W=innerWidth;H=innerHeight;cv.width=W*d;cv.height=H*d;cv.style.width=W+'px';cv.style.height=H+'px';cx.setTransform(d,0,0,d,0,0);}
size();addEventListener('resize',size);
const L=Array.from({length:innerWidth<600?10:16},()=>mk(true));
function mk(any){const colW=Math.min(480,innerWidth),x0=(innerWidth-colW)/2;return{x:x0+Math.random()*colW,y:any?Math.random()*innerHeight:-20,s:rnd(5,9),vy:rnd(.35,.8),sw:rnd(0,6),rot:rnd(0,6),vr:rnd(-.02,.02),pink:Math.random()<.35};}
function drawLeaf(l){cx.save();cx.translate(l.x,l.y);cx.rotate(l.rot);cx.scale(1,Math.abs(Math.cos(l.sw))*.6+.4);
  const gr=cx.createLinearGradient(-l.s,0,l.s,0);
  if(l.pink){gr.addColorStop(0,'#C2475A');gr.addColorStop(1,'#E7A9B0');}else{gr.addColorStop(0,'#A0743A');gr.addColorStop(.5,'#E8C48A');gr.addColorStop(1,'#B88A4A');}
  cx.fillStyle=gr;cx.globalAlpha=.85;cx.beginPath();cx.moveTo(-l.s,0);cx.quadraticCurveTo(0,-l.s*.6,l.s,0);cx.quadraticCurveTo(0,l.s*.6,-l.s,0);cx.fill();cx.restore();}
let run=false;
function loop(){if(!run)return;cx.clearRect(0,0,W,H);L.forEach((l,i)=>{l.y+=l.vy;l.sw+=.02;l.x+=Math.sin(l.sw)*.5;l.rot+=l.vr;if(l.y>H+20)L[i]=mk(false);drawLeaf(l);});requestAnimationFrame(loop);}
function startLeaves(){if(reduce||run)return;run=true;loop();}
document.addEventListener('visibilitychange',()=>{if(reduce)return;if(document.hidden)run=false;else if(opened){run=true;loop();}});

/* ---------- music: soft generated music box, starts when the envelope opens ---------- */
const mb=$('music');let ac=null,playing=false,timer=null,master=null;
const scale=[523.25,587.33,659.25,783.99,880,1046.5];
const tune=[0,2,4,3,2,1,0,2,3,4,5,4,3,2];
let step=0;
function note(f,t,dur,vol){const o=ac.createOscillator(),g=ac.createGain();o.type='sine';o.frequency.value=f;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(vol,t+.01);g.gain.exponentialRampToValueAtTime(.0004,t+dur);o.connect(g);g.connect(master);o.start(t);o.stop(t+dur+.05);}
function bar(){const t=ac.currentTime+.05;for(let i=0;i<4;i++){const f=scale[tune[step%tune.length]];note(f,t+i*.42,1.6,.09);note(f*2,t+i*.42,.7,.02);step++;}note(130.81*(step%8<4?1:1.122),t,1.7,.06);}
/* ===== SONG =====
   Put the song file next to this page (or paste a data URL) and set the part to play.
   start/end are in seconds; the page plays and loops just that part.
   If the file is missing, the soft music box above plays instead. */
const SONG={src:'kudmayi.mp3',title:'Kudmayi',start:0,end:0};
let audio=null,useSong=false;
function fadeTo(v,ms){if(!audio)return;const s0=audio.volume,t0=performance.now();(function f(t){const k=Math.min(1,(t-t0)/ms);audio.volume=s0+(v-s0)*k;if(k<1)requestAnimationFrame(f);})(t0);}
function startBox(){
  try{if(!ac){ac=new (window.AudioContext||window.webkitAudioContext)();master=ac.createGain();master.gain.value=.8;master.connect(ac.destination);}}catch(e){return;}
  ac.resume();if(!timer){bar();timer=setInterval(bar,1680);}
}
function startMusic(){
  playing=true;setBtn();startLeaves();
  if(SONG.src){
    if(!audio){
      audio=new Audio(SONG.src);audio.preload='auto';audio.loop=!(SONG.end>SONG.start);audio.volume=0;
      audio.addEventListener('loadedmetadata',()=>{if(SONG.start&&audio.currentTime<SONG.start)audio.currentTime=SONG.start;},{once:true});
      audio.addEventListener('timeupdate',()=>{if(SONG.end>SONG.start&&audio.currentTime>=SONG.end){audio.currentTime=SONG.start;}});
      audio.addEventListener('error',()=>{useSong=false;if(playing){startBox();setBtn();}});
    }
    if(SONG.start&&audio.readyState>0&&audio.currentTime<SONG.start)audio.currentTime=SONG.start;
    audio.play().then(()=>{useSong=true;fadeTo(.85,1500);setBtn();}).catch(()=>{useSong=false;if(playing){startBox();setBtn();}});
  }else startBox();
}
function stopMusic(){
  playing=false;
  if(audio&&useSong){fadeTo(0,400);setTimeout(()=>{if(!playing)audio.pause();},420);}
  if(timer){clearInterval(timer);timer=null;}
  if(ac)ac.suspend();
  setBtn();
}
function setBtn(){mb.querySelector('.ic-play').toggleAttribute('hidden',playing);mb.querySelector('.ic-pause').toggleAttribute('hidden',!playing);mb.setAttribute('aria-pressed',playing);mb.setAttribute('aria-label',playing?'Pause music':'Play music');
  const np=$('np');$('npTitle').textContent=useSong?SONG.title:'Music';np.classList.toggle('show',!!(playing||useSong));np.classList.toggle('paused',!playing);}
mb.addEventListener('click',()=>{playing?stopMusic():startMusic();});

/* ---------- RSVP form ---------- */
const form=$('rsvpForm');
form.addEventListener('submit',e=>{e.preventDefault();
  const n=$('rName').value.trim(),att=form.querySelector('input[name=att]:checked');
  if(!n){$('rErr').textContent='Please enter your name.';$('rName').focus();return;}
  if(!att){$('rErr').textContent='Please choose whether you will be attending.';return;}
  const cnt=$('rCount').value||(att.value.startsWith('Accepts')?'1':'0');
  $('rErr').textContent='';
  const txt=`RSVP for Lulu & Rinshad's wedding\nName: ${n}\nResponse: ${att.value}\nGuests: ${cnt}`;
  $('rWa').href='https://wa.me/919847012345?text='+encodeURIComponent(txt);
  $('rDoneTxt').textContent=att.value.startsWith('Accepts')?`${n}, we are delighted you'll join us. ${cnt} ${cnt==='1'?'guest':'guests'} noted.`:`${n}, you'll be missed. Thank you for letting us know.`;
  form.hidden=true;$('rDone').hidden=false;
});
$('rsvpModal').addEventListener('hidden.bs.modal',()=>{form.hidden=false;$('rDone').hidden=true;});
// fallback if Bootstrap JS fails to load
if(!window.bootstrap){
  const m=$('rsvpModal');
  document.querySelector('[data-bs-target="#rsvpModal"]').addEventListener('click',()=>{m.style.display='block';requestAnimationFrame(()=>m.classList.add('show'));});
  m.querySelector('.close-x').addEventListener('click',()=>{m.classList.remove('show');setTimeout(()=>{m.style.display='none';form.hidden=false;$('rDone').hidden=true;},300);});
}
})();
