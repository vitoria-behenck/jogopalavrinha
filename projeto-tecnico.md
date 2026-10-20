# Documento de projeto técnico — Palavra do Dia

## 1. Arquitetura do MVP

Aplicação estática no navegador, sem servidor. `index.html` contém as telas, `styles.css` define a apresentação responsiva, `app.js` implementa regras e estado, e `prototipos.html` permite comparar três direções visuais. O progresso e as estatísticas são armazenados no `localStorage` do navegador.

## 2. Decisões confirmadas

- Publicação em hospedagem estática, sem backend ou chamadas externas.
- HTML semântico, CSS responsivo e JavaScript puro, sem dependências obrigatórias.
- Palavras-resposta e palpites permitidos mantidos em dados locais e revisados manualmente antes de cada lançamento.
- Resposta com exatamente cinco letras e seis tentativas por partida.
- Persistência exclusiva no navegador; não há conta nem sincronização entre dispositivos.
- Seleção diária determinística pela data local do dispositivo. A mesma versão do site produz a mesma resposta para a mesma data local, mas o relógio pode ser manipulado e as respostas futuras podem ser vistas no código publicado.

## 3. Organização recomendada dos dados

Separar o conteúdo do mecanismo do jogo em arquivo dedicado, por exemplo `words.js` ou `data/words.json`. Cada entrada deve conter:

- `word`: resposta em forma canônica;
- `category`: uma das categorias aprovadas;
- `hint`: dica curta e revisada;
- `allowedGuesses`: lista de palpites aprovados para a categoria ou um dicionário comum separado.

Critérios de validação para a lista: resposta com cinco letras após normalização, ausência de duplicatas, categoria preenchida, dica não vazia, palavras existentes e adequadas à faixa etária. Evitar palavras artificiais incluídas somente para aumentar o dicionário. Manter a forma com acentos para exibição, se aplicável, e uma forma normalizada para comparação.

## 4. Modelo de dados local

`wordday:v1`: `{ date, answer, category, guesses, feedback, status, completedAt }`.

`wordday:stats:v1`: `{ currentStreak, bestStreak, wins, games, lastPlayedDate, lastSolvedWord, history }`.

O histórico local deve guardar somente data, resultado e número de tentativas necessários às estatísticas. Não existe identificador de usuário nem transmissão remota.

## 5. Fluxo de estado

`ready` → `playing` → `won` ou `lost`. Ao enviar um palpite, validar tamanho, existência na lista e duplicidade; calcular feedback em duas passagens para lidar corretamente com letras repetidas; persistir o estado; finalizar após vitória ou sexta tentativa. As estatísticas devem ser atualizadas apenas uma vez por partida concluída.

## 6. Acessibilidade e responsividade

- HTML semântico, rótulos claros e regiões `aria-live` para mensagens de estado.
- Foco visível e uso completo por teclado físico.
- Teclado virtual com nomes acessíveis para apagar e enviar.
- Contraste de texto com objetivo WCAG 2.2 AA.
- Não depender apenas de cor; incluir rótulos/descrições dos estados das letras.
- Respeitar `prefers-reduced-motion`.
- Testar larguras a partir de 320 px, zoom e leitores de tela.

## 7. Privacidade e limitações

O jogo não solicita dados pessoais e não envia estatísticas a um servidor. `localStorage` pode ser apagado pelo usuário, é específico ao navegador/dispositivo e não deve ser tratado como armazenamento permanente. Como as respostas são incluídas nos arquivos públicos do site estático, usuários podem inspecionar o código e descobrir palavras futuras. Se for necessário impedir isso, sincronizar progresso ou garantir um desafio global confiável, será preciso reconsiderar a arquitetura e incluir backend.

## 8. Plano de testes

1. Rejeitar palpite com tamanho diferente de cinco letras.
2. Rejeitar palavra fora do dicionário aprovado.
3. Impedir palpite repetido.
4. Confirmar feedback para letras repetidas.
5. Confirmar normalização de maiúsculas e acentos.
6. Encerrar corretamente ao acertar.
7. Encerrar e revelar resposta após seis erros.
8. Garantir que estatísticas sejam atualizadas uma única vez.
9. Restaurar partida em andamento após recarregar.
10. Preservar conclusão do dia no mesmo navegador.
11. Testar mudança de data e sequência diária.
12. Testar compartilhamento com e sem `navigator.share`.
13. Testar teclado físico, foco, mensagens anunciadas, contraste e leitor de tela.
14. Testar em celular estreito e desktop.
15. Testar comportamento quando o armazenamento local estiver indisponível.
16. Validar automaticamente o arquivo de palavras: cinco letras, tema válido, dica preenchida e sem duplicatas.

## 9. Plano de entrega

1. Corrigir e revisar manualmente o dicionário inicial.
2. Separar dados de palavras do código de interface.
3. Implementar testes automatizados das regras críticas.
4. Realizar revisão de acessibilidade e teste manual em dispositivos reais.
5. Escolher o protótipo após teste breve de usabilidade.
6. Publicar em hospedagem estática e repetir os testes na URL final.
7. Documentar limitações: armazenamento local, dependência do relógio do dispositivo e ausência de telemetria.
