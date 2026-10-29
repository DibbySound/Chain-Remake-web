const status=document.querySelector('#boot-status');
try{
  if(location.protocol==='file:')throw new Error('Abre o jogo através de um servidor HTTP local, não diretamente como ficheiro.');
  await import('./main.js');
  status?.remove();
}catch(error){
  if(status){status.classList.add('error');const detail=error.message||'Falha ao carregar Three.js.';const hint=location.protocol==='file:'?'Serve a pasta por HTTP. Executa <code>python3 -m http.server 8000</code> e abre <code>http://localhost:8000</code>.':'Este browser não conseguiu iniciar WebGL. Ativa a aceleração gráfica no browser ou tenta noutro browser com suporte a WebGL 2.';status.innerHTML=`<strong>Não foi possível iniciar o jogo 3D.</strong><span>${detail}</span><span>${hint}</span>`;}
  console.error(error);
}
