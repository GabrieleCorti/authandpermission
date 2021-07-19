import React from 'react'
import LogSubS from './LogSubS'
import LogSignForm from '../LogSignForm'
import NavS from './NavS'


interface Props {
    links:string[],
    isSigIn:boolean,
    title:string
}

const LogSub = ({links, isSigIn, title}:Props) => {
    return (
        <LogSubS>
            <NavS>
                <ul>
                    {
                        links.map((e, index) => {
                            return <li key={index}><a href={`http://localhost:3000/${e}`}>{e}</a></li>
                        })
                    }
                </ul>
            </NavS>
            <LogSignForm title={title} isSignIn={isSigIn}/>
        </LogSubS>
    )
}

export default LogSub
