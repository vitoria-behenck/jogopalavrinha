# PRD — Palavra do Dia (versão refinada)

**Data:** 2026-10-20  
**Status:** decisões do MVP definidas; pronto para validação e implementação iterativa.

## 1. Visão geral

O Palavra do Dia é um jogo casual diário de adivinhação de palavras em português, para web responsiva com abordagem mobile-first, voltado principalmente a crianças e jovens de 8 a 18 anos. O MVP será publicado como **site estático**, não exigirá cadastro, não terá monetização e guardará o progresso **somente no navegador do jogador**.

## 2. Problema e objetivos

O jogo deve oferecer uma partida curta, intuitiva e acessível, com regras fáceis de entender, feedback imediato e temas familiares. O objetivo principal é incentivar o retorno diário por meio do desafio do dia e da sequência de partidas (*streak*). Objetivos secundários incluem aprendizagem leve de vocabulário, percepção de progresso e compartilhamento orgânico.

## 3. Público e necessidades

Público principal: crianças e jovens de aproximadamente 8 a 18 anos, que usam celulares e tablets com frequência e preferem desafios simples. Precisam compreender as regras rapidamente, jogar em poucos minutos, receber feedback claro e acompanhar seu progresso sem criar uma conta.

## 4. Proposta de valor e ciclo principal

Cada jogador tem um desafio diário com tema, uma palavra de cinco letras e até seis tentativas. O ciclo é: abrir o site → ver o tema → iniciar → enviar um palpite → interpretar o feedback por letra → vencer ou esgotar as tentativas → consultar estatísticas → compartilhar o resultado sem revelar a solução.

## 5. Regras do jogo

- A palavra tem **exatamente cinco letras**.
- Cada partida oferece **até seis tentativas**.
- A palavra do dia e seu tema são selecionados deterministicamente a partir da data local e de uma lista incorporada ao site.
- A seleção é igual para jogadores com a mesma versão do site e a mesma data local; como não há servidor, não é possível garantir uma data global inviolável.
- Verde indica letra correta na posição correta; amarelo indica letra presente em outra posição; cinza indica letra ausente.
- O feedback não pode depender exclusivamente de cores: deve haver rótulos acessíveis para leitores de tela e outros meios de interpretação.
- A solução só é revelada após vitória ou encerramento da partida.
- Palpites precisam ter cinco letras, pertencer à lista de palavras permitidas e não ter sido tentados antes.
- A partida e as estatísticas são guardadas no armazenamento local do navegador. Não há sincronização entre dispositivos.

## 6. Temas e política de vocabulário

Categorias iniciais: **animais, comida, ciência e esportes**. As palavras-resposta e os palpites aceitos devem compor uma lista local **curada e revisada manualmente** antes de serem publicados. A revisão deve verificar grafia em português, existência e uso comum da palavra, adequação etária, associação correta ao tema e clareza da dica. Não incluir palavras inventadas, abreviações, flexões duvidosas ou entradas usadas apenas para preencher a lista. Palavras com acentos devem ser comparadas de modo consistente, sem que a normalização altere a forma exibida ao jogador.

## 7. Funcionalidades do MVP

1. **Tela inicial:** nome do jogo, instrução de até duas frases, tema e tamanho da palavra do dia, resumo do progresso e botão para jogar.
2. **Tela de partida:** categoria, dica opcional, tabuleiro de seis linhas por cinco letras, teclado virtual, suporte ao teclado físico, envio de palpite, apagar letra e retorno à tela inicial.
3. **Validação:** informar claramente quando o palpite não tiver cinco letras, não estiver na lista permitida ou já tiver sido usado.
4. **Feedback por letra:** correto, presente em outra posição ou ausente; tratar letras repetidas corretamente.
5. **Tela de resultado:** vitória ou derrota, solução revelada, tentativas utilizadas, sequência atual e opção de compartilhar.
6. **Estatísticas locais:** sequência atual, melhor sequência, vitórias, partidas, última palavra resolvida e percentual de acerto.
7. **Compartilhamento:** copiar ou compartilhar o padrão de resultado sem incluir a solução.
8. **Persistência local:** restaurar partida incompleta e manter estatísticas no mesmo navegador enquanto seus dados não forem apagados.
9. **Responsividade e acessibilidade:** funcionamento em telas pequenas e desktop, foco visível, controles com área confortável e mensagens anunciadas por tecnologia assistiva.

## 8. Requisitos funcionais

- **RF01:** selecionar a palavra e o tema de forma determinística pela data local.
- **RF02:** escolher a resposta exclusivamente a partir da lista de palavras revisadas.
- **RF03:** aceitar somente palpites de cinco letras incluídos na lista de tentativas permitidas.
- **RF04:** normalizar acentos e caixa para comparação, mantendo uma apresentação legível.
- **RF05:** calcular o feedback por letra corretamente, inclusive quando há letras repetidas.
- **RF06:** permitir no máximo seis palpites e impedir repetições na mesma partida.
- **RF07:** concluir a partida ao acertar ou ao utilizar a sexta tentativa.
- **RF08:** persistir partida e estatísticas no `localStorage`.
- **RF09:** manter sequência diária e estatísticas básicas localmente.
- **RF10:** compartilhar ou copiar o resultado sem revelar a palavra.
- **RF11:** aceitar teclado físico e teclado virtual.
- **RF12:** funcionar de forma responsiva em navegadores modernos.
- **RF13:** funcionar como site estático, sem servidor, conta ou requisições a serviços externos.

