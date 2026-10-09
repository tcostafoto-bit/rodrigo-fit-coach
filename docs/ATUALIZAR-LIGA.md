# Atualizar `data/liga.json` (tarefa diária)

Objetivo: manter o separador **Benfica** da app Rodrigo FC com dados atuais do Benfica e da Liga Portugal. Correr uma vez por dia (e em dias de jogo do Benfica os dados do dia anterior já chegam).

## Passos
1. Pesquisar na web (2–4 pesquisas, fontes como fotmob, goal.com, flashscore, zerozero, abola, record): classificação atual da Liga Portugal Betclic 2026/27 (todas as 18 equipas: posição, equipa, jogos, pontos), último resultado do Benfica, próximos 3 jogos do Benfica (data, hora em Lisboa, competição, casa/fora), e 2–3 notícias do dia sobre o Benfica ou a Liga.
2. Escrever `data/liga.json` com esta estrutura exata (não mudar chaves):
   - `updated`: "AAAA-MM-DD" (hoje)
   - `benfica`: `pos`, `pts`, `played`, `w`, `d`, `l`, `last` {date, comp, home, away, score "x-y"}, `next` [ {date, time "HH:MM", comp, home, away} ×3 ]
   - `table`: lista de {pos, team, p, pts} com as 18 equipas (nomes curtos: "FC Porto", "Benfica", "Sporting", "Braga", "V. Guimarães"…)
   - `news`: lista de {d: "AAAA-MM-DD", t: frase} — 2 a 3 frases **curtas e originais**, escritas por ti em português de Portugal, para um rapaz de 14 anos. Nunca copiar títulos nem frases de jornais. `comp` usa "Liga", "Taça", "Europa" ou "Champions".
3. Validar: `node -e "JSON.parse(require('fs').readFileSync('data/liga.json'))"`.
4. `git add data/liga.json && git commit -m "liga: atualização AAAA-MM-DD" && git push origin main`. Só isto; não tocar em mais ficheiros, não correr o build.
5. Se as fontes se contradisserem, usar a mais recente e manter o que já lá estava para o que não conseguires confirmar. Se não houver nada novo, não fazer commit.
