// Verifica que todos os exercícios dos treinos têm ficha, figura e "sentir/evitar".
var fs = require("fs"), path = require("path"), root = path.join(__dirname, "..");
var code = ["src/01-lib-base.js","src/01b-lib-new.js","src/02-program.js"].map(function(f){ return fs.readFileSync(path.join(root, f), "utf8"); }).join("\n");
eval(code);
var EX = {}; LIB.forEach(function(it){ EX[it[0]] = 1; });
var used = {}; function use(it){ used[it[0]] = 1; if (it[4]) used[it[4].split("|")[0]] = 1; }
Object.keys(SESSIONS).forEach(function(k){ SESSIONS[k].blocks.forEach(function(b){ b.items.forEach(use); }); });
Object.keys(SPECIAL).forEach(function(k){ SPECIAL[k].blocks.forEach(function(b){ b.items.forEach(use); }); });
Object.keys(FAM).forEach(function(k){ FAM[k].list.forEach(function(c){ used[c[0]] = 1; }); });
var noEx = [], noFig = [], noFeel = [], noEn = [];
Object.keys(used).forEach(function(n){ if (!EX[n]) noEx.push(n); if (!FIG[n]) noFig.push(n); if (!FEEL[n]) noFeel.push(n); if (!EX_EN[n]) noEn.push(n); });
console.log("exercícios usados:", Object.keys(used).length);
console.log("no LIB:", noEx); console.log("no FIG:", noFig); console.log("no FEEL:", noFeel); console.log("no EN:", noEn);
