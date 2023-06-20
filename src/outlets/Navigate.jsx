import React from 'react';
import Button from '../components/Button';

const Navigate = () => {
  return (
    <div className='navigate_page min-h-[80vh] flex flex-col items-center justify-center gap-12 max-w-[90%] mx-auto'>
      <h1 className='text-[3rem] text-center normal-case font-bold screen-mid:text-[2.5rem] screen-base:text-[2rem]'>
        Please log into your account to view this.
      </h1>
      <Button
        value='Go to login page'
        route='/login'
        className='primary-btn py-6 px-8 min-w-[20rem] screen-mid:min-w-[15rem] screen-base:min-w-[10rem]'
      />
    </div>
  );
};

export default Navigate;
