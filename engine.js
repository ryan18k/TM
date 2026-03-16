// ── PORTRAITS ──
const PORTRAITS = {};
document.addEventListener('DOMContentLoaded', ()=>{
  const store = document.getElementById('portrait-store');
  if(!store) return;
  store.querySelectorAll('img').forEach(img => {
    const key = img.id.replace('p_', '');
    PORTRAITS[key] = img.src;
  });
});

// ── BACKGROUND ──
const bgCanvas = document.getElementById('bg-canvas');
const bgCtx = bgCanvas.getContext('2d');
let bgW, bgH, bgT = 0;
let currentBgScene = 'none';
let targetBgScene  = 'none';
let bgAlpha = 1; // pour transition fondu entre scènes

function resizeBg(){ bgW = bgCanvas.width = window.innerWidth; bgH = bgCanvas.height = window.innerHeight; }
window.addEventListener('resize', resizeBg);
resizeBg();

function noise(x,y,s=0){ return ((Math.sin(x*127.1+y*311.7+s)*43758.5453123)%1+1)%1; }

function drawFog(ctx,w,h,t=0){
  const g=ctx.createLinearGradient(0,h*0.25,0,h);
  g.addColorStop(0,'rgba(6,6,10,0)');
  g.addColorStop(0.5,`rgba(6,6,10,${0.12+Math.sin(t*0.18)*0.04})`);
  g.addColorStop(1,'rgba(4,5,8,0.92)');
  ctx.fillStyle=g; ctx.fillRect(0,0,w,h);
}

function drawHospitalBg(ctx,w,h,t=0){
  const sky=ctx.createLinearGradient(0,0,0,h*0.6);
  sky.addColorStop(0,'#050810'); sky.addColorStop(0.6,'#080e1a'); sky.addColorStop(1,'#0a1220');
  ctx.fillStyle=sky; ctx.fillRect(0,0,w,h);
  for(let i=0;i<40;i++){ const sx=noise(i,0)*w; const sy=noise(i,1)*h*0.45; const sa=0.2+noise(i,2)*0.4+Math.sin(t*0.05+i)*0.1; ctx.fillStyle=`rgba(180,190,200,${sa})`; ctx.fillRect(sx,sy,1,1); }
  const fm=[0.32,0.28,0.35,0.26,0.33,0.29,0.36,0.28,0.31,0.27,0.34,0.30];
  ctx.fillStyle='#0c1018'; ctx.beginPath(); ctx.moveTo(0,h);
  for(let i=0;i<=fm.length;i++) ctx.lineTo(i/fm.length*w,i<fm.length?h*fm[i]:h);
  ctx.closePath(); ctx.fill();
  const mm=[0.42,0.38,0.44,0.36,0.43,0.38,0.45,0.37,0.41,0.39];
  ctx.fillStyle='#111520'; ctx.beginPath(); ctx.moveTo(0,h);
  for(let i=0;i<=mm.length;i++) ctx.lineTo(i/mm.length*w,i<mm.length?h*mm[i]:h);
  ctx.closePath(); ctx.fill();
  const nm=[0.50,0.46,0.52,0.44,0.51,0.47,0.53,0.45];
  ctx.fillStyle='#181c28'; ctx.beginPath(); ctx.moveTo(0,h);
  for(let i=0;i<=nm.length;i++) ctx.lineTo(i/nm.length*w,i<nm.length?h*nm[i]:h);
  ctx.closePath(); ctx.fill();
  [{x:w*.04,y:h*.32,w:w*.13,h:h*.22},{x:w*.18,y:h*.26,w:w*.20,h:h*.28},{x:w*.40,y:h*.30,w:w*.22,h:h*.24},{x:w*.64,y:h*.34,w:w*.14,h:h*.22},{x:w*.80,y:h*.28,w:w*.16,h:h*.26}].forEach(b=>{
    ctx.fillStyle='#141828'; ctx.beginPath(); ctx.moveTo(b.x,b.y+b.h); ctx.lineTo(b.x,b.y); ctx.lineTo(b.x+b.w,b.y); ctx.lineTo(b.x+b.w,b.y+b.h); ctx.closePath(); ctx.fill();
    ctx.fillStyle='#1a1424'; ctx.beginPath(); ctx.moveTo(b.x-3,b.y); ctx.lineTo(b.x+b.w/2+1,b.y-b.h*.3); ctx.lineTo(b.x+b.w+3,b.y); ctx.closePath(); ctx.fill();
    for(let r=0;r<3;r++) for(let c=0;c<3;c++) if(noise(b.x+c*10,r*10)>0.35){ ctx.fillStyle=`rgba(200,180,100,${0.04+noise(b.x+c,r,t*.1)*0.06})`; ctx.fillRect(b.x+b.w*.1+c*b.w*.28,b.y+b.h*.08+r*b.h*.26,b.w*.18,b.h*.15); }
  });
  ctx.strokeStyle='rgba(160,50,50,0.2)'; ctx.lineWidth=2;
  ctx.beginPath(); ctx.moveTo(w*.52,h*.28); ctx.lineTo(w*.52,h*.34); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(w*.49,h*.31); ctx.lineTo(w*.55,h*.31); ctx.stroke();
  ctx.fillStyle='#080e18'; ctx.beginPath(); ctx.moveTo(0,h*.60);
  for(let x=0;x<=w;x+=16) ctx.lineTo(x,h*.60+Math.sin(x*.012+t*.4)*2.5+Math.sin(x*.038+t*.25)*1.2);
  ctx.lineTo(w,h); ctx.lineTo(0,h); ctx.closePath(); ctx.fill();
  ctx.fillStyle='#060a12'; ctx.beginPath(); ctx.moveTo(0,h*.66);
  for(let x=0;x<=w;x+=16) ctx.lineTo(x,h*.66+Math.sin(x*.018+t*.3+1)*2+Math.sin(x*.05+t*.2)*1);
  ctx.lineTo(w,h); ctx.lineTo(0,h); ctx.closePath(); ctx.fill();
  ctx.fillStyle='#141418'; ctx.fillRect(w*.28,h*.60,w*.07,h*.06);
  ctx.fillStyle='#101012'; ctx.fillRect(w*.40,h*.58,w*.04,h*.08);
  drawFog(ctx,w,h,t);
}

