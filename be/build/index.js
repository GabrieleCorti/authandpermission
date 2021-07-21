"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const app = express();
const port = 5000;
const url = "http://localhost:3000/";
const cors = require("cors");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const dayjs = require("dayjs");
const TabelUser = require("../db/user.json");
const TableTask = require("../db/task.json");
app.use(cors());
app.use(express.json());
const VerifyToken = (req, res, next) => {
    const AuteticationHead = req.header("authorization");
    const token = AuteticationHead && AuteticationHead.split(" ")[1];
    if (token == "undefined") {
        res.sendStatus(401);
    }
    jwt.verify(token, "secret", (err, token) => {
        if (err) {
            res.send(err);
        }
        /* res.json(token); */
        if (dayjs().isAfter(token.exp)) {
            res.sendStatus(401);
        }
        res.locals.id = token.id;
        next();
    });
};
app.get("/", VerifyToken, (req, res) => res.json(res.locals.id));
app.post("/user/addUser", (req, res) => {
    const Body = req.body;
    let users = TabelUser.users;
    if (Body.name && Body.password) {
        const NewUser = {
            id: users.length + Math.random() * 1000,
            name: Body.name,
            password: Body.password,
            role: "user",
        };
        users.push(NewUser);
        const UserTxt = JSON.stringify(users);
        fs.writeFileSync("../db/user.json", `{ "users": ${UserTxt} }`);
        return;
    }
    return;
});
app.post("/user/login", (req, res) => {
    const TabelUser = require("../db/user.json");
    const Body = req.body;
    /* console.log(Body); */
    const Users = TabelUser.users;
    /* console.log(Users); */
    if (Body.name && Body.password) {
        /* console.log(Body.name, Body.password); */
        const ThisUser = Users.find((e) => {
            return e.name === Body.name;
        });
        if (ThisUser) {
            const Token = jwt.sign({
                exp: dayjs().add(1, "h").valueOf(),
                id: ThisUser.id,
            }, "secret");
            console.log(Token);
            let isAdmin = false;
            ThisUser.role === "admin" ? (isAdmin = true) : isAdmin;
            res.json({
                token: Token,
                isAdmin: isAdmin,
            });
            return;
        }
        res.sendStatus(401);
    }
    return;
});
app.get("/allTask", (req, res) => {
    const TableTask = require("../db/task.json");
    const Datas = TableTask.tasks;
    res.json(Datas);
});
app.post("/allTask", (req, res) => {
    //leggo i file e li trasformo in json array
    const Datas = TableTask.tasks;
    //se il body ha dati pusho
    if (req.body.body != "") {
        let newTask = {
            id: Datas.length + Math.random() * 1000,
            body: req.body.body,
        };
        Datas.push(newTask);
        //riTrasformo array in stringa e tascrivo il file
        const TaskTxt = JSON.stringify(Datas);
        fs.writeFileSync("../db/task.json", `{ "tasks": ${TaskTxt} }`);
        res.json(Datas);
        return;
    }
    return;
});
/* app.post("/allTask/delete/:id", function (req: Request, res: Response) {
  const id = Number(req.params.id);
  console.log(id);
  
  let datas:Task[] = TableTask.tasks;

  datas = datas.filter((e) => e.id !== id);
  console.log(datas);
  //riTrasformo array in stringa e tascrivo il file
  const TaskTxt = JSON.stringify(datas);
  console.log(TaskTxt);
  
  fs.writeFileSync("../db/task.json", `{ "tasks": ${TaskTxt} }`);
  res.json(datas);
 
}); */
app.post("/allTask/delete/:id", (req, res) => {
    const id = Number(req.params.id);
    const A = require("../db/task.json");
    const Datas = A.tasks;
    let datas = Datas.filter((e) => e.id !== id);
    const TaskTxt = JSON.stringify(datas);
    console.log(TaskTxt);
    fs.writeFileSync("../db/task.json", `{"tasks": ${TaskTxt}}`);
    /* res.json(datas); */
    res.redirect("http://localhost:3000/ToDo");
});
app.listen(port, () => console.log(`Example app listening on port port!`));
