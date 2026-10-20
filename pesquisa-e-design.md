# Pesquisa de referência e decisões de design

## Padrões relevantes em jogos de adivinhação
O PRD descreve um ciclo diário curto: conhecer tema/tamanho, enviar uma palavra, interpretar feedback por letra, ajustar o próximo palpite e compartilhar o resultado. Para reduzir atrito, o protótipo deve mostrar as regras antes ou durante a primeira partida, validar entradas sem ambiguidades e oferecer retorno imediato.

## Acessibilidade
- A WCAG 2.2, critério 1.4.3, pede contraste de pelo menos 4,5:1 para texto comum e 3:1 para texto grande.
- A informação não deve depender exclusivamente de verde/amarelo/cinza. O jogo combina cor, forma e rótulos acessíveis (“correta”, “em outra posição”, “ausente”) e anuncia o feedback para leitores de tela.
- O teclado físico e os controles na tela devem ser utilizáveis, com foco visível e botões grandes para toque. A WCAG 2.2 também define requisitos para foco visível e tamanho mínimo de alvos (2.4.7 e 2.5.8).
- Como o público inclui crianças e adolescentes, minimizar a coleta de dados é uma decisão importante. A ANPD informa que o ECA Digital estabelece regras adicionais para a proteção de crianças e adolescentes no ambiente digital; uma versão futura com contas, telemetria ou anúncios precisará de análise de privacidade e requisitos legais específicos.

## Referências consultadas
- W3C. *Understanding Success Criterion 1.4.3: Contrast (Minimum)*. https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum/ (acesso em 20 out. 2026).
- W3C. *Diretrizes de Acessibilidade para Conteúdo Web (WCAG) 2.2 — tradução em português*. https://www.w3.org/Translations/WCAG22-pt-BR/ (acesso em 20 out. 2026).
- Microsoft Learn. *Xbox Accessibility Guideline 103: Don't use color alone to convey information*. https://learn.microsoft.com/en-us/xbox/accessibility/xbox-accessibility-guidelines/103 (acesso em 20 out. 2026).
- W3C. *What's New in WCAG 2.2*. https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/ (acesso em 20 out. 2026).
- Autoridade Nacional de Proteção de Dados (ANPD). *ECA Digital*. https://www.gov.br/anpd/pt-br/assuntos/eca-digital (acesso em 20 out. 2026).
- TechRadar. *NYT Wordle today* (referência jornalística para o formato e a popularidade do jogo; não usada como fonte normativa). https://www.techradar.com/news/wordle-today (acesso em 20 out. 2026).

## Conclusões aplicadas ao MVP
1. Partida curta e com regras visíveis.
2. Uma palavra diária e tema em destaque.
3. Feedback visual imediato, reforçado por texto/semântica acessível.
4. Compartilhamento sem solução.
5. Estatísticas locais, explicitamente diferenciadas de analytics remotos.

## Limites da pesquisa
Esta é uma pesquisa inicial orientada ao MVP, não um estudo quantitativo de retenção nem uma auditoria formal WCAG. A lista de palavras do protótipo é pequena e deve ser revisada linguisticamente e ampliada antes de lançamento público.
