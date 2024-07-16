import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [matakuliah, setMatakuliah] = useState([]);

  useEffect(() => {
    const fetchMatakuliah = async () => {
      try {
        const response = await axios.get('/api/matakuliah');
        setMatakuliah(response.data);
      } catch (error) {
        console.error('There was an error fetching the matakuliah!', error);
      }
    };

    fetchMatakuliah();
  }, []);

  return (
    <div className="relative">
      <header className="App-header">
        <h1 className="text-2xl font-bold mb-4">Daftar Matakuliah</h1>
        {matakuliah.length > 0 ? (
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-4 py-2 border-b">Kode MK</th>
                <th className="px-4 py-2 border-b">Nama MK</th>
                <th className="px-4 py-2 border-b">SKS</th>
                <th className="px-4 py-2 border-b">Semester</th>
              </tr>
            </thead>
            <tbody>
              {matakuliah.map(mk => (
                <tr key={mk._id}>
                  <td className="px-4 py-2 border-b">{mk.kodeMK}</td>
                  <td className="px-4 py-2 border-b">{mk.namaMK}</td>
                  <td className="px-4 py-2 border-b">{mk.sks}</td>
                  <td className="px-4 py-2 border-b">{mk.semester}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No matakuliah available</p>
        )}
      </header>
    </div>
  );
};

export default App;
