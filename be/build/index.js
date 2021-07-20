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
        fs.writeFileSync('../db/user.json', `{ "users": ${UserTxt} }`);
        return;
    }
    return;
});
app.post("/user/login", (req, res) => {
    const TabelUser = require('../db/user.json');
    const Body = req.body;
    /* console.log(Body); */
    const Users = TabelUser.users;
    /* console.log(Users); */
    if (Body.name && Body.password) {
        /* console.log(Body.name, Body.password); */
        const ThisUser = Users.find(e => {
            console.log(e.name.length, Body.name.length, e.name === Body.name);
            return e.name === Body.name;
        });
        console.log(ThisUser);
        if (ThisUser) {
            const Token = jwt.sign({
                data: ThisUser
            }, 'secret', { expiresIn: '1h' });
            console.log(Token);
            let isAdmin = false;
            ThisUser.role === "admin" ? isAdmin = true : isAdmin;
            res.json({
                token: Token,
                isAdmin: isAdmin
            });
            return;
        }
        res.sendStatus(401);
    }
    return;
});
app.listen(port, () => console.log(`Example app listening on port port!`));
