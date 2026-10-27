(() => {
  'use strict';
  const WORDS = [
    {word:'TIGRE',category:'Animais',hint:'Um felino de listras marcantes.',valid:['TIGRE','GATOS','LEOES','URUBU','ZEBRA','PANDA','COBRA','RATOS','LOBOZ','CAVAL','PATOZ']},
    {word:'PIZZA',category:'Comida',hint:'Uma receita redonda que pode ter queijo.',valid:['PIZZA','MELAO','PERAS','ARROZ','SUSHI','BOLOS','PUDIM','TRIGO','MANGA','BROAS']},
    {word:'ATOMO',category:'Ciência',hint:'Uma unidade básica da matéria.',valid:['ATOMO','LASER','CELUL','GENES','CLIMA','FOTOS','RADIO','FISIO','DADOS','ORBIT']},
    {word:'RUGBY',category:'Esportes',hint:'Uma modalidade de luta japonesa.',valid:['JUDOS','GOLFE','RUGBY','BOXES','SURFE','TENIS','REMOS','SALTO','LUTAS','CORRE']},
    {word:'ZEBRA',category:'Animais',hint:'Animal africano com listras.',valid:['ZEBRA','TIGRE','PANDA','COBRA','LOBOZ','RATOS','GATOS','URUBU','PAVAO','PATOS']},
    {word:'MANGA',category:'Comida',hint:'Fruta tropical que também dá nome a uma parte da roupa.',valid:['MANGA','PERAS','MELAO','PIZZA','ARROZ','SUSHI','BOLOS','PUDIM','TRIGO','BROAS']},
    {word:'LASER',category:'Ciência',hint:'Feixe de luz concentrado.',valid:['LASER','ATOMO','GENES','CLIMA','FOTOS','RADIO','ORBIT','DADOS','NANOS','QUARK']},
    {word:'TENIS',category:'Esportes',hint:'Esporte de raquete e rede.',valid:['TENIS','GOLFE','RUGBY','SURFE','REMOS','SALTO','LUTAS','CORRE','JUDOS','BOXES']},
    {word:'PANDA',category:'Animais',hint:'Urso que adora bambu.',valid:['PANDA','TIGRE','ZEBRA','COBRA','RATOS','GATOS','URUBU','PAVAO','PATOS','LOBOZ']},
    {word:'ARROZ',category:'Comida',hint:'Grão muito comum no prato brasileiro.',valid:['ARROZ','MANGA','PERAS','MELAO','PIZZA','SUSHI','BOLOS','PUDIM','TRIGO','BROAS']},
    {word:'GENES',category:'Ciência',hint:'Unidades de informação hereditária.',valid:['GENES','LASER','ATOMO','CLIMA','FOTOS','RADIO','ORBIT','DADOS','NANOS','QUARK']},
    {word:'SURFE',category:'Esportes',hint:'Esporte praticado sobre as ondas.',valid:['SURFE','TENIS','GOLFE','RUGBY','REMOS','SALTO','LUTAS','CORRE','JUDOS','BOXES']}
  ];
  const COMMON = 'AMIGO AMORA AVIAO BANHO BARCO BICHO BRISA CABRA CAIXA CAMPO CANOA CARRO CEDRO CHUVA CINCO CLARO COBRA CORES CORPO COURO DENTE DOIDO DUNAS ERROS FALSO FASES FELIZ FERRO FOLHA FORTE FRUTA GATOS GENTE GRAMA GRUPO HOMEM HOTEL JOGOS LAGOA LARVA LEITE LIVRO LUZES MACIO MAGIA MALHA MANHA MARTE MENTE MESAS METRO MOEDA MORRO MUNDO NARIZ NAVIO NOITE NORTE NUVEM OLHOS ONDAS OSSOS PASTA PEDRA PEIXE PERTO PESCA PIANO PLANO POMBO PONTE PORTA PRATO PRETO QUASE QUEDA QUERO RAIVA RAPAZ RASTO REGRA REINO RETAS RISCO RITMO ROCHA ROSTO SABER SABOR SALTO SAUDE SELVA SENHA SINAL SONHO SUAVE SUCOS TERRA TINTA TOQUE TORRE TRATO TREVO TURMA VAGAS VALOR VAPOR VERDE VIDRO VIRUS VISTA VITAL VIVER VOZES ZEBRA'.split(' ');
  const $ = id => document.getElementById(id);
  const dateKey = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; };
  const dateLabel = () => new Intl.DateTimeFormat('pt-BR',{day:'2-digit',month:'short',year:'numeric'}).format(new Date());
  const normalize = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toUpperCase().replace(/[^A-Z]/g,'');
  const dayIndex = () => { const d=new Date(); return Math.floor(Date.UTC(d.getFullYear(),d.getMonth(),d.getDate())/86400000); };
  const todayEntry = () => WORDS[((dayIndex()%WORDS.length)+WORDS.length)%WORDS.length];
  const today = () => ({date:dateKey(),answer:normalize(todayEntry().word),category:todayEntry().category,hint:todayEntry().hint,guesses:[],feedback:[],status:'playing',completedAt:null});
  const read = (key,fallback) => { try { const raw=localStorage.getItem(key); return raw?JSON.parse(raw):fallback; } catch { return fallback; } };
  const save = () => { try { localStorage.setItem('wordday:v1',JSON.stringify(state)); localStorage.setItem('wordday:stats:v1',JSON.stringify(stats)); } catch {} };
  let state = read('wordday:v1',null); let stats = read('wordday:stats:v1',{currentStreak:0,bestStreak:0,wins:0,games:0,lastPlayedDate:null,lastSolvedWord:null,history:[]});
  if(!state || state.date!==dateKey()) state=today();
  const answerEntry = () => WORDS.find(w=>normalize(w.word)===state.answer) || todayEntry();
  let draft='';
  const home=$('homeScreen'), game=$('gameScreen'), result=$('resultScreen');
  const show = which => { home.hidden=which!=='home';game.hidden=which!=='game';result.hidden=which!=='result';window.scrollTo({top:0,behavior:'smooth'}); };
  const updateHome = () => { $('homeCategory').textContent=todayEntry().category; $('homeLetters').textContent=`${normalize(todayEntry().word).length} letras · 6 tentativas`; $('homeStreak').textContent=stats.currentStreak; $('homeWins').textContent=`${stats.games?Math.round(stats.wins/stats.games*100):0}%`; $('homeGames').textContent=stats.games; $('dateLabel').textContent=dateLabel(); };
  function getFeedback(guess,answer){
    const result=Array(guess.length).fill('absent'); const remaining={};
    for(let i=0;i<guess.length;i++){if(guess[i]===answer[i]) result[i]='correct'; else remaining[answer[i]]=(remaining[answer[i]]||0)+1;}
    for(let i=0;i<guess.length;i++){if(result[i]==='correct')continue; if(remaining[guess[i]]>0){result[i]='present';remaining[guess[i]]--;}}
    return result;
  }
  const allowed = () => new Set(COMMON.concat(WORDS.map(w=>w.word)).map(normalize));
  function renderBoard(){
    const board=$('board');board.innerHTML='';
    for(let r=0;r<6;r++){
      const row=document.createElement('div');row.className='board-row';row.setAttribute('aria-label',`Tentativa ${r+1}`);
      for(let c=0;c<5;c++){
        const tile=document.createElement('div');tile.className='tile';
        const guess=state.guesses[r]||''; const char=guess[c]||((r===state.guesses.length)?draft[c]||'':'');
        if(char){tile.textContent=char;tile.classList.add('filled');}
        if(state.feedback[r]){tile.classList.add(state.feedback[r][c]);tile.setAttribute('aria-label',`${char}: ${state.feedback[r][c]==='correct'?'posição correta':state.feedback[r][c]==='present'?'presente em outra posição':'ausente'}`);}
        row.appendChild(tile);
      }board.appendChild(row);
    }
    $('attemptsLeft').textContent=Math.max(0,6-state.guesses.length);
  }
  const keys=['QWERTYUIOP','ASDFGHJKL','ZXCVBNM'];
  function renderKeyboard(){
    const wrap=$('keyboard');wrap.innerHTML='';
    keys.forEach((line,index)=>{const row=document.createElement('div');row.className='key-row';if(index===2){const enter=makeKey('Enviar','wide',submitGuess);row.appendChild(enter);}
      [...line].forEach(letter=>{const key=makeKey(letter,'',()=>addLetter(letter));const rank={absent:1,present:2,correct:3};let best='';state.guesses.forEach((g,i)=>{[...g].forEach((ch,pos)=>{if(ch!==letter)return;const p=state.feedback[i]?.[pos];if(p&&rank[p]>rank[best])best=p;});});if(best)key.classList.add(best);row.appendChild(key);});
      if(index===2)row.appendChild(makeKey('⌫','wide',deleteLetter));wrap.appendChild(row);
    });
  }
  function makeKey(label,extra,action){const b=document.createElement('button');b.type='button';b.className=`key ${extra}`;b.textContent=label;b.setAttribute('aria-label',label==='⌫'?'Apagar letra':label);b.addEventListener('click',action);return b;}
  function setMessage(text,error=false){const el=$('statusMessage');el.textContent=text;el.classList.toggle('error',error);}
  function addLetter(letter){if(state.status!=='playing'||state.guesses.length>=6||draft.length>=5)return;draft+=letter;renderBoard();setMessage('Digite uma palavra de 5 letras.');}
  function deleteLetter(){if(state.status!=='playing')return;draft=draft.slice(0,-1);renderBoard();}
  function submitGuess(){
    if(state.status!=='playing')return;
    if(draft.length!==5){setMessage('Sua palavra precisa ter 5 letras.',true);return;}
    const guess=normalize(draft);if(!allowed().has(guess)){setMessage('Ainda não conheço essa palavra. Tente outra!',true);return;}
    if(state.guesses.includes(guess)){setMessage('Você já tentou essa palavra.',true);return;}
    state.guesses.push(guess);state.feedback.push(getFeedback(guess,state.answer));draft='';
    if(guess===state.answer){state.status='won';finishGame(true);}else if(state.guesses.length>=6){state.status='lost';finishGame(false);}else{setMessage('Boa! Use as pistas para a próxima tentativa.');save();renderBoard();renderKeyboard();}
  }
  function finishGame(won){
    state.completedAt=new Date().toISOString();
    if(state.date!==stats.lastPlayedDate){
      stats.games++;if(won)stats.wins++;
      if(stats.lastPlayedDate){const previous=new Date(`${stats.lastPlayedDate}T12:00:00`);const current=new Date(`${state.date}T12:00:00`);const diff=Math.round((current-previous)/86400000);stats.currentStreak=diff===1?stats.currentStreak+1:1;}else stats.currentStreak=1;
      stats.bestStreak=Math.max(stats.bestStreak,stats.currentStreak);stats.lastPlayedDate=state.date;stats.history.unshift({date:state.date,won,attempts:state.guesses.length});stats.history=stats.history.slice(0,60);if(won)stats.lastSolvedWord=state.answer;
    }
    save();renderResult(won);show('result');
  }
  function renderResult(won){$('resultTitle').textContent=won?'Você conseguiu!':'Quase lá!';$('resultCopy').textContent=won?`Você descobriu a palavra em ${state.guesses.length} ${state.guesses.length===1?'tentativa':'tentativas'}.`:'O desafio de hoje terminou. Amanhã tem outra palavra!';$('resultSymbol').textContent=won?'✦':'🌱';$('answerWord').textContent=state.answer;$('answerCategory').textContent=state.category;$('resultAttempts').textContent=`${state.guesses.length}/6`;$('resultStreak').textContent=`${stats.currentStreak} 🔥`;$('resultWinRate').textContent=`${stats.games?Math.round(stats.wins/stats.games*100):0}%`;$('shareStatus').textContent='';}
  function startGame(){if(state.status!=='playing'){renderResult(state.status==='won');show('result');return;}draft='';$('gameCategory').textContent=state.category;$('gameHint').textContent=`${state.hint} · ${state.answer.length} letras`;setMessage('Digite uma palavra de 5 letras.');renderBoard();renderKeyboard();show('game');}
  function openStats(){const rate=stats.games?Math.round(stats.wins/stats.games*100):0;$('statGames').textContent=stats.games;$('statWins').textContent=stats.wins;$('statStreak').textContent=stats.currentStreak;$('statBest').textContent=stats.bestStreak;$('statRate').textContent=`${rate}%`;$('statLast').textContent=stats.lastSolvedWord||'—';$('statsDialog').showModal();}
  async function share(){const squares=state.feedback.map(row=>row.map(x=>x==='correct'?'🟩':x==='present'?'🟨':'⬛').join('')).join('\n');const text=`Palavrinha ${state.date}\n${state.guesses.length}/6 tentativas\n\n${squares}\n\nJogue a palavra do dia!`;try{if(navigator.share){await navigator.share({title:'Palavrinha — Palavra do Dia',text});$('shareStatus').textContent='Resultado compartilhado!';}else if(navigator.clipboard&&navigator.clipboard.writeText){await navigator.clipboard.writeText(text);$('shareStatus').textContent='Resultado copiado! Pode compartilhar com seus amigos.';}else{const ta=document.createElement('textarea');ta.value=text;document.body.appendChild(ta);ta.select();document.execCommand('copy');ta.remove();$('shareStatus').textContent='Resultado copiado!';}}catch(e){if(e.name!=='AbortError')$('shareStatus').textContent='Não foi possível compartilhar neste navegador.';}}
  $('startBtn').addEventListener('click',startGame);$('backBtn').addEventListener('click',()=>{updateHome();show('home');});$('resultHomeBtn').addEventListener('click',()=>{updateHome();show('home');});$('statsBtn').addEventListener('click',openStats);$('rulesBtn').addEventListener('click',()=>$('rulesDialog').showModal());$('howBtn').addEventListener('click',()=>$('rulesDialog').showModal());$('shareBtn').addEventListener('click',share);$('giveUpBtn').addEventListener('click',()=>{if(state.status==='playing'){state.status='lost';finishGame(false);}});
  document.addEventListener('keydown',e=>{if(!$('gameScreen').hidden&&state.status==='playing'&&!e.ctrlKey&&!e.metaKey&&!e.altKey){if(e.key==='Enter'){e.preventDefault();submitGuess();}else if(e.key==='Backspace'){e.preventDefault();deleteLetter();}else if(/^[a-zA-Z]$/.test(e.key)){e.preventDefault();addLetter(e.key.toUpperCase());}}});
  if(typeof window!=='undefined'&&window.__PALAVRINHA_TEST__)window.__PALAVRINHA_TEST__.api={getFeedback,normalize,getState:()=>state,getDraft:()=>draft,startGame,addLetter,submitGuess};
  // A completed daily game remains completed after refresh. An unfinished game is restored from localStorage.
  updateHome();if(state.status==='won'||state.status==='lost')renderResult(state.status==='won');
})();
