'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const { clients } = require('./data/clients');
const { getClientById, createNewClient } = require('./handlers/clientHandlers');
const { getWordById, getIdLetterCount, handleLetterGuess } = require('./handlers/hangmanHandlers');


express()
  .use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  })
  .use(morgan('tiny'))
  .use(express.static('public'))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))

  // endpoints

  // display full client list

  .get('/clients/', (req, res) => {
    if ({ clients }) {
      res.status(200).json({
        status: 200,
        "data": { clients },
      })
    } else { res.status(400).json({ "status": 400, error: "client list not found" }) }
  })

  // display client by id

  .get('/clients/:clientId', (req, res) => {
    const clientId = req.params.clientId;
    getClientById(clientId).then((result) => {
      res.status(200).json({
        status: 200,
        "data": result,
      })
    })
      .catch((error) => {
        res.status(400).json({ "status": 400, error: "client not found " + error })
      })
  })

  // add new client

  .post('/clients', createNewClient)

  // delete client

  .delete('/clients/:clientId', (req, res) => {
    const clientId = req.params.clientId;
    const client = getClientById(clientId);
    const index = clients.indexOf(client);
    clients.splice(index, 1)
    res.status(200).json({
      status: 200,
      "data": `user ${clientId} has been deleted`,
    })
  })

  // hangman endpoints

  .get('/hangman/word/:id', getWordById)
  .get('/hangman/word', getIdLetterCount)
  .get('/hangman/guess/:id/:letter', handleLetterGuess)

  .listen(8000, () => console.log(`Listening on port 8000`));
