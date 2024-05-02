## Clonando o repositorio da lari
- Na sua area de trabalho e crie uma pasta chamada projetos
- Abra seu VS Code e abra essa pasta nele
- Com o VS Code aberto nessa pasta, abra o terminal do VS code (la em cima, terminal/novo terminal)
- No terminal cole e execute o seguinte comando para CLONAR o repositorio da lari. (ignore o ~~shell, ele serve só para deixar bonitinho o codigo que ta dentro. Copie apenas o que ta dentro)
~~~~shell
git clone https://github.com/Lariisssa/curso-backend.git #isso clona o repositorio curso-backend da lari
cd curso-backend #isso navega para dentro da pasta do repositorio que você acabou de clonar
~~~~

Com isso feito, você fez o clone do repositorio.

CASO você esteja assistindo a aula em tempo real, ela seguirá os comandos a seguir para continuar a configuração do projeto. Caso contrario, o clone do repositorio virá com o projeto minimamente configurado.

## Passo a passo para a configuração do projeto Node
No terminal, para iniciar o projeto, execute:
~~~~shell
npm init -y
~~~~

Após isso, o arquivo package.json será criado com os dados relevantes para o inicio do projeto NODE.
Há apenas uma modificação que precisaremos fazer. Entre no arquivo package.json, e entre a linha 5 e a linha 6 adicione a seguinte linha:
~~~~json
"type": "module",
~~~~
Isso ajustará a forma como trabalharemos com o NODE para uma mais intuitiva.

Crie um arquivo chamado server.js, com o seguinte conteudo
~~~~js
import { createServer } from 'node:http'

const server = createServer((request, response) => {
  response.write('Hello, World!')

  return response.end()
}

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
});
~~~~

Para iniciar o servidor, utilize
npm start