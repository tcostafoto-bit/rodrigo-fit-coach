/* ===================== MOTOR =====================
   Rodrigo FC — app de treino para o Rodrigo. Lógica: a app decide o treino do dia
   a partir da semana (ginásio, clube, folga, jogo) e segue a sequência A1→B1→A2→B2→A3→B3.
*/
var EX = {};
LIB.forEach(function(it){ if (!EX[it[0]]) EX[it[0]] = {muscle:it[1], howto:it[2]||"", setup:it[3]||""}; });
function base(n){ return String(n).split("(")[0].trim().toLowerCase(); }
function look(map, n){ if (map[n] != null) return map[n]; var b = base(n); for (var k in map){ if (base(k) === b) return map[k]; } return null; }
function esc(s){ return String(s == null ? "" : s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"); }
function enName(n){ return EX_EN[n] || look(EX_EN, n) || n.split(" (")[0]; }
function ptName(n){ var p = n.split(" (")[0].split(" – ")[0]; return p === enName(n) ? "" : p; }
function feelOf(n){ return FEEL[n] || look(FEEL, n) || null; }
function videoUrl(name){ return "https://www.youtube.com/results?search_query=" + encodeURIComponent(enName(name) + " exercise form") + "&sp=EgIYAQ%253D%253D"; }
function videoBtn(name){ return '<a class="vid" href="' + videoUrl(name) + '" target="_blank" rel="noopener">' + PLAY + ' Ver em vídeo</a>'; }
var PLAY = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><rect x="1.5" y="3" width="13" height="10" rx="2.5" stroke="currentColor" stroke-width="1.6"/><path d="M6.5 6v4l3.5-2z" fill="currentColor"/></svg>';
function fig(name, cls){
  var spec = look(FIG, name); if (!spec) return "";
  var out = '<svg class="fig ' + (cls||"") + '" viewBox="0 0 160 120" aria-hidden="true"><polyline class="P" points="8,112 152,112"/>';
  spec.split("|").forEach(function(part){
    part = part.trim(); if (!part) return;
    var c = part.charAt(0), t = part.charAt(2), r = part.slice(4), a;
    if (t === "c"){ a = r.split(","); out += '<circle class="' + c + '" cx="' + a[0] + '" cy="' + a[1] + '" r="' + a[2] + '"/>'; }
    else if (t === "f"){ a = r.split(","); out += '<circle class="' + c + 'f" cx="' + a[0] + '" cy="' + a[1] + '" r="' + a[2] + '"/>'; }
    else if (t === "l"){ out += '<polyline class="' + c + '" points="' + r + '"/>'; }
    else if (t === "r"){ a = r.split(","); out += '<rect class="' + c + '" x="' + a[0] + '" y="' + a[1] + '" width="' + a[2] + '" height="' + a[3] + '" rx="2"/>'; }
    else if (t === "d"){ out += '<path class="' + c + '" d="' + r + '"/>'; }
  });
  return out + "</svg>";
}

/* ---------- estado ---------- */
var KEY = "rfc1";
var st = {v:1, opens:0, cfg:null, seq:0, firstDate:null, weights:{}, last:{}, effort:{}, swaps:{}, week:{}, log:[], sess:null, sound:false, keepAwake:true};
var ui = {tab:"home", rest:null, viewDone:null, fin:null};
try { var raw = localStorage.getItem(KEY); if (raw){ var o = JSON.parse(raw); for (var k in o) st[k] = o[k]; } } catch(e){}
st.cfg = Object.assign({}, CFG_DEFAULT, st.cfg || {});
st.opens = (st.opens || 0) + 1;
function quoteOfDay(){ return QUOTES[(st.opens * 7 + Math.floor(Date.now() / 86400000)) % QUOTES.length]; }
function save(){ try { localStorage.setItem(KEY, JSON.stringify(st)); } catch(e){} }
function exportData(){
  var blob = new Blob([JSON.stringify(st, null, 1)], {type:"application/json"});
  var a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "rodrigo-fc-" + today() + ".json"; document.body.appendChild(a); a.click(); a.remove();
}
function importData(file){
  var r = new FileReader();
  r.onload = function(){ try { var o = JSON.parse(r.result); if (!o || !o.weights) throw 1; for (var k in o) st[k] = o[k]; st.cfg = Object.assign({}, CFG_DEFAULT, st.cfg || {}); save(); toast("Dados importados"); render(); } catch(e){ toast("Ficheiro inválido"); } };
  r.readAsText(file);
}
var toastTimer = null;
function toast(msg){ var el = document.getElementById("toast"); if (!el){ el = document.createElement("div"); el.id = "toast"; el.className = "toast"; document.body.appendChild(el); } el.textContent = msg; el.style.display = "block"; clearTimeout(toastTimer); toastTimer = setTimeout(function(){ el.style.display = "none"; }, 1800); }

/* ---------- datas ---------- */
function pad(n){ return (n < 10 ? "0" : "") + n; }
function iso(d){ return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); }
function today(){ return iso(new Date()); }
function fromIso(s){ return new Date(s + "T12:00:00"); }
function addDays(d, n){ var x = new Date(d.getTime()); x.setDate(x.getDate() + n); return x; }
function monday(d){ var x = new Date(d.getTime()); x.setHours(12,0,0,0); var w = (x.getDay() + 6) % 7; x.setDate(x.getDate() - w); return x; }
function weekKey(d){ return iso(monday(d)); }
function weekNum(){ if (!st.firstDate) return 1; var a = monday(fromIso(st.firstDate)), b = monday(new Date()); return Math.max(1, Math.round((b - a) / 604800000) + 1); }
function phase(){ return weekNum() >= 4 ? 2 : 1; }
function fmtDate(s){ var p = s.split("-"); return p[2] + "/" + p[1]; }
function mmss(sec){ sec = Math.max(0, Math.floor(sec)); return pad(Math.floor(sec / 60)) + ":" + pad(sec % 60); }

/* ---------- esquemas ---------- */
function parseScheme(s){
  var m = /^(\d+)\s*[×x]\s*(.+)$/.exec(s || ""); if (!m) return {sets:1, reps:null, secs:null, side:false, label:s||""};
  var rest = m[2], side = /\/lado/.test(rest); rest = rest.replace("/lado", "").trim();
  var secs = null, reps = null, t;
  if ((t = /^(\d+)\s*min$/.exec(rest))) secs = parseInt(t[1], 10) * 60;
  else if ((t = /^(\d+)\s*s$/.exec(rest))) secs = parseInt(t[1], 10);
  else reps = parseInt(rest, 10) || null;
  return {sets:parseInt(m[1], 10), reps:reps, secs:secs, side:side, label:rest + (side ? "/lado" : "")};
}
function refKg(ref){ var m = /([\d.,]+)\s*kg/.exec(ref || ""); return m ? parseFloat(m[1].replace(",", ".")) : null; }
function perHand(ref){ return /\/mão/.test(ref || ""); }
function hasLoad(it){ return refKg(it[2]) != null; }
function curKg(it){ var k = it[0]; if (st.weights[k] != null && st.weights[k] !== "") return parseFloat(st.weights[k]); return refKg(it[2]); }
function fmtKg(n){ return (Math.round(n * 10) / 10).toString().replace(".", ","); }
function unitOf(it){ return perHand(it[2]) ? "kg/mão" : "kg"; }
function incOf(it){ return (perHand(it[2]) || /Halter|Goblet|Bola/.test(it[0])) ? 1 : 2.5; }

/* ---------- sessão resolvida (trocas, fase, modo leve) ---------- */
function sessionDef(key){ return SESSIONS[key] || SPECIAL[key] || null; }
function isStrength(key){ return !!SESSIONS[key]; }
function resolveSession(key, light){
  var def = sessionDef(key); if (!def) return null;
  var sw = st.swaps[key] || {};
  var blocks = [];
  def.blocks.forEach(function(b, bi){
    if (light && b.kind === "power") return;
    var nb = {name:b.name, kind:b.kind, ss:!!b.ss, rest:b.rest || null, items:[]};
    b.items.forEach(function(it, ii){
      var x = it.slice();
      if (phase() === 2 && x[4]){ var p = x[4].split("|"); x = [p[0], p[1] || x[1], x[2], x[3]]; }
      var s = sw[bi + "." + ii]; if (s){ x = [s[0], x[1], s[1], x[3]]; }
      if (light && b.kind === "str"){ var ps = parseScheme(x[1]); if (ps.sets > 2) x[1] = x[1].replace(/^\d+/, String(ps.sets - 1)); }
      nb.items.push(x);
    });
    blocks.push(nb);
  });
  var mins = def.mins || (light ? 30 : 40);
  return {key:key, title:def.title, sub:(light ? "Versão leve · sem saltos, menos 1 série" : def.sub), fam:def.fam || null, mins:mins, blocks:blocks, light:!!light};
}
function nextKey(){ return SEQ[st.seq % SEQ.length]; }
function countSets(day){ var n = 0; day.blocks.forEach(function(b){ b.items.forEach(function(it){ n += parseScheme(it[1]).sets; }); }); return n; }

/* ---------- semana ---------- */
function weekState(d){ var k = weekKey(d); return st.week[k] || {game:null, big:false}; }
function setWeek(d, patch){ var k = weekKey(d); st.week[k] = Object.assign({game:null, big:false}, st.week[k] || {}, patch); save(); render(); }
function gameDow(w){ if (w.game === false) return null; if (typeof w.game === "number") return w.game; return st.cfg.gameDow; }
function doneOn(dateIso){ return (st.log || []).filter(function(x){ return x.date === dateIso; }); }
function planFor(d){
  var w = weekState(d), g = gameDow(w), dow = d.getDay(), cfg = st.cfg;
  if (g != null){
    if (dow === g) return {kind:"game", title:"Dia de jogo", sub:"Boa sorte. A app só entra se o clube não aquecer.", run:"pregame", lab:"Jogo"};
    var until = (g - dow + 7) % 7, after = (dow - g + 7) % 7;
    if (until === 1) return {kind:"vespera", title:"Véspera de jogo", sub:"O plano diz 12 min a soltar e ativar.", run:"vespera", lab:"Véspera"};
    if (after === 1) return {kind:"recup", title:"Recuperação", sub:"15 min a soltar as pernas do jogo.", run:"recup", lab:"Recup."};
  }
  if (dow === cfg.restDay) return {kind:"rest", title:"Folga total", sub:"Hoje o corpo cresce. O plano é não fazer nada.", lab:"Folga"};
  var gym = (g == null ? cfg.gymDaysNoGame : cfg.gymDays);
  if (gym.indexOf(dow) >= 0){
    if (w.big && gym.indexOf(dow) > 0) return {kind:"club", title:"Treino do clube", sub:"Semana de jogo importante: só 1 ginásio esta semana.", lab:"Clube"};
    return {kind:"str", title:"Ginásio", sub:"", light:!!w.big, lab:"Ginásio"};
  }
  return {kind:"club", title:"Treino do clube", sub:"Se quiseres, 10 min de mobilidade antes.", lab:"Clube"};
}

/* ---------- navegação / render ---------- */
var TAB_ICON = {
  home:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="4" width="18" height="16" rx="3"/><path d="M3 10h18M8 2v4M16 2v4"/></svg>',
  treinos:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 9v6M20 9v6M7 7v10M17 7v10M7 12h10"/></svg>',
  nutri:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 3v7a3 3 0 006 0V3M9 3v18M17 3c-2 2-3 5-3 8h3v10"/></svg>',
  perfil:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/></svg>'
};
var TABS = [["home","Hoje"],["treinos","Treinos"],["nutri","Comer"],["perfil","Eu"]];
function renderTabs(){
  document.getElementById("tabs").innerHTML = TABS.map(function(t){ return '<button class="tab ' + (ui.tab === t[0] ? "on" : "") + '" data-tab="' + t[0] + '">' + TAB_ICON[t[0]] + '<span>' + t[1] + '</span></button>'; }).join("");
}
function render(){
  renderTabs();
  var app = document.getElementById("app");
  if (ui.tab === "home") app.innerHTML = renderHome();
  else if (ui.tab === "treinos") app.innerHTML = renderTreinos();
  else if (ui.tab === "nutri") app.innerHTML = renderNutri();
  else app.innerHTML = renderPerfil();
  window.scrollTo(0, 0);
}
var BALL = '<svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden="true"><circle cx="17" cy="17" r="14" stroke="#F2D04B" stroke-width="2"/><path d="M17 9l6 4.5-2.3 7h-7.4L11 13.5z" stroke="#F2D04B" stroke-width="1.8" stroke-linejoin="round"/><path d="M17 9V4M23 13.5l5-2M20.7 20.5l3 4.5M13.3 20.5l-3 4.5M11 13.5l-5-2" stroke="#F2D04B" stroke-width="1.6"/></svg>';
var HERO_BG = '<svg class="bg" viewBox="0 0 220 220" fill="none" aria-hidden="true"><circle cx="150" cy="110" r="90" stroke="#fff" stroke-opacity=".12" stroke-width="2"/><circle cx="150" cy="110" r="6" fill="#fff" fill-opacity=".2"/><path d="M60 20v180" stroke="#fff" stroke-opacity=".12" stroke-width="2"/></svg>';
function topBar(){
  var wn = weekNum();
  return '<div class="top"><div class="brand">' + BALL + '<div><span class="disp">Rodrigo FC</span><small>Treino de ginásio</small></div></div><span class="pill">Semana <b>' + wn + '</b> · ' + (phase() === 1 ? "técnica" : "progressão") + '</span></div>';
}
function previewRows(day, limit){
  var rows = [];
  day.blocks.forEach(function(b){ if (b.kind === "warm" || b.kind === "stretch") return; b.items.forEach(function(it){ rows.push(it); }); });
  if (limit) rows = rows.slice(0, limit);
  return rows;
}
function exRow(it, extra, dark){
  var kg = hasLoad(it) ? ' · ' + fmtKg(curKg(it)) + ' ' + unitOf(it) : '';
  return '<div class="exrow ' + (dark ? "dark " : "") + (extra || "") + '"><div class="thumb">' + fig(it[0], dark ? "dark" : "") + '</div><div class="grow"><div class="n">' + esc(enName(it[0])) + '</div><div class="pt">' + esc(ptName(it[0])) + '</div></div><div class="sch">' + esc(it[1]) + kg + '</div></div>';
}
function renderHome(){
  var d = new Date(), w = weekState(d), plan = planFor(d), done = doneOn(today());
  var h = topBar();
  h += '<div class="quote">“' + esc(quoteOfDay()) + '”</div>';
  if (w.game == null){
    h += '<div class="card gold"><div class="kicker" style="color:#6B5A0A">Esta semana</div><div class="disp" style="font-size:26px">Tens jogo no domingo?</div><div class="q"><button class="btn dark" data-game="yes">Sim</button><button class="btn dark" data-game="no">Não</button><button class="btn dark" data-game="other">Outro dia</button></div></div>';
  }
  var dayCards = done.map(function(x){ return '<div class="card" style="border-color:rgba(95,211,141,.5)"><div class="row between"><div><div class="kicker" style="color:var(--green)">Feito hoje</div><div class="disp" style="font-size:22px">' + esc(x.title) + '</div><div class="tiny">' + x.sets + ' · ' + x.mins + ' min</div></div><span class="mono" style="color:var(--green);font-size:22px">✓</span></div></div>'; }).join("");
  var strDone = done.some(function(x){ return isStrength(x.key); });
  var hero;
  if (plan.kind === "str" && !strDone){
    var key = nextKey(), day = resolveSession(key, plan.light);
    hero = '<div class="card hero">' + HERO_BG + '<div class="kicker">Hoje · ' + DOW_LONG[d.getDay()] + '</div><h1 class="disp">' + esc(day.title) + '</h1><div class="sub">' + esc(day.sub) + ' · ~' + day.mins + ' min · ' + countSets(day) + ' séries</div>' +
      '<div class="exlist" style="margin-bottom:14px">' + previewRows(day, 4).map(function(it){ return exRow(it, "", true); }).join("") + '<div class="tiny" style="text-align:center">+ aquecimento, prevenção e alongamentos</div></div>' +
      '<button class="btn primary" data-start="' + key + '" data-light="' + (plan.light ? 1 : 0) + '">' + (st.sess && st.sess.key === key ? "Continuar o treino" : "Começar o treino") + '</button>' +
      (phase() === 1 ? '<div class="hint" style="margin-top:10px">Semanas 1 a 3: técnica primeiro. Peso leve de propósito, pára sempre quando ainda conseguias fazer 3.</div>' : '') + '</div>';
  } else if (plan.run && !done.some(function(x){ return x.key === plan.run; })){
    var sp = resolveSession(plan.run);
    hero = '<div class="card hero">' + HERO_BG + '<div class="kicker">Hoje · ' + DOW_LONG[d.getDay()] + '</div><h1 class="disp">' + esc(plan.title) + '</h1><div class="sub">' + esc(plan.sub) + '</div>' +
      (plan.kind === "game" ? '<button class="btn ghost" data-start="pregame">Ativação antes do jogo · 8 min</button>' : '<button class="btn primary" data-start="' + plan.run + '">Começar · ' + sp.mins + ' min</button>') + '</div>';
  } else {
    hero = '<div class="card hero">' + HERO_BG + '<div class="kicker">Hoje · ' + DOW_LONG[d.getDay()] + '</div><h1 class="disp">' + esc(strDone && plan.kind === "str" ? "Ginásio feito" : plan.title) + '</h1><div class="sub">' + esc(strDone && plan.kind === "str" ? "Agora é comer bem e descansar." : plan.sub) + '</div>' +
      (plan.kind === "club" ? '<button class="btn ghost" data-start="mob_clube">Mobilidade antes do clube · 10 min</button>' : '') + '</div>';
  }
  h += dayCards + hero;
  /* quer treinar na mesma? a app sugere, nunca impede */
  if (plan.kind !== "str" && !strDone){
    var nk = nextKey(), nd = resolveSession(nk, false), warn = "";
    if (plan.kind === "vespera" || plan.kind === "game") warn = "Amanhã há jogo. Se fores, faz a versão leve (sem saltos, menos 1 série) para chegares fresco.";
    else if (plan.kind === "rest") warn = "Hoje era folga. Não faz mal ir, mas lembra-te que descansar também é treinar.";
    else if (plan.kind === "recup") warn = "Vens de jogo. Se fores, a versão leve chega.";
    h += '<div class="card"><div class="kicker">Quero treinar na mesma</div><div class="muted" style="margin-bottom:10px">Próximo da sequência: <b style="color:var(--ink)">' + nk + ' · ' + esc(nd.title) + '</b></div>' +
      (warn ? '<div class="hint" style="margin:0 0 10px">' + esc(warn) + '</div><div class="row"><button class="btn primary grow" data-start="' + nk + '" data-light="1">Versão leve · 30′</button><button class="btn ghost grow" data-start="' + nk + '" data-light="0">Completo · 40′</button></div>'
            : '<button class="btn primary" data-start="' + nk + '" data-light="0">Começar ' + nk + ' · 40′</button>') + '</div>';
  }
  /* semana */
  var mon = monday(d), cells = "";
  for (var i = 0; i < 7; i++){
    var dd = addDays(mon, i), p = planFor(dd), k = iso(dd), isT = k === today(), dn = doneOn(k).length > 0;
    var cls = "day " + (isT ? "today " : "") + (dn ? "done " : "") + (p.kind === "str" ? "gym" : p.kind === "game" ? "game" : p.kind === "rest" ? "rest" : "club");
    cells += '<div class="' + cls + '"><div class="d">' + DOW[dd.getDay()] + '</div><span class="lab">' + p.lab + '</span><span class="dot"></span></div>';
  }
  var gl = w.game === false ? "Sem jogo" : "Jogo " + DOW[gameDow(w)];
  h += '<div class="card"><div class="row between" style="margin-bottom:8px"><div class="kicker" style="margin:0">Jornada</div><button class="chip sm" data-week="edit">' + gl + ' · mudar</button></div><div class="week">' + cells + '</div>' +
    '<label class="sw" style="border:0;padding-top:12px"><span>Semana de jogo importante <span class="tiny">(só 1 ginásio, versão leve)</span></span><input type="checkbox" id="bigWeek" ' + (w.big ? "checked" : "") + '></label></div>';
  if (plan.kind !== "rest") h += '<div class="card"><div class="kicker">Sem tempo ou sem ginásio?</div><div class="row"><button class="btn ghost grow" data-start="rapido">Rápido 20′</button><button class="btn ghost grow" data-tab="treinos">Mobilidade</button></div></div>';
  h += '<div class="alert"><span>⚠</span><div><b>Atenção.</b> ' + ALERT.short + ' <button class="chip sm" data-sheet="alert">ler mais</button></div></div>';
  return h;
}
function renderTreinos(){
  var h = topBar() + '<div class="kicker">Força · a app segue esta ordem</div><div class="exlist" style="margin-bottom:14px">';
  SEQ.forEach(function(k, i){
    var d = SESSIONS[k], isNext = (st.seq % SEQ.length) === i;
    h += '<button class="exrow dark ' + (isNext ? "cur" : "") + '" data-preview="' + k + '"><div class="grow"><div class="n">' + k + ' · ' + esc(d.title) + '</div><div class="pt">' + esc(d.sub) + (isNext ? ' · <b style="color:var(--gold)">é o próximo</b>' : '') + '</div></div><span class="sch">ver</span></button>';
  });
  h += '</div><div class="kicker">Sem ginásio</div><div class="exlist" style="margin-bottom:14px">';
  h += '<button class="exrow dark" data-preview="rapido"><div class="grow"><div class="n">Rápido 20′</div><div class="pt">Para dias sem tempo, em casa, sem material</div></div><span class="sch">ver</span></button>';
  h += '</div><div class="kicker">Mobilidade e alongamentos</div><div class="exlist" style="margin-bottom:14px">';
  MOB_LIST.forEach(function(k){ var d = SPECIAL[k]; h += '<button class="exrow dark" data-preview="' + k + '"><div class="grow"><div class="n">' + esc(d.title) + '</div><div class="pt">' + esc(d.sub) + '</div></div><span class="sch">' + d.mins + '′</span></button>'; });
  h += '</div><div class="card"><div class="kicker">Como funciona</div><div class="muted">Dois treinos de ginásio por semana, 40 min, sempre a 2 dias de distância do jogo. A app alterna A (pernas a dois apoios + empurrar) e B (uma perna + puxar) e vai rodando 3 versões de cada para não ser sempre igual. Semanas 1 a 3 são de técnica com peso leve; a partir da 4.ª semana a app sugere subir o peso quando o treino anterior foi fácil.</div></div>';
  h += '<div class="alert"><span>⚠</span><div>' + ALERT.long + '</div></div>';
  return h;
}
function renderNutri(){
  var h = topBar() + '<div class="nutri">';
  h += '<div class="card white"><div class="kicker">Comer para jogar</div><div style="font-size:15px">Com 14 anos e a treinar quase todos os dias, não é para fazer dieta nem contar nada. É para comer o suficiente, nas horas certas, para ter energia nos jogos e crescer. Sem suplementos.</div></div>';
  h += '<h3>8 regras</h3>' + NUTRI.regras.map(function(x){ return '<div class="it"><b>' + esc(x[0]) + '</b><span>' + esc(x[1]) + '</span></div>'; }).join("");
  h += '<h3>Um dia normal</h3>' + NUTRI.dia.map(function(x){ return '<div class="it"><b>' + esc(x[0]) + '</b><span>' + esc(x[1]) + '</span></div>'; }).join("");
  h += '<h3>Dia de jogo</h3>' + NUTRI.jogo.map(function(x){ return '<div class="it"><b>' + esc(x[0]) + '</b><span>' + esc(x[1]) + '</span></div>'; }).join("");
  h += '<h3>Dormir</h3>' + NUTRI.sono.map(function(x){ return '<div class="it"><b>' + esc(x[0]) + '</b><span>' + esc(x[1]) + '</span></div>'; }).join("");
  return h + '</div>';
}
function renderPerfil(){
  var log = st.log || [], wk = weekKey(new Date());
  var thisWeek = log.filter(function(x){ return weekKey(fromIso(x.date)) === wk; }).length;
  var strTotal = log.filter(function(x){ return isStrength(x.key); }).length;
  var h = topBar() + '<div class="stat"><div><div class="v">' + log.length + '</div><div class="l">treinos</div></div><div><div class="v">' + strTotal + '</div><div class="l">ginásio</div></div><div><div class="v">' + thisWeek + '</div><div class="l">esta semana</div></div></div>';
  h += '<div class="card"><div class="kicker">Os teus pesos</div>';
  var names = Object.keys(st.weights).filter(function(k){ return st.weights[k] !== "" && st.weights[k] != null; });
  if (!names.length) h += '<div class="muted">Ainda sem pesos guardados. Aparecem aqui quando fizeres o primeiro treino.</div>';
  names.sort().forEach(function(n){ h += '<div class="kv"><span class="k">' + esc(enName(n)) + '</span><span class="v">' + fmtKg(st.weights[n]) + ' kg</span></div>'; });
  h += '</div>';
  h += '<div class="card"><div class="kicker">Histórico</div><div class="hist">' + (log.length ? log.slice().reverse().slice(0, 30).map(function(x){ return '<div class="it"><div><div>' + esc(x.title) + (x.light ? ' <span class="tiny">(leve)</span>' : '') + '</div><div class="tiny">' + x.sets + ' · ' + x.mins + ' min' + (x.eff ? ' · ' + x.eff : '') + '</div></div><span class="mono">' + fmtDate(x.date) + '</span></div>'; }).join("") : '<div class="muted">Nada ainda. O primeiro treino fica aqui.</div>') + '</div></div>';
  h += '<div class="card"><div class="kicker">Para quem acompanha</div><div class="muted" style="margin-bottom:10px">Checklist de 1 página para quem for com o Rodrigo ao ginásio nas primeiras sessões.</div><button class="btn ghost" data-sheet="coach">Abrir checklist</button></div>';
  h += '<div class="card"><div class="kicker">Definições</div>' +
    '<label class="sw"><span>Sons</span><input type="checkbox" id="optSound" ' + (st.sound ? "checked" : "") + '></label>' +
    '<label class="sw"><span>Ecrã sempre ligado no treino</span><input type="checkbox" id="optWake" ' + (st.keepAwake ? "checked" : "") + '></label>' +
    '<div class="kv"><span class="k">Dia de folga total</span><select class="sel" id="optRest">' + DOW_LONG.map(function(n, i){ return '<option value="' + i + '" ' + (st.cfg.restDay === i ? "selected" : "") + '>' + n + '</option>'; }).join("") + '</select></div>' +
    '<div class="kv"><span class="k">Ginásio (com jogo)</span><span class="v">' + st.cfg.gymDays.map(function(i){ return DOW[i]; }).join(" + ") + '</span></div>' +
    '<div class="kv"><span class="k">Ginásio (sem jogo)</span><span class="v">' + st.cfg.gymDaysNoGame.map(function(i){ return DOW[i]; }).join(" + ") + '</span></div>' +
    '<div class="kv"><span class="k">Próximo treino</span><span class="v">' + nextKey() + '</span></div>' +
    '<div class="row" style="margin-top:12px"><button class="btn ghost grow" id="btnExport">Exportar cópia</button><label class="btn ghost grow" style="cursor:pointer">Importar<input type="file" id="fileImport" accept="application/json" hidden></label></div>' +
    '<button class="btn ghost" style="margin-top:8px;color:#FF8F7A" id="btnReset">Começar do zero</button></div>';
  h += '<div class="tiny" style="text-align:center;padding:10px">Rodrigo FC · os dados ficam só neste telemóvel. Exporta uma cópia de vez em quando e manda ao Tiago.</div>';
  return h;
}

/* ---------- folhas ---------- */
function openSheet(html){ var el = document.getElementById("sheet"); el.innerHTML = '<div class="pane"><div class="handle"></div>' + html + '</div>'; el.hidden = false; }
function closeSheet(){ var el = document.getElementById("sheet"); el.hidden = true; el.innerHTML = ""; }
function sheetHead(title){ return '<div class="sheet-h"><span class="disp">' + esc(title) + '</span><button class="ib" data-close="1">✕</button></div>'; }
function openPreview(key){
  var day = resolveSession(key, false), h = sheetHead(day.title) + '<div class="muted" style="margin-bottom:8px">' + esc(day.sub) + ' · ~' + day.mins + ' min</div>';
  day.blocks.forEach(function(b){ h += '<div class="blockh"><span class="disp">' + esc(b.name) + '</span></div><div class="exlist">' + b.items.map(function(it){ return exRow(it, "", true); }).join("") + '</div>'; });
  h += '<button class="btn primary" style="margin-top:16px" data-start="' + key + '">Começar este treino</button>';
  if (isStrength(key)) h += '<div class="tiny" style="text-align:center;margin-top:8px">Se fizeres este fora de ordem, a sequência continua a partir dele.</div>';
  openSheet(h);
}
function openCoach(){
  var h = sheetHead("Para quem acompanha") + '<div class="card white check"><div class="muted">O que olhar nas primeiras sessões do Rodrigo. Não é preciso saber de treino: é só ver se bate certo com isto.</div>';
  COACH_CHECK.forEach(function(s){ h += '<div style="margin-top:12px"><b>' + esc(s[0]) + '</b><ul>' + s[1].map(function(x){ return '<li>' + esc(x) + '</li>'; }).join("") + '</ul></div>'; });
  openSheet(h + '</div>');
}
function openAlert(){ openSheet(sheetHead("Sinais de alarme") + '<div class="card white"><div style="font-size:15px;line-height:1.5">' + esc(ALERT.long) + '</div></div>'); }
function openWeekEdit(){
  var w = weekState(new Date()), g = gameDow(w);
  var h = sheetHead("Jogo desta semana") + '<div class="muted" style="margin-bottom:10px">A app põe a véspera e a recuperação à volta do jogo e afasta o ginásio pelo menos 2 dias.</div><div class="chips">' +
    DOW_LONG.map(function(n, i){ return '<button class="chip ' + (g === i ? "on" : "") + '" data-gameday="' + i + '">' + n + '</button>'; }).join("") + '<button class="chip ' + (g == null ? "on" : "") + '" data-gameday="none">Sem jogo</button></div>';
  openSheet(h);
}
function openInfo(name){
  var ex = EX[name] || {}, f = feelOf(name);
  var h = sheetHead(enName(name)) + '<div class="card white"><div class="figbox">' + fig(name) + '</div><div class="pt muted" style="margin-bottom:8px">' + esc(ptName(name)) + '</div>' +
    (f ? '<div class="feel"><b>O que sentir</b>' + esc(f[0]) + '</div><div class="feel no"><b>Evitar</b>' + esc(f[1]) + '</div>' : '') +
    '<div class="howto" style="margin-top:8px"><b>Posição</b><p>' + esc(ex.setup) + '</p><b style="display:block;margin-top:8px">Como fazer</b><p>' + esc(ex.howto) + '</p>' + videoBtn(name) + '</div></div>';
  openSheet(h);
}
function openSwap(bi, ii){
  var day = sessDay(), it = day.blocks[bi].items[ii], fam = FAM[it[3]];
  if (!fam){ toast("Este não se troca"); return; }
  var h = sheetHead("Trocar por…") + '<div class="muted" style="margin-bottom:10px">' + esc(fam.label) + ' · mesmo padrão de movimento, por isso o treino continua certo.</div><div class="exlist">';
  fam.list.forEach(function(c){ if (c[0] === it[0]) return; h += '<button class="exrow dark" data-swap="' + bi + '.' + ii + '" data-name="' + esc(c[0]) + '" data-ref="' + esc(c[1]) + '"><div class="thumb">' + fig(c[0], "dark") + '</div><div class="grow"><div class="n">' + esc(enName(c[0])) + '</div><div class="pt">' + esc(ptName(c[0])) + (c[1] ? ' · ' + esc(c[1]) : '') + '</div></div><span class="sch">usar</span></button>'; });
  var orig = sessionDef(day.key).blocks.filter(function(b){ return !(day.light && b.kind === "power"); })[bi].items[ii][0];
  if (orig !== it[0]) h += '<button class="exrow dark" data-swap="' + bi + '.' + ii + '" data-name="" data-ref=""><div class="grow"><div class="n">Repor o original</div><div class="pt">' + esc(enName(orig)) + '</div></div></button>';
  openSheet(h + '</div>');
}

/* ---------- modo treino ---------- */
function sessDay(){ var s = st.sess; return s ? resolveSession(s.key, s.light) : null; }
function allItems(day){ var out = []; day.blocks.forEach(function(b, bi){ b.items.forEach(function(it, ii){ out.push({bi:bi, ii:ii, it:it, n:parseScheme(it[1]).sets, blk:b}); }); }); return out; }
function doneOf(bi, ii, n){ var c = 0; for (var k = 0; k < n; k++){ if (st.sess.done[bi + "." + ii + "." + k]) c++; } return c; }
function nextSetIdx(bi, ii, n){ for (var k = 0; k < n; k++){ if (!st.sess.done[bi + "." + ii + "." + k]) return k; } return -1; }
function isComplete(x){ return doneOf(x.bi, x.ii, x.n) >= x.n; }
function firstPending(day){ var xs = allItems(day); for (var i = 0; i < xs.length; i++){ if (!isComplete(xs[i])) return xs[i]; } return null; }
function elapsed(){ var s = st.sess; if (!s) return 0; return (s.accum + (s.running ? Date.now() - s.startedAt : 0)) / 1000; }
function introOf(key){ var d = sessionDef(key); return INTRO[key] || (d && d.fam ? INTRO[d.fam] : null); }
function openIntro(key, light){
  var day = resolveSession(key, light), it = introOf(key);
  if (!it){ startSession(key, light); return; }
  var h = sheetHead(day.title) + '<div class="card white"><div class="kicker" style="color:var(--card-ink2)">O que vais fazer' + (light ? ' · versão leve' : '') + '</div><div style="font-size:15px;line-height:1.45">' + esc(it.what) + '</div>' +
    '<div class="kicker" style="color:var(--card-ink2);margin-top:14px">Para que serve</div><ul class="gains">' + it.gains.map(function(g){ return '<li>' + esc(g) + '</li>'; }).join("") + '</ul>' +
    '<div class="tiny" style="color:var(--card-ink2);margin-top:10px">~' + day.mins + ' min · ' + countSets(day) + ' séries · ' + day.blocks.length + ' blocos</div></div>' +
    '<button class="btn primary" data-go="' + key + '" data-light="' + (light ? 1 : 0) + '">Vamos treinar</button>';
  openSheet(h);
}
function startSession(key, light){
  if (st.sess && st.sess.key !== key){ if (!confirm("Tens um treino a meio (" + sessionDef(st.sess.key).title + "). Deitar fora e começar este?")) return; st.sess = null; }
  if (!st.sess){
    var day = resolveSession(key, light), sugg = {};
    if (isStrength(key) && phase() === 2){
      allItems(day).forEach(function(x){ var it = x.it; if (!hasLoad(it)) return; var e = st.effort[it[0]]; if (e && e.v === "facil" && e.full) sugg[it[0]] = Math.round((curKg(it) + incOf(it)) * 2) / 2; });
    }
    st.sess = {key:key, light:!!light, startedAt:Date.now(), accum:0, running:true, done:{}, focus:null, eff:{}, sugg:sugg, swapped:{}};
    var fp = firstPending(day); st.sess.focus = fp ? {bi:fp.bi, ii:fp.ii} : null;
  }
  if (!st.sess.running){ st.sess.running = true; st.sess.startedAt = Date.now(); }
  save(); ui.viewDone = null; ui.rest = null; ui.fin = null; closeSheet(); showWorkout(true); renderWorkout();
}
function showWorkout(on){ var el = document.getElementById("wk"); el.hidden = !on; document.body.style.overflow = on ? "hidden" : ""; if (on) wakeOn(); else wakeOff(); }
function focusItem(day){ var s = st.sess; if (s.focus) return {bi:s.focus.bi, ii:s.focus.ii}; var fp = firstPending(day); return fp ? {bi:fp.bi, ii:fp.ii} : null; }
function setFocus(bi, ii){ st.sess.focus = {bi:bi, ii:ii}; ui.rest = null; ui.viewDone = null; save(); renderWorkout(); try { document.getElementById("wk").scrollTo(0, 0); } catch(e){} }
function sideLabel(ps){ return ps.side ? " cada lado" : ""; }
function setLabel(it, ps){ return ps.secs != null ? (ps.secs >= 60 ? (ps.secs / 60) + " min" : ps.secs + " s") + sideLabel(ps) : ps.reps + " reps" + sideLabel(ps); }
function markSet(bi, ii){
  var day = sessDay(), b = day.blocks[bi], it = b.items[ii], ps = parseScheme(it[1]), k = nextSetIdx(bi, ii, ps.sets);
  if (k < 0) return;
  st.sess.done[bi + "." + ii + "." + k] = 1;
  if (hasLoad(it)) st.last[it[0]] = {kg:curKg(it), date:today()};
  play("tick");
  var complete = doneOf(bi, ii, ps.sets) >= ps.sets;
  if (b.ss){
    var other = ii === 0 ? 1 : 0, oit = b.items[other], ops = parseScheme(oit[1]);
    if (!complete || doneOf(bi, other, ops.sets) < ops.sets){
      /* alterna: A1 → descanso curto → A2 → descanso longo → A1 */
      var nextIi = doneOf(bi, other, ops.sets) < doneOf(bi, ii, ps.sets) ? other : ii;
      var secs = (nextIi === ii) ? b.rest.end : b.rest.mid;
      st.sess.focus = {bi:bi, ii:nextIi}; save(); startRest(secs, day, bi, nextIi); return;
    }
  } else if (!complete && b.rest){ save(); startRest(b.rest.mid, day, bi, ii); return; }
  else if (!complete){ save(); renderWorkout(); return; }
  save();
  if (complete && (b.kind === "warm" || b.kind === "stretch")){ advance(day); return; }
  renderWorkout(); /* mostra "como foi?" */
}
function advance(day){
  var fp = firstPending(day);
  if (!fp){ finishSession(day); return; }
  var cur = focusItem(day), curBlk = cur ? day.blocks[cur.bi] : null;
  var secs = (curBlk && curBlk.rest && fp.bi === cur.bi && curBlk.kind !== "warm") ? curBlk.rest.end : 0;
  st.sess.focus = {bi:fp.bi, ii:fp.ii}; save();
  if (secs && fp.blk.kind !== "warm" && fp.blk.kind !== "stretch") startRest(secs, day, fp.bi, fp.ii); else renderWorkout();
}
function setEffort(name, v){
  var day = sessDay(), x = allItems(day).filter(function(y){ return y.it[0] === name; })[0];
  st.sess.eff[name] = v; st.effort[name] = {v:v, full:x ? isComplete(x) : true, date:today()};
  if (v === "dificil" && x && hasLoad(x.it)) toast("Ok. Para a próxima a app não sobe o peso.");
  save(); advance(day);
}
function skipItem(bi, ii){ var day = sessDay(), ps = parseScheme(day.blocks[bi].items[ii][1]); for (var k = 0; k < ps.sets; k++) st.sess.done[bi + "." + ii + "." + k] = "skip"; st.sess.eff[day.blocks[bi].items[ii][0]] = "saltou"; save(); advance(day); }
function undoLast(){ var keys = Object.keys(st.sess.done); if (!keys.length) return; var last = keys[keys.length - 1]; delete st.sess.done[last]; var p = last.split("."); st.sess.focus = {bi:+p[0], ii:+p[1]}; ui.rest = null; save(); renderWorkout(); }
function changeKg(name, d, it){ var v = curKg(it); if (v == null) v = 0; v = Math.max(0, Math.round((v + d) * 2) / 2); st.weights[name] = v; save(); renderWorkout(); }
function startRest(secs, day, bi, ii){ ui.rest = {kind:"rest", total:secs, end:Date.now() + secs * 1000, bi:bi, ii:ii}; renderWorkout(); }
function startHold(secs, bi, ii){ unlockAudio(); play("start"); ui.rest = {kind:"hold", total:secs, end:Date.now() + secs * 1000, bi:bi, ii:ii}; renderWorkout(); }
function ringSvg(left, total){ var r = 100, c = 2 * Math.PI * r, p = total ? Math.max(0, left / total) : 0; return '<svg viewBox="0 0 220 220"><circle cx="110" cy="110" r="' + r + '" stroke="rgba(255,255,255,.12)" stroke-width="10" fill="none"/><circle cx="110" cy="110" r="' + r + '" stroke="#F2D04B" stroke-width="10" fill="none" stroke-linecap="round" stroke-dasharray="' + c + '" stroke-dashoffset="' + (c * (1 - p)) + '"/></svg>'; }
function renderRest(day){
  var r = ui.rest, left = (r.end - Date.now()) / 1000, it = day.blocks[r.bi].items[r.ii], ps = parseScheme(it[1]);
  var nxt = r.kind === "hold" ? '<div class="next">A fazer<b>' + esc(enName(it[0])) + '</b>' + setLabel(it, ps) + '</div>' : '<div class="next">A seguir<b>' + esc(enName(it[0])) + '</b>' + setLabel(it, ps) + (hasLoad(it) ? ' · ' + fmtKg(curKg(it)) + ' ' + unitOf(it) : '') + '</div>';
  return '<div class="restov"><div class="lab">' + (r.kind === "hold" ? "Aguenta" : "Descansa") + '</div><div class="ring">' + ringSvg(left, r.total) + '<div class="t">' + mmss(left) + '</div></div>' + nxt +
    '<div class="acts"><div class="two"><button class="btn dark" data-rest="plus">+15 s</button><button class="btn primary" data-rest="skip">' + (r.kind === "hold" ? "Feito" : "Já estou") + '</button></div></div></div>';
}
function renderWorkout(){
  var el = document.getElementById("wk");
  if (ui.fin){ el.innerHTML = '<div class="inner">' + ui.fin + '</div>'; return; }
  var day = sessDay(); if (!day){ showWorkout(false); return; }
  var xs = allItems(day), total = 0, done = 0;
  xs.forEach(function(x){ total += x.n; done += doneOf(x.bi, x.ii, x.n); });
  var f = focusItem(day), h = '<div class="inner">';
  h += '<div class="score"><div><div class="lab">' + esc(day.title) + '</div><div class="t" id="clock">' + mmss(elapsed()) + '</div></div><div style="text-align:right"><div class="prog">' + done + ' / ' + total + ' séries</div><div class="row" style="justify-content:flex-end;gap:6px;margin-top:4px"><button class="chip sm" data-wk="undo" ' + (Object.keys(st.sess.done).length ? "" : "disabled") + '>desfazer</button><button class="chip sm" data-wk="pause">' + (st.sess.running ? "pausa" : "retomar") + '</button><button class="chip sm" data-wk="end">terminar</button></div></div></div>';
  if (f){
    var b = day.blocks[f.bi], it = b.items[f.ii], ps = parseScheme(it[1]), name = it[0], ex = EX[name] || {}, fe = feelOf(name), dn = doneOf(f.bi, f.ii, ps.sets), nk = nextSetIdx(f.bi, f.ii, ps.sets);
    var complete = nk < 0;
    if (b.ss){ var oi = f.ii === 0 ? 1 : 0; h += '<div class="ssbar"><b>Supersérie</b> ' + (f.ii === 0 ? "1" : "2") + ' de 2 · depois ' + esc(enName(b.items[oi][0])) + ' · ' + b.rest.mid + 's entre os dois, ' + b.rest.end + 's no fim</div>'; }
    h += '<div class="excard"><span class="code">' + esc(b.name) + (b.ss ? " · " + (f.ii === 0 ? "A1" : "A2") : "") + '</span><h2>' + esc(enName(name)) + '</h2><div class="pt">' + esc(ptName(name)) + (ex.setup ? ' · ' + esc(ex.setup) : '') + '</div>';
    h += '<div class="figbox">' + fig(name) + '</div>';
    if (fe) h += '<div class="feel"><b>O que sentir</b>' + esc(fe[0]) + '</div><div class="feel no"><b>Evitar</b>' + esc(fe[1]) + '</div>';
    h += '<details class="howto"><summary>Como fazer</summary><p>' + esc(ex.howto) + '</p>' + videoBtn(name) + '</details>';
    if (b.kind === "str") h += '<div class="hint">🎯 Pára quando ainda conseguias fazer 3. Nunca vais até ao fim.</div>';
    if (b.kind === "power") h += '<div class="hint">⚡ Cada salto é à séria: aterra em silêncio e descansa o tempo todo entre séries.</div>';
    if (name.indexOf("Nordic") === 0) h += '<div class="hint">🐢 Descida de 3–4 segundos. Só 3 repetições, todas perfeitas.</div>';
    /* peso */
    if (hasLoad(it)){
      var kg = curKg(it), sg = st.sess.sugg[name];
      h += '<div class="kgrow"><button class="ib" data-kg="-" data-name="' + esc(name) + '">−</button><div><span class="k">' + fmtKg(kg) + '</span><span class="u">' + unitOf(it) + '</span></div><button class="ib" data-kg="+" data-name="' + esc(name) + '">+</button></div>';
      if (phase() === 1) h += '<div class="tiny" style="text-align:center">Semanas 1–3: fica com este peso mesmo que seja fácil.</div>';
      else if (sg && kg < sg) h += '<div class="sugg"><span>Da última vez foi fácil. Sobe para ' + fmtKg(sg) + ' ' + unitOf(it) + '?</span><button class="btn" data-sugg="' + esc(name) + '" data-val="' + sg + '">Sim</button></div>';
    }
    /* séries */
    h += '<div class="sets">';
    for (var k = 0; k < ps.sets; k++){ var dk = st.sess.done[f.bi + "." + f.ii + "." + k]; h += '<div class="set ' + (dk ? "done" : (k === nk ? "next" : "")) + '"><small>série ' + (k + 1) + '</small>' + (dk === "skip" ? "–" : (ps.secs != null ? (ps.secs >= 60 ? (ps.secs / 60) + "′" : ps.secs + "s") : ps.reps)) + (ps.side ? "<small>cada lado</small>" : "") + '</div>'; }
    h += '</div>';
    h += '<div class="acts">';
    if (!complete){
      if (ps.secs != null) h += '<button class="btn primary" data-hold="' + ps.secs + '" data-bi="' + f.bi + '" data-ii="' + f.ii + '">Começar ' + setLabel(it, ps) + '</button>';
      else h += '<button class="btn primary" data-set="' + f.bi + '.' + f.ii + '">Série ' + (nk + 1) + ' feita</button>';
      h += '<div class="two"><button class="btn ghost" data-swapbtn="' + f.bi + '.' + f.ii + '" ' + (FAM[it[3]] ? "" : "disabled") + '>Trocar</button><button class="btn ghost" data-skip="' + f.bi + '.' + f.ii + '">Saltar</button></div>';
    } else {
      h += '<div class="tiny" style="text-align:center;font-weight:700;letter-spacing:.1em;text-transform:uppercase">Como foi?</div><div class="eff"><button data-eff="facil" data-name="' + esc(name) + '">Fácil</button><button data-eff="certo" data-name="' + esc(name) + '">Certo</button><button data-eff="dificil" data-name="' + esc(name) + '">Difícil</button></div>';
    }
    h += '</div></div>';
  }
  /* lista do treino */
  day.blocks.forEach(function(blk, bi){
    h += '<div class="blockh"><span class="disp">' + esc(blk.name) + '</span><span class="tiny">' + (blk.rest ? (blk.ss ? blk.rest.mid + "s / " + blk.rest.end + "s" : blk.rest.mid + "s descanso") : "seguido") + '</span></div><div class="exlist">';
    blk.items.forEach(function(it, ii){ var x = {bi:bi, ii:ii, n:parseScheme(it[1]).sets}; var isCur = f && f.bi === bi && f.ii === ii; h += '<button class="exrow ' + (isComplete(x) ? "done " : "") + (isCur ? "cur" : "") + '" data-focus="' + bi + '.' + ii + '"><div class="thumb">' + fig(it[0]) + '</div><div class="grow"><div class="n">' + esc(enName(it[0])) + '</div><div class="pt">' + esc(ptName(it[0])) + '</div></div><div class="sch">' + doneOf(bi, ii, x.n) + '/' + x.n + ' · ' + esc(it[1]) + '</div></button>'; });
    h += '</div>';
  });
  h += '<button class="btn ghost" style="margin-top:16px" data-wk="close">Sair e continuar depois</button></div>';
  if (ui.rest) h += renderRest(day);
  el.innerHTML = h;
}
function finishSession(day){
  var s = st.sess, xs = allItems(day), total = 0, done = 0;
  xs.forEach(function(x){ total += x.n; done += doneOf(x.bi, x.ii, x.n); });
  var mins = Math.max(1, Math.round(elapsed() / 60));
  var effs = Object.keys(s.eff).map(function(k){ return s.eff[k]; }), nf = effs.filter(function(e){ return e === "facil"; }).length, nd = effs.filter(function(e){ return e === "dificil"; }).length;
  var effSum = effs.length ? (nd > nf ? "difícil" : nf > effs.length / 2 ? "fácil" : "certo") : "";
  st.log.push({date:today(), key:s.key, title:day.title + (isStrength(s.key) ? " · " + s.key : ""), sets:done + "/" + total, mins:mins, light:s.light, eff:effSum});
  if (isStrength(s.key)){ st.seq = (SEQ.indexOf(s.key) + 1) % SEQ.length; if (!st.firstDate) st.firstDate = today(); }
  st.sess = null; save(); play("done");
  ui.fin = '<div class="fin"><div class="kicker">Apito final</div><div class="disp">Feito!</div><div class="stats"><div><div class="v">' + done + '/' + total + '</div><div class="l">séries</div></div><div><div class="v">' + mins + '</div><div class="l">min</div></div></div>' +
    '<div class="muted" style="margin-bottom:18px">' + (isStrength(s.key) ? "Lanche de recuperação na próxima hora. O próximo treino de ginásio é o " + nextKey() + "." : "Bom trabalho. Agora é descansar.") + '</div><button class="btn primary" data-wk="close">Voltar ao início</button></div>';
  renderWorkout();
}
function endEarly(){ if (!confirm("Terminar o treino agora? O que já fizeste fica guardado.")) return; var day = sessDay(); finishSession(day); }

/* ---------- som / ecrã ---------- */
var audioCtx = null;
function unlockAudio(){ if (!st.sound) return; try { audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)(); if (audioCtx.state === "suspended") audioCtx.resume(); } catch(e){} }
function tone(freq, start, dur){ try { var o = audioCtx.createOscillator(), g = audioCtx.createGain(); o.type = "sine"; o.frequency.value = freq; g.gain.value = 0.0001; o.connect(g); g.connect(audioCtx.destination); var t = audioCtx.currentTime + start; g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.3, t + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, t + dur); o.start(t); o.stop(t + dur + 0.05); } catch(e){} }
function vib(p){ try { if (navigator.vibrate) navigator.vibrate(p); } catch(e){} }
function play(name){ vib(name === "done" ? [80, 60, 80] : name === "go" ? [120] : 30); if (!st.sound || !audioCtx) return; if (name === "tick") tone(880, 0, .08); else if (name === "start") tone(660, 0, .12); else if (name === "go"){ tone(880, 0, .1); tone(1320, .12, .2); } else if (name === "done"){ tone(660, 0, .12); tone(880, .14, .12); tone(1320, .28, .3); } }
var wake = {lock:null, ns:null};
function wakeOn(){ if (!st.keepAwake) return; try { if (navigator.wakeLock) navigator.wakeLock.request("screen").then(function(l){ wake.lock = l; }).catch(wakeFallback); else wakeFallback(); } catch(e){ wakeFallback(); } }
function wakeFallback(){ try { if (window.NoSleep){ wake.ns = wake.ns || new NoSleep(); wake.ns.enable(); } } catch(e){} }
function wakeOff(){ try { if (wake.lock){ wake.lock.release(); wake.lock = null; } if (wake.ns) wake.ns.disable(); } catch(e){} }
document.addEventListener("visibilitychange", function(){ if (!document.hidden && st.sess && !document.getElementById("wk").hidden) wakeOn(); });

