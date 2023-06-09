import React from 'react';
import { whiteshoes } from '../assets';

const Cart = () => {
  return (
    <div className='cart_overlay'>
      <div className='singleItem bg-white flex item-top w-1/2 mx-4 ml-10 py-3 my-3 rounded-xl relative'>
        <div className='bg-gray-200 mx-5'>
          <img src={whiteshoes} alt='white shoes' className='w-40' />
        </div>

        <div className='itemDetails flex justify-between flex-col'>
          <h2 className='text-lg'>White Shoes</h2>
          <p className=''>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>

          <div className='price'>
            <h4>Price: 722$</h4>
          </div>
        </div>
      </div>

      <div className='flex bg-white'>
        <div className='flex-none'>
          <img src={whiteshoes} alt='P' className='h-48 w-48' />
        </div>
        <div className='flex-grow p-4'>
          <h3 className='text-xl font-bold'>Product Name</h3>
          <div className='mt-2'>
            <p className='text-gray-600'>Price: $19.99</p>
            <p className='text-gray-600'>Quantity: 10</p>
          </div>
        </div>

        <div className='flex item-center justify-between my-3 bg-gray-400 w-[60px] px-2 rounded-md text-white'>
          <p className=''>+</p>
          <hr className='h-5 w-[1px] border-none bg-white' />
          <p>3</p>
          <hr className='h-5 w-[1px] border-none bg-white' />
          <p>-</p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
