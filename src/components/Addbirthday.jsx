import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Addbirthday = ({ addBirthday }) => {
    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!name || !date) return alert('Please fill all fields!');
        addBirthday(name, date);
        navigate('/');
    };

  return (
    <div className='min-h-screen flex flex-col items-center bg-gradient-to-b from-green-200 to-white p-6'>
        <h1 className='text-3xl font-bold mb-6 text-gray-800'>➕ Add a New Birthday</h1>
        <form onSubmit={handleSubmit} className='w-full max-w-md bg-white shadow-lg rounded-lg p-6'>
            <label className='block mb-2 text-gray-600 font-medium'>Name</label>
            <input 
                type="text"
                placeholder='Enter Name'
                className='w-full p-3 mb-4 border rounded-lg focus:ring-2 focus:ring-green-400'
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <label className='block mb-2 text-gray-600 font-medium'>Date</label>
            <input 
                type="date"
                className='w-full p-3 mb-4 border rounded-lg focus:ring-2 focus:ring-green-400'
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />
            <button className='w-full p-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition'>
                Save Birthday
            </button>
        </form>

        <button onClick={() => navigate('/')} className='mt-6 text-green-600 hover:text-green-800'>⬅ Go Back</button>
    </div>
  )
}

export default Addbirthday