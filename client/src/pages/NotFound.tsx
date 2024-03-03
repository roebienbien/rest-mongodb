import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div>
      <div>Oops! You seem to be lost.</div>
      <Link to='/'>Go back home</Link>
    </div>
  );
}
