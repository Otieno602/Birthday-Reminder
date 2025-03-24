import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from 'react';
import Home from "./components/Home";
import Addbirthday from "./components/Addbirthday";
import { FaBirthdayCake } from 'react-icons/fa';

function App () {
  const [birthdays, setBirthdays] = useState(() => {
    const storedBirthdays = localStorage.getItem('birthdays');
    return storedBirthdays ? JSON.parse(storedBirthdays) : [
      {id: 1, name:'Lydia Lyminah', date:'1997-01-10'},
      {id: 2, name:'Charity Mbula', date:'1997-01-23'},
    ];
  });

  useEffect(() => {
    localStorage.setItem('birthdays', JSON.stringify(birthdays));
  }, [birthdays]);

  useEffect(() => {
    if (Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  const sendNotification = (title, message) => {
    if(Notification.permission === 'granted') {
      new Notification(title, {
        body: message,
        icon: <FaBirthdayCake className='text-4xl text-red-700'/>,
      });
    }
  };

  useEffect(() => {
    const today = new Date();
    birthdays.forEach((bday) =>{
      const birthdayDate = new Date(bday.date);
      birthdayDate.setFullYear(today.getFullYear());
      const differenceInDays = Math.ceil((birthdayDate - today) / (1000 * 60 *60 *24));

      if(differenceInDays === 3) {
        sendNotification('Birthday Reminder!', `${bday.name}'s birthday is in 3 days`);
      }
    });
  }, [birthdays]);

  useEffect(() => {
    const today = new Date();

    if(today.getDate() === 1) {
      const thisMonth = today.getMonth();
      const birthdaysThisMonth = birthdays.filter((bday) =>new Date(bday.Date).getMonth() === thisMonth);

      if(birthdaysThisMonth.length > 0) {
        sendNotification('Monthly Birthday Reminder!', `You have ${birthdaysThisMonth.length} birthdays this month. Ensure you have sent your token to avoid penalty.`);
      }
    }
  }, [birthdays]);

  const addBirthday = (name, date) => {
    const newBirthday = { id: Date.now(), name, date};
    setBirthdays([...birthdays, newBirthday])
  };

  const editBirthday = (id, newName, newDate) => {
    setBirthdays((prev) =>
      prev.map((b) => (b.id === id ? {...b, name: newName, date: newDate} : b))
    );
  };

  const deleteBirthday = (id) => {
    setBirthdays((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home birthdays={birthdays} editBirthday={editBirthday} deleteBirthday={deleteBirthday}/>} />
        <Route path='/add' element={<Addbirthday addBirthday={addBirthday}/>} />
      </Routes>
    </Router>
  );
};

export default App;
