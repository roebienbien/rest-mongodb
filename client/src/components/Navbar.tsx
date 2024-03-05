export const Navbar = () => {
  const NavLinks = [
    {
      title: 'Home',
      to: '/home',
    },
    {
      title: 'About',
      to: '/about',
    },
    {
      title: 'contact',
      to: '/home',
    },
  ];

  return (
    <div className='sticky bg-green-200 h-16  px-20 top-0 z-50 '>
      <div className='flex justify-between h-full items-center '>
        <h3>Logo Here</h3>
        <ul className='space-x-10 flex'>
          {NavLinks.map((link, index) => (
            <li key={index} className=''>
              {link.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
