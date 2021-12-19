import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {createGlobalStyle} from 'styled-components';

import Login from './pages/Login';
import Home from './pages/Home';
import Grades from './pages/Grades';

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
    font: 14px 'Roboto', sans-serif;
  }  a {
    text-decoration: none;
  }  ul {
    list-style: none;
  }  button {
    cursor: pointer;
  }
`

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route exact path="/login" element={<Login/>}/>
        <Route exact path="/home" element={<Home/>}/>
        <Route exact path="/grades" element={<Grades/>}/>
      </Routes>
    </BrowserRouter>
    <GlobalStyle />
  </React.StrictMode>,
  document.getElementById("root")
);
