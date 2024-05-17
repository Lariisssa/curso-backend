import express from 'express'; // importa o servidor express para utilizarmos
import fs from 'fs';  // importa o módulo fs para manipular arquivos

const server = express(); // cria uma instância do servidor express
server.use(express.json()); // habilita o uso de JSON no servidor

server.get('/', (req, res) => { // cria uma rota GET para a raiz do servidor
  res.send('Hello World'); // retorna a mensagem 'Hello World' para quem acessar a rota
}); // fecha a função de callback. Uma função de callback é uma função que é passada como argumento para outra função.

server.get('/create_txt_file', (req, res) => { // cria uma rota GET para a rota /create_txt_file
  const file_content = fs.readFileSync('message.txt', 'utf8');  // lê o conteúdo do arquivo message.txt
  fs.writeFile('message.txt', file_content + ' peidei', (err) => { // escreve no arquivo message.txt o conteúdo lido mais a string ' peidei'
    if (err) throw err; // se houver erro, lança uma exceção. Uma excessao é um erro que ocorre durante a execução de um programa. Lançar uma exceção interrompe a execução do programa.

    console.log('The file has been saved!'); // imprime no console a mensagem 'The file has been saved!'
  }); // fecha a função de callback. Uma função de callback é uma função que é passada como argumento para outra função.
  res.send('File created'); // retorna a mensagem 'File created' para quem acessar a rota
}); // fecha a função de callback. Uma função de callback é uma função que é passada como argumento para outra função.

// copilot, me explique o que o codigo abaixo faz: 
server.listen(3000, () => { // inicia o servidor express na porta 3000
  console.log('Server is running on http://localhost:3000');  // imprime no console a mensagem 'Server is running on http://localhost:3000'
}); // fecha a função de callback. Uma função de callback é uma função que é passada como argumento para outra função.
