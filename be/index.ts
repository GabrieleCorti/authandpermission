const express = require('express')
const app = express()
const port = 5000
import { Response, Request, NextFunction  } from "express";
const url:string = 'http://localhost:3000/'
const cors = require('cors');
const fs = require('fs');
const TabelUser = require('../db/user.json');

app.use(cors());
app.use(express.json());

interface User {
    id: number,
    name:string,
    password:string,
    role: 'user' | 'admin'
}


app.get('/', (req:Request, res:Response) => res.send('Hello World!'));

app.post('/user/addUser', (req:Request, res:Response) => {
    const Body = req.body;
    let users:User[] = TabelUser.users;
    console.log(Body);
    console.log(users);
    
    if (Body.name && Body.password) {
        const NewUser:User = {
            id: users.length + (Math.random() * 1000),
            name: Body.name,
            password: Body.password,
            role: 'user'
        }
        users.push(NewUser);
        const UserTxt = JSON.stringify(users)
        console.log(UserTxt);
        
        fs.writeFileSync('../db/user.json', UserTxt )
        return;
    }
});
app.listen(port, () => console.log(`Example app listening on port port!`))
