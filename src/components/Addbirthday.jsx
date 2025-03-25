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
    <div className='min-h-screen w-full flex flex-col items-center bg-gradient-to-b from-green-200 to-white p-4 md:p-6'>
        <h1 className='text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-gray-800 text-center'>🎂 Add a New Birthday 🎂</h1>
        <div className='w-full max-w-md px-3 sm:px-0'>
            <form onSubmit={handleSubmit} className='w-full bg-white shadow-lg rounded-lg p-4 md:p-6'>
                <div className='mb-4'>
                    <label className='block mb-2 text-gray-600 font-medium text-sm md:text-base'>Name</label>
                    <input 
                        type="text"
                        placeholder='Enter Name'
                        className='w-full p-2 md:p-3 border rounded-lg focus:ring-2 focus:ring-green-400 text-sm md:text-base'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className='mb-6'>
                    <label className='block mb-2 text-gray-600 font-medium text-sm md:text-base'>Date</label>
                    <input 
                        type="date"
                        className='w-full p-2 md:p-3 border rounded-lg focus:ring-2 focus:ring-green-400 text-sm md:text-base'
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>
                <button type='submit' className='w-full p-2 md:p-3 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition text-sm md:text-base'>
                    Save Birthday
                </button>
            </form>
        </div>

        <button onClick={() => navigate('/')} className='mt-4 md:mt-6 text-green-600 hover:text-green-800 text-sm md:text-base flex items-center'>
            <span className='mr-1'>⬅</span>Back to Birthdays</button>
    </div>
  )
}

export default Addbirthday