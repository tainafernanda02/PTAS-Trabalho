const express = require('express');
const app = express();
const hbs = require('express-handlebars')
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser')
const Produto = require('./models/Produto')


app.use(bodyParser.urlencoded({ extended: false }))

app.engine("hbs", hbs.engine({
  extname: 'hbs',
  defaultLayout: 'main'
}));

app.use(express.static('public'));
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
  res.render('home')
})


app.get('/cad_prod', (req, res) => {
  res.render('cad_prod')
})



app.get('/exibir_prod', (req, res) => {
   Produto.findAll().then((valores)=>{
     if(valores.length>0){
     return res.render('exibir_prod', {NavActiveUsers:true, table:true, produtos:valores.map(valores=>valores.toJSON())})
     }else {
       res.render('exibir_prod', {NavActiveUsers:true, table:false})
     }  
}).catch((err)=>{
     console.log(`Houve um problema: ${err}`)
})
})


//post


app.post('/editar_prod', (req, res) => {
  var id = req.body.id
  
  Produto.findByPk(id).then((dados)=>{
    return res.render('editar_prod', {error:false, id: dados.id, nome: dados.nome, preco: dados.preco, img: dados.img})
  }).catch((err)=>{
    console.log(err);
    return res.render('editar_prod', {error:true, problema: 'Não é possivel editar este registro'})
  })
})



app.post('/insert_prod', (req, res) => {
  var nome = req.body.nome
  var preco = req.body.preco
  var img = req.body.img

  Produto.create({
    nome:nome,
    preco:preco,
    img:img
  }).then(function(){
    console.log('Cadastro feito com sucesso!')
    return res.redirect('exibir_prod');
  }).catch(function(erro){
    console.log(`Ops, deu erro: ${erro}`)
  })



  
  console.log(req.body)
})


app.post('/update_prod', (req, res)=>{
  var nome = req.body.nome;
  var preco = req.body.preco;
  var img = req.body.img

  Produto.update(
    {
      nome:nome,
      preco:preco,
      img:img
    },
    { where: {
      id:req.body.id}
    }).then((resultado)=>{
    console.log(resultado);
    return res.redirect('/exibir_prod')
    }).catch((err)=>{
    console.log(err)
    })
})

app.post('/excluir_prod', (req, res)=>{
  Produto.destroy({
    where:{
      id:req.body.id}
    }).then((retorno)=>{
    return res.redirect("/exibir_prod")
    }).catch((err)=>{
    console.log(err)
    })
  })
app.listen(PORT, () => {
  console.log('Servidor rodando em http://localhost:' + PORT)
})