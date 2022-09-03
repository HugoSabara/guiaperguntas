const express = require("express");
const server = express();
const routes = require("./routes.js");
const bodyParser = require("body-parser");
const connection = require("../database/database");


//Database
connection
.authenticate()
.then(() =>{
    console.log("Conexão feita com banco de dados")
})
.catch((msgErro) =>{
    console.log(msgErro);
});

//express usar o view engine ejs
server.set('view engine', 'ejs');

//arquivos staticos
server.use(express.static('public'));

//recuperar informações do formulario.
server.use(bodyParser.urlencoded({extended: false}));
server.use(bodyParser.json());

//utilizar as rotas.
server.use(routes);

server.listen(8080, () => {console.log("Servidor rodando.")});
