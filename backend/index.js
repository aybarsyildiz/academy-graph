const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');
const dotenv = require( 'dotenv');
const neo4j = require('neo4j-driver');
    
const uri = 'neo4j+s://18f4b03e.databases.neo4j.io';
const user = dotenv.config().parsed.NEO4J_USERNAME;
const password = dotenv.config().parsed.NEO4J_PASSWORD;
    
const driver = neo4j.driver(uri, neo4j.auth.basic(user, password))
const session = driver.session()
   
const port = process.env.PORT || 5000;
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

