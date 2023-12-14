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
    fetchUncompletedTasks: Function
}
const Task = ({ task, fetchUncompletedTasks }: TaskProp) => {

    const dateManipulateYMD = (createdDate: string) => {
        const year: number = new Date(createdDate).getFullYear()
        const day: number = new Date(createdDate).getDate()
        const month: number = new Date(createdDate).getMonth()
        return `${year}-${month}-${day}`
    }

    return (
        <motion.div animate={{ scale: 1 }} initial={{ scale: 0.7 }} className={classes['task-container']}>
            <h2 className={classes['task-title']}>{task.title}</h2>
            <p className={classes['task-date']}>{dateManipulateYMD(task.create_date)}</p>
            <p className={classes['task-description']}>{task.description}</p>
            <div className={classes['task-actions']}>
                <TaskButton fetchUncompletedTasks={fetchUncompletedTasks} taskID={task._id} />
                <TaskButtonDelete fetchUncompletedTasks={fetchUncompletedTasks} taskTitle={task.title} />
            </div>
        </motion.div>
    )
}

export default Task