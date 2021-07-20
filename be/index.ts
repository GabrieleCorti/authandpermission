const express = require('express')
const app = express()
const port = 5000
import { Response, Request, NextFunction  } from "express";
const url:string = 'http://localhost:3000/'
const cors = require('cors');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const TabelUser = require('../db/user.json');

app.use(cors());
app.use(express.json());

interface User {
    id: number,
    name:string,
    password:string,
    role: 'user' | 'admin'
}

interface Body {
    name:string,
    password:string
}


app.get('/', (req:Request, res:Response) => res.send('Hello World!'));

app.post('/user/addUser', (req:Request, res:Response) => {
    const Body = req.body;
    let users:User[] = TabelUser.users;
    
    if (Body.name && Body.password) {
        const NewUser:User = {
            id: users.length + (Math.random() * 1000),
            name: Body.name,
            password: Body.password,
            role: 'user'
        }
        users.push(NewUser);
        const UserTxt = JSON.stringify(users)
        
        fs.writeFileSync('../db/user.json', `{ "users": ${UserTxt} }` );
        res.redirect("http://localhost:3000/login");
    }

    return;
});

app.post("/user/login", (req:Request, res:Response)=>{
    const TabelUser = require('../db/user.json');
    const Body = req.body;
    console.log(Body);
    
    const Users:User[] = TabelUser.users;
    console.log(Users);
    
    
    if (Body.name && Body.password) {
        console.log(Body.name, Body.password);
        
        const ThisUser = Users.find(e => e.name == Body.name )
        console.log(ThisUser);
        
        if (ThisUser) {
          const Token = jwt.sign({
                data: ThisUser
            }, 'secret', { expiresIn: '1h' });
            console.log(Token);
            let isAdmin:boolean = false 
            ThisUser.role === "admin" ? isAdmin = true : isAdmin;
            
            res.json({ 
                token: Token,
                isAdmin: isAdmin
             });
        }
        return;
    }
    return;
})

app.listen(port, () => console.log(`Example app listening on port port!`))
