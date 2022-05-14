const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');
const dotenv = require( 'dotenv');
const neo4j = require('neo4j-driver');
const sqlite3 = require('sqlite3').verbose();
    
const uri = 'neo4j+s://18f4b03e.databases.neo4j.io';
const user = dotenv.config().parsed.NEO4J_USERNAME;
const password = dotenv.config().parsed.NEO4J_PASSWORD;
    
const driver = neo4j.driver(uri, neo4j.auth.basic(user, password))
const session = driver.session()
   
const port = process.env.PORT || 5000;

//sqlite connection
const db = new sqlite3.Database('./datas/login.db', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
});

// db.run('CREATE TABLE users(id,username,password)');

// let sql = `INSERT INTO users(id,username,password) VALUES(?,?,?)`;

// db.run(sql,[2,"admin","admin0"],
//   (err) => {
//     if (err) {
//       return console.error(err.message);
//     }
//     console.log('A new row has been created');
//   }
// )
let sql = `SELECT * from users`;

db.all(sql, [], (err, rows) => {
  if (err) {
    throw err;
  }
  rows.forEach((row) => {
    console.log(row);
  });
});

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(port, () => console.log(`Listening on port ${port}`));


app.get('/api/v1/createNewAcademician', (req, res) => {
    req.params.name = req.body.name;
    session.run(`CREATE (n:Person {name:'${req.params.name}'}) RETURN n`);
    res.send('Academician created');
});

app.get('api/v1/createPublish', (req, res) => {
    req.params.name = req.body.name;
    req.params.publish = req.body.publish;
    session.run(`MATCH (n:Person {name:'${req.params.name}'}) RETURN n`).then(function(result) {
    if(result.records.length > 0) {
        session.run(`MATCH (n:Person {name:'${req.params.name}'}) CREATE (n)-[:PUBLISHED]->(m:Publish {publish:'${req.params.publish}'}) RETURN n`);
        res.send('Publish created');
    } else {
        session.run(`CREATE (n:Person {name:'${req.params.name}'}) RETURN n`);
        session.run(`CREATE (n:Publish {name:'${req.params.publish}'}) RETURN n`);
        session.run(`MATCH (n:Person {name:'${req.params.name}'}), (m:Publish {name:'${req.params.publish}'}) CREATE (n)-[:PUBLISH]->(m)`);
        res.send('Publish created');
    }
});
});

app.get('/api/v1/getNodes', (req, res) => {
    session.run(`MATCH (n) RETURN n`).then(function(result) {
        res.send(result.records);
    }
    );

});

//login
app.post('/login', function (req, res, next) {

    let sql = `SELECT * FROM users WHERE username = ? and password = ?`;
    let username = `${req.body.Username}`;
    let password = `${req.body.Password}`;
    let success;
    
    db.get(sql, [username, password], (err, row) => {
      if (err) {
        return console.error(err.message);
      }
      console.log(row);
      if(row != undefined){
        res.json(row);
      }
      else{
          res.status(400);
          res.send('Invalid username or password');
          res.send();
      }
  });
  });

