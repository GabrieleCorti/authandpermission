import React from 'react'
import LogInS from './LogInS'
import LogSignForm from '../LogSignForm'
import NavS from './NavS'

interface Props {
    links:string[]
}

const LogIn = ({links}:Props) => {
    return (
        <LogInS>
            <NavS>
                <ul>
                    {
                        links.map((e, index) => {
                            return <li key={index}><a href={`/${e}`}>{e}</a></li>
                        })
                    }
                </ul>
            </NavS>
            <LogSignForm title='Register to ToDo with Admin' signIn={true}/>
        </LogInS>
    )
}

export default LogIn
