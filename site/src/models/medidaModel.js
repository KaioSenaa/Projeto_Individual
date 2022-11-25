var database = require("../database/config");

function buscarUltimasMedidas(fkArmamento) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select Armamento.NomeArmamento as Arma, count(*) as Votos from usuario join armamento on idArmamento = fkArmamento group by NomeArmamento order by fkArmamento;`
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select Armamento.NomeArmamento as Arma, count(*) as Votos from usuario join armamento on idArmamento = fkArmamento group by NomeArmamento order by fkArmamento;`
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(fkArmamento) {

    instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select Armamento.NomeArmamento as Arma, count(*) as Votos from usuario join armamento on idArmamento = fkArmamento group by NomeArmamento order by fkArmamento;`

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select Armamento.NomeArmamento as Arma, count(*) as Votos from usuario join armamento on idArmamento = fkArmamento group by NomeArmamento order by fkArmamento;`
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    buscarUltimasMedidas,
    buscarMedidasEmTempoReal
}
