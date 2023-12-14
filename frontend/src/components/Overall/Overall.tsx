import React, { useState, useCallback, useEffect } from 'react'
import classes from './Overall.module.css'
import taskCompletedIcon from '../../assets/icons/taskCompleted.svg'

interface YearStats {
    completed: number,
    uncompleted: number,
    ratio: number
}

const Overall = ({ year }: { year: number }) => {
    const [stats, setStats] = useState<YearStats>({
        completed: 0,
        uncompleted: 0,
        ratio: 0
    })

    const fetchYearStats = useCallback(async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/tasks/stats/${year}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data: YearStats = await response.json();
            if (response.ok) {
                setStats(data)
            } else {
                console.log('Error fetching monthly tasks:', response.statusText);
            }
        } catch (err) {
            console.log('Error fetching monthly tasks:', err);
        }
    }, [setStats, year]);

    useEffect(() => {
        fetchYearStats()
    }, [fetchYearStats, year])

    return (
        <div className={classes['overall']}>
            <h1 className={classes['overall-title']}>
                <img src={taskCompletedIcon} alt="task-completed-icon" />
                Overall
            </h1>
            <div className={classes['overall-stat-container']}>
                <p>{stats.completed} completed</p>
            </div>
            <div className={classes['overall-stat-container']}>
                <p>{stats.completed + stats.uncompleted} created</p>
            </div>
            <div className={classes['overall-stat-container']}>
                <p>{Math.round(stats.ratio * 100) / 100} ratio</p>
            </div>
        </div>
    )
}

export default Overall