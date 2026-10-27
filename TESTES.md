# Testes

A bateria cobre as regras essenciais do jogo sem dependências externas:

- normalização de acentos e caracteres;
- feedback de letras corretas, presentes e ausentes;
- letras repetidas;
- inicialização do tabuleiro;
- rejeição de palpite incompleto;
- vitória em uma tentativa e encerramento do estado.

## Executar

Na raiz do projeto:

```bash
node --test test/app.test.js
node --check app.js
```

Os testes usam um DOM mínimo simulado apenas para verificar o fluxo principal. Testes visuais, de leitor de tela e de navegador real continuam sendo validações manuais.
