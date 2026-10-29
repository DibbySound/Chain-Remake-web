import {SurvivalGame} from './game.js';
import {GameUI} from './ui.js';
import {SurvivalScene3D} from './renderer3d.js';
import {SoftwarePerspectiveScene} from './fallback3d.js';

const root=document.querySelector('#game');
const game=new SurvivalGame();
let scene,softwareFallback=false;
try{scene=new SurvivalScene3D(root,game);}catch(error){console.warn('WebGL indisponível; a usar pré-visualização em perspetiva.',error);scene=new SoftwarePerspectiveScene(root,game);softwareFallback=true;}
const ui=new GameUI(game);
if(softwareFallback)ui.message('WebGL indisponível neste browser; pré-visualização em perspetiva ativa.');
const held=new Set();
let previous=performance.now(),controllerIndex=-1;

game.keys=held;
function keyDown(e){if(['Space','Tab','ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.code))e.preventDefault();if(e.repeat)return;held.add(e.code);if(e.code==='KeyE')ui.interact();if(e.code==='KeyF')ui.toggleBlock(true);if(e.code==='KeyQ')dodge();if(e.code==='Space')ui.special();if(e.code==='KeyI')ui.open('inventory');if(e.code==='Tab')ui.open('shop');if(e.code==='KeyG'){const p=game.player;p.lightOn=!p.lightOn;ui.message(p.lightOn?'Lanterna ligada.':'Lanterna desligada.');}if(/^Digit[1-5]$/.test(e.code))ui.selectSlot(Number(e.code.at(-1)));}
function keyUp(e){held.delete(e.code);if(e.code==='KeyF')ui.toggleBlock(false);}
function dodge(){const p=game.player;if(p.stamina<18)return ui.message('Sem fôlego para esquivar.');if(p.dodge>0)return;p.stamina-=18;p.dodge=.34;p.x+=p.facing.x*44;p.y+=p.facing.y*44;if(Math.hypot(game.chain.x-p.x,game.chain.y-p.y)<55){game.chain.stun=1.4;p.stamina=Math.min(100,p.stamina+45);ui.message('Esquiva perfeita! CHAIN ficou atordoado.');}}
window.addEventListener('keydown',keyDown);window.addEventListener('keyup',keyUp);window.addEventListener('blur',()=>{held.clear();game.player.block=false;});
root.addEventListener('pointerdown',e=>{if(e.button===0&&document.pointerLockElement!==scene.renderer.domElement){scene.renderer.domElement.requestPointerLock?.();ui.message('Rato capturado. Esc para libertar.');return;}if(e.button===0)ui.attack();if(e.button===2)ui.special();});root.addEventListener('contextmenu',e=>e.preventDefault());
window.addEventListener('mousemove',e=>{if(document.pointerLockElement!==scene.renderer.domElement)return;const yaw=scene.yaw-e.movementX*.0022,pitch=scene.pitch-e.movementY*.002;scene.setLook(yaw,pitch);game.player.yaw=yaw;game.player.pitch=pitch;});
document.querySelector('#help-button').onclick=()=>ui.open('help');
window.addEventListener('gamepadconnected',e=>{controllerIndex=e.gamepad.index;ui.message('Comando ligado.');});window.addEventListener('gamepaddisconnected',e=>{if(controllerIndex===e.gamepad.index)controllerIndex=-1;});
let previousPadButtons=[];
function pollController(){if(controllerIndex<0)return;const pad=navigator.getGamepads?.()[controllerIndex];if(!pad)return;const axis=(n)=>Math.abs(pad.axes[n]||0)>.18?pad.axes[n]:0;held.delete('KeyW');held.delete('KeyA');held.delete('KeyS');held.delete('KeyD');const x=axis(0),y=axis(1);if(x<-.18)held.add('KeyA');if(x>.18)held.add('KeyD');if(y<-.18)held.add('KeyW');if(y>.18)held.add('KeyS');const pressed=(index)=>pad.buttons[index]?.pressed&&!previousPadButtons[index];if(pressed(0))ui.attack();if(pressed(1))dodge();if(pressed(2))ui.interact();if(pressed(3))ui.toggleBlock(true);if(!pad.buttons[3]?.pressed)ui.toggleBlock(false);if(pressed(4))ui.selectSlot(1);if(pressed(5))ui.selectSlot(2);if(pressed(9))ui.open('inventory');if(pad.buttons[7]?.pressed)held.add('ShiftLeft');else held.delete('ShiftLeft');previousPadButtons=pad.buttons.map(b=>b.pressed);}
function frame(now){const dt=Math.min(.05,(now-previous)/1000);previous=now;pollController();game.update(dt);scene.render();ui.render();}
scene.renderer.setAnimationLoop(frame);

// Keep the HUD demonstrative while allowing rapid manual inspection.
window.chainDemo={game,ui,scene};
