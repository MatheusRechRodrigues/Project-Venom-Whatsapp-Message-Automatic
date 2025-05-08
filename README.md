# 🤖 WhatsApp Auto Responder Bot (Venom)

Automatize respostas no seu WhatsApp Business com **respostas automáticas para cada nova mensagem recebida**, mesmo que o cliente já tenha conversado antes. Ideal para empresas que precisam agilizar o atendimento sem depender da API oficial da Meta.

---

## 📌 Objetivo

Criar um bot que:

* Responda **automaticamente toda nova mensagem** recebida no WhatsApp.
* **Não dependa da API oficial da Meta**.
* Permita configurar o intervalo mínimo entre respostas por cliente.
* Use o número atual da empresa sem burocracia de aprovação.

---

## ⚙️ Tecnologias Utilizadas

* [Venom Bot](https://github.com/orkestral/venom): biblioteca que simula o WhatsApp Web via Node.js
* Node.js (v16 ou superior)
* JavaScript (ES6)
* Estrutura modular e profissional

---

## 📁 Estrutura de Pastas

```
venom-bot-whatsapp/
├── src/
│   ├── bot.js            # Lógica principal do bot
│   └── config.js         # Configurações da mensagem e intervalo
│
├── logs/
│   └── messages.log      # (opcional) Log de mensagens trocadas
│
├── .gitignore            # Ignora node_modules, logs, etc.
├── package.json          # Scripts e dependências
├── README.md             # Este arquivo
```

---

## 🚀 Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/venom-bot-whatsapp.git
cd venom-bot-whatsapp
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Inicie o bot

```bash
npm start
```

📲 No primeiro uso, será exibido um QR Code. Escaneie com o WhatsApp da empresa (como se fosse usar o WhatsApp Web).

---

## ✏️ Configuração

Abra `src/config.js` para ajustar:

```js
module.exports = {
  mensagemPadrao: '👋 Opa! Já vimos sua mensagem, logo vamos te chamar, blz?',
  intervaloRespostasMs: 1000 * 60 * 60 * 4 // 4 horas
};
```

> 💡 Isso garante que cada cliente receba apenas **uma resposta automática a cada 4 horas**.

---

## 📄 Exemplo de Lógica (src/bot.js)

```js
const { create } = require('venom-bot');
const config = require('./config');

const ultimosContatos = {};

create({ session: 'whatsapp-bot' })
  .then((client) => start(client))
  .catch((erro) => console.log(erro));

function start(client) {
  client.onMessage(async (message) => {
    const id = message.from;
    const agora = Date.now();

    if (
      !message.isGroupMsg &&
      !message.fromMe &&
      (!ultimosContatos[id] || agora - ultimosContatos[id] > config.intervaloRespostasMs)
    ) {
      ultimosContatos[id] = agora;
      await client.sendText(id, config.mensagemPadrao);
    }
  });
}
```

---

## 🔒 Segurança & Ética

> **IMPORTANTE:** Este projeto **não utiliza a API oficial da Meta**, sendo considerado *não-oficial*. Isso significa que:

* O uso **leve e responsável** (como resposta automática) apresenta **baixo risco de bloqueio**.
* Evite spam, envios em massa ou violações das políticas do WhatsApp.

Recomendado para uso moderado, com foco em agilidade no suporte.

---

## 📌 Casos de Uso Recomendados

* Atendimento inicial automático
* Resposta fora do horário comercial
* Mensagem padrão para todos os contatos
* Operação com o WhatsApp Business local (sem servidores externos)

---

## 🤝 Contribuições

Contribuições são bem-vindas! Crie uma issue ou abra um pull request.


---

## 📋 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
