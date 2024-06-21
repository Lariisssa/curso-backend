import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import multer from 'multer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = express();
const port = 3000;

// Configura o multer
const upload = multer();

server.use(express.static(path.join(__dirname, 'contexto', 'public')));
server.use(express.urlencoded({ extended: true }));
server.use(bodyParser.urlencoded({ extended: true }));

server.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'contexto', 'views', 'index.html'));
});

// Use multer para lidar com multipart/form-data
server.post('/processar-tentativa', upload.none(), async (req, res) => {
  const tentativa_usuario = req.body.palavra_tentada;
  const porcentagem_de_similaridade = Math.random() * 100;

  console.log('Palavra tentada:', tentativa_usuario); // Log para verificar o valor recebido
  res.json({ palavra_tentada: tentativa_usuario, porcentagem_de_similaridade: porcentagem_de_similaridade});
});

server.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
