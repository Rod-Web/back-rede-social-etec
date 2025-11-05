export function TratamentoValorDeContato(valor, tipo) {
  try {
    if (!valor) throw new Error("Valor de contato é obrigatório.");

    valor = valor.toString().trim();

    if (valor.length === 0)
      throw new Error("Valor de contato não pode ser vazio.");

    if (tipo === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expressão regular simples para validar email
      if (!emailRegex.test(valor))
        throw new Error("Email inválido.");
    } else {
      if (tipo === "tel") {
        const telefoneRegex = /^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/; // Formato (XX)XXXXX-XXXX ou (XX)XXXX-XXXX
        if (!telefoneRegex.test(valor))
          throw new Error(
            "Telefone inválido. Use o formato (XX)XXXXX-XXXX."
          );
      } else {
        throw new Error("Tipo de contato desconhecido para validação.");
      }
    }

    console.log("✅ Valor de contato tratado com sucesso:", valor);
    return valor;
  } catch (error) {
    console.error(
      "❌ Erro no tratamento do valor de contato:",
      error.message
    );
    throw error;
  }
}