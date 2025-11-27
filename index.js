// Importação dos módulos necessários
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// Importação das funções de conexão e inserção
import { testarConexao } from './src/DAO/conexao.js';

// Importação das rotas
import { Router_Professor } from './src/Router/professor.js';
import { Router_Login } from './src/Router/login.js';
import { Router_Aluno } from './src/Router/aluno.js';
import { Router_Postagem } from './src/Router/postagem.js';
// 
import { autenticarToken } from './src/Middlewares/auntenticarToken.js';

// Inicialização do Express e configuração do dotenv
const app = express();
dotenv.config();

app.use(
  cors({
    // origin: "https://front-end-rede-social-etec.vercel.app",
    origin: "http://localhost:5501",
    credentials: true,
  })
);

//
app.use(cookieParser())

// Middleware para interpretar JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Uso das rotas

app.use('/professor', Router_Professor);                      
app.use('/login', Router_Login);
app.use("/alunos", Router_Aluno);
app.use("/postagens", Router_Postagem);

// Rota raiz para teste
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get("/perfil", autenticarToken, (req, res) => {
  return res.status(200).json({
    mensagem: "Token válido ✅",
    usuario: req.usuario,
    emitidoEm: new Date().toISOString(),
  });
});


// Definição da porta e inicialização do servidor
const PORT = process.env.PORTA || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta: ${PORT}`);
  testarConexao();
});