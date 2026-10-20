# PRD — Palavra do Dia

## Visão geral
Jogo casual diário de adivinhação de palavras em português, web responsiva e mobile-first, voltado principalmente a crianças e jovens de 8 a 18 anos. Sem cadastro obrigatório e sem monetização no MVP.

## Problema e objetivos
Oferecer uma partida curta e intuitiva com regras claras, feedback imediato, temas familiares e incentivo para retorno diário. Objetivo principal: recorrência diária e sequência de dias (*streak*). Objetivos secundários: aprendizagem leve de vocabulário, sensação de progresso e compartilhamento orgânico.

## Público e necessidades
Público principal: crianças e jovens que usam celulares/tablets, gostam de desafios simples e querem entender as regras rapidamente, gastar pouco tempo por partida e acompanhar progresso.

## Proposta de valor e ciclo principal
Uma palavra por dia, categoria temática, seis tentativas, feedback por letra, resultado final, estatísticas simples e compartilhamento sem revelar a solução. Fluxo: abrir → ver tema e tamanho → tentar → receber feedback → ajustar → vencer ou esgotar tentativas → consultar resultado/estatísticas → compartilhar.

## Regras do jogo
- A palavra diária é determinada pela data local do produto e é a mesma para todos os jogadores naquele dia.
- No MVP, a palavra tem cinco letras e pertence a uma categoria temática.
- O jogador dispõe de até seis tentativas distintas.
- Verde significa letra na posição correta; amarelo, letra presente em outra posição; cinza, letra ausente.
- Não revelar a resposta antes do fim da partida.
- Validar tentativas antes de aceitá-las e avisar claramente sobre entradas inválidas.
- Uma partida diária por navegador/instalação, sem cadastro.

## Categorias do MVP
Animais, comida, ciência e esportes. A seleção de palavra e categoria muda conforme o dia.

## Funcionalidades
1. Tela inicial com nome, instrução curta, tema do dia e início da partida.
2. Tela de jogo com categoria, quantidade de letras, tabuleiro, teclado virtual, suporte a teclado físico e retorno ao início.
3. Feedback por letra com cores e rótulos textuais acessíveis.
4. Resultado com vitória/derrota, palavra revelada, tentativas utilizadas e opção de compartilhar.
5. Estatísticas: sequência atual, melhor sequência, vitórias, partidas, última palavra resolvida e percentual de acerto.
6. Compartilhamento por cópia e API nativa quando disponível.
7. Layout mobile-first e persistência local sem cadastro.

## Requisitos funcionais
- RF01: escolher a palavra do dia de forma determinística pela data.
- RF02: associar uma categoria à palavra.
- RF03: validar tentativas aceitas no dicionário local do MVP.
- RF04: calcular feedback por letra, respeitando letras repetidas.
- RF05: limitar a seis tentativas e impedir repetição de palpite.
- RF06: registrar o estado e resultado da partida no navegador.
- RF07: atualizar sequência diária e estatísticas locais.
- RF08: exibir estatísticas básicas.
- RF09: copiar/compartilhar resultado sem a solução.
- RF10: responder a teclado físico e virtual.
- RF11: funcionar em telas pequenas e desktop.

## Requisitos não funcionais
- Interface clara, carregamento rápido e baixo consumo de dados.
- Boa legibilidade e botões com área confortável para toque.
- Contraste de texto conforme WCAG 2.2 AA como objetivo de implementação.
- Não depender apenas de cor para comunicar estado.
- Sem cadastro e sem monetização.

## Regras de negócio
- A palavra diária é a mesma para todos os jogadores na mesma data e versão do jogo.
- Só aceitar palavras incluídas no dicionário local.
- Não permitir repetir uma tentativa.
- Registrar a partida como concluída ao acertar ou esgotar as tentativas.
- Atualizar a sequência quando houver participação em dias consecutivos.
- Limitação conhecida: sem backend, dados pessoais/estatísticas não sincronizam entre dispositivos e podem ser apagados ao limpar os dados do navegador.

## Critérios de aceitação
- A instrução cabe em até duas frases curtas.
- O jogo permite até seis tentativas.
- A tentativa é validada antes do envio.
- O feedback aparece imediatamente.
- O resultado aparece após acerto ou sexta tentativa.
- O resultado compartilhado não revela a palavra.
- A interface cabe em celulares estreitos, funciona com teclado e mantém indicação de foco.

## Métricas sugeridas
Retenção D1/D3/D7, conclusão, vitória, média de tentativas, duração de sessão, sequência média, compartilhamentos, tentativas inválidas, abandono inicial e tempo até a primeira tentativa. No MVP sem analytics, essas métricas não serão coletadas remotamente; estatísticas ficam locais.

## Escopo do MVP
Inclui palavra diária, categoria, seis tentativas, feedback, resultado, sequência, estatísticas básicas, compartilhamento e interface responsiva. Exclui ranking global, multiplayer, compras, assinaturas, avatares avançados e recompensas complexas.

## Decisões assumidas para viabilizar o MVP
- Palavra de cinco letras, porque o PRD original diz que o tamanho é fixo, mas não especifica o número.
- Persistência em `localStorage`, sem conta.
- Dicionário inicial pequeno, mantido em arquivo JavaScript; será necessário ampliá-lo para produção.
- O dia é calculado pelo relógio local do dispositivo. Um backend seria necessário para impor uma única data global confiável e evitar manipulação do relógio.
