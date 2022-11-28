var database = require("../database/config");

function buscarUltimasMedidas(fkArmamento) {

   var instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select Armamento.NomeArmamento as Arma, count(*) as Votos from usuario join armamento on 
        idArmamento = fkArmamento group by NomeArmamento;`
    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select Armamento.NomeArmamento as Arma, count(*) as Votos from usuario join armamento on 
        idArmamento = fkArmamento group by NomeArmamento ;`
    } else {
        console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
        return
    }

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarMedidasEmTempoReal(fkArmamento) {

    var instrucaoSql = ''

    if (process.env.AMBIENTE_PROCESSO == "producao") {
        instrucaoSql = `select Armamento.NomeArmamento as Arma, count(*) as Votos from usuario join armamento on idArmamento = fkArmamento 
        group by NomeArmamento `

    } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
        instrucaoSql = `select Armamento.NomeArmamento as Arma, count(*) as Votos from usuario join armamento on idArmamento = fkArmamento 
        group by NomeArmamento;`
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
