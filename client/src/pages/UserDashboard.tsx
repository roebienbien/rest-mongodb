import axios from 'axios';
import { useEffect, useState } from 'react';
import { API_ENDPOINT } from '../config/config';
import { Link } from 'react-router-dom';

export default function userDashboard() {
  const TableHeader = [
    {
      title: '_id',
    },
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
    password: string;
  };

  const [users, setUsers] = useState<TUser[]>([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const { data } = await axios.get<TUser[]>(`${API_ENDPOINT}/users?p=${page}`);
        setUsers(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllUsers();
  }, [page]);

  const previousPage = () => {
    setPage((prevPage) => prevPage - 1);
  };

  const nextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleDelete = async (id: string) => {
    try {
      const deletedUser = await axios.delete(`${API_ENDPOINT}/users/${id}`);
      console.log(deletedUser.data);
      setUsers(users?.filter((user) => user._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  //   users ? () : ()

  return (
    <div className='min-h-screen w-full px-10 '>
      <div className='flex justify-between py-4'>
        <h2 className='font-bold text-4xl'>{`Users Dashboard ${page + 1}`}</h2>
      </div>
      <table className='w-full overflow-x-clip'>
        {/* <table> */}
        <thead>
          <tr className=''>
            {TableHeader.map((header, index) => (
              <th className=' text-left bg-gray-300' key={index}>
                {header.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className=''>
          {users ? (
            users.map((user, index) => (
              <tr key={index} className='even:bg-gray-100 text-sm lowercase'>
                <td className=''>{user._id}</td>
                <td className=''>{user.username}</td>
                <td className=''>{user.email}</td>
                {/* <td className=''>{user.password}</td> */}
                <td className='space-x-4'>
                  <Link to='/update' className='text-blue-500'>
                    update
                  </Link>
                  <button onClick={() => handleDelete(user._id)} className='text-red-500'>
                    delete
                  </button>
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
      <div className='space-x-10 justify-center mt-4 flex'>
        <button onClick={previousPage} className='bg-blue-700 w-20 rounded-lg shadow-lg p-2 text-white'>
          Prev
        </button>
        <button onClick={nextPage} className='bg-blue-700 p-2 w-20 rounded-lg shadow-lg text-white'>
          Next
        </button>
      </div>
    </div>
  );
}
