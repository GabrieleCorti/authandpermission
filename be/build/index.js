"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const app = express();
const port = 5000;
const url = 'http://localhost:3000/';
const cors = require('cors');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const TabelUser = require('../db/user.json');
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => res.send('Hello World!'));
app.post('/user/addUser', (req, res) => {
    const Body = req.body;
    let users = TabelUser.users;
    if (Body.name && Body.password) {
        const NewUser = {
            id: users.length + (Math.random() * 1000),
            name: Body.name,
            password: Body.password,
            role: 'user'
        };
        users.push(NewUser);
        const UserTxt = JSON.stringify(users);
        fs.writeFileSync('../db/user.json', UserTxt);
        res.redirect(`${url}/login`);
    }
    return;
});
app.post("/user/login", (req, res) => {
    const Body = req.body;
    if (Body.name && Body.password) {
        console.log('scemo');
    }
});
app.listen(port, () => console.log(`Example app listening on port port!`));
