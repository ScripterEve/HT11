import React from "react";
import NavBar from "./components/NavBar.jsx"
import HomePage from "./components/HomePage.jsx";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        {/* <Route path=""  element={}></Route>
        <Route path=""  element={}></Route>
        <Route path=""  element={}></Route> */}
      </Routes>
    </>
  );
}

export default App;
