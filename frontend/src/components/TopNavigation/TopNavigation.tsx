import React from 'react'
import classes from './TopNavigation.module.css'
import CreateButton from './CreateButton/CreateButton'
import customerIconActive from '../../assets/icons/customer-active.svg'
import dashboardIconActive from '../../assets/icons/dashboard-active.svg'
import taskslistIconActive from '../../assets/icons/tasklist-active.svg'
import { Outlet, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

const navigationTitle = (pageTitle: string) => {
  let title!: string
  let path!: string

  if (pageTitle === '/') {
    title = 'Dashboard'
    path = dashboardIconActive
  } else if (pageTitle === '/taskslist') {
    title = 'Taskslist'
    path = taskslistIconActive
  } else if (pageTitle === '/profile') {
    title = 'Profile'
    path = customerIconActive
  }

  return (
    <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} key={title} className={classes['top-nav-title']}><img src={path} alt={title} className={classes['top-navigation-icon']} />{title}</motion.h1>
  )
}

const TopNavigation = ({ children }: any) => {

  let location = useLocation();
  const pageTitle: string = location.pathname

  return (
    <>
      <div className={classes['top-navigation-container']}>
        <div className={classes['navigation-upper']}>
          {navigationTitle(pageTitle)}
          <CreateButton />
        </div>
        <hr style={{ display: 'block', width: '100%', margin: 'auto auto 20px auto', height: '3px', border: '0px', backgroundColor: '#3F3F3F' }} />
      </div>
      <Outlet />
    </>
  )
}

export default TopNavigation