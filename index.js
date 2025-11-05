// Importação dos módulos necessários
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// Importação das funções de conexão e inserção
import { testarConexao } from './src/DAO/conexao.js';

// Importação das rotas
import { Router_Professor } from './src/Router/professor.js';
import { Router_Login } from './src/Router/login.js';
import { Router_Aluno } from './src/Router/aluno.js';

// Inicialização do Express e configuração do dotenv
const app = express();
dotenv.config();

app.use(cors())

// Middleware para interpretar JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Uso das rotas

app.use('/professor', Router_Professor);                      
app.use('/login', Router_Login);
app.use('/alunos', Router_Aluno);

// Rota raiz para teste
app.get('/', (req, res) => {
  res.send('Hello World!');
});


// Definição da porta e inicialização do servidor
const PORT = process.env.PORTA || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta: ${PORT}`);
  testarConexao();
});