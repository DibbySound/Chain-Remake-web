# CHAIN — Survival Prototype

Protótipo web local 3D de um survival horror inspirado nas mecânicas públicas de CHAIN. Usa Three.js/WebGL e modelos low-poly procedurais próprios; não inclui assets extraídos do Roblox.

## Executar

Serve a pasta por HTTP com um servidor estático e abre-a num browser com WebGL 2. É necessária ligação à internet para carregar Three.js do jsDelivr. Por exemplo:

```sh
python3 -m http.server 8000
```

Depois visita `http://localhost:8000`.

## Controlos

- `WASD`: mover; `Shift`: correr; `Q`: esquivar.
- `E`: interagir/recolher; `F`: bloquear; clique esquerdo: atacar; clique direito ou `Espaço`: especial.
- `1`–`5`: escolher item; `I`: inventário; `Tab`: loja; `G`: lanterna.
- Xbox/PlayStation: stick esquerdo, A/Cross atacar, B/Circle esquivar, X/Square interagir, Y/Triangle bloquear, LB/RB trocar item.

## Organização

- `src/game.js`: estado do mundo, ciclo, movimento, inimigo e pickups.
- `src/renderer3d.js`: cena 3D, terreno, vegetação instanciada, edifícios, CHAIN e armas em primeira pessoa.
- `src/ui.js`: loja, inventário, oficina, armazém, Informador e entradas de ação.
- `src/data/items.js`: catálogo de equipamento, preços definidos e receitas iniciais.
- `src/main.js`: ciclo de renderização e input de teclado, rato e comando.
- `src/styles.css`: HUD e interface responsiva.

O renderizador limita a resolução de saída, desativa sombras dinâmicas e reutiliza geometria/material em vegetação instanciada. Os modelos são low-poly provisórios, sem texturas pesadas. Se o browser não der acesso a WebGL, a demo usa um desenho de compatibilidade em perspetiva para evitar o ecrã preto; esse modo não é a cena 3D completa. Os parâmetros de arma e receitas ficam centralizados em `src/data/items.js` para afinação posterior.

## Limites desta primeira fatia

Esta é uma demo local para validar a base 3D e os sistemas. O modo multiplayer online precisa de um servidor autoritativo e ainda não faz parte desta fatia. QTEs fiéis à M9 e Winchester, modelos/animações detalhados e receitas pendentes ficam por afinar com dados confirmados.
