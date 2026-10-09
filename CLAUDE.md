# Rodrigo FC — instruções para o Claude

App de treino (PWA) do Rodrigo (14 anos, futebol a sério, 2 dias de ginásio por semana, 40 min). Cada push para `main` publica na Vercel.

## Quem pede mudanças
O Tiago (tio do Rodrigo, dono do projeto). Português de Portugal, informal. Explicar as mudanças pelo que se vê na app.

## Como está feito
- **Nunca editar `index.html` à mão.** É gerado. Código em `src/`:
  - `00-head.html` — HTML + CSS (tema futebol: relvado `#0B2E20`, linhas brancas, amarelo `#F2D04B`, marcador em mono).
  - `01-lib-base.js` — exercícios reaproveitados da Diana Fit Coach (`LIB_BASE`, `FIG`, `FEEL`, `EX_EN`). Gerado; não editar à mão.
  - `01b-lib-new.js` — exercícios novos para o Rodrigo (`LIB_NEW` + figuras + sentir/evitar + nomes EN). Junta tudo em `LIB`.
  - `02-program.js` — `FAM` (famílias para trocar exercício), `SESSIONS` (A1,B1,A2,B2,A3,B3), `SEQ`, `SPECIAL` (véspera, recuperação, pré-jogo, rápido 20′, mobilidades), `NUTRI`, `ALERT`, `COACH_CHECK`.
  - `03-engine.js` — motor: semana/jornada (`planFor`), sequência, modo treino, descansos, trocas, pesos, histórico, perfil.
- Depois de mudar `src/`: `./tools/build.sh` e `node tools/check.js` (tem de dar listas vazias).
- Ao publicar: subir `VERSION` em `sw.js` (`rfc-v1` → `rfc-v2`).
- Dados só no telemóvel (localStorage, chave `rfc1`). Nunca mudar a estrutura de `st` sem migrar.

## Regras do plano (não mudar sem o Tiago pedir)
- 14 anos: técnica primeiro, nunca até à falha, nunca máximos. Semanas 1–3 peso fixo; a partir da 4.ª a app sugere +1 kg (halteres) / +2,5 kg (máquinas/barra) quando o anterior foi "fácil".
- Nordic só a partir da semana 4 (antes é Hamstring Walkout) — campo 5 do item.
- Semana: ginásio terça e quinta com jogo ao domingo; sem jogo, terça e sábado. Quarta folga total. Véspera = 12′ mobilidade; dia a seguir = 15′ recuperação. Ginásio nunca a menos de 2 dias do jogo.
- "Semana de jogo importante": 1 ginásio só, sem saltos, menos 1 série.
- Sem chat Coach, sem contador de proteína, sem suplementos.
- Visual de futebol mas sem emblemas, marcas ou nomes de clubes/ligas.

## Como trabalhar
1. Mudar em `src/`, build, check. 2. Testar em Playwright 390×844. 3. Commit + push. 4. Se correr mal, `git revert` e push.
