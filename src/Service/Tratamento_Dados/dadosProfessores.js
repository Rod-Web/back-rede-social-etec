import { TratamentoNome } from "./TratamentosAtributos/global/tratamentoNome.js";
import { TratamentoSenha } from "./TratamentosAtributos/global/tratamentoSenha.js";
import { TratamentoTipoDeContato } from "./TratamentosAtributos/global/tratamentoTipoDeContato.js";
import { TratamentoValorDeContato } from "./TratamentosAtributos/global/tratamentoValorDeContato.js";

export async function tratamentoDadosProfessor(dados) {
  const rfTratado = TratamentoRFProfessor(dados.rf);
  const nomeTratado = TratamentoNome(dados.nome);
  const senhaTratada = await TratamentoSenha(dados.senha);
  const tipoDeContatoTratado = TratamentoTipoDeContato(dados.tipo);
  const valorDeContatoTratado = TratamentoValorDeContato(
    dados.valor,
    tipoDeContatoTratado
  );
  return {
    rf: rfTratado,
    nome: nomeTratado,
    senha: senhaTratada,
    tipo: tipoDeContatoTratado,
    valor: valorDeContatoTratado,
  };
}

function TratamentoRFProfessor(rf) {
  try {
    // RF existe
    if (!rf) throw new Error("RF do professor é obrigatório.");

    // Transformar em string
    rf = rf.toString();

    // Remover espaços em branco
    rf = rf.trim();

    // RF tem 7 dígitos
    if (rf.length !== 7)
      throw new Error("RF do professor deve ter exatamente 7 dígitos.");

    // RF é só números
    if (!/^\d+$/.test(rf))
      throw new Error("RF do professor deve conter apenas números.");

    // Retornar RF tratado
    console.log("✅ RF do professor tratado com sucesso:", rf);
    return rf;
  } catch (error) {
    console.error("❌ Erro no tratamento do RF do professor:", error.message);
    throw error;
  }
} // Fim do TratamentoRFProfessor
