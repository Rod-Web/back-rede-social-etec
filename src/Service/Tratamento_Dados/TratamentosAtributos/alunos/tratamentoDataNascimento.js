
export function TratamentoDataNascimento(dataNascimento) {
    try {
        // Data de nascimento existe
        if (!dataNascimento) throw new Error("Data de nascimento é obrigatória.");
        // Tentar criar um objeto Date
        const data = new Date(dataNascimento);
        // Verificar se a data é válida
        if (isNaN(data.getTime())) throw new Error("Data de nascimento inválida.");
        // Verificar se a data não é futura
        const hoje = new Date();
        if (data > hoje) throw new Error("Data de nascimento não pode ser no futuro.");
        console.log("✅ Data de nascimento tratada com sucesso:", dataNascimento);
        return dataNascimento;
        
    } catch (error) {
        console.error(
            "❌ Erro no tratamento da data de nascimento:",
            error.message
        );
        throw error;
    }
}