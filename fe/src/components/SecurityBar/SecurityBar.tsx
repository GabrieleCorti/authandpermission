import React from 'react'
import { Bar, BarContainer } from './SecurityBarS'

interface Props {
    number:number
}


const SecurityBar = ({number}:Props) => {

    let items = [1,2,3,4]

    return (
        <BarContainer>
             {items.map((e, index) => {
                 console.log('test');
                 return <Bar key={index} className={index<=number? `active a${index}` : '' } />
             } ) }
        </BarContainer>
    )
}

export default SecurityBar
