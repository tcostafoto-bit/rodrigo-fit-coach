/* ===================== PROGRAMA DO RODRIGO =====================
   Item: [nome, esquema, carga de referência, família (para trocar), substituto a partir da semana 4]
   Esquema: "3×8", "3×8/lado", "2×15s/lado", "1×2 min". Carga: "8 kg", "6 kg/mão" ou "".
   Bloco: {name, kind: warm|power|str|prev|stretch, ss: true (supersérie), rest:{mid, end}, items}
*/
var FAM = {
  jump_v:   {label:"Salto vertical",      list:[["Box Jump",""],["Saltos Pogo (Pogo Jumps)",""],["Afundo com Salto",""]]},
  jump_h:   {label:"Salto horizontal",    list:[["Salto em Comprimento",""],["Skaters",""]]},
  throw:    {label:"Lançamento",          list:[["Passe de Peito c/ Bola Medicinal (Parede)","3 kg"],["Slam c/ Bola Medicinal","4 kg"],["Lançamento Rotacional c/ Bola Medicinal (Parede)","3 kg"]]},
  squat:    {label:"Agachamento",         list:[["Goblet Squat (Halter)","8 kg"],["Leg Press (Máquina)","40 kg"],["Agachamento Tempo 3-1-1",""],["Agachamento Isométrico na Parede (Wall Sit)",""]]},
  push_h:   {label:"Empurrar",            list:[["Flexões (Padrão)",""],["Flexões em Incline",""],["Supino c/ Halteres","8 kg/mão"],["Supino Inclinado (Halteres)","7 kg/mão"]]},
  hinge:    {label:"Dobradiça da anca",   list:[["RDL (Halteres)","8 kg/mão"],["RDL (Barra)","20 kg"],["Leg Curl Deitada (Máquina)","15 kg"],["Leg Curl Sentada (Máquina)","15 kg"]]},
  row:      {label:"Remada",              list:[["Remada Baixa Sentada","20 kg"],["Remada c/ Apoio ao Peito (Máquina)","20 kg"],["Remada com Halteres (Unilateral)","10 kg"],["Remada Invertida (Mesa)",""]]},
  single:   {label:"Uma perna",           list:[["Stepup (Banco + Halteres)","6 kg/mão"],["Afundo Inverso (Halteres)","6 kg/mão"],["Afundo Búlgaro (Banco + Halter)","5 kg/mão"],["Afundo Caminhando (Halteres)","6 kg/mão"]]},
  pull_v:   {label:"Puxar vertical",      list:[["Puxada Alta (Barra Larga)","25 kg"],["Puxada Pega Fechada (Supinada)","25 kg"]]},
  glute:    {label:"Glúteo",              list:[["Hip Thrust (Barra)","20 kg"],["Ponte Glúteos Unilateral",""],["Ponte Glúteos (Peso Corporal)",""]]},
  push_v:   {label:"Empurrar para cima",  list:[["Press de Ombros (Halteres Sentado)","6 kg/mão"],["Shoulder Press (Máquina)","15 kg"]]},
  posture:  {label:"Postura",             list:[["Face Pull (Polia)","10 kg"],["Y-W-T (Deitado de Barriga para Baixo)",""],["Elevação Lateral (Halteres)","4 kg/mão"]]},
  adductor: {label:"Virilhas",            list:[["Prancha de Copenhaga (Joelho Apoiado)",""],["Adutora (Máquina)","20 kg"],["Afundo Lateral",""]]},
  hams:     {label:"Isquiotibiais",       list:[["Hamstring Walkout",""],["Nordic Assistido (Elástico)",""],["Leg Curl Deitada (Máquina)","15 kg"]]},
  core:     {label:"Core",                list:[["Dead Bug (Chão)",""],["Hollow Hold",""],["Prancha (Frontal)",""],["Prancha c/ Elevação de Perna",""],["Bird Dog (Chão)",""]]},
  core_rot: {label:"Core anti-rotação",   list:[["Pallof Press (Polia)","10 kg"],["Prancha Lateral (Cada lado)",""],["Woodchop (Polia)","10 kg"]]},
  calf:     {label:"Gémeos",              list:[["Elevação de Gémeos a Uma Perna (Degrau)",""],["Saltos Pogo (Pogo Jumps)",""]]},
  glute_med:{label:"Glúteo médio",        list:[["Clamshell c/ Mini Band",""],["Monster Walk (c/ Elástico nos joelhos)",""],["Abdução de Anca Deitada",""]]},
  cardio:   {label:"Aquecer",             list:[["Bicicleta Estática – Aquecimento",""],["Passadeira – Aquecimento",""],["Corda de Saltar",""]]}
};

