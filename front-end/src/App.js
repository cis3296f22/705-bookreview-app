
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Home from "./components/Home";
import SearchBar from "./components/SearchBar";

function App(){
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/search' element={<SearchBar />} />
    </Routes>
    </BrowserRouter>
  );
};

export default App;
