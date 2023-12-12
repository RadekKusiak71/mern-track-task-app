import React, { useEffect, useState } from 'react'
import Task from '../components/Task/Task'
import classes from './Taskslist.module.css'



const Taskslist = () => {

  interface TaskObj {
    _id: string
    title: string
    create_date: string,
    description: string
    completed: boolean
  }

  const [tasks, setTasks] = useState<TaskObj[]>([])


  const fetchTasks = async () => {
    let response: Response = await fetch('http://127.0.0.1:8000/notes/uncompleted/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    let data = await response.json()
    if (response.ok) {
      setTasks(data)
    } else {
      console.log(response)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [tasks])

  return (
    <div className={classes['tasks-container']}>
      {tasks.length > 0 && (
        tasks.map((task: TaskObj, index: number) => <Task key={index} fetchTasks={fetchTasks} animateNumber={index} task={task} />)
      )}
    </div>
  )

}

export default Taskslist