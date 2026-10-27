# Palavrinha — Palavra do Dia

MVP de jogo diário de adivinhação de palavras em português, feito com HTML, CSS e JavaScript puro.

## Decisões do MVP
- Publicação como site estático.
- Palavra fixa de cinco letras e seis tentativas.
- Respostas e palpites em lista revisada manualmente.
- Estatísticas e progresso guardados apenas no `localStorage` do navegador.
- Sem cadastro, backend, coleta remota de métricas ou monetização.

## Abrir e experimentar
- Abra `index.html` no navegador para jogar.
- Abra `prototipos.html` para comparar as três direções visuais.
- Os documentos do projeto ficam na pasta `docs/`.

## Arquivos principais
- `index.html`: telas e componentes semânticos.
- `styles.css`: estilos responsivos, cores, foco e redução de movimento.
- `app.js`: seleção diária, regras, feedback, estatísticas e compartilhamento.
- `prototipos.html`: três mockups comparáveis.
- `AGENTS.md`: instruções para futuros PRDs.
- `docs/plans/2026-10-20-refinamento-prd-palavra-do-dia.md`: PRD refinado com as decisões confirmadas.
- `docs/projeto-tecnico.md`: arquitetura e plano de testes.
- `docs/pesquisa-e-design.md`: pesquisa e referências.
- `docs/revisao-de-agentes.md`: revisão por perspectivas especializadas.
- `TESTES.md`: bateria automatizada e comandos de verificação.

## Limitações conhecidas
O MVP não usa servidor. A palavra é determinada pela data local e pela lista incorporada ao site; portanto, o relógio pode ser alterado e respostas futuras podem ser encontradas no código público. Estatísticas e progresso não sincronizam entre dispositivos e podem ser apagados ao limpar os dados do navegador. A lista de palpites atual é inicial e precisa de revisão linguística antes de publicação.

## Verificação
- `node --check app.js`: verificação sintática JavaScript.
- `node --test test/app.test.js`: bateria curta das regras e do fluxo principal.
- Revisão estática documentada em `docs/revisao-de-agentes.md`.
- A captura automatizada em Chromium headless não foi concluída no ambiente de desenvolvimento; teste visual automatizado completo ainda é pendência.
