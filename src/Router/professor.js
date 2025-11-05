// Importação do Express
import express from "express";

// Importação da função de tratamento de dados
import { tratamentoDadosProfessor } from "../Service/Tratamento_Dados/dadosProfessores.js";

// Importação da função de inserção de professor
import { inserirProfessor } from "../DAO/POST/inserirProfessor.js";

// Criação do roteador
export const Router_Professor = express.Router();

// Definição da rota para inserir professor
Router_Professor.post('/inserirProfessor', async (req, res) => {
  try {
  
    const dadosTratados = await tratamentoDadosProfessor(req.body);
    await inserirProfessor(dadosTratados);

    res
    .status(201)
    .json({ 
      mensagem: "Professor cadastrado com sucesso!", 
      dados: dadosTratados 
    });
  
  } catch (error) {

    res
    .status(400)
    .json({ 
      erro: error.message 
    });

   }

});


