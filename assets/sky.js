/* Night-sky hero (assets/sky.js)
   click a star: it lights up
   drag from star to star: draw a constellation (fades after a few seconds)
   double-click a star: it falls as a meteor, bursts on the ground, then rises back */
(function(){
  var hero=document.querySelector('.hero'); if(!hero) return;
  var cv=document.createElement('canvas'); cv.className='sky'; cv.setAttribute('aria-hidden','true');
  hero.insertBefore(cv, hero.firstChild);
  var hint=document.createElement('div'); hint.className='sky-hint';
  hint.textContent='\u2726 click, drag, or double-click the stars'; hero.appendChild(hint);
  var ctx=cv.getContext('2d'), bg=document.createElement('canvas'), bctx=bg.getContext('2d');
  var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  var W=0,H=0,DPR=1,stars=[],dust=[],links=[],meteors=[],bursts=[],risers=[];
  var drag=null,lastTap={s:null,t:0},visible=true,raf=0,prev=performance.now(),hintShown=true;
  var LINK_LIFE=6, GROUND=10;
  function rand(a,b){return a+Math.random()*(b-a)}
  function band(x){return H*0.12+(x/W)*H*0.5}
  function gauss(){return (Math.random()+Math.random()+Math.random()-1.5)/1.5}

  function paintBackground(){
    bg.width=W*DPR; bg.height=H*DPR; bctx.setTransform(DPR,0,0,DPR,0,0);
    var g=bctx.createLinearGradient(0,0,0,H);
    g.addColorStop(0,'#040A1C'); g.addColorStop(.55,'#0A1A42'); g.addColorStop(.92,'#163063'); g.addColorStop(1,'#1E3B70');
    bctx.fillStyle=g; bctx.fillRect(0,0,W,H);
    // milky way glow along a diagonal band
    for(var i=0;i<26;i++){
      var x=rand(-.05,1.05)*W, y=band(x)+gauss()*H*0.05, r=rand(.08,.2)*Math.max(W,H)*0.5;
      var rg=bctx.createRadialGradient(x,y,0,x,y,r);
      var hue=Math.random()<.5?'150,170,255':'170,140,255';
      rg.addColorStop(0,'rgba('+hue+',0.07)'); rg.addColorStop(1,'rgba('+hue+',0)');
      bctx.fillStyle=rg; bctx.fillRect(x-r,y-r,2*r,2*r);
    }
    // horizon glow + ground
    var hg=bctx.createLinearGradient(0,H-90,0,H);
    hg.addColorStop(0,'rgba(127,211,203,0)'); hg.addColorStop(1,'rgba(127,211,203,0.16)');
    bctx.fillStyle=hg; bctx.fillRect(0,H-90,W,90);
    bctx.fillStyle='rgba(4,10,28,0.85)'; bctx.fillRect(0,H-GROUND,W,GROUND);
    bctx.fillStyle='rgba(127,211,203,0.35)'; bctx.fillRect(0,H-GROUND,W,1);
  }
  function build(){
    var r=hero.getBoundingClientRect(); W=Math.max(1,r.width); H=Math.max(1,r.height);
    DPR=Math.min(2,window.devicePixelRatio||1);
    cv.width=W*DPR; cv.height=H*DPR; cv.style.width=W+'px'; cv.style.height=H+'px';
    ctx.setTransform(DPR,0,0,DPR,0,0);
    paintBackground();
    var area=W*H; dust=[]; stars=[]; links=[]; meteors=[]; bursts=[]; risers=[];
    var nd=Math.round(area/700);
    for(var i=0;i<nd;i++){
      var x=Math.random()*W, y=Math.random()<.6? band(x)+gauss()*H*0.13 : Math.random()*H*0.95;
      if(y<0||y>H-GROUND-2) continue;
      dust.push({x:x,y:y,r:rand(.25,.9),a:rand(.12,.55),tw:rand(0,6.3),s:rand(.6,2.2)});
    }
    var ns=Math.max(24,Math.round(area/9000));
    for(var j=0;j<ns;j++){
      var sx=rand(12,W-12), sy=Math.random()<.45? band(sx)+gauss()*H*0.1 : rand(12,H*0.86);
      sy=Math.max(10,Math.min(H*0.86,sy));
      var c=Math.random(); c=c<.18?'255,226,170':(c<.42?'190,232,255':'255,255,255');
      stars.push({x:sx,y:sy,hx:sx,hy:sy,r:rand(1.1,2.4),tw:rand(0,6.3),sp:rand(.8,2),glow:0,state:'sky',c:c});
    }
  }
  function hit(x,y){
    var best=null,bd=22*22;
    for(var i=0;i<stars.length;i++){var s=stars[i]; if(s.state!=='sky') continue;
      var d=(s.x-x)*(s.x-x)+(s.y-y)*(s.y-y); if(d<bd){bd=d;best=s}}
    return best;
  }
  function pos(e){var r=cv.getBoundingClientRect(); return {x:e.clientX-r.left,y:e.clientY-r.top}}
  function hideHint(){ if(hintShown){hintShown=false; hint.style.opacity='0';} }
  function addLink(a,b){ links.push({a:a,b:b,t:0}); a.glow=Math.max(a.glow,.8); b.glow=1; }
  function launch(s){
    if(reduce){ s.glow=1; return; }
    s.state='falling';
    var dir=Math.random()<.5?-1:1, gy=H-GROUND, dy=gy-s.y, dx=dir*dy*rand(.45,.9);
    var tx=Math.max(8,Math.min(W-8,s.x+dx));
    meteors.push({s:s,x0:s.x,y0:s.y,x1:tx,y1:gy,t:0,d:rand(.9,1.3),trail:[]});
  }
  function boom(x,y){
    var ps=[];
    for(var i=0;i<28;i++){var a=rand(Math.PI*1.05,Math.PI*1.95), v=rand(60,220);
      ps.push({x:x,y:y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,l:rand(.5,1)});}
    bursts.push({x:x,y:y,t:0,ps:ps});
  }

  cv.addEventListener('pointerdown',function(e){
    var p=pos(e), s=hit(p.x,p.y); if(!s) return;
    hideHint(); var now=performance.now();
    if(lastTap.s===s && now-lastTap.t<350){ lastTap={s:null,t:0}; drag=null; launch(s); return; }
    lastTap={s:s,t:now}; s.glow=1;
    drag={last:s,x:p.x,y:p.y}; try{cv.setPointerCapture(e.pointerId)}catch(err){}
  });
  cv.addEventListener('pointermove',function(e){
    var p=pos(e);
    if(!drag){ cv.style.cursor=hit(p.x,p.y)?'pointer':'default'; return; }
    drag.x=p.x; drag.y=p.y;
    var s=hit(p.x,p.y);
    if(s && s!==drag.last){ addLink(drag.last,s); drag.last=s; lastTap={s:null,t:0}; }
  });
  function end(){drag=null}
  cv.addEventListener('pointerup',end); cv.addEventListener('pointercancel',end);
  cv.addEventListener('touchstart',function(e){
    var t=e.touches[0], r=cv.getBoundingClientRect();
    if(t && hit(t.clientX-r.left,t.clientY-r.top)) e.preventDefault();
  },{passive:false});

  function ease(t){return 1-Math.pow(1-t,3)}
  function star(x,y,r,col,a,glow){
    if(glow>0.01){
      var R=r*(4+10*glow), g=ctx.createRadialGradient(x,y,0,x,y,R);
      g.addColorStop(0,'rgba('+col+','+(0.55*glow)+')'); g.addColorStop(1,'rgba('+col+',0)');
      ctx.fillStyle=g; ctx.fillRect(x-R,y-R,2*R,2*R);
    }
    ctx.fillStyle='rgba('+col+','+a+')'; ctx.beginPath(); ctx.arc(x,y,r*(1+glow*.6),0,6.2832); ctx.fill();
    if(glow>0.3){ ctx.strokeStyle='rgba('+col+','+(0.5*glow)+')'; ctx.lineWidth=1;
      var L=r*(5+6*glow); ctx.beginPath(); ctx.moveTo(x-L,y); ctx.lineTo(x+L,y); ctx.moveTo(x,y-L); ctx.lineTo(x,y+L); ctx.stroke(); }
  }
  function frame(now){
    raf=0; var dt=Math.min(.05,(now-prev)/1000); prev=now; var T=now/1000;
    ctx.drawImage(bg,0,0,W,H);
    // background dust
    for(var i=0;i<dust.length;i++){var d=dust[i];
      var a=reduce?d.a:d.a*(.65+.35*Math.sin(T*d.s+d.tw));
      ctx.fillStyle='rgba(220,230,255,'+a+')'; ctx.fillRect(d.x,d.y,d.r*2,d.r*2);}
    // constellation links
    ctx.lineCap='round';
    for(var k=links.length-1;k>=0;k--){var L=links[k]; L.t+=dt; if(L.t>LINK_LIFE||L.a.state!=='sky'||L.b.state!=='sky'){links.splice(k,1);continue;}
      var al=Math.min(1,L.t*4)*Math.min(1,(LINK_LIFE-L.t)/2);
      ctx.strokeStyle='rgba(127,211,203,'+(0.25*al)+')'; ctx.lineWidth=5;
      ctx.beginPath(); ctx.moveTo(L.a.x,L.a.y); ctx.lineTo(L.b.x,L.b.y); ctx.stroke();
      ctx.strokeStyle='rgba(225,245,255,'+(0.85*al)+')'; ctx.lineWidth=1.2; ctx.stroke();}
    if(drag){ ctx.setLineDash([4,5]); ctx.strokeStyle='rgba(225,245,255,0.6)'; ctx.lineWidth=1.2;
      ctx.beginPath(); ctx.moveTo(drag.last.x,drag.last.y); ctx.lineTo(drag.x,drag.y); ctx.stroke(); ctx.setLineDash([]); }
    // stars
    for(var j=0;j<stars.length;j++){var s=stars[j]; if(s.state!=='sky') continue;
      s.glow=Math.max(0,s.glow-dt*0.35);
      var tw=reduce?.9:.7+.3*Math.sin(T*s.sp+s.tw);
      star(s.x,s.y,s.r,s.c,tw,s.glow);}
    // meteors
    for(var m=meteors.length-1;m>=0;m--){var M=meteors[m]; M.t+=dt/M.d; var u=Math.min(1,M.t), e=u*u;
      var x=M.x0+(M.x1-M.x0)*e, y=M.y0+(M.y1-M.y0)*e; M.trail.push({x:x,y:y}); if(M.trail.length>22) M.trail.shift();
      for(var q=1;q<M.trail.length;q++){var p0=M.trail[q-1],p1=M.trail[q], f=q/M.trail.length;
        ctx.strokeStyle='rgba('+M.s.c+','+(0.9*f)+')'; ctx.lineWidth=0.5+2.6*f;
        ctx.beginPath(); ctx.moveTo(p0.x,p0.y); ctx.lineTo(p1.x,p1.y); ctx.stroke();}
      star(x,y,M.s.r*1.3,M.s.c,1,1);
      if(u>=1){ meteors.splice(m,1); boom(M.x1,M.y1); M.s.state='gone';
        risers.push({s:M.s,x0:M.x1,y0:M.y1,t:-rand(3.5,5),d:1.9}); }}
    // bursts
    for(var b=bursts.length-1;b>=0;b--){var B=bursts[b]; B.t+=dt;
      if(B.t<.6){ var rr=6+60*ease(B.t/.6), aa=1-B.t/.6;
        ctx.strokeStyle='rgba(255,226,170,'+(0.7*aa)+')'; ctx.lineWidth=1.5; ctx.beginPath(); ctx.ellipse(B.x,B.y,rr,rr*.28,0,0,6.2832); ctx.stroke();
        var fg=ctx.createRadialGradient(B.x,B.y,0,B.x,B.y,40); fg.addColorStop(0,'rgba(255,240,200,'+(0.6*aa)+')'); fg.addColorStop(1,'rgba(255,240,200,0)');
        ctx.fillStyle=fg; ctx.fillRect(B.x-40,B.y-40,80,80); }
      var alive=false;
      for(var n=0;n<B.ps.length;n++){var P=B.ps[n]; if(B.t>P.l) continue; alive=true;
        P.vy+=380*dt; P.x+=P.vx*dt; P.y=Math.min(H-GROUND,P.y+P.vy*dt);
        ctx.fillStyle='rgba(255,'+(200+Math.round(55*Math.random()))+',170,'+(1-B.t/P.l)+')'; ctx.fillRect(P.x-1,P.y-1,2,2);}
      if(!alive && B.t>.6) bursts.splice(b,1); }
    // risers
    for(var r2=risers.length-1;r2>=0;r2--){var Rr=risers[r2]; Rr.t+=dt; if(Rr.t<0) continue;
      var v=Math.min(1,Rr.t/Rr.d), ev=ease(v), S=Rr.s;
      var rx=Rr.x0+(S.hx-Rr.x0)*ev, ry=Rr.y0+(S.hy-Rr.y0)*ev;
      for(var z=0;z<6;z++){var bk=Math.max(0,ev-z*0.025), zx=Rr.x0+(S.hx-Rr.x0)*bk, zy=Rr.y0+(S.hy-Rr.y0)*bk;
        ctx.fillStyle='rgba('+S.c+','+(0.35*(1-z/6))+')'; ctx.fillRect(zx-1,zy-1,2,2);}
      star(rx,ry,S.r,S.c,.95,.6);
      if(v>=1){ S.state='sky'; S.x=S.hx; S.y=S.hy; S.glow=1; risers.splice(r2,1); }}
    schedule();
  }
  function schedule(){ if(!raf && visible && !document.hidden) raf=requestAnimationFrame(frame); }
  if('IntersectionObserver' in window){ new IntersectionObserver(function(es){ visible=es[0].isIntersecting; if(visible){prev=performance.now(); schedule();} }).observe(hero); }
  document.addEventListener('visibilitychange',function(){ if(!document.hidden){prev=performance.now(); schedule();} });
  var rt; window.addEventListener('resize',function(){ clearTimeout(rt); rt=setTimeout(function(){build(); schedule();},150); });
  build(); schedule();
})();
