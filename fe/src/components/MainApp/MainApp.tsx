import React from 'react'

interface Props {
    isAdmin: boolean
}


const MainApp = ({isAdmin}:Props) => {
    return (
        <div>
            <h1>ToDo with Admin</h1>
            <div>
                <ul>
                    <li>l'elemento {isAdmin && <button>x</button>}</li>
                </ul>
            </div>
            <div>
                <input type="text" />
                <button>Add</button>
            </div>
        </div>
    )
}

export default MainApp
