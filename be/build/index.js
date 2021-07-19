"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const app = express();
const port = 5000;
const url = 'http://localhost:3000/';
const cors = require('cors');
const fs = require('fs');
const TabelUser = require('../db/user.json');
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => res.send('Hello World!'));
app.post('/user/addUser', (req, res) => {
    const Body = req.body;
    let users = TabelUser.users;
    console.log(Body);
    console.log(users);
    if (Body.name && Body.password) {
        const NewUser = {
            id: users.length + (Math.random() * 1000),
            name: Body.name,
            password: Body.password,
            role: 'user'
        };
        users.push(NewUser);
        const UserTxt = JSON.stringify(users);
        console.log(UserTxt);
        fs.writeFileSync('../db/user.json', UserTxt);
        return;
    }
});
app.listen(port, () => console.log(`Example app listening on port port!`));
