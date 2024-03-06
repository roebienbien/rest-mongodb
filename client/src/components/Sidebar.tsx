import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  const NavLinks = [
    {
      title: 'Dashboard',
      to: '/userDashboard',
    },
    {
      title: 'About',
      to: '/',
    },
    {
      title: 'Settings',
      to: '/',
    },
  ];

  const [isOpen, setIsOpen] = useState(true);

  const handleOpen = () => setIsOpen((prevState) => !prevState);
  return (
    <div className={`${isOpen ? 'w-64' : 'w-12'} p-4  border-r-2   `}>
      <div>
        {/* <button onClick={handleOpen} className='text-2xl'>
          Open
        </button> */}
        <ul className='space-y-10 mt-4'>
          {NavLinks.map((link, index) => (
            <li key={index} className='text-xl'>
              <Link to={link.to}>{link.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
