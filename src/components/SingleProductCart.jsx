import React from 'react';
import AddRemoveButton from './AddRemoveButton';
import { whiteshoes } from '../assets';

const SingleProduct = ({ name, details, piecePrice, quantity }) => {
  return (
    <div>
      <div className='singleItem bg-white flex space-x-10 item-top  py-3 my-3 rounded-xl relative'>
        <div className='bg-gray-200 mx-5 my-auto'>
          <img
            src={whiteshoes}
            alt='white shoes'
            className='w-40 flex-grow-2'
          />
        </div>

        <div className='itemDetails flex justify-between flex-col w-full'>
          <h2 className='text-xl font-bold text-thickGrayText'>{name}</h2>
          <p className='text-grayText text-sm'>{details}</p>

          <div className='flex items-center justify-between pr-4 w-full mt-7'>
            <p className='price text-xs text-thickGrayText'>
              {piecePrice}/<i>piece</i>
            </p>

            <AddRemoveButton count1={quantity} />

            <p className='text-sm'>{quantity * piecePrice}</p>
          </div>
        </div>

        <div
          role='button'
          className='absolute top-2 right-4 inline-flex bg-primary rounded-md cursor-pointer px-2 py-2'
        >
          <p className='text-xs text-white'>Order Now</p>
        </div>
      </div>
      <hr className='border-none bg-white  w-full h-2' />
    </div>
  );
};

export default SingleProduct;
