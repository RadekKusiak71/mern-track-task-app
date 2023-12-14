import React, { useState } from 'react'
import classes from './CreateTaskForm.module.css'
import { motion } from 'framer-motion'

interface formState {
    title: string,
    description: string,
    create_date: Date
}


const CreateTaskForm = ({ handleFormOpening }: { handleFormOpening: Function }) => {
    const [data, setData] = useState<formState>({
        title: '',
        description: '',
        create_date: new Date()
    })
    const [error, setError] = useState<Boolean>(false)

    const handleInputChange = (e: any) => {
        setError(false)
        let name = e.target.name
        let value = e.target.value
        setData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const createTask = async () => {
        try {

            let response = await fetch('http://127.0.0.1:8000/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            if (response.ok) {
                console.log('xdxdd')
            } else {
                console.log(data)
            }
        } catch (err) {
            console.log(err)
        }
    }
    const handleSubmiting = (e: any) => {
        e.preventDefault()
        if (data.title.trim().length > 0 && data.description.trim().length > 0) {
            createTask()

            setData({
                title: '',
                description: '',
                create_date: new Date()
            })

            handleFormOpening()
            window.location.reload()
        } else {
            setError(true)
        }
    }

    return (
        <div onClick={() => handleFormOpening()} className={classes['create-backdrop']}>
            <motion.form onClick={(e) => e.stopPropagation()} animate={{ translateY: ['-200%', '0%'] }} onSubmit={handleSubmiting} className={classes['task-form']}>
                <h4>Create Task</h4>
                {error ? (
                    <>
                        <input placeholder='Title Required' className={classes['task-form-input']} onChange={handleInputChange} name='title' value={data.title} />
                        <textarea placeholder='Description Required' className={classes['task-form-textarea']} onChange={handleInputChange} name='description' value={data.description} />
                    </>
                ) : (
                    <>
                        <input placeholder='Enter Title' className={classes['task-form-input']} onChange={handleInputChange} name='title' value={data.title} />
                        <textarea placeholder='Enter description' className={classes['task-form-textarea']} onChange={handleInputChange} name='description' value={data.description} />
                    </>
                )}
                <button type='submit' className={classes['task-form-button']}>CREATE</button>
            </motion.form>
        </div >
    )
}

export default CreateTaskForm