import React, { useCallback, useEffect, useState } from 'react';
import Task from '../components/Task/Task';
import classes from './Taskslist.module.css';
import SearchInput from '../components/SearchInput/SearchInput';

const Taskslist = () => {
  interface TaskObj {
    _id: string;
    title: string;
    create_date: string;
    description: string;
    completed: boolean;
  }

  const [tasks, setTasks] = useState<TaskObj[]>([]);
  const [query, setQuery] = useState<string>('');

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const fetchUncompletedTasks = useCallback(async () => {
    try {
      let response = await fetch('http://127.0.0.1:8000/tasks/uncompleted/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      let data = await response.json();
      if (response.ok) {
        setTasks(data);
      } else {
        console.log(response);
      }
    } catch (error) {
      console.error('Error fetching all tasks:', error);
    }
  }, [setTasks]);

  const fetchTasksByQuery = useCallback(async () => {
    try {
      let response = await fetch(`http://127.0.0.1:8000/tasks?query=${query}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      let data = await response.json();
      if (response.ok) {
        setTasks(data);
      } else {
        console.log(response);
      }
    } catch (error) {
      console.error('Error fetching tasks by query:', error);
    }
  }, [setTasks, query]);

  useEffect(() => {
    if (!query) {
      fetchUncompletedTasks();
    } else {
      fetchTasksByQuery();
    }
  }, [query, fetchUncompletedTasks, fetchTasksByQuery]);

  return (
    <>
      <SearchInput handleQueryChange={handleQueryChange} />
      <div className={classes['tasks-container']}>
        {tasks.length > 0 ?
          tasks.map((task: TaskObj, index: number) => (
            <Task key={index} fetchUncompletedTasks={fetchUncompletedTasks} task={task} />
          )) : <h1 style={{ textAlign: 'center', width: '100%' }}>No tasks found</h1>}
      </div>
    </>
  );
};

export default Taskslist;
