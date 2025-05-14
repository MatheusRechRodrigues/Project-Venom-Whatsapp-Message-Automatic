const { create } = require('venom-bot');
const config = require('./config');

const ultimosContatos = {};

create({
  session: 'whatsapp-bot',
  headless: false, // <- ISSO FAZ ABRIR O NAVEGADOR NORMAL
  browserPath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe' // caminho do Chrome (ajuste se for diferente)
})
  .then((client) => start(client))
  .catch((erro) => console.log('Erro ao iniciar o bot:', erro));

function start(client) {
  console.log('🤖 Bot iniciado com sucesso!');
  client.onMessage(async (message) => {
    const id = message.from;
    const agora = Date.now();

    const podeResponder =
      !message.isGroupMsg &&
      !message.fromMe &&
      (!ultimosContatos[id] || agora - ultimosContatos[id] > config.intervaloRespostasMs);

    if (podeResponder) {
      ultimosContatos[id] = agora;
      await client.sendText(id, config.mensagemPadrao);
      console.log(`✅ Mensagem enviada para: ${id}`);
    }
  });
}
