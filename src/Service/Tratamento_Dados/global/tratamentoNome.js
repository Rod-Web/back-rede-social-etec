export function TratamentoNome(nome) {

    try {
      // Nome existe
      if (!nome) throw new Error("Nome é obrigatório.");

      // Transformar em string
      nome = nome.toString();

      // Nome não é vazio
      nome = nome.trim();

      // Remover espaços duplicados entre palavras
      nome = nome.replace(/\s+/g, " ");

      // Sanitizar HTML/script
      nome = nome.replace(/<[^>]*>?/gm, "");

      // Nome não contém números ou caracteres especiais
      const nomeRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;
      if (!nomeRegex.test(nome))
        throw new Error(
          "Nome não deve conter números ou caracteres especiais."
        );

      // Nome ter entre 3 a 100 caracteres
      if (nome.length < 3 || nome.length > 100)
        throw new Error(
          "Nome deve ter pelo menos 3 caracteres e no máximo 100 caracteres."
        );

      // Retornar nome tratado
      console.log("✅ Nome tratado com sucesso:", nome);
      return nome;
    } catch (error) {
     
        console.error("❌ Erro no tratamento do nome :", error.message);
        throw error;
    };

}; // Fim do TratamentoNome
