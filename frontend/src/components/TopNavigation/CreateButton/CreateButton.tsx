import React, { useState } from 'react'
import classes from './CreateButton.module.css'
import { motion } from 'framer-motion'
import CreateTaskForm from '../CreateTaskForm/CreateTaskForm'

const CreateButton = () => {
    const [openForm, setOpenForm] = useState<Boolean>(false)
    const handleFormOpening = () => {
        setOpenForm(!openForm)
    }
    return (
        <>
            {openForm && (
                <CreateTaskForm handleFormOpening={handleFormOpening} />
            )}
            <motion.button onClick={()=>handleFormOpening()} whileHover={{ scale: 1.1 }} initial={{ scale: 0.5 }} animate={{ scale: 1 }} className={classes['create-button']}>Create</motion.button>
        </>
    )
}

export default CreateButton