function drawORBg(ctx,w,h,t=0){
  ctx.fillStyle='#030408'; ctx.fillRect(0,0,w,h);
  ctx.strokeStyle='rgba(35,45,55,0.25)'; ctx.lineWidth=1;
  ctx.beginPath(); ctx.moveTo(0,h*.7); ctx.lineTo(w*.28,h*.52); ctx.lineTo(w*.72,h*.52); ctx.lineTo(w,h*.7); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(0,h*.12); ctx.lineTo(w*.22,h*.32); ctx.moveTo(w,h*.12); ctx.lineTo(w*.78,h*.32); ctx.stroke();
  const lamp=ctx.createRadialGradient(w*.5,h*.15,0,w*.5,h*.15,w*.32);
  lamp.addColorStop(0,'rgba(160,180,200,0.10)'); lamp.addColorStop(0.5,'rgba(80,120,160,0.04)'); lamp.addColorStop(1,'rgba(0,0,0,0)');
  ctx.fillStyle=lamp; ctx.fillRect(0,0,w,h);
  ctx.fillStyle='#0a0c12'; ctx.fillRect(w*.18,h*.50,w*.64,h*.08);
  ctx.fillStyle='#080a0e'; ctx.fillRect(w*.26,h*.46,w*.48,h*.06);
  ctx.fillStyle='#0e1018'; ctx.fillRect(w*.05,h*.3,w*.08,h*.25); ctx.fillRect(w*.87,h*.32,w*.08,h*.22);
  ctx.strokeStyle='rgba(40,60,80,0.3)'; ctx.lineWidth=1;
  ctx.strokeRect(w*.05,h*.3,w*.08,h*.25); ctx.strokeRect(w*.87,h*.32,w*.08,h*.22);
  drawFog(ctx,w,h,t*.5);
}

function drawApartmentBg(ctx,w,h,t=0){
  ctx.fillStyle='#040508'; ctx.fillRect(0,0,w,h);
  const wg=ctx.createRadialGradient(w*.5,h*.28,0,w*.5,h*.28,w*.38);
  wg.addColorStop(0,'rgba(160,120,60,0.07)'); wg.addColorStop(0.7,'rgba(80,60,30,0.03)'); wg.addColorStop(1,'rgba(0,0,0,0)');
  ctx.fillStyle=wg; ctx.fillRect(0,0,w,h);
  ctx.strokeStyle='rgba(100,80,45,0.14)'; ctx.lineWidth=2;
  ctx.strokeRect(w*.28,h*.06,w*.44,h*.38);
  ctx.beginPath(); ctx.moveTo(w*.5,h*.06); ctx.lineTo(w*.5,h*.44); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(w*.28,h*.24); ctx.lineTo(w*.72,h*.24); ctx.stroke();
  ctx.fillStyle='rgba(12,18,28,0.65)'; ctx.fillRect(w*.28,h*.06,w*.44,h*.38);
  for(let i=0;i<8;i++){ const sx=w*.30+noise(i,3)*w*.4; const sy=h*.08+noise(i,4)*h*.14; ctx.fillStyle=`rgba(160,170,180,${0.15+noise(i,5)*0.2})`; ctx.fillRect(sx,sy,1,1); }
  ctx.fillStyle='#0a0a0e'; ctx.fillRect(w*.08,h*.58,w*.84,h*.04);
  ctx.fillStyle='#080808'; ctx.fillRect(w*.12,h*.62,w*.035,h*.12); ctx.fillRect(w*.845,h*.62,w*.035,h*.12);
  ctx.fillStyle='#0e0e12'; ctx.fillRect(w*.44,h*.52,w*.05,h*.06);
  ctx.fillStyle='#0c0c10'; ctx.fillRect(w*.43,h*.52,w*.07,h*.015);
  drawFog(ctx,w,h,t);
}

// Transition fluide entre scènes (fondu noir)
let bgTransitioning = false;
let bgTransitionAlpha = 0;
let bgTransitionDir = 0; // 1=fade out, -1=fade in
let bgTransitionResolve = null;

async function setBgScene(scene){
  if(currentBgScene === scene) return;
  // Fondu vers noir
  bgTransitionDir = 1; bgTransitionAlpha = 0; bgTransitioning = true;
  await new Promise(r=>{ bgTransitionResolve = r; });
  currentBgScene = scene;
  // Fondu depuis noir
  bgTransitionDir = -1;
  await new Promise(r=>{ bgTransitionResolve = r; });
  bgTransitioning = false;
}