/* ---------- blocos reutilizáveis ---------- */
function warmA(){ return {name:"Aquecimento", kind:"warm", items:[
  ["Bicicleta Estática – Aquecimento","1×2 min","","cardio"],
  ["Alongamento do Mundo (World's Greatest)","1×3/lado",""],
  ["Balanços de Perna (Leg Swings)","1×10/lado",""],
  ["Mobilidade de Tornozelo (Parede)","1×10/lado",""],
  ["Ponte Glúteos (Peso Corporal)","1×10",""]
]}; }
function warmB(){ return {name:"Aquecimento", kind:"warm", items:[
  ["Bicicleta Estática – Aquecimento","1×2 min","","cardio"],
  ["Alongamento do Mundo (World's Greatest)","1×3/lado",""],
  ["Balanços de Perna (Leg Swings)","1×10/lado",""],
  ["Afundo Lateral","1×6/lado",""],
  ["Marcha c/ Joelho Alto (Lenta)","1×8/lado",""]
]}; }
function stretchA(){ return {name:"Alongamentos", kind:"stretch", items:[
  ["Alongamento Flexores da Anca","1×30s/lado",""],
  ["Alongamento Posteriores (Hamstrings)","1×30s/lado",""],
  ["Alongamento Gémeos (Parede)","1×30s/lado",""]
]}; }
function stretchB(){ return {name:"Alongamentos", kind:"stretch", items:[
  ["Alongamento Adutores (Borboleta)","1×40s",""],
  ["Alongamento Glúteo (Figura 4)","1×30s/lado",""],
  ["Alongamento Quadricípite (De Pé)","1×30s/lado",""],
  ["Alongamento Peitoral (Porta)","1×30s",""]
]}; }
function power(items){ return {name:"Potência", kind:"power", rest:{mid:60, end:60}, items:items}; }
function ss(label, a, b, mid, end){ return {name:"Força · " + label, kind:"str", ss:true, rest:{mid:mid||30, end:end||60}, items:[a, b]}; }
function prev(items){ return {name:"Prevenção + core", kind:"prev", rest:{mid:30, end:30}, items:items}; }

