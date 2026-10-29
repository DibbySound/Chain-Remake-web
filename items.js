export const ITEMS = {
  medkit:{name:'Medkit',icon:'✚',price:50,type:'consumable',description:'Recupera 80 pontos de vida.',heal:80},
  cola:{name:'Cola',icon:'▰',price:50,type:'consumable',description:'Restaura fôlego e dá vigor temporário.',stamina:100},
  radio:{name:'Rádio',icon:'◖',price:0,type:'gear',description:'Comunicação de equipa. Rádio de demonstração.'},
  watch:{name:'Watch',icon:'◷',price:20,type:'gear',description:'Consulta o tempo da noite.'},
  tablet:{name:'Tablet',icon:'▣',price:60,type:'gear',description:'Mapa e estado do gerador.'},
  stun:{name:'Stun Grenade',icon:'✹',price:50,type:'throwable',description:'Atordoa CHAIN por instantes.',count:1},
  bodylight:{name:'Body Flashlight',icon:'☼',price:90,type:'gear',description:'Luz sempre disponível na tecla G.'},
  lantern:{name:'Lanterna',icon:'♧',price:40,type:'gear',description:'Ilumina uma área à tua frente.'},
  emf:{name:'EMF',icon:'⌁',price:120,type:'gear',description:'Indica atividade anormal nas proximidades.'},
  frag:{name:'Frag (M67)',icon:'✺',price:150,type:'throwable',description:'Granada explosiva de fragmentação.',count:1},
  trap:{name:'Bear Trap',icon:'⌑',price:140,type:'throwable',description:'Armadilha que prende CHAIN.',count:1},
  vest:{name:'Vest',icon:'▤',price:170,type:'worn',description:'Reduz o dano recebido.'},
  flare:{name:'Flare',icon:'⚑',price:null,type:'throwable',description:'Chama um airdrop de mantimentos.',count:1},
  machete:{name:'Machete',icon:'╱',price:300,type:'melee',description:'Arma branca de ataque e defesa.',damage:.43,blueprint:true},
  machetePlus:{name:'Machete+',icon:'╱',price:200,type:'melee',description:'Melhoria do Machete. Requer o original.',damage:.45,requires:'machete'},
  tomahawk:{name:'Tomahawk',icon:'⚒',price:400,type:'melee',description:'Machado com ataque especial e QTE.',damage:.25},
  xsaw:{name:'X-Saw',icon:'⌁',price:1000,type:'melee',description:'Serra com combustível e ataques especiais.',damage:.75,fuel:100},
  m9:{name:'M9 Bayonet',icon:'†',price:500,type:'melee',description:'Faca de combate com sistema especial de QTE.',damage:.35},
  winchester:{name:'Broken Winchester 1897',icon:'╫',price:500,type:'melee',description:'Espingarda avariada com baioneta e sequência QTE.',damage:.5},
  ak:{name:'AK-47',icon:'⌁',price:625,type:'firearm',description:'Espingarda automática. Arma pesada.',damage:14,ammo:30,slots:3},
  m1911:{name:'M1911',icon:'⌖',price:200,type:'firearm',description:'Pistola semiautomática fabricada na oficina.',damage:4,ammo:8,craftable:true,blueprintPrice:200},
  deagle:{name:'Desert Eagle',icon:'⌖',price:500,type:'firearm',description:'Pistola potente. Também pode surgir gratuitamente no airdrop.',damage:7,ammo:7,airdrop:true},
  dbshotgun:{name:'DB Shotgun',icon:'╫',price:400,type:'firearm',description:'Caçadeira de dois canos fabricada na oficina.',damage:24,ammo:2,craftable:true,blueprintPrice:400},
  combatKnife:{name:'Combat Knife',icon:'†',price:180,type:'melee',description:'Faca defensiva que pode impedir uma execução.',damage:.1,craftable:true,blueprintPrice:180},
  spellbook:{name:'Spellbook',icon:'▤',price:null,type:'special',description:'Requer blueprint do Informante e 4 artefactos.',craftable:true},
  jackmine:{name:"Jack O’ Mine",icon:'◉',price:500,type:'throwable',description:'Mina de proximidade especial.',count:1,gamepass:true},
  crucifix:{name:'Crucifix',icon:'✝',price:375,type:'throwable',description:'Atordoa CHAIN com força sagrada.',count:1,gamepass:true},
  nvCamera:{name:'NV Camera',icon:'◉',price:200,type:'gear',description:'Visão noturna com bateria recarregável.',gamepass:true},
  athlete:{name:'Athlete',icon:'↗',price:125,type:'perk',description:'Bónus moderado de movimento e stamina.',gamepass:true},
  expandLobby:{name:'Expanded Lobby',icon:'♧',price:120,type:'perk',description:'Aumenta a capacidade da sala.',gamepass:true},
  xsawFuel:{name:'Combustível X-Saw',icon:'▰',price:25,type:'ammo',description:'Reabastece a X-Saw.'},
  ammoM1911:{name:'Munições M1911',icon:'▰',price:null,type:'ammo',description:'Reserva munições para a pistola.'},
  ammoDB:{name:'Munições DB Shotgun',icon:'▰',price:null,type:'ammo',description:'Cartuchos para a caçadeira.'}
};

export const RECIPES = {
  machete:{wood:2,parts:4},m1911:{powder:2,parts:3},dbshotgun:{wood:1,powder:2,parts:2},combatKnife:{wood:1,parts:2,metal:2},
  spellbook:{artifacts:4}
};

export const MATERIALS={scrap:{name:'Sucata',icon:'▧'},wood:{name:'Madeira',icon:'▤'},powder:{name:'Pólvora',icon:'▪'},parts:{name:'Peças de arma',icon:'⚙'},metal:{name:'Metal de alta qualidade',icon:'◆'},artifacts:{name:'Artefactos',icon:'▤'}};

export const BLUEPRINTS=['machete','m1911','dbshotgun','combatKnife'];
export const HOTBAR=['machete','m9','xsaw','medkit','lantern'];
