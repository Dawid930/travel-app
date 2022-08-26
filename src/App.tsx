import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './Components/HomePage';
import About from './Components/About';
import Navbar from './Components/Navbar';
import Create from './Components/Create';
import TravelDetails from './Components/TravelDetails';


function App() {
  return (
    <BrowserRouter>
    <div className='app'>
      <Navbar/>
      <div className='content'>
      <Routes>
        <Route path='/' element={ <Homepage/> } />
        <Route path='/create' element={ <Create/> } />
        <Route path='/about' element={ <About/> } />
        <Route path='/travels/:id' element={ <TravelDetails /> } />

      </Routes>
      </div>
    </div>
    </BrowserRouter>

  );
}

export default App;
