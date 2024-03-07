// import { Link } from 'react-router-dom';

import { Link } from 'react-router-dom';

export const Navbar = () => {
  const NavLinks = [
    {
      title: 'Home',
      src: '/home',
    },
    {
      title: 'About',
      src: '/about',
    },
    {
      title: 'Contact',
      src: '/home',
    },
  ];

  return (
    <div className='sticky border-2  h-20 px-20 top-0 z-50 '>
      <div className='flex justify-between h-full items-center '>
        <h3 className='font-bold text-2xl cursor-pointer'>Logo </h3>
        <ul className='space-x-10 flex'>
          {NavLinks.map((link, index) => (
            <li key={index}>
              <Link to={link.src} className='text-xl font-semibold'>
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
        <Link to='/' className='bg-blue-500 px-4 py-3 text-lg text-white rounded-lg shadow-lg'>
          Login
        </Link>
      </div>
    </div>
  );
};
