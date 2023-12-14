import React from 'react'
import classes from './TaskButton.module.css'

const TaskButton = ({ taskID, fetchUncompletedTasks }: { taskID: string, fetchUncompletedTasks: Function }) => {

    const updateTask = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/tasks/${taskID}/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log('xd')
            if (response.ok) {
                fetchUncompletedTasks()
            } else {
                console.log('Failed to update task:', response.statusText);
            }
        } catch (error) {
            console.log('xd')
            console.error('Error updating task:', error);
        }
    };

    return (
        <button type='button' onClick={() => updateTask()} className={classes['task-button']}>
            Complete
        </button>
    );
};

export default TaskButton