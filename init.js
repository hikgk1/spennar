require('dotenv').config();
const express = require('express');
const path = require('path');
const { MongoClient } = require('mongodb');
const graphqlHTTP = require('express-graphql');
const { schema, makeRoot } = require('./schema.js');

const PORT = process.env.PORT || 4000;
const DB_URL = process.env.DB_URL || 'mongodb://localhost:27017/';
const DB_NAME = process.env.DB_NAME || 'aflspennar';
const DB_COLL = process.env.DB_COLL || 'spennar';

async function init() {
    try {
        const client = await MongoClient.connect(DB_URL);
        const db = client.db(DB_NAME);
        const collection = db.collection(DB_COLL);

        process.on('SIGINT', e => {
            client.close();
            process.exit();
        });

        const root = makeRoot(collection);
        
        const app = express();

        app.use(express.static(path.join(__dirname, 'front/build')));

        app.use('/graphql', graphqlHTTP({
            schema: schema,
            rootValue: root,
            graphiql: true
        }));

        app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname+'/front/build/index.html'));
          });

        app.listen(PORT);

        console.log(`Listening on port ${PORT}`)
    } catch(e) {
        console.log(e);
    }
}

init();