function bgLoop(){
  bgT += 0.018;
  if(currentBgScene==='hospital') drawHospitalBg(bgCtx,bgW,bgH,bgT);
  else if(currentBgScene==='or') drawORBg(bgCtx,bgW,bgH,bgT);
  else if(currentBgScene==='apartment') drawApartmentBg(bgCtx,bgW,bgH,bgT);
  else { bgCtx.fillStyle='#040508'; bgCtx.fillRect(0,0,bgW,bgH); }

  if(bgTransitioning){
    bgTransitionAlpha += bgTransitionDir * 0.06;
    if(bgTransitionDir===1 && bgTransitionAlpha>=1){
      bgTransitionAlpha=1;
      if(bgTransitionResolve){ bgTransitionResolve(); bgTransitionResolve=null; }
    }
    if(bgTransitionDir===-1 && bgTransitionAlpha<=0){
      bgTransitionAlpha=0;
      if(bgTransitionResolve){ bgTransitionResolve(); bgTransitionResolve=null; }
    }
    bgCtx.fillStyle=`rgba(0,0,0,${bgTransitionAlpha})`;
    bgCtx.fillRect(0,0,bgW,bgH);
  }
  requestAnimationFrame(bgLoop);
}
bgLoop();

// ── AUDIO — uniquement les 2 MP3 + sons mini-jeux ──
let AC = null;
let musicAmbiance = null;   // HTMLAudioElement musique_ambiance
let musicTension  = null;   // HTMLAudioElement musique_tension
let currentMusic  = null;   // 'ambiance' | 'tension' | null
let fadeInterval  = null;

function initMusic(){
  musicAmbiance = new Audio('audio/musique_ambiance.mp3');
  musicAmbiance.loop = true;
  musicAmbiance.volume = 0;
  musicTension  = new Audio('audio/musique_tension.mp3');
  musicTension.loop  = true;
  musicTension.volume = 0;
}

function crossfadeTo(target, durationMs=1500){
  // target : 'ambiance' | 'tension' | null
  if(target === currentMusic) return;
  clearInterval(fadeInterval);
  const incoming = target==='ambiance' ? musicAmbiance : target==='tension' ? musicTension : null;
  const outgoing = currentMusic==='ambiance' ? musicAmbiance : currentMusic==='tension' ? musicTension : null;
  if(incoming){ try{ incoming.currentTime=0; incoming.play().catch(()=>{}); }catch(e){} }
  const steps = 40;
  const stepMs = durationMs / steps;
  let i = 0;
  fadeInterval = setInterval(()=>{
    i++;
    const t = i/steps;
    if(outgoing) outgoing.volume = Math.max(0, 1-t);
    if(incoming) incoming.volume = Math.min(1, t);
    if(i>=steps){
      clearInterval(fadeInterval);
      if(outgoing){ outgoing.pause(); outgoing.volume=0; }
      if(incoming) incoming.volume=1;
    }
  }, stepMs);
  currentMusic = target;
}

function playMusicAmbiance(){ crossfadeTo('ambiance', 1500); }
function playMusicTension(){  crossfadeTo('tension',  1000); }
function stopMusic(){ crossfadeTo(null, 800); }

// Sons mini-jeux uniquement via Web Audio
function playTick(freq,vol){
  if(!AC) return;
  const o=AC.createOscillator(), g=AC.createGain();
  o.frequency.value=freq; g.gain.setValueAtTime(vol,AC.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001,AC.currentTime+0.15);
  o.connect(g); g.connect(AC.destination); o.start(); o.stop(AC.currentTime+0.18);
}

// Alias pour compatibilité story.js
function setAmbience(name){
  if(name==='hospital'||name==='apartment'||name==='or'||name==='ending') playMusicAmbiance();
  else if(name==='choice'||name==='choiceFast') playMusicTension();
}
function disposeAmbience(){ stopMusic(); }
function stopPulse(){}
function startTension(){}

document.addEventListener('touchstart',()=>{ if(AC&&AC.state==='suspended') AC.resume(); },{passive:true});
document.addEventListener('visibilitychange',()=>{
  if(document.visibilityState==='visible'){
    if(AC&&AC.state==='suspended') AC.resume();
    // Reprendre la musique si elle était en cours
    if(currentMusic==='ambiance'&&musicAmbiance&&musicAmbiance.paused) musicAmbiance.play().catch(()=>{});
    if(currentMusic==='tension'&&musicTension&&musicTension.paused) musicTension.play().catch(()=>{});
  }
});

// ── CORE ENGINE ──
const sceneEl    = document.getElementById('scene');
const speakerEl  = document.getElementById('speaker-name');
const textEl     = document.getElementById('dialogue-text');
const continueBtn= document.getElementById('continue-btn');
const progressBar= document.getElementById('progress-bar');

let waitingForContinue = false;
let continueResolve    = null;
let typewriterDone     = false; // true quand toutes les lettres sont affichées

continueBtn.addEventListener('click', advanceScene);
document.addEventListener('keydown', e=>{ if(e.key===' '||e.key==='Enter') advanceScene(); });

