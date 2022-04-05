// imports need for app
const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const {
    route
} = require('express/lib/router')
// create instance app express
const app = express()
// ports default for app e bd
const portApp = 3000
const portBD = 3306

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
app.use('/', router)

// launch sever in port default
app.listen(portApp)
console.log(`API funcionando: http://localhost:${portApp}`)