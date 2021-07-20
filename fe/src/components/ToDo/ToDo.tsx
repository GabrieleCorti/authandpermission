import React from 'react'
import { BoxRedirectS } from "./ToDoS";
import MainApp from '../MainApp';


interface Props {
    isAdmin: boolean 
}


const ToDoApp = ({isAdmin}:Props) => {
    return (
        <MainApp isAdmin={isAdmin} />
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
    const IsAdmin = (localStorage.getItem("isAdmin") === 'true');
    console.log(IsAdmin);
    

    return (
        <div>
            {
                Token? <ToDoApp isAdmin={IsAdmin}/> : <BoxRedirect />
            }
        </div>
    )
}

export default ToDo
