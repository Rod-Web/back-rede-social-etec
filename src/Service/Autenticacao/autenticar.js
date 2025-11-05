import { conexao } from "../../DAO/conexao.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";


dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET

export async function autenticar(usuario, identificador, senha) {
  
  const pool = await conexao();
  const conn = await pool.getConnection();

  let sql;

  try {

    if(usuario === "professor") {
      
      sql = "SELECT * FROM professor WHERE rf = ?";

    } else if (usuario === "aluno") {
      
      sql = "SELECT * FROM aluno WHERE rm = ?";

    } else {

      return {
        sucesso: false, 
        mensagem: "Usuário não identificado na autenticação" 
      };
    }

    const [rows] = await conn.execute(sql, [identificador]);

    if (rows.length === 0) {
      
      return { 
        sucesso: false, 
        mensagem: "Usuário não encontrado" 
      };

    }

    const user = rows[0];    // Armazena o usuário
    
    const senhaValida = await bcrypt.compare(senha, user.senha);

    if (!senhaValida) {

      return { 
        sucesso: false, 
        mensagem: "Senha incorreta" 
      };

    }

    // Gera o token JWT
    let token;
  
    if (usuario === "professor") {

      token = jwt.sign(
        {
          rf: user.rf,
          nome: user.nome,
        },

        JWT_SECRET,

        { 
          expiresIn: "2h" 
        }

      );

    } else if (usuario === "aluno") {
      
      token = jwt.sign(
        {
          rm: user.rm,
          nome: user.nome,
        },

        JWT_SECRET,

        { 
          expiresIn: "2h" 
        }
      );

    } else {
        
      return { 
        sucesso: false, 
        mensagem: "Erro no desenvolvimento do token! Avise o Suporte." 
      };

    }
      
    return {
      sucesso: true,
      token,
      usuario: {
        identificador: user.rf || user.rm,
        nome: user.nome,
      },
    };

  } catch (erro) {

    console.error("❌ Erro ao autenticar:", erro.message);
    
    return { 
      sucesso: false, 
      mensagem: "Erro interno no servidor" 
    };

  } finally {

    conn.release();

  }
  
}
