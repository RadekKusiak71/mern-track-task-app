import React from 'react'
import classes from './CreateButton.module.css'
import { motion } from 'framer-motion'

const CreateButton = () => {
    return (
        <motion.button whileHover={{ scale: 1.1 }} initial={{ scale: 0.5 }} animate={{ scale: 1 }} className={classes['create-button']}>Create</motion.button>
    )
}

export default CreateButton