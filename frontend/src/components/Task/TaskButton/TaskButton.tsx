import React from 'react'
import classes from './TaskButton.module.css'

const TaskButton = ({ taskID, fetchTasks }: { taskID: string, fetchTasks: Function }) => {
    const updateTask = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/notes/${taskID}/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                fetchTasks()
            } else {
                console.log('Failed to update task:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    return (
        <button onClick={updateTask} className={classes['task-button']}>
            Complete
        </button>
    );
};

export default TaskButton