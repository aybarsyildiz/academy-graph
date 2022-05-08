async function createDatabase() {
    const neo4j = require('neo4j-driver');
    const dotenv = require('dotenv');
    const uri = 'neo4j+s://18f4b03e.databases.neo4j.io';
    const user = dotenv.config().parsed.NEO4J_USERNAME;
    const password = dotenv.config().parsed.NEO4J_PASSWORD;

    const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
    const session = driver.session();
    //create database if it doesn't exist
    const createDatabaseQuery = `CREATE DATABASE ${process.env.NEO4J_DATABASE}`;
    await session.run(createDatabaseQuery);
    await session.close();
    await driver.close();
}

createDatabase();