## 9. Requisitos não funcionais

- Carregamento rápido e baixo consumo de dados.
- Interface clara e adequada a telas pequenas.
- Objetivo de conformidade de contraste com WCAG 2.2 nível AA.
- Não comunicar estado somente por cor.
- Navegação por teclado, foco visível, semântica HTML e mensagens de estado acessíveis.
- Sem cadastro, coleta remota de métricas ou monetização no MVP.
- Os dados locais devem ser tratados como dados do dispositivo: podem ser apagados pelo usuário e não são recuperáveis em outro dispositivo.

## 10. Regras de negócio

- O desafio é definido pela data local do dispositivo e pela versão publicada do arquivo de palavras.
- A mesma versão do site produz a mesma palavra para a mesma data local.
- O dicionário aceito é estático, curado manualmente e publicado junto com o código.
- Não se pode iniciar uma nova partida no mesmo dia no mesmo navegador após a conclusão, salvo se o usuário apagar os dados locais.
- Uma partida deve atualizar as estatísticas uma única vez ao ser concluída.
- A sequência aumenta em dias consecutivos; uma lacuna reinicia a sequência quando o jogador conclui uma nova partida.
- Como não há backend, o relógio pode ser alterado e as respostas futuras podem ser descobertas inspecionando os arquivos do site. Isso é uma limitação conhecida do MVP.

## 11. Critérios de aceitação

- O site abre sem servidor de aplicação e sem cadastro.
- A palavra do dia tem cinco letras e pertence à lista revisada.
- A interface mostra seis linhas de cinco letras.
- Palpites inválidos ou repetidos são recusados com uma mensagem clara.
- O feedback é exibido imediatamente e trata letras repetidas corretamente.
- A partida termina ao acertar ou depois da sexta tentativa, revelando a solução.
- Recarregar a página restaura a partida em andamento e preserva estatísticas no mesmo navegador.
- O compartilhamento não contém a solução.
- O jogo pode ser utilizado por teclado e em largura de 320 px, com foco visível.
- As cores são acompanhadas por rótulos ou semântica acessível.

## 12. Métricas

Métricas conceituais: retenção D1/D3/D7, conclusão, taxa de vitória, média de tentativas, duração da sessão, sequência média, compartilhamentos, palpites inválidos, abandono inicial e tempo até a primeira tentativa. **No MVP, não haverá coleta remota dessas métricas.** Apenas estatísticas locais mostradas ao próprio jogador serão mantidas.

## 13. Escopo e exclusões

**Incluído:** desafio diário, quatro temas iniciais, palavra de cinco letras, seis tentativas, feedback, resultado, sequência, estatísticas locais, compartilhamento e interface responsiva.

**Fora do MVP:** backend, contas, sincronização entre dispositivos, ranking global, multiplayer, compras, assinaturas, avatares avançados, painel administrativo, telemetria remota e dificuldade adaptativa.

## 14. Decisões confirmadas

- **Publicação:** site estático.
- **Vocabulário:** palavras e palpites revisados manualmente.
- **Persistência:** somente navegador, por `localStorage`.
- **Dificuldade:** cinco letras fixas e seis tentativas.
- **Plataforma:** web responsiva, mobile-first.
- **Cadastro e monetização:** não haverá no MVP.

## 15. Próximos passos recomendados

1. **Revisar o vocabulário:** remover entradas artificiais ou incorretas; criar uma lista aprovada de respostas, palpites permitidos, temas e dicas.
2. **Separar respostas de palpites:** manter um arquivo de dados simples e revisável, com validação automatizada para garantir cinco letras e tema preenchido.
3. **Testar as regras:** adicionar testes para letras repetidas, acentos, palpites inválidos, duplicados, sexta tentativa e atualização única das estatísticas.
4. **Testar persistência:** verificar recarga durante partida, conclusão do dia, mudança de data, limpeza do armazenamento e falha de `localStorage`.
5. **Validar acessibilidade e responsividade:** testar teclado, foco, leitor de tela, contraste, zoom e largura de 320 px.
6. **Validar os três protótipos com alguns usuários:** observar se entendem a regra sem explicação e escolher o design mais claro; registrar o motivo da decisão.
7. **Publicar em hospedagem estática:** validar o site publicado em celular e desktop e confirmar que não depende de caminhos locais.
8. **Fazer revisão final de conteúdo e privacidade:** explicar que o progresso fica no navegador e pode ser perdido ao limpar os dados.

## 16. Definição de pronto

O MVP está pronto para lançamento quando a lista de palavras for revisada, os critérios de aceitação forem testados, os principais problemas de acessibilidade forem corrigidos e a versão estática funcionar em navegadores modernos, celular e desktop. A publicação não deve ser considerada validada apenas pela análise estática do código.
