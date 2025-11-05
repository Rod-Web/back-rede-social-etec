
export function TratamentoAnoLetivo() {
    try {
        const dataAtual = new Date();
        const anoLetivo = dataAtual.getFullYear();
        return anoLetivo;        
    } catch (error) {
        throw new Error("Erro ao tratar o ano letivo: " + error.message);
    }

}