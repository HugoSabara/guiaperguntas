const express = require("express");
const routes  = express();
const Pergunta = require("../database/Pergunta");
const Resposta = require("../database/Resposta");

routes.get("/", (req,res) =>{
  Pergunta.findAll({ raw : true, order:[
      ['id','DESC']
    ]}).then (perguntas =>{
    res.render("index", {perguntas : perguntas})
  });
  
});

routes.get("/perguntar", (req, res) =>{
  res.render("perguntar");
});

routes.post("/salvarpergunta", (req, res) =>{
  //res.render("perguntar");
  var titulo = req.body.titulo;
  var descricao = req.body.descricao;
 
  Pergunta.create ({
    titulo:titulo,
    descricao: descricao
  }).then (() => {
     res.redirect("/");
  })

});

routes.get("/pergunta/:id", (req,res) =>{
  var id = req.params.id;
  //buscar somente um dado
  Pergunta.findOne({
    where: {id:id}
  }).then(pergunta =>{
      if (pergunta != undefined){

        Resposta.findAll({
          where: {perguntaId : pergunta.id},
          order: [['id','DESC']]
        }).then(respostas =>{
          res.render("pergunta",{
            pergunta:pergunta,
            respostas:respostas
        });        
      });
      }else{
        res.redirect ("/")
      }
  })
});


routes.post("/responder", (req, res) =>{
  var corpo = req.body.corpo;
  var perguntaId = req.body.pergunta;

  Resposta.create({
    corpo:corpo,
    perguntaId : perguntaId
  }).then(() =>{
    res.redirect("/pergunta/" + perguntaId);
  })
});

module.exports = routes; 