import React from "react";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Home from "./components/Home";
import Addbirthday from "./components/Addbirthday";
import Login from "./components/Login";
import Registration from "./components/Registration";
import Navbar from "./components/Navbar";
import RecallPassword from "./components/RecallPassword";
import ResetPassword from "./components/ResetPassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = "http://localhost:5000/api/birthdays";

function App() {
  const [birthdays, setBirthdays] = useState([]);
  const fetchBirthdays = async () => {
    try {
      const response = await axios.get(API_URL);
      console.log("Fetched Birthdays:", response.data);
      setBirthdays(response.data);
    } catch (error) {
      console.error("Error fetching birthdays", error);
    }
  };
  useEffect(() => {
    fetchBirthdays();
  }, []);

  const addBirthday = async (name, date) => {
    try {
      const response = await axios.post(API_URL, { name, date });
      setBirthdays([
        ...birthdays,
        { ...response.data, _id: response.data._id },
      ]);
    } catch (error) {
      console.error("Error adding birthday", error);
    }
  };

  const editBirthday = async (_id, name, date) => {
    try {
      const response = await axios.put(`${API_URL}/${_id}`, { name, date });
      setBirthdays(
        birthdays.map((b) =>
          b._id === _id ? { ...response.data, _id: response.data._id } : b
        )
      );
    } catch (error) {
      console.error("Error editing birthday", error);
    }
  };

  const deleteBirthday = async (_id) => {
    try {
      await axios.delete(`${API_URL}/${_id}`);
      setBirthdays(birthdays.filter((b) => b._id !== _id));
    } catch (error) {
      console.error("Error deleting birthday", error);
    }
  };

  return (
    <>
      <ToastContainer position="top-center" />
      <Navbar />
      <Routes>
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <Home
              birthdays={birthdays}
              editBirthday={editBirthday}
              deleteBirthday={deleteBirthday}
            />
          }
        />
        <Route
          path="/add"
          element={<Addbirthday addBirthday={addBirthday} />}
        />
        <Route path="/recallPassword" element={<RecallPassword />} />
        <Route path="/resetPassword/:token" element={<ResetPassword />} />
      </Routes>
    </>
  );
}

export default App;