/* ---------- sessões de força (A = pernas a 2 apoios + empurrar · B = uma perna + puxar) ---------- */
var SESSIONS = {
  A1: {fam:"A", title:"Pernas + Empurrar", sub:"Força A · versão 1", blocks:[
    warmA(),
    power([["Box Jump","3×4","","jump_v"],["Passe de Peito c/ Bola Medicinal (Parede)","3×6","3 kg","throw"]]),
    ss("1.ª parte", ["Goblet Squat (Halter)","3×8","8 kg","squat"], ["Flexões (Padrão)","3×8","","push_h"]),
    ss("2.ª parte", ["RDL (Halteres)","3×8","8 kg/mão","hinge"], ["Remada Baixa Sentada","3×10","20 kg","row"], 30, 45),
    prev([["Prancha de Copenhaga (Joelho Apoiado)","2×15s/lado","","adductor"],["Hamstring Walkout","2×6","","hams","Nordic Assistido (Elástico)|2×3"],["Dead Bug (Chão)","2×8/lado","","core"]]),
    stretchA()
  ]},
  B1: {fam:"B", title:"Uma Perna + Puxar", sub:"Força B · versão 1", blocks:[
    warmB(),
    power([["Salto em Comprimento","3×3","","jump_h"],["Skaters","3×3/lado","","jump_h"],["Lançamento Rotacional c/ Bola Medicinal (Parede)","2×4/lado","3 kg","throw"]]),
    ss("1.ª parte", ["Stepup (Banco + Halteres)","3×6/lado","6 kg/mão","single"], ["Puxada Alta (Barra Larga)","3×10","25 kg","pull_v"]),
    ss("2.ª parte", ["Hip Thrust (Barra)","3×10","20 kg","glute"], ["Press de Ombros (Halteres Sentado)","3×8","6 kg/mão","push_v"], 30, 45),
    prev([["Elevação de Gémeos a Uma Perna (Degrau)","2×12/lado","","calf"],["Pallof Press (Polia)","2×8/lado","10 kg","core_rot"],["Prancha Lateral (Cada lado)","2×20s/lado","","core_rot"]]),
    stretchB()
  ]},
  A2: {fam:"A", title:"Pernas + Empurrar", sub:"Força A · versão 2", blocks:[
    warmA(),
    power([["Saltos Pogo (Pogo Jumps)","3×8","","jump_v"],["Slam c/ Bola Medicinal","3×6","4 kg","throw"]]),
    ss("1.ª parte", ["Leg Press (Máquina)","3×10","40 kg","squat"], ["Supino c/ Halteres","3×8","8 kg/mão","push_h"]),
    ss("2.ª parte", ["Leg Curl Deitada (Máquina)","3×10","15 kg","hinge"], ["Remada c/ Apoio ao Peito (Máquina)","3×10","20 kg","row"], 30, 45),
    prev([["Prancha de Copenhaga (Joelho Apoiado)","2×15s/lado","","adductor"],["Hamstring Walkout","2×6","","hams","Nordic Assistido (Elástico)|2×3"],["Hollow Hold","2×20s","","core"]]),
    stretchA()
  ]},
  B2: {fam:"B", title:"Uma Perna + Puxar", sub:"Força B · versão 2", blocks:[
    warmB(),
    power([["Salto em Comprimento","3×3","","jump_h"],["Skaters","3×3/lado","","jump_h"],["Passe de Peito c/ Bola Medicinal (Parede)","2×6","3 kg","throw"]]),
    ss("1.ª parte", ["Afundo Inverso (Halteres)","3×8/lado","6 kg/mão","single"], ["Puxada Pega Fechada (Supinada)","3×10","25 kg","pull_v"]),
    ss("2.ª parte", ["Ponte Glúteos Unilateral","3×10/lado","","glute"], ["Shoulder Press (Máquina)","3×10","15 kg","push_v"], 30, 45),
    prev([["Elevação de Gémeos a Uma Perna (Degrau)","2×12/lado","","calf"],["Bird Dog (Chão)","2×8/lado","","core"],["Prancha Lateral (Cada lado)","2×20s/lado","","core_rot"]]),
    stretchB()
  ]},
  A3: {fam:"A", title:"Pernas + Empurrar", sub:"Força A · versão 3", blocks:[
    warmA(),
    power([["Box Jump","3×4","","jump_v"],["Lançamento Rotacional c/ Bola Medicinal (Parede)","2×4/lado","3 kg","throw"]]),
    ss("1.ª parte", ["Agachamento Tempo 3-1-1","3×6","","squat"], ["Flexões (Padrão)","3×8","","push_h"]),
    ss("2.ª parte", ["RDL (Halteres)","3×8","8 kg/mão","hinge"], ["Face Pull (Polia)","3×12","10 kg","posture"], 30, 45),
    prev([["Afundo Lateral","2×6/lado","","adductor"],["Hamstring Walkout","2×6","","hams","Nordic Assistido (Elástico)|2×3"],["Prancha c/ Elevação de Perna","2×6/lado","","core"]]),
    stretchA()
  ]},
  B3: {fam:"B", title:"Uma Perna + Puxar", sub:"Força B · versão 3", blocks:[
    warmB(),
    power([["Skaters","3×3/lado","","jump_h"],["Saltos Pogo (Pogo Jumps)","3×8","","jump_v"],["Slam c/ Bola Medicinal","2×6","4 kg","throw"]]),
    ss("1.ª parte", ["Afundo Búlgaro (Banco + Halter)","3×6/lado","5 kg/mão","single"], ["Remada com Halteres (Unilateral)","3×8/lado","10 kg","row"]),
    ss("2.ª parte", ["Hip Thrust (Barra)","3×10","20 kg","glute"], ["Y-W-T (Deitado de Barriga para Baixo)","3×5","","posture"], 30, 45),
    prev([["Elevação de Gémeos a Uma Perna (Degrau)","2×12/lado","","calf"],["Clamshell c/ Mini Band","2×12/lado","","glute_med"],["Pallof Press (Polia)","2×8/lado","10 kg","core_rot"]]),
    stretchB()
  ]}
};
var SEQ = ["A1","B1","A2","B2","A3","B3"];

