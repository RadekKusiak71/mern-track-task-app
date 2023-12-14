import React, { useState } from 'react'
import Chart from '../components/MonthlyChart/Chart'
import Overall from '../components/Overall/Overall'
import classes from './Dashboard.module.css'
const Dashboard = () => {

  const [year, setYear] = useState<number>(new Date().getFullYear());

  const handleYearChange = (e: any) => {
    if (e.target.name === "last") {
      setYear(prev => (prev -= 1))
    } else {
      setYear(prev => (prev += 1))
    }
  }
  return (
    <div className={classes['dashboard']}>
      <Chart handleYearChange={handleYearChange} year={year} />
      <Overall year={year} />
    </div>
  )
}

export default Dashboard