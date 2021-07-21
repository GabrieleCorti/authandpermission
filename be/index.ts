const express = require("express");
const app = express();
const port = 5000;
import { Response, Request, NextFunction } from "express";
const url: string = "http://localhost:3000/";
const cors = require("cors");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const dayjs = require("dayjs");
const TabelUser = require("../db/user.json");
const TableTask = require("../db/task.json");

app.use(cors());
app.use(express.json());

interface User {
  id: number;
  name: string;
  password: string;
  role: "user" | "admin";
}

interface Body {
  name: string;
  password: string;
}

interface Task {
  id: number;
  body: string;
}

const VerifyToken = (req: Request, res: Response, next: NextFunction) => {
  const AuteticationHead = req.header("authorization");
  const token = AuteticationHead && AuteticationHead.split(" ")[1];
  if (token == "undefined") {
    res.sendStatus(401);
  }
  jwt.verify(token, "secret", (err: any, token: any) => {
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

app.get("/", VerifyToken, (req: Request, res: Response) =>
  res.json(res.locals.id)
);

app.post("/user/addUser", VerifyToken, (req: Request, res: Response) => {
  const Body = req.body;
  let users: User[] = TabelUser.users;

  if (Body.name && Body.password) {
    const NewUser: User = {
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

app.post("/user/login", (req: Request, res: Response) => {
  const TabelUser = require("../db/user.json");
  const Body: Body = req.body;
  /* console.log(Body); */

  const Users: User[] = TabelUser.users;
  /* console.log(Users); */

  if (Body.name && Body.password) {
    /* console.log(Body.name, Body.password); */

    const ThisUser = Users.find((e) => {
      return e.name === Body.name;
    });

    if (ThisUser) {
      const Token = jwt.sign(
        {
          exp: dayjs().add(1, "h").valueOf(),
          id: ThisUser.id,
        },
        "secret"
      );
      console.log(Token);
      let isAdmin: boolean = false;
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

app.get("/allTask", (req: Request, res: Response) => {
  const TableTask = require("../db/task.json");
  const Datas: Task[] = TableTask.tasks;
  res.json(Datas);
});

app.post("/allTask", VerifyToken, (req: Request, res: Response) => {
  //leggo i file e li trasformo in json array
  const Datas: Task[] = TableTask.tasks;
  //se il body ha dati pusho
  if (req.body.body != "") {
    let newTask: Task = {
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

app.post("/allTask/delete/:id", VerifyToken, (req: Request, res: Response) => {
  const userId = res.locals.id;
  const Users:User[] = TabelUser.users;
  const ThisUser = Users.find((e) => e.id === userId);

  if (ThisUser && ThisUser.role === "admin") {
    const id = Number(req.params.id);
    const A = require("../db/task.json");
    const Datas: Task[] = A.tasks;

    let datas = Datas.filter((e) => e.id !== id);

    const TaskTxt = JSON.stringify(datas);
    console.log(TaskTxt);

    fs.writeFileSync("../db/task.json", `{"tasks": ${TaskTxt}}`);
    /* res.json(datas); */
    return;
  }

  res.sendStatus(401);
});

app.listen(port, () => console.log(`Example app listening on port port!`));
