import React from 'react';
import { Link } from 'react-router-dom';

const Home = ({ birthdays }) => {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-blue-200 to-white p-6">
    <h1 className="text-3xl font-bold mb-6 text-gray-800">🎉 Upcoming Birthdays</h1>
    
    <ul className="w-full max-w-md bg-white shadow-lg rounded-lg p-4">
      {birthdays.length === 0 ? (
        <p className='text-center text-gray-500'>No Birthdays Added Yet!</p>
      ) : (
        birthdays.map((bday) => (
          <li key={bday.id} className="p-4 mb-2 border rounded-lg shadow-sm bg-gray-50 flex justify-between">
            <span className="font-semibold text-gray-700">{bday.name}</span>
            <span className="text-gray-500">{bday.date}</span>
          </li>
        ))
      )}
    </ul>

    <Link to='/add' className="mt-6 px-5 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition">
      ➕ Add Birthday
    </Link>
  </div>
  );
};

export default Home