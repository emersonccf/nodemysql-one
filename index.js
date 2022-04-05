// imports need for app
const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const pw = require('./env')
// create instance app express
const app = express()
// ports default for app e bd
const portApp = 3000
const host = 'localhost'
const portBD = 3306
const user = 'root'
const database = 'nodemysql'

// settings body-parser of app for get POST lest late
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())

// defined router and routes
const router = express.Router()
// defined route root - GET
router.get('/', (req, res) => res.json({
    message: 'Rota raiz funcionando!'
}))
// defined route customers - GET
router.get('/clientes', (req, res) => {
    execSQLQuery('SELECT id, nome, cpf FROM clientes', res)
})

app.use('/', router)

// launch sever in port default
app.listen(portApp)
console.log(`API funcionando: http://localhost:${portApp}`)

function execSQLQuery(sqlQry, res) {
    // create connection
    const connection = mysql.createConnection({
        host: host,
        port: portBD,
        user: user, // defined here your user
        password: pw.passwordBD, // use here your password 
        database: database
    })

    connection.query(sqlQry, function (error, result, fields) {
        if (error)
            res.json(error)
        else
            res.json(result)
        connection.end()
        console.log(`Consulta [ ${sqlQry} ] foi executada.`)
    })
}