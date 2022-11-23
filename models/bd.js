const Sequelize = require('sequelize')

const sequelize = new Sequelize ('sgzckxzm ','sgzckxzm ', 'qmfydmTGRKRsE_UXSLTxCUS-aRzUpyd_', {
  host:'kesavan.db.elephantsql.com',
  dialect:'postgres',
  define:{
    charset:'utf8',
    collate:'utf8_general_ci',
    timestamps:true
  },
  logging:false
})

sequelize.authenticate().then(function(){
  console.log("Autenticado")
  
}).catch(function(err){
  console.log("Erro")
})

module.exports = {Sequelize, sequelize}