/* ---------- sessões especiais ---------- */
var SPECIAL = {
  vespera: {title:"Véspera de jogo", sub:"12 min · só ativar, sem cansar", mins:12, blocks:[
    {name:"Mobilidade", kind:"warm", items:[
      ["Bicicleta Estática – Aquecimento","1×2 min",""],
      ["Alongamento do Mundo (World's Greatest)","1×4/lado",""],
      ["Balanços de Perna (Leg Swings)","1×10/lado",""],
      ["Mobilidade de Tornozelo (Parede)","1×10/lado",""],
      ["Rotação Torácica (Livro Aberto)","1×6/lado",""]
    ]},
    {name:"Ativação", kind:"prev", rest:{mid:20, end:20}, items:[
      ["Ponte Glúteos (Peso Corporal)","2×10",""],
      ["Clamshell c/ Mini Band","1×12/lado",""],
      ["Marcha c/ Joelho Alto (Lenta)","1×8/lado",""],
      ["Saltos Pogo (Pogo Jumps)","2×6",""]
    ]}
  ]},
  recup: {title:"Recuperação pós-jogo", sub:"15 min · soltar o corpo", mins:15, blocks:[
    {name:"Soltar", kind:"warm", items:[
      ["Bicicleta Estática – Aquecimento","1×4 min",""],
      ["Cat-Camel (Chão)","1×10",""],
      ["Rotação Torácica (Livro Aberto)","1×6/lado",""],
      ["Alongamento do Mundo (World's Greatest)","1×4/lado",""]
    ]},
    {name:"Alongar", kind:"stretch", items:[
      ["Alongamento Flexores da Anca","1×40s/lado",""],
      ["Alongamento Posteriores (Hamstrings)","1×40s/lado",""],
      ["Alongamento Quadricípite (De Pé)","1×30s/lado",""],
      ["Alongamento Adutores (Borboleta)","1×45s",""],
      ["Alongamento Glúteo (Figura 4)","1×30s/lado",""],
      ["Alongamento Gémeos (Parede)","1×30s/lado",""]
    ]}
  ]},
  pregame: {title:"Ativação antes do jogo", sub:"8 min · se o clube não aquecer", mins:8, blocks:[
    {name:"Ativação", kind:"warm", items:[
      ["Marcha no Lugar","1×1 min",""],
      ["Balanços de Perna (Leg Swings)","1×10/lado",""],
      ["Afundo Lateral","1×5/lado",""],
      ["Ponte Glúteos (Peso Corporal)","1×10",""],
      ["Saltos Pogo (Pogo Jumps)","1×10",""],
      ["Joelhos ao Peito","1×20s",""]
    ]}
  ]},
  rapido: {title:"Rápido 20′", sub:"sem equipamento · 3 voltas", mins:20, blocks:[
    {name:"Aquecimento", kind:"warm", items:[
      ["Marcha no Lugar","1×1 min",""],
      ["Alongamento do Mundo (World's Greatest)","1×3/lado",""],
      ["Balanços de Perna (Leg Swings)","1×8/lado",""]
    ]},
    {name:"Circuito · volta 1", kind:"prev", rest:{mid:20, end:60}, items:[
      ["Agachamento (Peso Corporal)","1×12","","squat"],["Flexões (Padrão)","1×8","","push_h"],["Ponte Glúteos Unilateral","1×8/lado","","glute"],["Afundo Inverso","1×8/lado","","single"],["Dead Bug (Chão)","1×8/lado","","core"],["Prancha Lateral (Cada lado)","1×20s/lado","","core_rot"]
    ]},
    {name:"Circuito · volta 2", kind:"prev", rest:{mid:20, end:60}, items:[
      ["Agachamento (Peso Corporal)","1×12","","squat"],["Flexões (Padrão)","1×8","","push_h"],["Ponte Glúteos Unilateral","1×8/lado","","glute"],["Afundo Inverso","1×8/lado","","single"],["Dead Bug (Chão)","1×8/lado","","core"],["Prancha Lateral (Cada lado)","1×20s/lado","","core_rot"]
    ]},
    {name:"Circuito · volta 3", kind:"prev", rest:{mid:20, end:30}, items:[
      ["Agachamento (Peso Corporal)","1×12","","squat"],["Flexões (Padrão)","1×8","","push_h"],["Ponte Glúteos Unilateral","1×8/lado","","glute"],["Afundo Inverso","1×8/lado","","single"],["Dead Bug (Chão)","1×8/lado","","core"],["Prancha Lateral (Cada lado)","1×20s/lado","","core_rot"]
    ]},
    {name:"Alongamentos", kind:"stretch", items:[
      ["Alongamento Flexores da Anca","1×30s/lado",""],["Alongamento Posteriores (Hamstrings)","1×30s/lado",""],["Alongamento Peitoral (Porta)","1×30s",""]
    ]}
  ]},
  mob_clube: {title:"Mobilidade antes do clube", sub:"10 min · ancas e tornozelos", mins:10, blocks:[
    {name:"Mobilidade", kind:"warm", items:[
      ["Balanços de Perna (Leg Swings)","1×10/lado",""],
      ["Mobilidade de Tornozelo (Parede)","1×10/lado",""],
      ["Alongamento do Mundo (World's Greatest)","1×4/lado",""],
      ["Afundo Lateral","1×6/lado",""],
      ["Alongamento 90/90 (Ancas)","1×30s/lado",""],
      ["Ponte Glúteos (Peso Corporal)","1×12",""],
      ["Marcha c/ Joelho Alto (Lenta)","1×8/lado",""]
    ]}
  ]},
  mob_postura: {title:"Postura e costas", sub:"10 min · para dias de muito sofá e telemóvel", mins:10, blocks:[
    {name:"Mobilidade", kind:"warm", items:[
      ["Cat-Camel (Chão)","1×10",""],
      ["Rotação Torácica (Livro Aberto)","1×8/lado",""],
      ["Y-W-T (Deitado de Barriga para Baixo)","2×5",""],
      ["Bird Dog (Chão)","1×8/lado",""],
      ["Alongamento Peitoral (Porta)","1×40s",""],
      ["Alongamento Flexores da Anca","1×40s/lado",""],
      ["Alongamento Tríceps e Ombro","1×30s/lado",""]
    ]}
  ]},
  mob_pernas: {title:"Pernas soltas", sub:"10 min · alongar depois de um dia pesado", mins:10, blocks:[
    {name:"Alongar", kind:"stretch", items:[
      ["Alongamento Flexores da Anca","1×40s/lado",""],
      ["Alongamento Posteriores (Hamstrings)","1×40s/lado",""],
      ["Alongamento Quadricípite (De Pé)","1×30s/lado",""],
      ["Alongamento Adutores (Borboleta)","1×45s",""],
      ["Alongamento Glúteo (Figura 4)","1×30s/lado",""],
      ["Alongamento Gémeos (Parede)","1×30s/lado",""],
      ["Alongamento 90/90 (Ancas)","1×30s/lado",""]
    ]}
  ]}
};
var MOB_LIST = ["mob_clube","mob_postura","mob_pernas","vespera","recup","pregame"];

