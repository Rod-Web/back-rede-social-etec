// importação do Express e criação do Router para o usuário
import express from "express";
export const Router_Login = express.Router();

// Importação da função de autenticação
import { autenticar } from "../Service/Autenticacao/autenticar.js";


Router_Login.post('/', async (req, res) => {
  
  const { usuario, identificador, senha } = req.body;

  if (usuario === "professor" || usuario === "aluno" ) {
    
    const resultado = await autenticar(usuario, identificador, senha);

    if (resultado.sucesso) {
      
      res
      .json({
        sucesso: true,
        token: resultado.token,
        usuario: resultado.usuario
      });
    
    } else {
    
      res
      .status(401)
      .json({ 
        sucesso: false, 
        mensagem: resultado.mensagem 
      });

    }
    
  } else {
    
    res
    .status(400)
    .json({ 
      sucesso: false, 
      mensagem: "Tipo de usuário não identificado." 
    });

  }

});


