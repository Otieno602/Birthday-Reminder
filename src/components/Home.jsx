import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getBirthdays, editBirthday, deleteBirthday } from '../api/birthdays';
import { toast } from 'react-toastify';

function Home () {
  const [birthdays, setBirthdays] = useState([]);

  const [editingBirthday, setEditingBirthday] = useState(null);
  const [editName, setEditName] = useState('');
  const [editDate, setEditDate] = useState('');


  // Fetch birthdays from backend
  useEffect(() => {
    fetchBirthdays()
  }, []);
  const fetchBirthdays = async () => {
    try {
      const res = await getBirthdays();
      setBirthdays(res.data);
    } catch (err) {
      console.error('Error fetching birthdays:', err);
    }
  };
  
  // Edit existing birthday
  const handleEditSubmit = async (e, _id) => {
    e.preventDefault();
    if(!editName.trim() || !editDate.trim()) {
      toast.error('Please fill in both the name and the date fields!');
      return;
    }
    try{
      await editBirthday(_id, editName, editDate);
      toast.success('Birthday updated successfully');
      setEditingBirthday(null);
      fetchBirthdays();
    }catch (error) {
      console.error('Error editing birthday:', error);
      toast.error('Failed to update the birthday. Please try again')
    }
  };
  
  // Delete birthday
  const handleDelete = async (_id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this birthday?');
    if(!confirmDelete) return;
    try{
      await deleteBirthday(_id);
      toast.success('Birthday deleted successfully!');
      setBirthdays(birthdays.filter(b => b._id !== _id));
    }catch (error) {
      console.error('Error deleting birthday:', error);
      toast.error('Failed to delete the birthday. Please try again');
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
            <li key={bday._id} className="p-3 md:p-4 mb-2 border rounded-lg shadow-sm bg-gray-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              {editingBirthday?._id === bday._id ? (
                // Edit Form
                <form onSubmit={(e) => handleEditSubmit(e, bday._id)}    className='w-full flex flex-col sm:flex-row gap-2'>
                  <input 
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className='border p-2 rounded flex-1 min-w-0'
                    placeholder='Name'
                    required />
                  <input 
                    type="date"
                    value={editDate}
                    onChange={(e) => setEditDate(e.target.value)}
                    className='border p-2 rounded flex-1 min-w-0'
                    required />
                  <div className='flex gap-2 mt-2 sm:mt-0'>
                    <button type='submit' className='bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700 transition flex-1'>Save</button>
                    <button type='button' onClick={() => setEditingBirthday(null)} className='bg-gray-300 text-gray-800 px-3 py-1 rounded hover:bg-gray-500 transition flex-1'>Cancel</button>
                  </div>
                </form>
              ) : (
                <div className='w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2'>
                  <div className='flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 flex-1 min-w-0'>
                    <span className="font-semibold text-gray-700 truncate">{bday.name}</span>
                    <span className="text-gray-500 text-sm sm:text-base">{new Date (bday.date).toLocaleDateString()}</span>
                  </div>
                  <div className='flex gap-2 mt-2 sm:mt-0 self-end sm:self-auto'>
                    <button onClick={() => {
                      setEditingBirthday(bday);
                      setEditName(bday.name);
                      setEditDate(bday.date);
                    }} className='bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700 transition text-sm sm:text-base'>Edit</button>
                    <button onClick={() => handleDelete(bday._id)} className='bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 transition text-sm sm:text-base'>Delete</button>
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