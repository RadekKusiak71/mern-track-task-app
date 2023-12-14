import React from 'react'
import classes from './Menu.module.css'
import { NavLink } from "react-router-dom";
import dashboardIcon from '../../../assets/icons/dashboard.svg'
import dashboardIconActive from '../../../assets/icons/dashboard-active.svg'
import taskslistIcon from '../../../assets/icons/tasklist.svg'
import taskslistIconActive from '../../../assets/icons/tasklist-active.svg'
import { motion } from 'framer-motion'

interface MenuLink {
    title: string
    path: string
    activeImg: string
    unactiveImg: string
}


const Menu = () => {

    const renderNavLink = ({ path, title, activeImg, unactiveImg }: MenuLink) => (
        <NavLink
            to={path}
            className={({ isActive }) => isActive ? classes['active'] : classes['unactive']}
        >
            {({ isActive }) => (
                <>
                    {isActive ?
                        <motion.img
                            initial={{ scale: 0.1 }}
                            animate={{ scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}
                            key='imgActive'
                            className={classes['menu-icons']} src={activeImg} alt={title} />
                        :
                        <motion.img
                            initial={{ scale: 0.1 }}
                            animate={{ scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4 }}
                            key='imgUnactive'
                            className={classes['menu-icons']} src={unactiveImg} alt={title} />
                    }
                    {title}
                </>
            )}

        </NavLink>
    );

    return (
        <nav className={classes['nav-bar']}>
            {renderNavLink({ path: '/', title: 'Dashboard', activeImg: dashboardIconActive, unactiveImg: dashboardIcon })}
            {renderNavLink({ path: '/taskslist', title: 'Taskslist', activeImg: taskslistIconActive, unactiveImg: taskslistIcon })}
        </nav>
    )
}

export default Menu