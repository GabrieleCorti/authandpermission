const express = require('express')
const app = express()
const port = 5000
import { Response, Request, NextFunction  } from "express";
const url:string = 'http://localhost:3000/'
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.get('/', (req:Request, res:Response) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port port!`))