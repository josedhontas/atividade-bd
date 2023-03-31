const express = require('express');
const app = express();

// Array para armazenar os usuários (simulando um banco de dados)
let usuarios = [];

// Middleware para permitir o uso de JSON nas requisições
app.use(express.json());

// Rota POST para criar um usuário
app.post('/usuarios', (req, res) => {
  const { cpf, nome, data_nascimento } = req.body;

  // Verifica se os campos obrigatórios foram enviados
  if (!cpf || !nome || !data_nascimento) {
    return res.status(400).send('Informe todos os campos obrigatórios');
  }

  // Cria um novo usuário
  const usuario = { cpf, nome, data_nascimento };

  // Adiciona o usuário ao array
  usuarios.push(usuario);

  // Retorna o usuário criado com sucesso
  res.send(usuario);
});

// Rota GET para buscar um usuário pelo CPF
app.get('/usuarios/:cpf', (req, res) => {
  const cpf = parseInt(req.params.cpf);

  // Busca o usuário pelo CPF
  const usuario = usuarios.find(u => u.cpf === cpf);

  // Verifica se o usuário foi encontrado
  if (!usuario) {
    return res.status(404).send('Usuário não encontrado');
  }

  // Retorna o usuário encontrado
  res.send(usuario);
});

// Inicia o servidor na porta 8000
app.listen(8000, () => {
  console.log('Servidor iniciado na porta 8000');
});
