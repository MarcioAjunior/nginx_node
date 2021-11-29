const express = require('express');
const cors = require('cors')
const bp = require('body-parser')
const mysql = require('mysql');
const app = express();

app.use(cors())
app.use(express.urlencoded({
  extended: false
}))
app.set('view engine', 'pug')
app.set('views', './src/views/')

const connection = mysql.createConnection({
    host     : 'db',
    user     : 'root',
    password : 'root',
    database : 'nodedb',
  })

const fecth = () => new Promise((resolve) => {
  connection.query(`SELECT * FROM PEOPLE;`,  (err, rows) => {
    if(err !=null){
     throw err;
    }if(rows.length>0){
      return resolve(rows)
    }
    return resolve([])
})
})

app.get('/', async(req, res) => { 
  // res.header('Access-Control-Allow-Origin', '*');
  const result = await fecth();
  return res.render('index', {
  peoples: result
  })
 });

app.post('/', bp.urlencoded({extended: false}), (req, res) => {
 
    const nome = req.body.nome
    connection.query(`INSERT INTO PEOPLE(nome) VALUES('${nome}');`, async(err) => {
        if(err != null){
          throw err;
        }
    const result = await fecth();
    return res.render('index' ,{
      peoples: result
    })
    })
});
//DELETE, METHOD DELETE NÃO É SUPORTADO PELO HTML5
app.post('/:id', (req, res) => {
    connection.query(`DELETE FROM PEOPLE WHERE id="${req.params.id}";`,async(err) => {
      if(err !=null){
        throw err;
       }
    const result = await fecth();
    return res.render('index', {
      peoples: result
    })
    })
})

app.listen(3000, () => 
	console.log('Servidor iniciado na porta 8080')
);

 
