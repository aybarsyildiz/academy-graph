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

app.get('/api/v1/createNewNode', (req, res) => {
    req.params.id = req.body.id;
    req.params.name = req.body.name;
    req.params.type = req.body.type;
    req.params.parent = req.body.parent;

    session.run(`CREATE (n:${req.params.type} {id: '${req.params.id}', name: '${req.params.name}', parent: '${req.params.parent}'}) RETURN n`);
    res.send('Node created');
}
);

app.get('/api/v1/createNewRelation', (req, res) => {
    req.params.id = req.body.id;
    req.params.name = req.body.name;
    req.params.type = req.body.type;
    req.params.parent = req.body.parent;
    req.params.child = req.body.child;

    session.run(`CREATE (n:${req.params.type} {id: '${req.params.id}', name: '${req.params.name}', parent: '${req.params.parent}', child: '${req.params.child}'}) RETURN n`);
    res.send('Relation created');
}
);

app.get('/api/v1/getNodes', (req, res) => {
    session.run(`MATCH (n) RETURN n`).then(function(result) {
        res.send(result.records);
    }
    );
}
);

