
// import React,{useState} from "react";
import { Routes, Route } from "react-router-dom";
import './App.css';
import Home from "./components/Home";
import Login from "./components/Login";
import SearchBar from "./components/SearchBar";
import BookShelf from "./components/BookShelf"
import AppBar from "./components/AppBar"
import Account from "./components/Account";
import useToken from "./useToken";



function App(){

  const [ token, setToken ] = useToken();

  // console.log(token)

  if(!token || token=='') {
    return <Login setToken={setToken}/>
  }

  return (
    <>
    
    {/* <BrowserRouter> */}
    <AppBar/>
      <Routes>
        {/* <Route path="/" element={<Navigate to="/login" />} /> */}
        {/* <Route path='/login' element={<Login />} /> */}
        <Route path='/' element={<SearchBar token={token}/>} />
        <Route path='/search' element={<SearchBar token={token}/>} />
        <Route path='/shelves' element={<BookShelf token={token}/>} />
        <Route path='/account' element={<Account token={token}/>} />
      </Routes>
    {/* </BrowserRouter> */}
    
    </>
  );
  
};

export default App

