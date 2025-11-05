// Informações na base de dados:

// legenda: 
    // . = atributo inserido do usuário
    
    // Dados dos alunos:
        // . rm - importe local
        // . nome - importe global
        // . dataNascimento - importe aluno
        // . nomeResponsavel - importe aluno
        // senha - junção do RM + Nome (fazer uma lógica para isso) depois vira hash
        // idContato - sem tratamento, pega na hora de criar a linha do contato;

    // Dados do contato do aluno:
        // idAluno - sem tratamento, gerado com autoincremento
        // . tipo - importe global
        // . valor - importe global

    // Dados da turma do aluno (averiguar como fazer, a tabela de turma já existe só precisa interligar com a do aluno por meio da fk 
    // turma :
        // . turma - importe aluno
        // . anoLetivo - importe aluno
        // . turno - importe aluno
        // anoAtual - pegar do sistema (data atual)
        // . formacao - importe aluno 
    // (aluno_turma = tabela associativa)):
        // . 

import { TratamentoNome } from "./TratamentosAtributos/global/tratamentoNome.js";
import { TratamentoDataNascimento } from "./TratamentosAtributos/alunos/tratamentoDataNascimento.js";
import { CriarSenha } from "./TratamentosAtributos/global/tratamentoSenha.js";

import { TratamentoTipoDeContato } from "./TratamentosAtributos/global/tratamentoTipoDeContato.js";
import { TratamentoValorDeContato } from "./TratamentosAtributos/global/tratamentoValorDeContato.js";

import {TratamentoTurma} from "./TratamentosAtributos/alunos/turma/tratamentoTurma.js";
import {TratamentoAnoLetivo} from "./TratamentosAtributos/alunos/turma/tratamentoAnoLetivo.js";
import {TratamentoSerie} from "./TratamentosAtributos/alunos/turma/tratamentoSerie.js";
import {TratamentoTurno} from "./TratamentosAtributos/alunos/turma/tratamentoTurno.js";
import {TratamentoFormacao} from "./TratamentosAtributos/alunos/turma/tratamentoFormacao.js";

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
