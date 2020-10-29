const { v4: uuidv4 } = require('uuid');
const { clients } = require('../data/clients');

// write your handlers here...


const getClientById = (clientId) => {
    let selectedClient = "";
    clients.map((cli) => {
        if (cli.id == clientId) {
            selectedClient = cli;
        }
    })
    return selectedClient;
}

const createNewClient = (req, res) => {
    const emailRegex = /^[^@\s]+@[^@\s\.]+\.[^@\.\s]+$/;
    const email = req.body.email;
    if (!clients.some((c) => { c.email == req.body.email }) || emailRegex.test(email)) {

        const newClient = {
            id: uuidv4(),
            age: req.body.age,
            name: req.body.name,
            gender: req.body.gender,
            company: req.body.company,
            email: email,
            phone: req.body.phone,
            address: req.body.address
        }

        clients.push(newClient)
        res.status(200).json({ status: 200, message: "Client Added." })
    } else {
        res.status(400).json({ "status": 400, error: "client already exists" })
    }
}

module.exports = { getClientById, createNewClient };