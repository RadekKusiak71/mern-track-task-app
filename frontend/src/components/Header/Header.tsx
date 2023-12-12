import React from 'react'
import classes from './Header.module.css'
import Menu from './NavBard/Menu';

const Header = () => {

    return (
        <header className={classes['header']}>
            <h1 className={classes['header-logo']}>Task<br />Tracker</h1>
            <Menu />
        </header>
    )
}

export default Header