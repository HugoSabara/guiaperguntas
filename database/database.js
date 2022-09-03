const Sequelize = require ('sequelize');
//nome do banco, usuario, senham objeto json com local de conexao e dialect.
const conexao = new Sequelize('guiaperguntas','root','210989',{
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = conexao;
