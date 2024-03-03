import axios from 'axios';
import { useEffect, useState } from 'react';
import { API_ENDPOINT } from '../config/config';
import { Link } from 'react-router-dom';

export default function userDashboard() {
  const TableHeader = [
    {
      title: 'username',
    },
    {
      title: 'email',
    },
    {
      title: 'password',
    },
    {
      title: 'actions',
    },
  ];

  type TUser = {
    _id: string;
    username: string;
    email: string;
  };

  const [users, setUsers] = useState<TUser[]>();

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const userData = await axios.get<TUser[]>(`${API_ENDPOINT}/users/`);
        setUsers(userData.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllUsers();
  }, []);

  return (
    <div className='flex flex-col items-center min-h-screen bg-blue-100 justify-center'>
      <h2 className='font-bold text-2xl'>Dashboard</h2>
      {/* <table className='table-auto'> */}
      <table>
        <tbody className=''>
          <tr className=''>
            {TableHeader.map((header, index) => (
              <th key={index}>{header.title}</th>
            ))}
          </tr>
          {users ? (
            users.map((user, index) => (
              <tr key={index}>
                <td>{user._id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td className='space-x-4'>
                  <Link to='/update' className='text-blue-500'>
                    update
                  </Link>
                  <button className='text-red-500'>delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr className=''>
              <td colSpan={TableHeader.length} className='text-center'>
                Loading...
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
