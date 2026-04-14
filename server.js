import express from 'express';
// Importa o arquivo que você criou dentro da pasta api
import handler from './api/blog.js'; 

const app = express();

// Permite que o Express entenda o JSON do req.body
app.use(express.json());

// Pega qualquer requisição em /api/blog (GET, POST, etc) e joga pra sua função
app.all('/api/blog', (req, res) => {
  handler(req, res);
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando localmente em http://localhost:${PORT}/api/blog`);
});