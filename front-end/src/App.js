
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import Home from "./components/Home";
import Login from "./components/Login";
import SearchBar from "./components/SearchBar";
import BookShelf from "./components/BookShelf"
import AppBar from "./components/AppBar"



function App(){
  return (
    <>
    
    <BrowserRouter>
    <AppBar/>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path='/login' element={<Login />} />
        <Route path='/search' element={<SearchBar />} />
        <Route path='/home' element={<Home />} />
        <Route path='/shelves' element={<BookShelf />} />
      </Routes>
    </BrowserRouter>
    
    </>
  );
  
};

export default App

