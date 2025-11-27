// ADM = Administração
// INFO = Informática p/ Internet
// DS = Desenvolvimento de Sistemas
// RH = Recursos Humanos
// NUTRI = Nutrição
// QUIM = Química

export function TratamentoTurma(turma) {
  try {
    if (!turma) throw new Error("Turma é obrigatório.");

    const t = String(turma).trim().toUpperCase();

    const mapa = {
      ADM: "Administração",
      INFO: "Informática p / Internet",
      DS: "Desenvolvimento de sistemas",
      RH: "Recursos humanos",
      NUTRI: "Nutrição",
      QUIM: "Química",
    };

    if (mapa[t]) return mapa[t];

    throw new Error(`Turma inválida: ${turma}`);
  } catch (error) {
    console.error(error.message);
    return null;
  }
}
