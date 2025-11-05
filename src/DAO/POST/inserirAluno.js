import { conexao } from "../conexao.js";

export async function inserirAluno(aluno) {
  const pool = await conexao();
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction(); // 🟢 começa a transação

    // ordem de força de tabelas:
    // turma; (sem fk)
    // contato_do_aluno; (sem fk)
    // aluno; (com fk do contato_do_aluno)
    // aluno_turma; (com fk do aluno e fk da turma)

    // passos para cadastrar o aluno no bd:

    // verificar se o rm já existe;   se não pode continuar, se sim => erro
    const sqlEncontrarAluno = "SELECT rm FROM aluno WHERE rm = ?";
    const [linhasAluno] = await conn.execute(sqlEncontrarAluno, [aluno.rm]);
    if (linhasAluno.length > 0) {
      throw new Error("Já existe um aluno cadastrado com esse RM.");
    }

    // encontrar a turma e verifocar se existe    se não existe => erro, se existe, pegar o codigo
    const sqlEncontrarTurma =
      "SELECT codigo FROM turma WHERE nome = ? AND ano = ? AND serie = ? AND turno = ? AND tipo_formacao = ?";
    const valoresTurma = [
      aluno.dadosDaTurma.nome,
      aluno.dadosDaTurma.ano,
      aluno.dadosDaTurma.serie,
      aluno.dadosDaTurma.turno,
      aluno.dadosDaTurma.formacao,
    ];
    const [linhasTurma] = await conn.execute(sqlEncontrarTurma, valoresTurma);
    if (linhasTurma.length === 0) {
      throw new Error("Turma não encontrada no sistema.");
    }
    const codigoTurma = linhasTurma[0].codigo; // pk da turma encontrada

    // inserir o contato do aluno (tipo e valor);  pega o pk gerado pelo auto incremento
    const sqlContatoAluno =
      "INSERT INTO contato_do_aluno(tipo, valor) VALUES (?, ?)";
    const valoresContatoAluno = [aluno.tipo, aluno.valor];
    const [resultadoContatoAluno] = await conn.execute(
      sqlContatoAluno,
      valoresContatoAluno
    );
    const idContatoAluno = resultadoContatoAluno.insertId; // pk do contato do aluno

    // inserir o aluno; colocar o pk (rm) numa constante;
    const sqlAluno =
      "INSERT INTO aluno(rm, nome, data_nascimento, nome_responsavel, senha, key_contato_aluno) VALUES (?, ?, ?, ?, ?, ?)";
    const valoresAluno = [
      aluno.rm,
      aluno.nome,
      aluno.dataNascimento,
      aluno.nomeResponsavel,
      aluno.senha,
      idContatoAluno,
    ];
    await conn.execute(sqlAluno, valoresAluno);

    const rmAluno = aluno.rm; // pk do aluno

    // inserir na tabela aluno_turma (fk key_aluno e fk key_turma)
    const sqlTabelaAssociativaTurmaAluno =
      "INSERT INTO aluno_turma(key_aluno, key_turma) VALUES (?, ?)";
    const valoresTabelaAssociativaTurmaAluno = [rmAluno, codigoTurma];
    await conn.execute(
      sqlTabelaAssociativaTurmaAluno,
      valoresTabelaAssociativaTurmaAluno
    );

    await conn.commit(); // 🟢 confirma tudo
    console.log("Aluno cadastro com exito!!");
  } catch (erro) {
    await conn.rollback(); // 🔴 cancela tudo se der erro
    console.error("❌ Erro ao inserir aluno:", erro.message);
    throw erro;
  } finally {
    conn.release();
  }
}
