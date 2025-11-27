import { TratamentoTitulo } from "./postagens/tratamentoTitulo.js";
import { TratamentoDescricao } from "./postagens/tratamentoDescricao.js";
import { TratamentoTipoPostagem} from "./postagens/tratamentoTipo.js"
import { TratamentoDisciplinaAssociada } from "./postagens/tratamentoDisciplinaAssociada.js"

export function tratamentoDadosPostagem(dados) {
    const tituloTratado = TratamentoTitulo(dados.titulo) // professor escolhe
    const descricaoTratado = TratamentoDescricao(dados.descricao) // professor escolhe
    const tipoTratado = TratamentoTipoPostagem(dados.tipo) // professor escolhe
    const disciplinaAssociadaTratado = TratamentoDisciplinaAssociada(dados.disciplina) // professor escolhe
    const autorTratado = TratamentoAutor(dados.autor) // pegar o nome do professor logado
    return {
        titulo: tituloTratado,
        descricao: descricaoTratado,
        tipo: tipoTratado,
        // tem que pegar o código da disciplina
        disciplina: disciplinaAssociadaTratado,
        // tem que pegar o nome do professor
        autor: autorTratado
        

    }
}