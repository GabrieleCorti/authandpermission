import React from 'react'
import LogSignFormS from './LogSignFormS'
import BtnLogSign from './BtnLogSign'
import { useState, useEffect} from 'react'
import axios from 'axios'

interface Props {
    title: string
    signIn: boolean
}

const ConfirmPword = ({onChange}:any) => {
    return(
        <>
        <label htmlFor="confirm">Confirm Password</label>
        <input type="password" id='confirm' onChange={onChange} />
        </>
    )
}

const LogInForm = ({title, signIn}:Props) => {
   const [name, setName] = useState<string>('');
   const [password, setPassword] = useState<string>('');
   const [confirm, setConfirm] = useState<string>('');

    const Subscribe = () => {
        try {
            axios({
                method: 'post',
                url: "http://localhost:5000/user/addUser",
                data: {
                    name: name,
                    password: password
                }
            });
        } catch (err) {

            console.log(err);
            
        }
    }

    return (
        <LogSignFormS>
            <h1>{title}</h1>
            <label htmlFor="name">Name</label>
            <input type="text" id='name' onChange={e => setName(e.target.value)} />
            <label htmlFor="password">PassWord</label>
            <input type="password" id='password' onChange={e => setPassword(e.target.value)} />
            {signIn && <ConfirmPword onChange={(e:React.ChangeEvent<HTMLInputElement>) => setConfirm(e.target.value)} />}
            <BtnLogSign onClick={Subscribe}>{(signIn && 'Registrati') || 'Login'}</BtnLogSign>
        </LogSignFormS>
    )
}

export default LogInForm
