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
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-blue-200 to-white p-6">
    <h1 className="text-3xl font-bold mb-6 text-gray-800">🎉 Upcoming Birthdays 🎉</h1>
    
    <ul className="w-full max-w-md bg-white shadow-lg rounded-lg p-4">
      {birthdays.length === 0 ? (
        <p className='text-center text-gray-500'>No Birthdays Added Yet!</p>
      ) : (
        birthdays.map((bday) => (
          <li key={bday.id} className="p-4 mb-2 border rounded-lg shadow-sm bg-gray-50 flex justify-between">
            {editingBirthday?.id === bday.id ? (
              // Edit Form
              <form onSubmit={(e) => handleEditSubmit(e, bday.id)} className='flex gap-2'>
                <input 
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className='border p-2 rounded w-24' />
                <input 
                  type="date"
                  value={editDate}
                  onChange={(e) => setEditDate(e.target.value)}
                  className='border p-2 rounded' />
                  <button type='submit' className='bg-green-500 text-white px-3 py-1 rounded'> ✅ Save</button>
                  <button type='button' onClick={() => setEditingBirthday(null)} className='text-red-500'>❌ Cancel</button>
              </form>
            ) : (
              <>
               <span className="font-semibold text-gray-700">{bday.name}</span>
               <span className="text-gray-500">{bday.date}</span>
               <button onClick={() => startEditing(bday)} className='bg-blue-500 text-white px-3 py-1 rounded ml-2'>  ✏️ Edit</button>
               <button onClick={() => handleDelete(bday.id)} className='bg-red-500 text-white px-3 py-1 rounded ml-2'> 🗑️ Delete</button>
              </>
            )}
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