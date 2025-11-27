// Tratamento do atributo turno da turma
// no body ele vem como: manhã, tarde, noite
// no bnco ele aceita como     turno									enum('Manhã', 'Tarde', 'Noite')				not null,
export function TratamentoTurno(turno) {
  try {
    if (!turno?.toString().trim()) throw new Error("Turno é obrigatório.");

    const t = turno.trim().toLowerCase();

    const mapa = {
      manha: "Manhã",
      manhã: "Manhã", // aceita tanto "manha" quanto "manhã"
      tarde: "Tarde",
      noite: "Noite",
    };

    if (!mapa[t]) throw new Error(`Turno inválido: ${turno}`);

    return mapa[t];
  } catch (error) {
    throw new Error(`Erro no tratamento do turno: ${error.message}`);
  }
}
