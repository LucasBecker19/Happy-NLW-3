//importar dependência
const Database = require('sqlite-async')

//Se o arquivo não existir, o open irá criá-lo. E este processo pode demorar um pouco
//Por isso utilizamos o then. Sem ele, o JS continuaria executando o código mesmo
//sem ter criado ou aberto o arquivo de database 


function execute(db) {
    //o objeto 'db' foi criado na linha 'Database.open(__dirname + '/database.sqlite')' (eu acho)
    return db.exec(`
        CREATE TABLE IF NOT EXISTS orphanages(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            lat TEXT,
            lng TEXT,
            name TEXT,
            about TEXT,
            whatsapp TEXT,
            images TEXT,
            instructions TEXT,
            opening_hours TEXT,
            open_on_weekends TEXT
        );
    `)
}

//irá exportar o db, pq a função 'execute' retorna o 'db'
module.exports = Database.open(__dirname + '/database.sqlite').then(execute)



//é bom usar crase (como na função execute), pois é possível quebrar linhas e usar variáveis. 
//O conteúdo entre as crases é String!

//console.log(entrei); //pra exibir = node src/database/db.js