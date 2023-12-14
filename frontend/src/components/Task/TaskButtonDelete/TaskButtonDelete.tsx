import React from 'react';
import classes from './TaskButtonDelete.module.css';

const TaskButtonDelete = ({ taskTitle, fetchUncompletedTasks }: { taskTitle: string, fetchUncompletedTasks: Function }) => {
    const deleteTask = async () => {
        console.log('xd')
        try {
            const response = await fetch(`http://127.0.0.1:8000/tasks/${taskTitle}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                fetchUncompletedTasks();
            } else {
                console.log('Failed to delete task:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    return (
        <button type='button' onClick={() => deleteTask()} className={classes['task-button-delete']}>
            Delete
        </button>
    );
};

export default TaskButtonDelete;