/* ---------- semana ---------- */
var DOW = ["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"];
var DOW_LONG = ["Domingo","Segunda","Terça","Quarta","Quinta","Sexta","Sábado"];
var CFG_DEFAULT = {gymDays:[2,4], gymDaysNoGame:[2,6], restDay:3, gameDow:0};

/* ---------- nutrição (adaptada à idade: comer bem, sem contar nada) ---------- */
var NUTRI = {
  regras: [
    ["Comer a todas as refeições", "Pequeno-almoço, almoço, lanche, jantar e um lanche depois do treino. Saltar refeições tira energia ao jogo e ao crescimento."],
    ["Proteína em cada refeição", "Ovos, leite, iogurte, queijo, frango, peru, carne, peixe, atum, feijão ou grão. É o que repara o músculo depois de treinar."],
    ["Hidratos antes de treinar e jogar", "Pão, massa, arroz, batata, aveia, fruta. São o combustível. Sem eles não há explosão nem fôlego."],
    ["Fruta e legumes todos os dias", "Pelo menos 2 peças de fruta e legumes ao almoço e ao jantar."],
    ["Água o dia todo", "Garrafa sempre contigo. Nos treinos e jogos bebe antes, durante e depois. Urina escura = falta água."],
    ["Lanche de recuperação até 1 h depois", "Leite com chocolate, iogurte com fruta, sandes de queijo ou fiambre, batido de leite com banana."],
    ["Não precisas de suplementos", "Com 14 anos a comida chega. Nada de proteína em pó, creatina, pré-treino ou bebidas energéticas."],
    ["Doces e fast food: às vezes", "Não há proibidos, mas não é todos os dias. Refrigerantes só de vez em quando."]
  ],
  dia: [
    ["Pequeno-almoço", "Leite ou iogurte + pão com queijo ou ovos + 1 fruta. Ou aveia com leite e banana."],
    ["Lanche da manhã", "Fruta + bolachas de água e sal, ou sandes pequena."],
    ["Almoço", "Prato com proteína (carne, peixe, ovos), arroz/massa/batata e legumes. Sopa se houver."],
    ["Lanche da tarde (antes do treino)", "Pão com fiambre ou manteiga de amendoim, banana, iogurte. 1–2 h antes do treino."],
    ["Depois do treino ou jogo", "Leite com chocolate ou iogurte com fruta. Até 1 h depois."],
    ["Jantar", "Igual ao almoço: proteína, hidratos e legumes. Mais quantidade nos dias de treino duplo."],
    ["Ceia (se tiveres fome)", "Iogurte, leite ou uma torrada. Dormir com fome é mau para recuperar."]
  ],
  jogo: [
    ["Dia antes do jogo", "Mais massa, arroz ou batata ao almoço e ao jantar. Bebe bastante água."],
    ["Manhã do jogo (3 h antes)", "Pequeno-almoço normal e leve: pão, aveia, fruta, leite. Nada frito nem pesado."],
    ["1 h antes", "Só banana, pão com mel ou barrita de cereais + água."],
    ["Ao intervalo", "Água e, se houver, um gole de bebida isotónica ou uma banana."],
    ["Depois do jogo", "Lanche de recuperação nos primeiros 60 min e refeição completa a seguir."]
  ],
  sono: [
    ["8 a 10 horas", "Com 14 anos e a treinar todos os dias, dormir é o melhor suplemento que existe. É a dormir que o músculo cresce."],
    ["Telemóvel fora do quarto", "Ou pelo menos 30 min antes de dormir sem ecrã."]
  ]
};

