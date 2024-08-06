import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div>
      <h1 className='font-bold text-2xl text-center'>File Upload And Download</h1>
      <nav className='flex gap-2 justify-center items-center'>
        <span className='text-green-600 font-bold underline'>
            <Link to="/">
              Home
            </Link>
        </span>

        <span className='text-green-600 font-bold underline'>
            <Link to="/list">
              Files List
            </Link>
        </span>
      </nav>
    </div>
  );
};

export default Header;