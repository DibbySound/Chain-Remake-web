import {HOTBAR} from './data/items.js';

const clamp=(n,min,max)=>Math.max(min,Math.min(max,n));

export class SurvivalGame{
  constructor(){
    this.world={w:1800,h:1400};this.state='day';this.elapsed=0;this.dayLength=65;this.nightLength=210;this.phaseElapsed=0;this.worldSeed=11;
    this.player={x:900,y:1040,hp:100,stamina:100,combat:100,points:0,scrap:0,inventory:{radio:1,watch:1,medkit:1,lantern:1,machete:1},materials:{wood:0,powder:0,parts:0,metal:0},blueprints:[],artifacts:0,fuel:100,selected:'machete',hotbar:[...HOTBAR],yaw:0,pitch:0,facing:{x:0,y:-1},dodge:0,block:false,alive:true,noise:0,vest:false};
    this.chain={x:900,y:360,hp:1000,maxHp:1000,stun:0,attack:0,phase:'normal',rage:0,anger:0,aggro:false};this.keys=new Set();this.drops=[];this.makeMap();
  }
  makeMap(){
    const rand=()=>{this.worldSeed=(this.worldSeed*1664525+1013904223)>>>0;return this.worldSeed/4294967296;};this.trees=[];
    for(let i=0;i<145;i++){const x=35+rand()*(this.world.w-70),y=35+rand()*(this.world.h-70);if(Math.abs(x-900)<150&&Math.abs(y-800)<180)continue;this.trees.push({x,y,r:18+rand()*12,shade:Math.floor(rand()*3)});}
    this.rocks=[];for(let i=0;i<48;i++)this.rocks.push({x:30+rand()*(this.world.w-60),y:30+rand()*(this.world.h-60),r:8+rand()*12});
    // The eight possible artifact nodes are placed beside trees. A single node is active at a time.
    this.artifactSpots=[];for(let i=0;i<8;i++){const tree=this.trees[i*8+3];this.artifactSpots.push({x:tree.x+30,y:tree.y+5,active:false});}this.artifactIndex=0;this.activeArtifact=-1;
    this.scrapSpots=[];for(let i=0;i<32;i++)this.scrapSpots.push({x:50+rand()*(this.world.w-100),y:50+rand()*(this.world.h-100),taken:false});
    this.pointsOfInterest=[{id:'shop',name:'LOJA',x:900,y:850,r:66},{id:'workshop',name:'OFICINA',x:1040,y:850,r:42},{id:'warehouse',name:'ARMAZÉM',x:775,y:850,r:42},{id:'ritual',name:'RITUAL',x:900,y:370,r:55},{id:'informant',name:'INFORMADOR',x:1060,y:980,r:28}];
  }
  update(dt){if(!this.player.alive)return;this.elapsed+=dt;this.stepCycle(dt);this.updatePlayer(dt);this.updateChain(dt);this.updateSpellbook(dt);this.collectNearby();}
  stepCycle(dt){if(this.state==='victory')return;this.phaseElapsed+=dt;const duration=this.state==='day'?this.dayLength:this.nightLength;if(this.phaseElapsed<duration)return;this.phaseElapsed=0;if(this.state==='day'){this.state='night';this.chain.x=900;this.chain.y=360;this.chain.hp=this.chain.maxHp;this.chain.phase='normal';this.chain.aggro=false;this.message('A noite caiu. CHAIN despertou no ritual.');}else{this.state='day';this.player.points+=100;this.chain.aggro=false;this.message('Sobreviveste à noite. +100 pontos.');}}
  updatePlayer(dt){const p=this.player,k=this.keys;let x=(k.has('KeyD')?1:0)-(k.has('KeyA')?1:0),z=(k.has('KeyS')?1:0)-(k.has('KeyW')?1:0);if(x||z){const mag=Math.hypot(x,z);x/=mag;z/=mag;const yaw=p.yaw||0,worldX=x*Math.cos(yaw)+z*Math.sin(yaw),worldZ=-x*Math.sin(yaw)+z*Math.cos(yaw);p.facing={x:worldX,y:worldZ};let speed=k.has('ShiftLeft')||k.has('ShiftRight')?35:22;if(speed>22){if(p.stamina>0)p.stamina=Math.max(0,p.stamina-25*dt);else speed=18;}else p.stamina=Math.min(100,p.stamina+15*dt);p.x+=worldX*speed*dt;p.y+=worldZ*speed*dt;}else p.stamina=Math.min(100,p.stamina+19*dt);if(p.dodge>0)p.dodge-=dt;if(p.combat<100&&!p.block)p.combat=Math.min(100,p.combat+8*dt);p.x=clamp(p.x,10,this.world.w-10);p.y=clamp(p.y,10,this.world.h-10);p.noise=Math.max(0,p.noise-dt);}
  updateChain(dt){const c=this.chain,p=this.player;if(this.state==='victory')return;if(this.state!=='night'){c.stun=Math.max(0,c.stun-dt);return;}if(c.stun>0){c.stun-=dt;return;}const d=Math.hypot(p.x-c.x,p.y-c.y);if(d<380)c.aggro=true;if(c.aggro){const dx=(p.x-c.x)/Math.max(1,d),dy=(p.y-c.y)/Math.max(1,d),speed=c.phase==='bloodmoon'?140:88;c.x+=dx*speed*dt;c.y+=dy*speed*dt;if(d<33){c.attack-=dt;if(c.attack<=0){c.attack=1.45;this.damagePlayer(c.phase==='bloodmoon'?30:18);}}}else{c.x+=Math.sin(this.elapsed*.34)*9*dt;c.y+=Math.cos(this.elapsed*.3)*8*dt;}if(c.hp<c.maxHp*.62&&c.phase==='normal'){c.phase='enraged';this.message('CHAIN entrou em estado ENRAGED!');}if(c.hp<c.maxHp*.32&&c.phase!=='bloodmoon'){c.phase='bloodmoon';this.message('BLOODMOON — CHAIN está mais rápido e perigoso!');}if(c.hp<=0){c.stun=8;c.aggro=false;c.hp=c.maxHp*.35;this.message('CHAIN foi derrubado. O ritual ainda não terminou.');}}
  updateSpellbook(dt){if(!this.spellChannel||this.state==='victory')return;const p=this.player,c=this.chain,d=Math.hypot(p.x-c.x,p.y-c.y);if(d>150){this.spellChannel=0;this.message('Ritual interrompido — ficaste demasiado longe.');return;}this.spellChannel-=dt;c.stun=.25;if(this.spellChannel<=0){this.spellChannel=0;c.hp=0;c.aggro=false;this.state='victory';p.points+=2000;this.message('CHAIN foi apagado. O caminho de saída está aberto! +2000 pontos.');}}
  damagePlayer(amount){const p=this.player;if(p.dodge>0)return;if(p.block&&p.combat>10){p.combat=Math.max(0,p.combat-18);this.chain.stun=1.1;return;}p.hp-=amount*(p.vest ? .72 : 1);if(p.hp<=0){p.hp=0;p.alive=false;this.onDeath?.();}}
  collectNearby(){const p=this.player;for(const s of this.scrapSpots)if(!s.taken&&Math.hypot(p.x-s.x,p.y-s.y)<26){s.taken=true;p.scrap+=10;this.message('+10 sucata');}}
  pointAtPlayer(){return this.pointsOfInterest.find(point=>Math.hypot(this.player.x-point.x,this.player.y-point.y)<point.r+26)||null;}
  nearestTree(){return this.trees.map(tree=>({t:tree,d:Math.hypot(this.player.x-tree.x,this.player.y-tree.y)})).sort((a,b)=>a.d-b.d)[0];}
  activateArtifact(){if(this.player.artifacts>=4||this.activeArtifact>=0)return;this.activeArtifact=this.artifactIndex%this.artifactSpots.length;this.artifactSpots[this.activeArtifact].active=true;}
  message(text){this.onMessage?.(text);}
}
