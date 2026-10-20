# Revisão do projeto — três perspectivas especializadas

Este documento registra uma revisão independente por perspectiva de especialidade. Não é uma auditoria automatizada nem uma certificação de conformidade.

## 1. UX design — fluxo e clareza
**Verificado:** tela inicial explica a mecânica, tema e quantidade de tentativas; jogo separa tabuleiro, teclado, mensagem de estado e saída; resultado revela palavra e oferece compartilhamento; estatísticas estão disponíveis.

**Pontos a melhorar antes de produção:** validar a compreensão com crianças/jovens reais; rever o texto do botão “Encerrar partida” para evitar encerramentos acidentais; fornecer feedback claro quando o jogador já terminou o desafio do dia; expandir e revisar o banco de palavras com falantes de português.

## 2. Acessibilidade web — teclado, contraste e semântica
**Verificado no código:** navegação por teclado físico, `:focus-visible`, região `aria-live`, legenda explicativa, rótulos nas casas após tentativa, controles HTML nativos e respeito a `prefers-reduced-motion`.

**Pontos a melhorar antes de produção:** testar com leitor de tela real; medir contraste de todos os estados e do teclado; confirmar que o feedback por tecla virtual representa corretamente letras repetidas; realizar teste manual com teclado somente e zoom a 200%. A presença de atributos acessíveis não equivale a uma auditoria WCAG completa.

## 3. Design visual — consistência e responsividade
**Verificado:** tokens de cor consistentes, tipografia hierarquizada, cartões, estados de letras, telas para início/jogo/resultado e três direções de protótipo em `prototipos.html`.

**Pontos a melhorar antes de produção:** testar em dispositivos reais, avaliar fonte externa (Google Fonts) em redes lentas, garantir que o layout do teclado não aperte em telas de 320 px e validar a identidade visual com usuários.

## 4. Revisão de código — conformidade funcional
**Verificado por inspeção:** fluxo de partida, limite de seis palpites, comparação de letras em duas passagens para considerar letras repetidas, bloqueio de palpites repetidos, persistência local, resultado e compartilhamento sem a palavra no texto compartilhado.

**Limitações relevantes:** não há backend; `localStorage` pode ser apagado ou alterado; a palavra futura está no JavaScript enviado ao navegador; o relógio local pode ser alterado; o dicionário é pequeno; o recurso de compartilhamento depende do navegador. As estatísticas locais não medem retenção real nem são enviadas a um servidor.

## 5. Conclusão
O protótipo cobre o fluxo principal do MVP em uma aplicação estática. Antes de lançamento público, priorizar expansão/revisão do dicionário, testes funcionais automatizados, teste de acessibilidade manual, revisão do cálculo de sequência em cenários de datas alteradas e definição de backend caso sejam necessárias estatísticas globais ou palavra diária inviolável.

## 6. Agente revisor de conformidade — matriz resumida

| Requisito do PRD | Situação | Observação |
|---|---|---|
| Tela inicial com tema e instrução curta | Implementado | Tema e regra aparecem antes da partida. |
| Até seis tentativas e feedback por letra | Implementado | Feedback verde/amarelo/cinza, com rótulo textual. |
| Validar tamanho, palavra permitida e repetição | Implementado | A lista permitida é local e limitada. |
| Resultado e solução ao final | Implementado | Após vitória, derrota ou encerramento manual. |
| Estatísticas básicas | Parcial | Localmente; não há sincronização entre dispositivos. |
| Streak atual e melhor streak | Implementado localmente | Baseado em partidas concluídas no navegador. |
| Compartilhar sem revelar a solução | Implementado | Usa quadrados de feedback e contagem de tentativas. |
| Teclado físico e teclado virtual | Implementado | Teste manual com leitores de tela ainda pendente. |
| Layout responsivo | Implementado em CSS | Precisa de validação visual real em vários dispositivos. |
| Palavra global inviolável por dia | Parcial | Determinística por data do dispositivo; não há servidor e o relógio pode ser alterado. |
| Banco de palavras adequado à faixa etária | Parcial | Banco inicial pequeno; precisa de revisão e ampliação. |
| Métricas de retenção e compartilhamento | Não implementado remotamente | Sem analytics ou backend, como esperado para protótipo estático. |
| Carregamento abaixo de 2 segundos | Não medido | Critério ainda precisa de medição em rede/dispositivos de referência. |

**Conclusão de conformidade:** o fluxo central do MVP está representado; estatísticas globais, banco de palavras robusto, medição de desempenho e garantia de palavra diária centralizada permanecem pendentes para produção.
