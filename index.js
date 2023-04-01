const express = require('express');
const app = express();
const usuariosRouter = require('./usuarios');
const swaggerDocs = require('./swagger');

app.use(express.json());

app.use('/usuarios', usuariosRouter);

swaggerDocs(app);

app.listen(8000, () => {
  console.log('Servidor iniciado na porta 8000');
});