/* ---------- sinais de alarme ---------- */
var ALERT = {
  short: "Dor abaixo do joelho ou no calcanhar? Tira os saltos e fala com o médico.",
  long: "Nesta idade, com muitos dias de futebol, é comum aparecer dor na parte de cima da canela (logo abaixo da rótula) ou no calcanhar. Não é para aguentar: tira os saltos deste plano, avisa o treinador e fala com o médico. Também pára se tiveres tonturas, dor no peito ou uma dor aguda a meio de um exercício."
};

/* ---------- checklist para quem acompanha ---------- */
var COACH_CHECK = [
  ["Antes de começar", [
    "Ele comeu qualquer coisa há 1–2 h e tem água.",
    "Confirmar que não tem dores (joelho, calcanhar, virilhas). Se tiver, saltos fora.",
    "Nas semanas 1 a 3 o peso é leve de propósito. Não deixar subir mesmo que diga que é fácil."
  ]],
  ["Agachamento (Goblet / Leg Press)", [
    "Joelhos apontam na direção dos pés, nunca para dentro.",
    "Calcanhares sempre no chão.",
    "Costas direitas, peito alto — o halter fica junto ao peito.",
    "Desce até as coxas ficarem paralelas ao chão, sem arredondar as costas em baixo."
  ]],
  ["RDL (dobrar a anca com halteres)", [
    "A anca vai para trás, como se fechasse uma gaveta com o rabo.",
    "Joelhos só um pouco dobrados e fixos.",
    "Costas direitas do início ao fim. Se arredondar, parar e baixar o peso.",
    "Os halteres descem encostados às pernas, não à frente."
  ]],
  ["Saltos (Box Jump, Salto em Comprimento, Skaters)", [
    "Aterrar suave e em silêncio, com os joelhos dobrados e por cima dos pés.",
    "Descer da caixa sempre a pé, nunca a saltar.",
    "Se as aterragens ficarem pesadas ou os joelhos irem para dentro, parar a série — é cansaço.",
    "Descansar o tempo todo entre séries. Aqui a qualidade é tudo."
  ]],
  ["Nordic (a partir da semana 4)", [
    "Descida lenta de 3 a 4 segundos, a travar com a parte de trás das coxas.",
    "Amortecer com as mãos no chão. Só 3 repetições.",
    "Se no dia seguinte estiver muito dorido, fazer só 2 na próxima vez."
  ]],
  ["No fim", [
    "Ele marca na app como correu cada exercício. Não sobe o peso sozinho antes da semana 4.",
    "Alongamentos sempre, mesmo com pressa.",
    "Lanche de recuperação na primeira hora."
  ]]
];