function advanceScene(){
  // Si le typewriter n'est pas fini, on l'accélère / l'ignore — NON : on bloque
  if(!typewriterDone) return;
  if(waitingForContinue && continueResolve){
    waitingForContinue = false;
    const r = continueResolve; continueResolve = null; r();
  }
}

function waitContinue(){ return new Promise(r=>{ waitingForContinue=true; continueResolve=r; }); }
function sleep(ms){ return new Promise(r=>setTimeout(r,ms)); }
function setProgress(p){ progressBar.style.width=p+'%'; }

async function fadeOut(ms=600){
  const fo=document.getElementById('fade-overlay');
  fo.style.transition=`opacity ${ms/1000}s ease`; fo.style.opacity='1'; await sleep(ms);
}
async function fadeIn(ms=600){
  const fo=document.getElementById('fade-overlay');
  fo.style.transition=`opacity ${ms/1000}s ease`; fo.style.opacity='0'; await sleep(ms);
}

async function showActTitle(num){
  await fadeOut(500);
  const ov=document.getElementById('act-overlay'), tx=document.getElementById('act-title-text');
  tx.textContent='Acte '+['I','II','III','IV'][num-1];
  ov.style.opacity='1'; ov.classList.add('active');
  await sleep(1800);
  ov.style.opacity='0'; ov.classList.remove('active');
  await sleep(600);
}

async function showLocation(place,time){
  const banner=document.getElementById('location-banner');
  document.getElementById('location-place').textContent=place;
  document.getElementById('location-time').textContent=time;
  banner.className='center'; await sleep(2200);
  banner.className='top';    await sleep(800);
}
function hideLocation(){ document.getElementById('location-banner').className=''; }

// ── STAGE ──
const stageState={left:null,right:null,center:null};

function stageShow(slot,characterKey){
  const el=document.getElementById('slot-'+slot);
  if(!el) return;
  const src=PORTRAITS[characterKey];
  if(!src){ el.classList.add('hidden'); return; }
  // Réutilise l'img existante si même clé
  let img=el.querySelector('img');
  if(!img){ img=document.createElement('img'); el.appendChild(img); }
  img.src=src;
  img.style.cssText='height:100%;width:auto;max-width:100%;object-fit:contain;display:block;';
  el.classList.remove('hidden','dimmed');
  stageState[slot]=characterKey;
}
function stageHide(slot){
  const el=document.getElementById('slot-'+slot);
  if(el){ el.classList.add('hidden'); el.innerHTML=''; }
  stageState[slot]=null;
}
function stageHideAll(){ ['left','right','center'].forEach(stageHide); }

function stageActivate(activeSlot){
  ['left','right','center'].forEach(slot=>{
    const el=document.getElementById('slot-'+slot);
    if(!el||el.classList.contains('hidden')) return;
    slot===activeSlot ? el.classList.remove('dimmed') : el.classList.add('dimmed');
  });
}

let SCENE_CAST = {};

// ── TYPEWRITER ──
let typewriterTimer = null;

function typewrite(text, el, isThought, onDone){
  clearTimeout(typewriterTimer);
  typewriterDone = false;
  continueBtn.style.opacity = '0';
  el.textContent = '';

  // Wrapper avec style
  if(isThought){
    el.className = 'thought';
  } else {
    el.className = '';
  }

  let i = 0;
  const speed = 28; // ms par caractère

  function tick(){
    if(i <= text.length){
      el.textContent = text.slice(0, i);
      i++;
      typewriterTimer = setTimeout(tick, speed);
    } else {
      typewriterDone = true;
      continueBtn.style.opacity = '1';
      if(onDone) onDone();
    }
  }
  tick();
}

// ── DIALOGUE ──
// #7 : le bas du sprite est caché derrière la boîte de dialogue
// On gère ça via CSS : le stage a overflow:hidden et margin négatif ajusté dans index.html
// Ici on s'assure que le slot actif n'est pas dimmed et que les inactifs le sont

function showDialogue(speaker, text, isThought=false){
  // Gestion speaker
  if(speaker){
    speakerEl.style.display = 'block';
    speakerEl.textContent   = speaker;
    const cast = SCENE_CAST[speaker];
    if(cast) stageActivate(cast.slot);
    else stageActivate(null);
  } else {
    speakerEl.style.display = 'none';
    // #8 : pensée du narrateur → tous les personnages sont assombris
    if(isThought){
      ['left','right','center'].forEach(slot=>{
        const el=document.getElementById('slot-'+slot);
        if(el&&!el.classList.contains('hidden')) el.classList.add('dimmed');
      });
    }
  }

  // #5 : didascalies / narrateur en accolades italique — géré dans say() de story.js
  // On reçoit le texte déjà formaté

  sceneEl.classList.add('visible');
  continueBtn.style.display = 'block';
  continueBtn.style.opacity = '0'; // caché jusqu'à fin typewriter

  typewrite(text, textEl, isThought, null);
}

