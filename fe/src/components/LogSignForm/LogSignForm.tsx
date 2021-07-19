import React from 'react'
import LogSignFormS from './LogSignFormS'
import BtnLogSign from './BtnLogSign'

interface Props {
    title: string
    signIn: boolean
}

const ConfirmPword = () => {
    return(
        <>
        <label htmlFor="password">Confirm Password</label>
        <input type="password" id='password' />
        </>
    )
}

const LogInForm = ({title, signIn}:Props) => {

    return (
        <LogSignFormS>
            <h1>{title}</h1>
            <label htmlFor="name">Name</label>
            <input type="text" id='name' />
            <label htmlFor="password">PassWord</label>
            <input type="password" id='password' />
            {signIn && <ConfirmPword />}
            <BtnLogSign>{signIn && 'Registrati' || 'Login'}</BtnLogSign>
        </LogSignFormS>
    )
}

export default LogInForm