/* ---------- relógio ---------- */
setInterval(function(){
  if (!st.sess || document.getElementById("wk").hidden) return;
  var c = document.getElementById("clock"); if (c) c.textContent = mmss(elapsed());
  if (ui.rest){
    var left = (ui.rest.end - Date.now()) / 1000, t = document.querySelector(".restov .t"), ring = document.querySelector(".restov .ring svg");
    if (t) t.textContent = mmss(left);
    if (ring) ring.outerHTML = ringSvg(left, ui.rest.total);
    if (left <= 0) restDone();
  }
}, 250);
function restDone(){
  var r = ui.rest; ui.rest = null; play("go");
  if (r.kind === "hold"){ markSet(r.bi, r.ii); return; }
  renderWorkout();
}

/* ---------- eventos ---------- */
document.addEventListener("click", function(e){
  var t = e.target.closest("button, label, [data-tab]"); if (!t) return;
  var d = t.dataset || {};
  if (d.tab){ ui.tab = d.tab; render(); return; }
  if (d.start != null){ if (st.sess && st.sess.key === d.start) startSession(d.start, st.sess.light); else openIntro(d.start, d.light === "1"); return; }
  if (d.go != null){ startSession(d.go, d.light === "1"); return; }
  if (d.game){ if (d.game === "yes") setWeek(new Date(), {game:true}); else if (d.game === "no") setWeek(new Date(), {game:false}); else openWeekEdit(); return; }
  if (d.gameday != null){ setWeek(new Date(), {game:(d.gameday === "none" ? false : parseInt(d.gameday, 10))}); closeSheet(); return; }
  if (d.week === "edit"){ openWeekEdit(); return; }
  if (d.sheet === "coach"){ openCoach(); return; }
  if (d.sheet === "alert"){ openAlert(); return; }
  if (d.preview){ openPreview(d.preview); return; }
  if (d.close){ closeSheet(); return; }
  if (t.id === "btnExport"){ exportData(); return; }
  if (t.id === "btnReset"){ if (confirm("Apagar tudo (pesos, histórico, semana) e começar do zero?")){ localStorage.removeItem(KEY); location.reload(); } return; }
  /* treino */
  if (d.set){ var p = d.set.split("."); unlockAudio(); markSet(+p[0], +p[1]); return; }
  if (d.hold){ startHold(parseInt(d.hold, 10), +d.bi, +d.ii); return; }
  if (d.skip){ var q = d.skip.split("."); skipItem(+q[0], +q[1]); return; }
  if (d.focus){ var fo = d.focus.split("."); setFocus(+fo[0], +fo[1]); return; }
  if (d.swapbtn){ var sb = d.swapbtn.split("."); openSwap(+sb[0], +sb[1]); return; }
  if (d.swap != null){ var key = st.sess.key; st.swaps[key] = st.swaps[key] || {}; if (d.name) st.swaps[key][d.swap] = [d.name, d.ref]; else delete st.swaps[key][d.swap]; save(); closeSheet(); renderWorkout(); toast(d.name ? "Trocado" : "Reposto"); return; }
  if (d.kg){ var day = sessDay(), f = focusItem(day), it = day.blocks[f.bi].items[f.ii]; changeKg(d.name, d.kg === "+" ? incOf(it) : -incOf(it), it); return; }
  if (d.sugg){ st.weights[d.sugg] = parseFloat(d.val); save(); renderWorkout(); toast("Peso atualizado"); return; }
  if (d.eff){ setEffort(d.name, d.eff); return; }
  if (d.rest){ if (d.rest === "plus"){ ui.rest.end += 15000; renderWorkout(); } else restDone(); return; }
  if (d.wk === "undo"){ undoLast(); return; }
  if (d.wk === "pause"){ var s = st.sess; if (s.running){ s.accum += Date.now() - s.startedAt; s.running = false; } else { s.running = true; s.startedAt = Date.now(); } save(); renderWorkout(); return; }
  if (d.wk === "end"){ endEarly(); return; }
  if (d.wk === "close"){ ui.fin = null; ui.rest = null; if (st.sess && st.sess.running){ st.sess.accum += Date.now() - st.sess.startedAt; st.sess.running = false; save(); } showWorkout(false); ui.tab = "home"; render(); return; }
});
document.addEventListener("change", function(e){
  var t = e.target;
  if (t.id === "bigWeek"){ setWeek(new Date(), {big:t.checked}); return; }
  if (t.id === "optSound"){ st.sound = t.checked; save(); if (t.checked) unlockAudio(); return; }
  if (t.id === "optWake"){ st.keepAwake = t.checked; save(); return; }
  if (t.id === "optRest"){ st.cfg.restDay = parseInt(t.value, 10); save(); render(); return; }
  if (t.id === "fileImport" && t.files[0]){ importData(t.files[0]); }
});
document.getElementById("sheet").addEventListener("click", function(e){ if (e.target.id === "sheet") closeSheet(); });
document.addEventListener("click", function(e){ var r = e.target.closest(".exrow.cur, .exrow"); if (!r || !r.closest("#wk") || !r.dataset.focus) return; }, true);
/* toque longo no exercício atual abre a ficha completa */
document.addEventListener("click", function(e){ var t = e.target.closest(".excard .figbox"); if (!t) return; var day = sessDay(); if (!day) return; var f = focusItem(day); if (f) openInfo(day.blocks[f.bi].items[f.ii][0]); });
if ("serviceWorker" in navigator){ window.addEventListener("load", function(){ navigator.serviceWorker.register("./sw.js").catch(function(){}); }); }
render();
if (st.sess){ showWorkout(true); renderWorkout(); }
</script>
</body>
</html>