async function showChoice(cfg){
  const sc=document.getElementById('choice-screen'),
        timerEl=document.getElementById('choice-timer'),
        pL=document.getElementById('pulse-left'),
        pR=document.getElementById('pulse-right');
  document.getElementById('choice-left-text').textContent  = cfg.left.label;
  document.getElementById('choice-right-text').textContent = cfg.right.label;
  document.getElementById('choice-left-sub').textContent   = cfg.left.sub||'';
  document.getElementById('choice-right-sub').textContent  = cfg.right.sub||'';
  sceneEl.classList.remove('visible');
  sc.classList.add('active');
  if(cfg.fast){ pL.classList.add('fast'); pR.classList.add('fast'); }
  let secs=cfg.duration; timerEl.textContent=secs; timerEl.classList.remove('urgent');
  return new Promise(res=>{
    const intv=setInterval(()=>{
      secs--; timerEl.textContent=secs;
      if(secs<=Math.ceil(cfg.duration*0.35)) timerEl.classList.add('urgent');
      if(secs<=3&&navigator.vibrate) navigator.vibrate([30,15,30]);
      if(secs<=0){
        clearInterval(intv);
        const chosen=cfg.allowRandom?(Math.random()<.5?'left':'right'):null;
        sc.classList.remove('active'); timerEl.classList.remove('urgent');
        pL.classList.remove('fast'); pR.classList.remove('fast');
        res(chosen);
      }
    },1000);
    window._activeChoiceResolve=(side)=>{
      clearInterval(intv);
      sc.classList.remove('active'); timerEl.classList.remove('urgent');
      pL.classList.remove('fast'); pR.classList.remove('fast');
      res(side);
    };
  });
}
function makeChoice(side){ if(window._activeChoiceResolve) window._activeChoiceResolve(side); }

async function showEndScreen(lines){
  const sc=document.getElementById('end-screen'), ct=document.getElementById('end-content');
  ct.innerHTML=''; sc.classList.add('active');
  document.getElementById('end-title-display').style.opacity='0';
  document.getElementById('restart-btn').classList.remove('shown');
  document.getElementById('credits-btn').classList.remove('shown');
  for(const ln of lines){
    const el=document.createElement('span'); el.className='end-line'; el.textContent=ln;
    ct.appendChild(el); await sleep(80); el.classList.add('shown'); await sleep(1700);
  }
  await sleep(600);
  document.getElementById('end-title-display').style.opacity='1'; await sleep(800);
  document.getElementById('restart-btn').classList.add('shown');
  document.getElementById('credits-btn').classList.add('shown');
}

function showCredits(){ document.getElementById('credits-screen').classList.add('active'); }
function hideCredits(){ document.getElementById('credits-screen').classList.remove('active'); }

// ── MINIGAMES ──
async function showMGBanner(title,subtitle){
  const b=document.getElementById('mg-banner');
  document.getElementById('mg-banner-title').textContent=title;
  document.getElementById('mg-banner-sub').textContent=subtitle;
  b.className='center';
  await new Promise(r=>setTimeout(r,3200));
  b.className='top';
  await new Promise(r=>setTimeout(r,800));
}
function hideMGBanner(){
  document.getElementById('mg-banner').className='';
  document.getElementById('mg-counter-errors').style.display='none';
  document.getElementById('mg-counter-score').style.display='none';
}

function updateMGCounters(errors,maxE,score,total,flashErr=false,flashScore=false){
  document.getElementById('mg-counter-errors').style.display='flex';
  document.getElementById('mg-counter-score').style.display='flex';
  const ev=document.getElementById('mg-err-val'), sv=document.getElementById('mg-score-val');
  ev.textContent=errors+' / '+maxE; sv.textContent=score+' / '+total;
  ev.style.color=errors>=maxE-1?'#c04040':'#8a3232';
  if(flashErr){   ev.classList.remove('flash'); void ev.offsetWidth; ev.classList.add('flash'); setTimeout(()=>ev.classList.remove('flash'),250); }
  if(flashScore){ sv.classList.remove('flash'); void sv.offsetWidth; sv.classList.add('flash'); setTimeout(()=>sv.classList.remove('flash'),250); }
}

// ── ÉCRAN ÉCHEC MINI-JEU ──
function showMGFailScreen(message){
  return new Promise(res=>{
    let overlay = document.getElementById('mg-fail-overlay');
    if(!overlay){
      overlay = document.createElement('div');
      overlay.id = 'mg-fail-overlay';
      overlay.style.cssText = `
        position:fixed;inset:0;z-index:50;
        display:flex;flex-direction:column;align-items:center;justify-content:center;
        background:rgba(4,5,8,0.92);
        opacity:0;transition:opacity 0.4s ease;
      `;
      document.body.appendChild(overlay);
    }
    overlay.innerHTML = `
      <div style="text-align:center;padding:32px 24px;max-width:440px;">
        <div style="
          font-size:clamp(13px,2.2vw,16px);
          color:#8a3232;
          letter-spacing:.18em;
          text-transform:uppercase;
          margin-bottom:28px;
          line-height:1.8;
          font-style:italic;
          font-family:Georgia,serif;
        ">${message}</div>
        <button id="mg-retry-btn" style="
          background:none;
          border:0.5px solid #3a4050;
          color:#6a7080;
          font-family:Georgia,serif;
          font-size:11px;
          letter-spacing:.25em;
          text-transform:uppercase;
          padding:12px 36px;
          cursor:pointer;
          transition:border-color .3s,color .3s;
        ">Réessayer</button>
      </div>
    `;
    requestAnimationFrame(()=>{ overlay.style.opacity='1'; });
    document.getElementById('mg-retry-btn').addEventListener('click',()=>{
      overlay.style.opacity='0';
      setTimeout(()=>{ overlay.style.display='none'; res(); }, 400);
    });
    overlay.style.display='flex';
    requestAnimationFrame(()=>{ overlay.style.opacity='1'; });
  });
}

