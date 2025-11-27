import { TratamentoNome } from "./global/tratamentoNome.js";
import { TratamentoDataNascimento } from "./alunos/tratamentoDataNascimento.js";
import { CriarSenha } from "./global/tratamentoSenha.js";

import { TratamentoTipoDeContato } from "./global/tratamentoTipoDeContato.js";
import { TratamentoValorDeContato } from "./global/tratamentoValorDeContato.js";

import {TratamentoTurma} from "./turma/tratamentoTurma.js";
import {TratamentoAnoLetivo} from "./turma/tratamentoAnoLetivo.js";
import {TratamentoSerie} from "./turma/tratamentoSerie.js";
import {TratamentoTurno} from "./turma/tratamentoTurno.js";
import {TratamentoFormacao} from "./turma/tratamentoFormacao.js";

export async function tratamentoDadosAluno(dados) {

  // dados do aluno
  const rmTratado = TratamentoRMAluno(dados.identificador);
  const nomeTratado = TratamentoNome(dados.nomeAluno);
  const dataNascimentoTratada = TratamentoDataNascimento(dados.dataNascimento);
  const nomeResponsavelTratado = TratamentoNome(dados.nomeResponsavel);
  const senhaTratada = await CriarSenha(dados.identificador, dados.nomeAluno);
  // fk (contato)


  const tipoDeContatoTratado = TratamentoTipoDeContato(dados.tipoContato);
  const valorDeContatoTratado = TratamentoValorDeContato(
    dados.valorContato,
    tipoDeContatoTratado
  );

  // dados da turma para comparar ( e incluir na entidade aluno_turma)
  const dadosDaTurma = {
    nome: TratamentoTurma(dados.turmaPertencente),
    ano: TratamentoAnoLetivo(),
    serie: TratamentoSerie(dados.modulo),
    turno: TratamentoTurno(dados.periodo),
    formacao: TratamentoFormacao(dados.formacao),
  };

  return {
    rm: rmTratado,
    nome: nomeTratado,
    dataNascimento: dataNascimentoTratada,
    nomeResponsavel: nomeResponsavelTratado,
    senha: senhaTratada,

    tipo: tipoDeContatoTratado,
    valor: valorDeContatoTratado,

    dadosDaTurma: dadosDaTurma
  };
}



function TratamentoRMAluno(rm) {

    try {
        // RM existe
        if (!rm) throw new Error("RM do aluno é obrigatório.");

        // Transformar em string
        rm = rm.toString();

        // Remover espaços em branco
        rm = rm.trim();

        // RM tem 6 dígitos
        if (rm.length !== 6)
            throw new Error("RM do aluno deve ter exatamente 6 dígitos.");

        // rm é só números
        if (!/^\d+$/.test(rm))
            throw new Error("RM do aluno deve conter apenas números.");

        // Retornar rm tratado
        console.log("✅ RM do aluno tratado com sucesso:", rm);
        return rm;

    } catch (error) {

        console.error("❌ Erro no tratamento do RM do aluno:", error.message);
        throw error;
    }

} // Fim do TratamentoRMAluno
