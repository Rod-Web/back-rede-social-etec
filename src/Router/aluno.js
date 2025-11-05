// Importação do Express
import express, { Router } from "express";

// Importação da função de tratamento de dados
 import { tratamentoDadosAluno } from "../Service/Tratamento_Dados/dadosAlunos.js";

// Importação da função de inserção de aluno
import { inserirAluno } from "../DAO/POST/inserirAluno.js"

// Criação do roteador
export const Router_Aluno = express.Router();

// Definição da rota para inserir aluno
Router_Aluno.post("/inserirAluno", async (req, res) => {

try {
    console.log("Dados recebidos para cadastro de aluno:", req.body);
    const dadosTratados = await tratamentoDadosAluno(req.body);
    console.log("Dados tratados do aluno:", dadosTratados);
    await inserirAluno(dadosTratados);
    res.status(201).json({
      sucesso: true,
      mensagem: "Aluno cadastrado com sucesso!",
      dados: dadosTratados
    });
  } catch (error) {
    // Aqui cai se algum tratamento lançou erro
    res.status(400).json({
      sucesso: false,
      erro: error.message 
    });
  }
  

});
