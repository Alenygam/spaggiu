import React from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {createGlobalStyle} from 'styled-components';

import Login from './pages/Login';
import Home from './pages/Home';
import Grades from './pages/Grades';
import Index from './pages/Index';
import Agenda from './pages/Agenda';
import Absences from './pages/Absences';
import Sidebar from './parts/Sidebar';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0; 
    border: 0;
    box-sizing: border-box;
  }  *:focus {
    outline: 0;
  }  html, body, #root {
    height: 100%;
  }  body {
    -webkit-font-smoothing: antialiased;
  }  body, input, button {
    font: 16px 'Fira Sans', sans-serif;
  }  a {
    text-decoration: none;
  }  ul {
    list-style: none;
  }  button {
    cursor: pointer;
  }
`

const MainComponent = () => {

  return (
    <React.StrictMode>
      <BrowserRouter>
        <Sidebar />
        <Routes>
          <Route exact path="/" element={<Index/>}/>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/home" element={<Home/>}/>
          <Route exact path="/grades" element={<Grades/>}/>
          <Route exact path="/agenda" element={<Agenda/>}/>
          <Route exact path="/absences" element={<Absences/>}/>
        </Routes>
      </BrowserRouter>
      <GlobalStyle />
    </React.StrictMode>
  )
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<MainComponent />);
