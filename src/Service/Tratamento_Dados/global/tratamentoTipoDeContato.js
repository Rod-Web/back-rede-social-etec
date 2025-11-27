export function TratamentoTipoDeContato(tipo) {
  try {
    // Tipo existe
    if (!tipo) throw new Error("Tipo de contato é obrigatório.");
    // Transformar em string
    tipo = tipo.toString();
    // Remover espaços em branco
    tipo = tipo.trim();
    // é um enum válido
    const tiposValidos = ["email", "tel"];
    if (!tiposValidos.includes(tipo.toLowerCase()))
      throw new Error(
        "Tipo de contato inválido. Deve ser 'email' ou 'tel'."
      );

    console.log("✅ Tipo de contato tratado com sucesso:", tipo);
    return tipo.toLowerCase();
  } catch (error) {
    console.error(
      "❌ Erro no tratamento do tipo de contato:",
      error.message
    );
    throw error;
  }
}