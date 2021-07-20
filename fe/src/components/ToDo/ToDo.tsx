import React from 'react'
import { BoxRedirectS } from "./ToDoS";


const ToDoApp = () => {
    return (
        <div>
            <h1>ToDO App</h1>
        </div>
    )
}

const BoxRedirect = () => {
    return (
        <BoxRedirectS>
            <h2>Ooops</h2>
            <p>
                sembra che non tu non sia registrato o loggato <br />
                <a href="/login">Vai a Login</a> <br />
                <a href="/Registrati">Regostrati</a>
            </p>
        </BoxRedirectS>
    )
}

const ToDo = () => {

    const Token = localStorage.getItem("token");
    const IsAdmin = localStorage.getItem("isAdmin");

    return (
        <div>
            {
                Token? <ToDoApp /> : <BoxRedirect />
            }
        </div>
    )
}

export default ToDo
