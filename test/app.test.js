const assert = require('node:assert/strict');
const fs = require('node:fs');
const test = require('node:test');
const vm = require('node:vm');

class FakeElement {
  constructor(id = '') {
    this.id = id;
    this.hidden = false;
    this.textContent = '';
    this.innerHTML = '';
    this.children = [];
    this.listeners = {};
    this.classList = {
      add: () => {},
      toggle: () => {}
    };
  }

  addEventListener(type, listener) {
    this.listeners[type] = listener;
  }

  click() {
    this.listeners.click?.({ preventDefault() {} });
  }

  appendChild(child) {
    this.children.push(child);
    return child;
  }

  setAttribute() {}
  showModal() {}
}

function loadApp() {
  const elements = new Map();
  const document = {
    getElementById(id) {
      if (!elements.has(id)) elements.set(id, new FakeElement(id));
      return elements.get(id);
    },
    createElement() {
      return new FakeElement();
    },
    addEventListener() {}
  };
  const storage = new Map();
  const window = {
    __PALAVRINHA_TEST__: {},
    scrollTo() {},
    localStorage: {
      getItem: key => storage.get(key) || null,
      setItem: (key, value) => storage.set(key, value)
    }
  };
  const context = vm.createContext({
    document,
    window,
    localStorage: window.localStorage,
    Intl,
    Date,
    Math,
    JSON,
    console
  });
  vm.runInContext(fs.readFileSync('app.js', 'utf8'), context);
  return { api: window.__PALAVRINHA_TEST__.api, elements };
}

test('normaliza acentos e caracteres não alfabéticos', () => {
  const { api } = loadApp();
  assert.equal(api.normalize('ação! 123'), 'ACAO');
});

test('marca letras corretas, presentes e ausentes', () => {
  const { api } = loadApp();
  assert.deepEqual(Array.from(api.getFeedback('ARARA', 'RATOS')), [
    'present', 'present', 'absent', 'absent', 'absent'
  ]);
});

test('preserva a regra de letras repetidas', () => {
  const { api } = loadApp();
  assert.deepEqual(Array.from(api.getFeedback('AAAAA', 'ABACA')), [
    'correct', 'absent', 'correct', 'absent', 'correct'
  ]);
});

test('inicia uma partida com seis linhas vazias', () => {
  const { api, elements } = loadApp();
  api.startGame();
  assert.equal(elements.get('gameScreen').hidden, false);
  assert.equal(elements.get('board').children.length, 6);
  assert.equal(api.getState().status, 'playing');
});

test('recusa palpite incompleto sem alterar tentativas', () => {
  const { api, elements } = loadApp();
  api.startGame();
  api.addLetter('A');
  api.submitGuess();
  assert.equal(api.getState().guesses.length, 0);
  assert.equal(elements.get('statusMessage').textContent, 'Sua palavra precisa ter 5 letras.');
});

test('aceita a resposta do dia e conclui a partida', () => {
  const { api } = loadApp();
  api.startGame();
  for (const letter of api.getState().answer) api.addLetter(letter);
  api.submitGuess();
  assert.equal(api.getState().status, 'won');
  assert.equal(api.getState().guesses.length, 1);
});
