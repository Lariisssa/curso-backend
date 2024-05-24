import express from 'express';
import { gemini_response } from './gemini.js';

const server = express();

// Adicione este middleware para analisar corpos de formulário HTML
server.use(express.urlencoded({ extended: true }));

var pagina = `
  <div id="caixa_do_formulario">
    <form action="/process-input" method="post">
        <label for="input">Digite o seu prompt abaixo</label><br>
        <textarea id="input" name="input" rows="4" cols="50"></textarea><br>
        <label>Escolha a função para o prompt</label><br>
        <div class="radio">
          <input type="radio" id="converter_temperatura" name="tipo" value="converter_temperatura">
          <label class="opcoes" for="converter_temperatura">Converter celsius para kelvin</label><br>
        </div>
        <div class="radio">
          <input type="radio" id="formatar_data" name="tipo" value="formatar_data">
          <label class="opcoes" for="formatar_data">Formatação de Data em formato padrão</label><br>
        </div>
        <div class="radio">
          <input type="radio" id="sugerir_titulo" name="tipo" value="sugerir_titulo">
          <label class="opcoes" for="sugerir_titulo">Sugerir Título para um Artigo</label><br>
        </div>
        <div class="radio">
          <input type="radio" id="gerar_resumo" name="tipo" value="gerar_resumo">
          <label class="opcoes" for="gerar_resumo">Gerar resumo de um texto</label><br>
        </div>
        <button type="submit">Enviar</button>
    </form>
  </div>
  <style>
    body {
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-family: Arial, sans-serif;
    }
    .radio {
      display: flex;
      gap: 5px;
      flex-direction: row;
      margin-bottom: 10px;
      align-items: center;

    }
    .opcoes {
      font-weight: 100;
      font-size: 0.8rem;
    }
    #caixa_do_formulario {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 90vh;
    }
    form {
      display: flex;
      flex-direction: column;
      gap: 10px;
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 5px;
      box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);

    }
    label {
      font-weight: 100;
      font-family: Arial, sans-serif;
      text-transform: uppercase;
      text-align: center;
      letter-spacing: 2px;
      font-size: 1.2rem;
    }
    textarea {
      resize: vertical;
    }
    button {
      padding: 10px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
    button:hover {
      background-color: #0056b3;
    }
    #resposta {
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 100;
      font-family: Arial, sans-serif;
      text-align: justify;
      letter-spacing: 2px;
      font-size: 1.2rem;
      margin-top: -20vh;
      max-width: 465px;
    }
  </style>
`

var conversa = '';

server.get('/', (req, res) => {
  res.send(pagina);
});

server.post('/process-input', async (req, res) => {
  const user_input = req.body.input;
  const tipo = req.body.tipo;
  var prompt = prompt_inicial(tipo) + user_input;

  conversa += "Usuário: <br>" + prompt + '<br><br>';
  
  gemini_response(conversa).then(response => {
    conversa += "LLM: <br>" + response + '<br><br>';
    res.send(`${pagina}<div id="resposta">${conversa}</div>`);
  }).catch(error => {
    console.error(error); // Boa prática: logar o erro para diagnóstico
    res.status(500).send('There was an error processing your request.');
  });
    
});

server.listen(3000, () => {
  console.log('Server is running on port 3000. Acesse http://localhost:3000/ no seu navegador.');
});

function prompt_inicial(tipo) {
  switch (tipo) {
    case 'converter_temperatura':
      return 'Converter a temperatura de Celsius para Kelvin: ';
    case 'formatar_data':
      return 'Formate a data para o seguinte formato "dia de mês de ano": ';
    case 'sugerir_titulo':
      return 'Sugira um título para o artigo: ';
    case 'gerar_resumo':
      return 'Gere um resumo do texto: ';
    default:
      return '';
  }

  // Código equivalente ao switch acima
  // if(tipo ==  'converter_temperatura') {
  //   return 'Converter a temperatura de Celsius para Kelvin: ';
  // } else if (tipo == 'formatar_data') {
  //   return 'Formate a data para o formato padrão: ';
  // } else if (tipo == 'contar_palavras') {
  //   return 'Conte as palavras do texto: ';
  // } else if (tipo == 'sugerir_titulo') {
  //   return 'Sugira um título para o artigo: ';
  // } else if (tipo == 'gerar_resumo') {
  //   return 'Gere um resumo do texto: ';
  // } else {
  //   return '';
  // }
}