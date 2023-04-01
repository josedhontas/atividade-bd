const express = require('express');
const router = express.Router();

const fs = require('fs');

/**
 * @swagger
 * components:
 *   schemas:
 *     Usuario:
 *       type: object
 *       required:
 *         - cpf
 *         - nome
 *         - data_nascimento
 *       properties:
 *         cpf:
 *           type: integer
 *           description: CPF do usuário
 *         nome:
 *           type: string
 *           description: Nome do usuário
 *         data_nascimento:
 *           type: string
 *           format: date
 *           description: Data de nascimento do usuário
 *       example:
 *         cpf: 12345678901
 *         nome: João da Silva
 *         data_nascimento: 2000-01-01
 */

/**
 * @swagger
 * /usuarios:
 *   post:
 *     summary: Cria um novo usuário
 *     tags:
 *       - Usuários
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Usuario'
 *     responses:
 *       200:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       400:
 *         description: Campos obrigatórios não informados
 */
router.post('/', (req, res) => {
    const { cpf, nome, data_nascimento } = req.body;
  
    if (!cpf || !nome || !data_nascimento) {
      return res.status(400).send('Informe todos os campos obrigatórios');
    }
  
    const usuario = { cpf, nome, data_nascimento };
  
    // Lê os usuários existentes do arquivo JSON
    let usuarios = [];
    try {
      const data = fs.readFileSync('usuarios.json');
      usuarios = JSON.parse(data);
    } catch (error) {
      console.error(error);
    }
  
    // Adiciona o novo usuário à lista de usuários
    usuarios.push(usuario);
  
    // Escreve a lista atualizada de usuários para o arquivo JSON
    fs.writeFile('usuarios.json', JSON.stringify(usuarios), (error) => {
      if (error) {
        console.error(error);
        return res.status(500).send('Erro ao adicionar usuário');
      }
      res.send(usuario);
    });
  });

/**
 * @swagger
 * /usuarios/{cpf}:
 *   get:
 *     summary: Retorna um usuário pelo CPF
 *     tags:
 *       - Usuários
 *     parameters:
 *       - name: cpf
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       404: /**
 * @swagger
 * /usuarios/{cpf}:
 *   get:
 *     summary: Retorna um usuário pelo CPF
 *     tags:
 *       - Usuários
 *     parameters:
 *       - name: cpf
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       404:
 *         description: Usuário não encontrado
 */
router.get('/:cpf', (req, res) => {
    const cpf = parseInt(req.params.cpf);
  
    // Lê os usuários existentes do arquivo JSON
    let usuarios = [];
    try {
      const data = fs.readFileSync('usuarios.json');
      usuarios = JSON.parse(data);
    } catch (error) {
      console.error(error);
    }
  
    // Busca o usuário pelo CPF na lista de usuários
    const usuario = usuarios.find(u => u.cpf === cpf);
  
    if (!usuario) {
      return res.status(404).send('Usuário não encontrado');
    }
  
    res.send(usuario);
  });

module.exports = router;
