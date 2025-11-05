import { conexao } from "../conexao.js";

export async function inserirProfessor(professor) {
  const pool = await conexao();
  const conn = await pool.getConnection();
    try {
    const sqlContato = "INSERT INTO contato_do_professor(tipo, valor) VALUES (?, ?)";
    const valoresContato = [
        professor.tipo, 
        professor.valor
    ];
    const [resultadoContato] = await conn.execute(sqlContato, valoresContato);
    const idContato = resultadoContato.insertId;
    const sqlProfessor = "INSERT INTO professor(rf, nome, senha, key_contato_professor) VALUES (?, ?, ?, ?)";
    const valoresProfessor = [
      professor.rf,
      professor.nome,
      professor.senha,
      idContato,
    ];
    await conn.execute(sqlProfessor, valoresProfessor);
    
} catch (erro) {
        console.error("❌ Erro ao inserir professor:", erro.message);
    } finally {
    conn.release();
    }
}