import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RxCrossCircled } from 'react-icons/rx';
import SingleProduct from './SingleProductCart';
import { getCart } from '../states/features/cart/cartSlice';

const SubTotal = () => {
  return (
    <div className='md:w-3/4 sm:w-full bg-white rounded-lg px-4 my-4 py-5'>
      <h2 className='text-xl font-bold text-thickGrayText'>Cart Subtotal</h2>
      <div className='flex justify-between'>
        <h3 className='text-sm text-black my-2'>Item(s)total</h3>
        <h3 className='text-sm text-black my-2'>USD</h3>
      </div>
      <div className='flex'>
        <h3>Shipping</h3>
        <h3>USD</h3>
      </div>

      <div className='w-full text-center'>
        <button
          type='submit'
          className='bg-primary hover:opacity-9 cursor-pointer text-white font-medium py-2 px-4 border border-blue-200 rounded'
        >
          PROCEED
        </button>
      </div>
    </div>
  );
};

const Cart = () => {
  const [count, setCount] = useState(5);
  const dispatch = useDispatch();

  const cart = useSelector((state) => {
    return state.cart;
  });

  useEffect(() => {
    dispatch(getCart());
    console.log(cart);
  }, [dispatch]);

  return (
    <div className='cart_overlay w-full px-[10%] py-[10%] relative flex'>
      <div className='mx-4 ml-10 w-3/4'>
        <SingleProduct
          name='Nike Air Max 270 React ENG'
          details='Men’s Shoe and it is one of the best shoes in the world'
          piecePrice='USD 122.00'
          quantity={count}
        />
        <SingleProduct
          name='Nike Air Max 270 React ENG'
          details='Men’s Shoe and it is one of the best shoes in the world'
          piecePrice='USD 122.00'
          quantity={count}
        />
        <SingleProduct
          name='Nike Air Max 270 React ENG'
          details='Men’s Shoe and it is one of the best shoes in the world'
          piecePrice='USD 122.00'
          quantity={count}
        />
        <SingleProduct
          name='Nike Air Max 270 React ENG'
          details='Men’s Shoe and it is one of the best shoes in the world'
          piecePrice='USD 122.00'
          quantity={count}
        />
      </div>

      <div className='mx-4 ml-10 w-1/2'>
        <SubTotal />
      </div>

      <div className='absolute top-20 right-15 text-xl'>
        <RxCrossCircled
          className='text-4xl text-thickGrayText'
          style={{ fontSize: '100px' }}
        />
      </div>
    </div>
  );
};

export default Cart;
