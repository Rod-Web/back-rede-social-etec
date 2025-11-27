// FORMAÇÃO DO BD:
// 	tipo_formacao 							enum('Técnico', 'Médio Integrado') 			not null
// FORMAÇÃO DO BODY:
// formacao: "TEC" ou "MTEC"

export function TratamentoFormacao(formacao) {
  try {
    if (!formacao?.toString().trim())
      throw new Error("Formação é obrigatória.");
    const f = formacao.trim().toUpperCase();

    const mapa = {
      TEC: "Técnico",
      MTEC: "Médio Integrado",
    };

    if (!mapa[f]) throw new Error(`Formação inválida: ${formacao}`);
    return mapa[f];
  } catch (error) {
    throw new Error(`Erro no tratamento da formação: ${error.message}`);
  }
}