function runMG_circles(opts){
  return new Promise(async res=>{
    await showMGBanner(opts.title||'',opts.subtitle||'');
    const mg=document.getElementById('minigame-container'),
          cvs=document.getElementById('minigame-canvas'),
          ctx=cvs.getContext('2d');
    mg.classList.add('active');
    const W=window.innerWidth, H=window.innerHeight;
    cvs.width=W; cvs.height=H;
    const maxE=opts.maxErrors||3, total=opts.total||10,
          baseLife=opts.speed||2.5, maxActive=opts.maxActive||4;
    let errors=0,score=0,points=[],animId,done=false;
    updateMGCounters(0,maxE,0,total);
    const MARGIN=56;

    function spawnPoint(){
      const x=MARGIN+Math.random()*(W-MARGIN*2),
            y=MARGIN+40+Math.random()*(H-MARGIN*2-40),
            life=baseLife*(0.8+Math.random()*0.4);
      points.push({x,y,life,born:performance.now()/1000,hit:false,miss:false,flash:0});
    }
    let lastSpawn=0;
    function spawnInterval(){ return Math.max(0.3,baseLife*0.7-(score/total)*baseLife*0.4); }

    function drawFrame(ts){
      if(done) return;
      const now=ts/1000; ctx.clearRect(0,0,W,H);
      const active=points.filter(p=>!p.hit&&!p.miss).length;
      if(active<maxActive&&now-lastSpawn>spawnInterval()){ spawnPoint(); lastSpawn=now; }
      for(let i=points.length-1;i>=0;i--){
        const p=points[i], age=(now-p.born)/p.life;
        if(p.hit||p.miss){
          p.flash-=0.045; if(p.flash<=0){ points.splice(i,1); continue; }
          ctx.beginPath(); ctx.arc(p.x,p.y,14,0,Math.PI*2);
          ctx.fillStyle=p.hit?`rgba(60,200,90,${p.flash})`:`rgba(200,55,55,${p.flash})`; ctx.fill(); continue;
        }
        if(age>=1){
          p.miss=true; p.flash=1; errors++;
          updateMGCounters(errors,maxE,score,total,true,false); playTick(220,0.12);
          if(!(opts.interruptAt&&score>=opts.interruptAt)&&errors>=maxE){ endMG(false); return; }
          continue;
        }
        const danger=age>0.60, R=28;
        const grad=ctx.createRadialGradient(p.x,p.y,R*0.5,p.x,p.y,R*1.5);
        grad.addColorStop(0,danger?'rgba(180,40,40,0.18)':'rgba(40,120,180,0.12)'); grad.addColorStop(1,'rgba(0,0,0,0)');
        ctx.beginPath(); ctx.arc(p.x,p.y,R*1.5,0,Math.PI*2); ctx.fillStyle=grad; ctx.fill();
        ctx.beginPath(); ctx.arc(p.x,p.y,R,0,Math.PI*2); ctx.strokeStyle='rgba(40,55,70,0.45)'; ctx.lineWidth=3; ctx.stroke();
        ctx.beginPath(); ctx.arc(p.x,p.y,R,-Math.PI/2,-Math.PI/2+Math.PI*2*age);
        ctx.strokeStyle=danger?'rgba(200,65,45,0.95)':'rgba(70,155,200,0.9)'; ctx.lineWidth=3.5; ctx.lineCap='round'; ctx.stroke();
        ctx.beginPath(); ctx.arc(p.x,p.y,10,0,Math.PI*2); ctx.fillStyle=danger?'rgba(220,90,65,0.9)':'rgba(110,195,230,0.88)'; ctx.fill();
        ctx.beginPath(); ctx.arc(p.x,p.y,4,0,Math.PI*2); ctx.fillStyle='rgba(255,255,255,0.8)'; ctx.fill();
      }
      if(opts.interruptAt&&score>=opts.interruptAt&&!done){ endMG('interrupt'); return; }
      if(score>=total&&!done){ endMG(true); return; }
      animId=requestAnimationFrame(drawFrame);
    }

    async function endMG(result){
      done=true; cancelAnimationFrame(animId);
      await sleep(350);
      mg.classList.remove('active'); hideMGBanner();
      if(result===false){
        await showMGFailScreen(opts.failMessage||'Concentrez-vous. Recommencez.');
      }
      res(result);
    }

    function onTap(e){
      if(done) return; e.preventDefault();
      const rect=cvs.getBoundingClientRect(), src=e.touches?e.touches[0]:e,
            cx=(src.clientX-rect.left)*(W/rect.width), cy=(src.clientY-rect.top)*(H/rect.height);
      for(const p of points){
        if(p.hit||p.miss) continue;
        if(Math.hypot(cx-p.x,cy-p.y)<32){ p.hit=true; p.flash=1; score++; updateMGCounters(errors,maxE,score,total,false,true); playTick(880,0.15); break; }
      }
    }
    cvs.addEventListener('click',onTap);
    cvs.addEventListener('touchstart',onTap,{passive:false});
    cvs.addEventListener('pointerdown',onTap);
    animId=requestAnimationFrame(drawFrame);
  });
}

