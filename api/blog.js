// Array na memória simulando o arquivo posts.txt
// (Lembrando: em produção na Vercel, isso zera se a função hibernar)
let postsDb = [];

export default function handler(req, res) {
  // Configuração de CORS para permitir acessos
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // 1. LISTAR TODOS OS DADOS (GET)

  if (req.method === 'GET') {
    // Retorna os posts invertidos (do mais novo para o mais velho)
    // exatamente como o `reversed(posts)` do seu Python
    const postsReversos = [...postsDb].reverse();
    
    return res.status(200).json({
      total: postsReversos.length,
      posts: postsReversos
    });
  } 

  // 2. CRIAR A ATIVIDADE / POSTAR (POST)

  else if (req.method === 'POST') {
    const payload = req.body;

    // Verifica se o payload tem a estrutura exata que você pediu
    if (payload.action === 'post' && payload.message && payload.author) {
      
      // Cria a data no formato DD/MM/YYYY HH:MM:SS
      const dataFormatada = new Date().toLocaleString('pt-BR', { timeZone: 'America/Bahia' });

      // Monta o objeto simulando a linha do seu .txt
      const novoPost = {
        data: dataFormatada,
        author: payload.author,
        message: payload.message
      };

      // Salva no "banco"
      postsDb.push(novoPost);

      return res.status(201).json({ 
        sucesso: true, 
        mensagem: "Post criado com sucesso!",
        dados: novoPost
      });

    } else {
      // Se mandar o payload errado, barra a requisição
      return res.status(400).json({ 
        erro: "Payload inválido. Certifique-se de enviar action='put', message e author." 
      });
    }
  } 
  
  // Qualquer outro método é bloqueado
  else {
    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).end(`Método ${req.method} não permitido`);
  }
}
