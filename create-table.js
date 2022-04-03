const mysql = require('mysql')
const pw = require('./env') // arquivo que armazena senhas

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: 'root',
    password: pw.password, // coloque aqui a senha de seu BD
    database: 'nodemysql'
})

connection.connect(function (err) {
    if (err) return console.log(err)
    console.log('Conexão realizada com sucesso')
    createTable(connection)
    addRows(connection)
    connection.end() //fecha a conexão
})

console.log('Aguarde...')

function createTable(conn){

    const sql = "CREATE TABLE IF NOT EXISTS clientes ("+
                "id int NOT NULL AUTO_INCREMENT,"+
                "nome varchar(150) NOT NULL,"+
                "cpf char(11) NOT NULL,"+
                "PRIMARY KEY (id)"+
                ");";
    
    conn.query(sql, function (error, results, fields){
        if(error) return console.log(error);
        console.log('Tabela clientes criada com sucesso!');
    });
}

function addRows(conn){
  const sql = "INSERT INTO Clientes(nome, cpf) VALUES ?";
  const values = [
        ['Sofia Almeida', '12345678901'],
        ['Francisco Ferreira', '09876543210'],
        ['Emerson Catarino', '12312312399']
      ];
  conn.query(sql, [values], function (error, results, fields){
          if(error) return console.log(error);
          console.log('Registros adicionados com sucesso!');
      });
}