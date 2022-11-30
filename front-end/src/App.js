
// import React,{useState} from "react";
import { Routes, Route } from "react-router-dom";
import './App.css';
import Home from "./components/Home";
import Login from "./components/Login";
import SearchBar from "./components/SearchBar";
import BookShelf from "./components/BookShelf"
import AppBar from "./components/AppBar"
import Account from "./components/Account";
import Review from "./components/Review";
import ShowReview from "./components/ShowReview";
import useToken from "./useToken";



function App(){

  const [ token, setToken ] = useToken();

  // console.log(token)

  if(!token) {
    return <Login setToken={setToken}/>
  }

  return (
    <>
    
    {/* <BrowserRouter> */}
    <AppBar/>
      <Routes>
        {/* <Route path="/" element={<Navigate to="/login" />} /> */}
        {/* <Route path='/login' element={<Login />} /> */}
        <Route path='/705-bookreview-app' element={<SearchBar token={token}/>} />
        <Route path='/705-bookreview-app/search' element={<SearchBar token={token}/>} />
        <Route path='/705-bookreview-app/shelves' element={<BookShelf token={token}/>} />
        <Route path='/705-bookreview-app/account' element={<Account token={token}/>} />
        <Route path='/705-bookreview-app/review' element={<Review token={token}/>} />
        <Route path='/705-bookreview-app/showreview' element={<ShowReview token={token}/>} />
      </Routes>
    {/* </BrowserRouter> */}
    
    </>
  );
  
};

export default App

