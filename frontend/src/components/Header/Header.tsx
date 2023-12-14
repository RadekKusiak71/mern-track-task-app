import React from 'react'
import classes from './Header.module.css'
import Menu from './NavBard/Menu';
import { motion } from 'framer-motion'

const Header = () => {

    return (
        <motion.header animate={{translateX:['-150%','0%']}} transition={{duration:0.3}} className={classes['header']}>
            <h1 className={classes['header-logo']}>Task<br />Tracker</h1>
            <Menu />
        </motion.header>
    )
}

export default Header