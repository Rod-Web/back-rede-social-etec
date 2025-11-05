export function TratamentoSerie(serie) {
  try {
    if (serie == null || serie === "") throw new Error("Série é obrigatória.");

    const s = String(serie).trim();
    const num = Number(s);


    if (Number.isNaN(num) || num < 1 || num >= 4) {
      throw new Error(`Série inválida: ${serie}`);
    }

    // sempre retorna no mesmo formato
    return `${num}º Módulo / ${num}ª Série`;
  } catch (error) {
    throw new Error(`Erro no tratamento da série: ${error.message}`);
  }
}
