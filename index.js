const express = require('express');
const app = express();
const usuariosRouter = require('./routes/usuarios');
const swaggerDocs = require('./swagger');

app.use(express.json());

app.use('/usuarios', usuariosRouter);

app.use('/api-docs', swaggerDocs);

app.listen(8000, () => {
  console.log('Servidor iniciado na porta 8000');
});
