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
        <label htmlFor="confirm" >Confirm Password</label>
        <input type="password" id='confirm' onChange={onChange} required/>
        </>
    )
}

const LogInForm = ({title, signIn}:Props) => {
   const [name, setName] = useState<string>('');
   const [password, setPassword] = useState<string>('');
   const [confirm, setConfirm] = useState<string>('');
   const [isComplete, setIsComplete] = useState<boolean>(false);
   /* const [isSame, setIsSame] = useState<boolean>(false); */



    useEffect(()=> {
        if (name && password && confirm === password) {
            setIsComplete(true);
        } 
    },[name, confirm, password]);

    const Subscribe = () => {
        if (isComplete) {
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
        } else {
            alert('i campi vanno tutti compilati')
        }
        
    }

    return (
        <LogSignFormS>
            <h1>{title}</h1>
            <label htmlFor="name">Name</label>
            <input type="text" id='name' onChange={e => setName(e.target.value)} required/>
            <label htmlFor="password">PassWord</label>
            <input type="password" id='password' onChange={e => setPassword(e.target.value)} required/>
            {signIn && <ConfirmPword onChange={(e:React.ChangeEvent<HTMLInputElement>) => setConfirm(e.target.value)} />}
            <BtnLogSign onClick={Subscribe}>{(signIn && 'Registrati') || 'Login'}</BtnLogSign>
        </LogSignFormS>
    )
}

export default LogInForm
