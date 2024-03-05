import React from 'react';
import Sidebar from './Sidebar';
import { Navbar } from './Navbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  console.log('hello');
  return (
    <div className='bg-zinc-200 flex flex-col min-h-screen relative'>
      {/* navbar here */}
      <Navbar />
      <div className='flex'>
        <Sidebar />
        {children}
      </div>
    </div>
  );
}
