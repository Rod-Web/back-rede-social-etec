import express from "express"

import { autenticarToken } from "../Middlewares/auntenticarToken.js";
import { tratamentoDadosPostagem } from "../Service/Tratamento_Dados/dadosPostagem.js";

export const Router_Postagem = express.Router()


Router_Postagem.get("/inserirPostagem", autenticarToken, async (req, res) => {
    console.log(req.usuario)
    try {
      if (!req.usuario.rm)
        throw new Error("Usuário com credenciais inválidas.");

      const dadosPostagem = await tratamentoDadosPostagem(req.body)
      await inserirPostagem(dadosPostagem);

    } catch (erro) {
      console.error("❌ Erro ao autenticar:", erro.message);
    }
});