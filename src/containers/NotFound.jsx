import React from 'react';
import { notFound } from '../assets';

const Notfound = () => {
  return (
    <main className='w-full flex flex-col justify-center items-center mt-[10%] mb-[15%]'>
      <h1 className='text-xl'> Whoops, looks like you got lost... </h1>
      <img className='mt-[2rem]' src={notFound} alt='' />
    </main>
  );
};

export default Notfound;
