import React from 'react'
import classes from './Card.module.css'
import { Outlet } from 'react-router-dom'
const Card = ({ children }: any) => {
    return (
        <div className={classes['card']}>
            <Outlet />
        </div>
    )
}

export default Card