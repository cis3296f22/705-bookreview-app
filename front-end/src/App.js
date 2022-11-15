
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import Home from "./components/Home";
import Login from "./components/Login";
import SearchBar from "./components/SearchBar";


function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path='/login' element={<Login />} />
        <Route path='/search' element={<SearchBar />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App

