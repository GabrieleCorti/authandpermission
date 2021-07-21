import React from 'react'
import MainAppS from './MainAppS'
import {useState, useEffect} from 'react'
import axios from 'axios';

interface Props {
    isAdmin: boolean
}

interface Task {
    id:number | null,
    body:string | null
}

const MainApp = ({isAdmin}:Props) => {
    const [Task, setTask] = useState<Task[]>([]);
    const [Body, setBody] = useState<string>('');

    useEffect(()=>{
        try {
            axios.get('http://localhost:5000/allTask')
                .then((res)=>{
                    setTask(res.data);
                })
        } catch (error) {
            alert(error);
        }
    }, []);

    const SubmitTask = () => {
       if (Body) {
           try {
            axios({
                url: 'http://localhost:5000/allTask',
                method: 'post',
                data: {
                    body: Body,
                } 
            })
            .then((res) => {
                console.log(res);
                
                setTask(res.data);
            });
           } catch (error) {
               alert(error);
           }
       }
    }

    const DeleteTask = (id:number | null) => {
        try {
            axios.post(`http://localhost:5000/allTask/delete/${id}`)
                .then((res) => {
                    setTask(res.data)
                })
        } catch (error) {
            alert(error);
        }
    }

    

    return (
        <MainAppS>
            <h1>ToDo with Admin</h1>
            <div>
                <ul>
                    {
                       Task.map(e => {
                           return <li key={e.id}>{e.body} {e.id} {isAdmin && <form action={`http://localhost:5000/allTask/delete/${e.id}`} method='POST'><button >x</button></form>}</li>
                       }) 
                    }
                </ul>
            </div>
            <div className='form'>
                <input type="text" onChange={e => setBody(e.target.value)}/>
                <button onClick={SubmitTask}>Add</button>
            </div>
        </MainAppS>
    )
}

export default MainApp