function runMG_traces(opts){
  return new Promise(async res=>{
    await showMGBanner(opts.title||'',opts.subtitle||'');
    const mg=document.getElementById('minigame-container'),
          cvs=document.getElementById('minigame-canvas'),
          ctx=cvs.getContext('2d');
    mg.classList.add('active');
    const W=window.innerWidth, H=window.innerHeight;
    cvs.width=W; cvs.height=H;
    const total=opts.total||15, maxE=opts.maxErrors||3,
          fast=opts.fast||false, maxSim=opts.maxSim||(fast?4:2);
    let errors=0,score=0,done=false,animId;
    updateMGCounters(0,maxE,0,total);
    let traces=[], traceId=0;
    const MARGIN=60;
    const ZONES=[]; for(let r=0;r<2;r++) for(let c=0;c<2;c++) ZONES.push({row:r,col:c});

    function getFreezone(){ const occ=traces.filter(t=>!t.success&&!t.fail).map(t=>t.zone); const free=ZONES.filter(z=>!occ.find(o=>o&&o.row===z.row&&o.col===z.col)); return free.length?free[Math.floor(Math.random()*free.length)]:ZONES[Math.floor(Math.random()*ZONES.length)]; }
    function genBezierPts(x1,y1,cx,cy,x2,y2){ const pts=[]; for(let t=0;t<=1;t+=0.025) pts.push({x:(1-t)*(1-t)*x1+2*(1-t)*t*cx+t*t*x2,y:(1-t)*(1-t)*y1+2*(1-t)*t*cy+t*t*y2}); return pts; }
    function genZigzagPts(x1,y1,x2,y2,steps){ const pts=[{x:x1,y:y1}]; for(let i=1;i<steps;i++){ const t=i/steps; pts.push({x:x1+(x2-x1)*t,y:y1+(y2-y1)*t+(i%2===0?-80:80)}); } pts.push({x:x2,y:y2}); const result=[]; for(let i=0;i<pts.length-1;i++) for(let t=0;t<=1;t+=0.05) result.push({x:pts[i].x+(pts[i+1].x-pts[i].x)*t,y:pts[i].y+(pts[i+1].y-pts[i].y)*t}); return result; }
    function genArcPts(x1,y1,x2,y2){ const mx=(x1+x2)/2,my=(y1+y2)/2,r=Math.hypot(x2-x1,y2-y1)/2,a0=Math.atan2(y1-my,x1-mx),a1=Math.atan2(y2-my,x2-mx),pts=[]; for(let i=0;i<=40;i++) pts.push({x:mx+r*Math.cos(a0+(a1-a0)*i/40),y:my+r*Math.sin(a0+(a1-a0)*i/40)}); return pts; }
    function genSCurvePts(x1,y1,x2,y2){ const mx=(x1+x2)/2,my=(y1+y2)/2,off=120; return [...genBezierPts(x1,y1,mx-off,my-off,mx,my),...genBezierPts(mx,my,mx+off,my+off,x2,y2)]; }
    function genTrace(id){
      const type=Math.floor(Math.random()*4),zone=getFreezone(),
            zW=(W-MARGIN*2)/2,zH=(H-MARGIN*2-60)/2,
            zX=MARGIN+zone.col*zW,zY=MARGIN+50+zone.row*zH,pad=30;
      const x1=zX+pad+Math.random()*(zW*0.3),y1=zY+pad+Math.random()*(zH-pad*2),
            x2=zX+zW-pad-Math.random()*(zW*0.3),y2=zY+pad+Math.random()*(zH-pad*2);
      let pts;
      if(type===0){const cx=(x1+x2)/2+(Math.random()-0.5)*80,cy=(y1+y2)/2+(Math.random()-0.5)*60;pts=genBezierPts(x1,y1,cx,cy,x2,y2);}
      else if(type===1){pts=genZigzagPts(x1,y1,x2,y2,2+Math.floor(Math.random()*2));}
      else if(type===2){pts=genArcPts(x1,y1,x2,y2);}
      else{pts=genSCurvePts(x1,y1,x2,y2);}
      const lifespan=fast?Math.max(2.5,5.0-score*0.06):Math.max(4.0,7.0-score*0.05);
      return {id,type,zone,pts,x1,y1,x2,y2,born:performance.now()/1000,lifespan,tracing:false,userPath:[],success:false,fail:false,flash:0};
    }
    function distToTrace(mx,my,tr){ let minD=9999; for(const p of tr.pts) minD=Math.min(minD,Math.hypot(mx-p.x,my-p.y)); return minD; }
    function trySpawn(){ if(score+errors>=total) return; const spawned=traces.filter(t=>!t.success&&!t.fail).length; if(spawned<maxSim&&traces.length<total) traces.push(genTrace(traceId++)); }
    for(let i=0;i<maxSim;i++) trySpawn();
    let lastSpawnTime=performance.now()/1000;

    function drawFrame(ts){
      if(done) return;
      const now=ts/1000; ctx.clearRect(0,0,W,H);
      if(now-lastSpawnTime>0.8){ trySpawn(); lastSpawnTime=now; }
      for(let i=traces.length-1;i>=0;i--){
        const tr=traces[i], age=(now-tr.born)/tr.lifespan;
        if(tr.success||tr.fail){
          tr.flash-=0.04; if(tr.flash<=0){ traces.splice(i,1); trySpawn(); continue; }
          if(tr.pts.length>1){ ctx.beginPath(); ctx.moveTo(tr.pts[0].x,tr.pts[0].y); for(let j=1;j<tr.pts.length;j++) ctx.lineTo(tr.pts[j].x,tr.pts[j].y); ctx.strokeStyle=tr.success?`rgba(60,210,90,${tr.flash})`:`rgba(210,55,55,${tr.flash})`; ctx.lineWidth=4; ctx.lineJoin='round'; ctx.stroke(); }
          continue;
        }
        if(age>=1&&!tr.tracing){ tr.fail=true; tr.flash=1; errors++; updateMGCounters(errors,maxE,score,total); playTick(220,0.1); if(errors>=maxE){ endMG(false); return; } continue; }
        const alpha=Math.max(0.12,0.55*(1-age));
        if(tr.pts.length>1){ ctx.beginPath(); ctx.moveTo(tr.pts[0].x,tr.pts[0].y); for(let j=1;j<tr.pts.length;j++) ctx.lineTo(tr.pts[j].x,tr.pts[j].y); ctx.strokeStyle=`rgba(60,110,155,${alpha})`; ctx.lineWidth=22; ctx.lineJoin='round'; ctx.stroke(); ctx.strokeStyle=`rgba(40,85,130,${alpha*1.6})`; ctx.lineWidth=2; ctx.stroke(); }
        ctx.beginPath(); ctx.arc(tr.x1,tr.y1,18,-Math.PI/2,-Math.PI/2+Math.PI*2*(1-age)); ctx.strokeStyle=age>0.6?'rgba(190,65,40,0.85)':'rgba(80,165,210,0.75)'; ctx.lineWidth=2.5; ctx.stroke();
        ctx.beginPath(); ctx.arc(tr.x1,tr.y1,9,0,Math.PI*2); ctx.fillStyle='rgba(80,165,210,0.85)'; ctx.fill();
        ctx.beginPath(); ctx.arc(tr.x2,tr.y2,9,0,Math.PI*2); ctx.fillStyle='rgba(80,145,185,0.5)'; ctx.fill();
        ctx.beginPath(); ctx.arc(tr.x2,tr.y2,16,0,Math.PI*2); ctx.strokeStyle='rgba(80,145,185,0.3)'; ctx.lineWidth=1.5; ctx.stroke();
        if(tr.userPath.length>1){ ctx.beginPath(); ctx.moveTo(tr.userPath[0].x,tr.userPath[0].y); for(let j=1;j<tr.userPath.length;j++) ctx.lineTo(tr.userPath[j].x,tr.userPath[j].y); ctx.strokeStyle='rgba(210,230,245,0.88)'; ctx.lineWidth=2.8; ctx.lineJoin='round'; ctx.lineCap='round'; ctx.stroke(); }
      }
      if(score>=total&&!done){ endMG(true); return; }
      animId=requestAnimationFrame(drawFrame);
    }

    async function endMG(result){
      done=true; cancelAnimationFrame(animId);
      await sleep(350);
      mg.classList.remove('active'); hideMGBanner();
      if(result===false){
        await showMGFailScreen(opts.failMessage||'Une précision chirurgicale est requise. Recommencez.');
      }
      res(result);
    }

    function getPos(e){ const rect=cvs.getBoundingClientRect(),src=e.touches?e.touches[0]:e; return {x:(src.clientX-rect.left)*(W/rect.width),y:(src.clientY-rect.top)*(H/rect.height)}; }
    function onStart(e){ e.preventDefault(); const p=getPos(e); let best=null,bestD=9999; for(const tr of traces){ if(tr.success||tr.fail||tr.tracing) continue; const d=Math.hypot(p.x-tr.x1,p.y-tr.y1); if(d<bestD){bestD=d;best=tr;} } if(best&&bestD<38){best.tracing=true;best.userPath=[p];} }
    function onMove(e){ if(done) return; e.preventDefault(); const p=getPos(e); for(const tr of traces){ if(!tr.tracing||tr.success||tr.fail) continue; tr.userPath.push(p); if(distToTrace(p.x,p.y,tr)>26){ tr.fail=true; tr.flash=1; tr.tracing=false; errors++; updateMGCounters(errors,maxE,score,total); playTick(220,0.1); if(errors>=maxE){endMG(false);return;} } } }
    function onEnd(e){ if(done) return; for(const tr of traces){ if(!tr.tracing||tr.success||tr.fail) continue; tr.tracing=false; const last=tr.userPath[tr.userPath.length-1]||{x:0,y:0}; if(Math.hypot(last.x-tr.x2,last.y-tr.y2)<28){ tr.success=true; tr.flash=1; score++; updateMGCounters(errors,maxE,score,total); playTick(1040,0.13); } else { tr.fail=true; tr.flash=1; errors++; updateMGCounters(errors,maxE,score,total); playTick(220,0.1); if(errors>=maxE){endMG(false);return;} } } }
    cvs.addEventListener('mousedown',onStart); cvs.addEventListener('mousemove',onMove); cvs.addEventListener('mouseup',onEnd);
    cvs.addEventListener('touchstart',onStart,{passive:false}); cvs.addEventListener('touchmove',onMove,{passive:false}); cvs.addEventListener('touchend',onEnd,{passive:false});
    animId=requestAnimationFrame(drawFrame);
  });
}