/* ---------- frases para abrir a app (rodam) ---------- */
var QUOTES = [
"O treino de hoje é o jogo de domingo a ser ganho.",
"Ninguém vê o ginásio. Toda a gente vê o sprint aos 85 minutos.",
"Não é para ser o mais forte do ginásio. É para ser o mais forte no relvado.",
"Técnica perfeita hoje, peso a sério amanhã.",
"Os melhores não treinam quando lhes apetece. Treinam quando está marcado.",
"Cada série feita bem é uma lesão que não vais ter.",
"Rápido no campo nasce forte nas pernas.",
"Pára quando ainda conseguias fazer 3. A paciência também é força.",
"A diferença está nos dias em que ninguém está a ver.",
"Joga com a cabeça, treina com o corpo, descansa com os dois.",
"Dormir bem é o treino que fazes de olhos fechados.",
"Hoje um bocadinho melhor que ontem. Só isso.",
"A bola é redonda, mas o trabalho é em linha reta.",
"Um corpo preparado aguenta 90 minutos. E os 5 de compensação.",
"Não compares o teu capítulo 1 com o capítulo 20 de outro.",
"O talento marca golos. O trabalho marca presença todos os jogos.",
"A explosão no primeiro passo começa num agachamento bem feito.",
"Treinar com calma é a forma mais rápida de ficar forte.",
"Come como um atleta, dorme como um bebé, treina como um profissional.",
"O jogo começa muito antes do apito.",
"As pernas levam-te até à bola. Trata delas.",
"Consistência bate intensidade. Sempre.",
"O ginásio não dá golos. Dá as pernas para os marcar.",
"Faz o simples muito bem e o difícil fica mais perto.",
"Disciplina é fazer o que está marcado mesmo no dia em que não apetece.",
"A tua única competição a sério é o Rodrigo de há um mês.",
"Força sem técnica é um acidente à espera. Técnica sem força é uma oportunidade perdida.",
"Confia no plano. Ele foi feito para ti.",
"Não é o salto mais alto. É a aterragem mais suave.",
"A recuperação não é descanso do treino. É parte do treino.",
"O respeito ganha-se no treino, confirma-se no jogo.",
"Hoje tens 40 minutos para seres melhor do que eras.",
"Grandes jogadores têm grandes hábitos. Começa pelos pequenos.",
"Uma série de cada vez. Um jogo de cada vez.",
"A energia vem do prato. O músculo vem do sono. O jogo vem dos dois.",
"Se dói abaixo do joelho, pára. Ser inteligente também é ser duro.",
"Quem treina com calma aos 14 joga com força aos 20.",
"O suor de hoje é o fôlego de domingo.",
"Treina os isquiotibiais que ninguém vê e corre como todos querem.",
"Não há atalhos. Há repetições.",
"A motivação traz-te aqui. O hábito traz-te de volta.",
"Mais vale 8 bem feitas do que 12 a trapalhar.",
"O corpo faz o que a cabeça repete.",
"Hoje é um treino. Amanhã é um dia melhor em campo.",
"Ganhar é bom. Melhorar é garantido.",
"O vento está sempre contra quem está a subir.",
"Postura alta, peito aberto. É assim que se entra em campo.",
"Os teus 40 minutos valem mais do que as 2 horas de quem só faz de conta.",
"Treina para o jogador que queres ser, não para o que já és.",
"Respira. Aperta o core. Vamos."
];

