import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import Home from "./components/Home";
import Addbirthday from "./components/Addbirthday";

function App () {
  const [birthdays, setBirthdays] = useState([
    {id: 1, name:'Lydia Lyminah', date:'1997-01-10'},
    {id: 2, name:'Charity Mbula', date:'1997-01-23'},
  ]);

  const addBirthday = (name, date) => {
    const newBirthday = { id: Date.now(), name, date};
    setBirthdays([...birthdays, newBirthday])
  }

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home birthdays={birthdays}/>} />
        <Route path='/add' element={<Addbirthday addBirthday={addBirthday}/>} />
      </Routes>
    </Router>
  );
};

export default App;
