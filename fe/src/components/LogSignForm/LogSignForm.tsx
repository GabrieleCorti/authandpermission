import React from 'react'
import LogSignFormS from './LogSignFormS'
import BtnLogSign from './BtnLogSign'
import { useState, useEffect} from 'react'
import axios from 'axios'

interface Props {
    title: string
    isSignIn?: boolean
}

const ConfirmPword = ({onChange}:any) => {
    return(
        <>
        <label htmlFor="confirm" >Confirm Password</label>
        <input type="password" id='confirm' onChange={onChange} required/>
        </>
    )
}

const LogInForm = ({title, isSignIn}:Props) => {
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
                }).then((res)=>{

                    if (res.status === 400) {
                        alert('cis oo stati problemi con la registrazione, ritorna più tardi')
                    }
                }
                );
            } catch (err) {
    
                console.log(err);
                
            } 
        } else {
            alert('i campi vanno tutti compilati')
        }
        
    }

    const LogIn = () => {
       try {
        axios({
            method: "post",
            url: "http://localhost:5000/user/login",
            data: {
                name: name,
                password: password
            }
        })
        .then((res)=>{
            localStorage["token"] = res.data.token
            localStorage["isAdmin"]= res.data.isAdmin
        });
       } catch (error) {
           alert(error)   
       }
    }

    return (
        <LogSignFormS>
            <h1>{title}</h1>
            <label htmlFor="name">Name</label>
            <input type="text" id='name' onChange={e => setName(e.target.value)} required/>
            <label htmlFor="password">PassWord</label>
            <input type="password" id='password' onChange={e => setPassword(e.target.value)} required/>
            {isSignIn && <ConfirmPword onChange={(e:React.ChangeEvent<HTMLInputElement>) => setConfirm(e.target.value)} />}
            <BtnLogSign onClick={isSignIn && Subscribe || LogIn}>{(isSignIn && 'Registrati') || 'Login'}</BtnLogSign>
        </LogSignFormS>
    )
}

export default LogInForm
