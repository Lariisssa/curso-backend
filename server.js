import { createServer } from 'node:http';

const server = createServer((request, response) => {
  response.write('Hello, World!')
  return response.end()
});

server.listen(3001, () => {
  console.log('Server is running on http://localhost:3001')
});
