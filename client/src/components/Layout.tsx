import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='bg-zinc-200'>
      {/* navbar here */}
      {children}
    </div>
  );
}
