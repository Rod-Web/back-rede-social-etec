import bcrypt from "bcryptjs";

export async function TratamentoSenha(senha) {
  try {
    // Senha existe
    if (!senha) throw new Error("Senha é obrigatória.");

    // Transformar em string
    senha = senha.toString();

    // Remover espaços em branco no início e fim
    senha = senha.trim();

    // Senha ter entre 6 a 20 caracteres
    if (senha.length < 6 || senha.length > 20)
      throw new Error("Senha deve ter entre 6 a 20 caracteres.");

    // Senha deve conter letra maiúscula, minúscula, número e caractere especial
    const senhaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9])./;

    if (!senhaRegex.test(senha)) {
      throw new Error(
        "Senha deve conter letra maiúscula, minúscula, número e caractere especial."
      );
    }

    // Gerar hash da senha
    senha = await gerarHashDaSenha(senha);

    // Retornar senha tratada
    console.log("✅ Senha tratada com sucesso.");
    return senha;
  } catch (error) {
    console.error("❌ Erro no tratamento da senha:", error.message);
    throw error;
  }
} // Fim do TratamentoSenha

export async function CriarSenha(identificador, nomeAluno) {
  try {
    // Criar senha padrão: RM + primeira letra do nome em maiúscula + última letra do nome em minúscula + "!"
    const primeiraLetra = nomeAluno.charAt(0).toUpperCase();
    const ultimaLetra = nomeAluno.charAt(nomeAluno.length - 1).toLowerCase();
    const senhaPadrao = `${identificador}${primeiraLetra}${ultimaLetra}!`;
    // Tratar a senha padrão
    const senhaTratada = await TratamentoSenha(senhaPadrao);
    return senhaTratada;
  }
  catch (error) {
    console.error("❌ Erro ao criar a senha padrão:", error.message);
    throw error;
  }
}

async function gerarHashDaSenha(senha) {
  const saltRounds = 10; // número de rounds de sal — quanto maior, mais seguro (e mais lento)
  const hash = await bcrypt.hash(senha, saltRounds);
  return hash;
}
