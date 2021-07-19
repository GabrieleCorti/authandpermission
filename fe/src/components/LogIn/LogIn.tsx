import React from 'react'
import LogInS from './LogInS'
import LogSignForm from '../LogSignForm'

const LogIn = () => {
    return (
        <LogInS>
            <LogSignForm title='Register to ToDo with Admin' signIn={true}/>
        </LogInS>
    )
}

export default LogIn
