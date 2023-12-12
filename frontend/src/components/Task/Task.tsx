import React from 'react'
import classes from './Task.module.css'
import TaskButton from './TaskButton/TaskButton'
import TaskButtonDelete from './TaskButtonDelete/TaskButtonDelete'
import { motion } from 'framer-motion'

interface TaskProp {
    task: {
        _id: string
        title: string
        create_date: string,
        description: string
        completed: boolean,
    }
    animateNumber: number
    fetchTasks: Function
}

const Task = ({ task, animateNumber, fetchTasks }: TaskProp) => {
    return (
        <motion.div animate={{ translateX: ['200%', '0%'] }} transition={{ delay: animateNumber * 0.01 }} className={classes['task-container']}>
            <h2 className={classes['task-title']}>{task.title}</h2>
            <p className={classes['task-date']}>{task.create_date}</p>
            <p className={classes['task-description']}>{task.description}</p>
            <div className={classes['task-actions']}>
                <TaskButton fetchTasks={fetchTasks} taskID={task._id} />
                <TaskButtonDelete fetchTasks={fetchTasks} taskTitle={task.title} />
            </div>
        </motion.div>
    )
}

export default Task