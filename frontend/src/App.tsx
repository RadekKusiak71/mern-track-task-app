import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard';
import Taskslist from './pages/Taskslist';
import Header from './components/Header/Header';
import TopNavigation from './components/TopNavigation/TopNavigation';
import Card from './components/UI/Card';

const App = () => {


  return (
    <div className='main-container'>
      <Router>
        <Header />
        <Routes>
          <Route element={<Card />}>
            <Route element={<TopNavigation />}>
              <Route path='/' element={<Dashboard />} />
              <Route path='/taskslist' element={<Taskslist />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
