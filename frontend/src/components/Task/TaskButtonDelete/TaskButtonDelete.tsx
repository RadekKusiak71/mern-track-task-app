import React from 'react';
import classes from './TaskButtonDelete.module.css';

const TaskButtonDelete = ({ taskTitle,fetchTasks }: { taskTitle: string,fetchTasks:Function }) => {
    const deleteTask = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/notes/${taskTitle}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                fetchTasks();
            } else {
                console.log('Failed to delete task:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    return (
        <button onClick={deleteTask} className={classes['task-button-delete']}>
            Delete
        </button>
    );
};

export default TaskButtonDelete;
