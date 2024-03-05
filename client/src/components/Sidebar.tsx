import { useState } from 'react';

export default function Sidebar() {
  const NavLinks = [
    {
      title: 'Dashboard',
      to: '/dashboard',
    },
    {
      title: 'About',
      to: '/home',
    },
    {
      title: 'Settings',
      to: '/home',
    },
  ];

  const [isOpen, setIsOpen] = useState(true);

  const handleOpen = () => setIsOpen((prevState) => !prevState);
  return (
    // <div className={`p-4 bg-red-200 w-64`}>
    <div className={`${isOpen ? 'w-64' : 'w-12'} p-4 bg-red-200`}>
      <div>
        <ul className='space-y-10'>
          {NavLinks.map((link, index) => (
            <li key={index} className='text-xl'>
              {link.title}
            </li>
          ))}
        </ul>
        {/* <button onClick={() => setIsOpen((prevState) => !prevState)}>OpenClose</button> */}
        <button onClick={handleOpen}>OpenClose</button>
      </div>
    </div>
  );
}
