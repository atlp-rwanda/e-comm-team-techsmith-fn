import React, { useState, useEffect } from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { Typography } from '@mui/material';

export const ChangePassword = () => {
  const [count, setCount] = useState(8);

  useEffect(() => {
    if (count > 0) {
      setTimeout(() => {
        setCount(count - 1);
      }, 1000);
    }
  }, [count]);

  return (
    <div className='changePassword absolute top-[30%] flex w-full justify-center h-[32%]'>
      <div className='popMessage::first-child z-[999] flex flex-col justify-evenly border border-blue-900 items-center bg-white w-[40%]'>
        <h1 className='text-lg'>Expired Password</h1>
        <Typography variant='h5' className='w-[70%] text-center'>
          It has been more than 29 days since you last changed your password.
          For security purposes, please reset your password to continue with the
          login process.
        </Typography>
        {count > 0 && (
          <div>
            <p>you will be redirected in {count} seconds ... </p>
          </div>
        )}
        <AiOutlineInfoCircle className='text-2xl text-red-500' />
      </div>
    </div>
  );
};
