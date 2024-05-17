import express from 'express';
import { gemini_response } from './gemini.js';

const server = express();
server.use(express.json());

server.get('/', (req, res) => {
  res.send('Hello World');
});

server.get('/get_llm_response/:prompt', (req, res) => {
  // lembre-se de rodar o npm install
  // lembre-se de rodar o npm start
  const promptText = req.params.prompt;
  const fullPrompt = "RESPONSE IN HTML FORMAT: " + promptText; // altere aqui e na url para o que deseja que o modelo responda, seja criativo, mais do que eu fui aqui

  //exemplo: http://localhost:3000/get_llm_response/crie_um_joguinho_bem_simples_com_html_css_e_js_tem_que_funcionar_viu_?
  
  gemini_response(fullPrompt).then(response => {
    res.send(response);
    console.log(response);
  }).catch(error => {
    res.status(500).send('There was an error!');
  });
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});