/* ---------- intro antes de cada treino (o quê e para quê) ---------- */
var INTRO = {
  A: {what:"Pernas a dois apoios e empurrar: agachamento, flexões ou supino, dobradiça da anca e remada. Antes disso, dois exercícios de potência.", gains:["Primeiro passo mais explosivo e remate mais forte","Pernas que aguentam os 90 minutos sem perder velocidade","Isquiotibiais e virilhas protegidas, as lesões mais comuns no futebol","Tronco forte para ganhar os duelos de ombro"]},
  B: {what:"Uma perna de cada vez e puxar: step-up ou afundos, puxada, glúteo e ombros. Antes disso, saltos em comprimento e laterais.", gains:["Equilíbrio e força numa perna só, como nas mudanças de direção","Glúteo forte para acelerar e saltar mais alto","Costas e ombros direitos: postura de jogador","Tornozelos e gémeos preparados para travar e arrancar"]},
  vespera: {what:"12 minutos a soltar as ancas, os tornozelos e as costas, e a acordar o glúteo. Sem cansar nada.", gains:["Chegar ao jogo solto e com o corpo a responder","Menos risco de lesão nos primeiros minutos"]},
  recup: {what:"15 minutos de bicicleta leve e alongamentos longos.", gains:["Tirar o peso das pernas do jogo","Recuperar mais depressa para o treino de terça"]},
  pregame: {what:"8 minutos para acordar o corpo antes do jogo.", gains:["Entrar em campo já quente","Primeiro sprint sem surpresas"]},
  rapido: {what:"3 voltas de um circuito sem material: agachamento, flexões, ponte, afundos e core.", gains:["Não perder o ritmo num dia sem ginásio","Força geral e core em 20 minutos"]},
  mob_clube: {what:"10 minutos de mobilidade de ancas e tornozelos.", gains:["Chegar ao treino do clube com o corpo pronto","Amplitude para o remate e para os passes longos"]},
  mob_postura: {what:"10 minutos para as costas e os ombros.", gains:["Desfazer as horas de sofá e telemóvel","Postura alta e peito aberto"]},
  mob_pernas: {what:"10 minutos de alongamentos longos para as pernas.", gains:["Pernas mais soltas no dia seguinte","Menos tensão nos isquiotibiais e nos adutores"]}
};
