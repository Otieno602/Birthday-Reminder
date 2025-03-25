import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Home = ({ birthdays, editBirthday, deleteBirthday }) => { 
  const [editingBirthday, setEditingBirthday] = useState(null);
  const [editName, setEditName] = useState('');
  const [editDate, setEditDate] = useState('');

  const startEditing = (bday) => {
    setEditingBirthday(bday);
    setEditName(bday.name);
    setEditDate(bday.date);
  };

  const handleEditSubmit = async (e, id) => {
    e.preventDefault();
    if(!editName.trim() || !editDate.trim()) {
      alert('Please fill in both the name and the date fields!');
      return;
    }
    try{
      await editBirthday(id, editName, editDate);
      setEditingBirthday(null);
    }catch (error) {
      console.error('Error editing birthday:', error);
      alert('Failed to update the birthday. Please try again')
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this birthday?');
    if(!confirmDelete) return;
    try{
      await deleteBirthday(id);
    }catch (error) {
      console.error('Error deleting birthday:', error);
      alert('Failed to delete the birthday. Please try again');
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-gradient-to-b from-blue-200 to-white p-4 md:p-6">
    <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-gray-800 text-center">🎉 Upcoming Birthdays 🎉</h1>
    
    <div className='w-full max-w-4xl px-2 md:px-0'>
      <ul className="w-full bg-white shadow-lg rounded-lg p-3 md:p-4">
        {birthdays.length === 0 ? (
          <p className='text-center text-gray-500 py-4'>No Birthdays Added Yet!</p>
        ) : (
          birthdays.map((bday) => (
            <li key={bday.id} className="p-3 md:p-4 mb-2 border rounded-lg shadow-sm bg-gray-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              {editingBirthday?.id === bday.id ? (
                // Edit Form
                <form onSubmit={(e) => handleEditSubmit(e, bday.id)}    className='w-full flex flex-col sm:flex-row gap-2'>
                  <input 
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className='border p-2 rounded flex-1 min-w-0'
                    placeholder='Name' />
                  <input 
                    type="date"
                    value={editDate}
                    onChange={(e) => setEditDate(e.target.value)}
                    className='border p-2 rounded flex-1 min-w-0' />
                  <div className='flex gap-2 mt-2 sm:mt-0'>
                    <button type='submit' className='bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700 transition flex-1'>Save</button>
                    <button type='button' onClick={() => setEditingBirthday(null)} className='bg-gray-300 text-gray-800 px-3 py-1 rounded hover:bg-gray-500 transition flex-1'>Cancel</button>
                  </div>
                </form>
              ) : (
                <div className='w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap2'>
                  <div className='flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 flex-1 min-w-0'>
                    <span className="font-semibold text-gray-700 truncate">{bday.name}</span>
                    <span className="text-gray-500 text-sm sm:text-base">{bday.date}</span>
                  </div>
                  <div className='flex gap-2 mt-2 sm:mt-0 self-end sm:self-auto'>
                    <button onClick={() => startEditing(bday)} className='bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700 transition text-sm sm:text-base'>Edit</button>
                    <button onClick={() => handleDelete(bday.id)} className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition text-sm sm:text-base'>Delete</button>
                  </div>
                </div>
              )}
            </li>
          ))
        )}
      </ul>
    </div>

    <Link to='/add' className="mt-6 px-5 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition text-sm sm:text-base">
       Add Birthday
    </Link>
  </div>
  );
};

export default Home