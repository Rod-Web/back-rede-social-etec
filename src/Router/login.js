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
      .cookie("token", resultado.token, {
        httpOnly: true,        // ✅ protege o token contra acesso via JS (segurança contra XSS)
        secure: true,          // ✅ exige HTTPS (ou localhost em ambiente dev)
        sameSite: "none",      // ✅ permite envio do cookie entre domínios diferentes
        path: "/",             // ✅ cookie válido em todo o site
        maxAge: 2 * 60 * 60 * 1000, // ✅ expira em 2h (igual ao token JWT)
      })
      .json({
        sucesso: true,
        usuario: resultado.usuario,
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


