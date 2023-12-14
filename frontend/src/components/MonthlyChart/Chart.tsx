import React, { useCallback, useEffect, useState } from 'react';
import classes from './Chart.module.css';
import taskCompletedIcon from '../../assets/icons/taskCompleted.svg';
import { motion } from 'framer-motion';

interface MonthlyData {
    completedTasksPerMonth: number[];
}

const Chart = ({ year, handleYearChange }: { year: number, handleYearChange: Function }) => {
    const [monthlyData, setMonthlyData] = useState<MonthlyData | undefined>();
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const fetchMonthlyCompletedTasks = useCallback(async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/tasks/monthly/${year}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data: MonthlyData = await response.json();
            if (response.ok) {
                setMonthlyData(data);
            } else {
                console.log('Error fetching monthly tasks:', response.statusText);
            }
        } catch (err) {
            console.log('Error fetching monthly tasks:', err);
        }
    }, [setMonthlyData, year]);

    useEffect(() => {
        setMonthlyData({ completedTasksPerMonth: [] })
        fetchMonthlyCompletedTasks();
    }, [year, fetchMonthlyCompletedTasks, setMonthlyData]);

    return (
        <motion.div animate={{ opacity: [0, 1] }} transition={{ delay: 0.2 }} className={classes['chart-container']}>
            <h1 className={classes['chart-title']}>
                <img src={taskCompletedIcon} alt="task-completed-icon" />
                Task completed per month
            </h1>
            <div className={classes['chart-year-input']}>
                <button type='button' name='last' onClick={(e) => handleYearChange(e)}>Last</button>
                <motion.h3 animate={{ opacity: [0, 1] }} key={year}>{year}</motion.h3>
                <button type='button' name='next' onClick={(e) => handleYearChange(e)}>Next</button>
            </div>
            <div className={classes['chart']}>
                {monthlyData && (
                    monthlyData.completedTasksPerMonth.map((month, index) => (
                        <motion.div
                            key={index}
                            className={classes['chart-column-container']}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            animate={{ opacity: [0, 1] }}
                        >
                            {hoveredIndex === index ? (
                                <motion.div
                                    className={classes['chart-column']}
                                    style={{ height: `${(month / Math.max(...monthlyData.completedTasksPerMonth)) * 100}%` }}
                                    animate={{ translateY: ['20px', '-10px'] }}

                                    initial={{ translateY: '0%' }}
                                ></motion.div>
                            ) : (
                                <div
                                    className={classes['chart-column']}
                                    style={{ height: `${(month / Math.max(...monthlyData.completedTasksPerMonth)) * 100}%` }}
                                ></div>
                            )}

                            <hr />
                            <p>{index + 1}</p>
                            {hoveredIndex === index && (
                                <motion.div animate={{ translateY: ['-120%', '0%'] }} className={classes['hover-info']}>
                                    <p>{month}</p>
                                </motion.div>
                            )}
                        </motion.div>
                    ))
                )}
            </div>
        </motion.div>
    );
};

export default Chart;
