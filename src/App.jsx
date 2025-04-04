import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';
import Home from "./components/Home";
import Addbirthday from "./components/Addbirthday";

const API_URL = "http://localhost:5000/api/birthdays"; // Your backend endpoint

function App () {
  const [birthdays, setBirthdays] = useState([]);
      const fetchBirthdays = async () => {
        try{
          const response = await axios.get(API_URL);
          console.log("Fetched Birthdays:", response.data);
          setBirthdays(response.data);
        } catch (error) {
            console.error('Error fetching birthdays', error);
        }
      };
      useEffect(() => {
        fetchBirthdays();
      }, []);

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
        icon: '',
        requireInteraction: true,
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
      const birthdaysThisMonth = birthdays.filter((bday) => {
        const birthdayDate = new Date(bday.date);
        return !isNaN(birthdayDate) && birthdayDate.getMonth() === thisMonth;
      });

      if(birthdaysThisMonth.length > 0) {
        sendNotification('Monthly Birthday Reminder!', `You have ${birthdaysThisMonth.length} birthdays this month. Ensure you have sent your token to avoid penalty.`);
      }
    }
  }, [birthdays]);

  const addBirthday = async (name, date) => {
    try {
      const response = await axios.post(API_URL, { name, date });
      setBirthdays([...birthdays, { ...response.data, _id: response.data._id }]);
    } catch (error) {
        console.error('Error adding birthday', error);
    }
  }

  const editBirthday = async (_id, name, date) => {
    try {
      const response = await axios.put(`${API_URL}/${_id}`, { name, date });
      setBirthdays(birthdays.map(b => (b._id === _id ? { ...response.data, 
        _id: response.data._id } : b)));
      } catch (error) {
          console.error('Error editing birthday', error);
      }
    };

  const deleteBirthday = async (_id) => {
    try {
      await axios.delete(`${API_URL}/${_id}`);
      setBirthdays(birthdays.filter(b => b._id !== _id));
    } catch (error) {
      console.error('Error deleting birthday', error);
    }
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
