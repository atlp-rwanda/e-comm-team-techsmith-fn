import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RxCrossCircled } from 'react-icons/rx';
import { BsCart4 } from 'react-icons/bs';
import SingleProduct from './SingleProductCart';
import { getCart, clearCart } from '../states/features/cart/cartSlice';
import Loading from './Loading';

const SubTotal = ({ cart, sum }) => {
  return (
    <div className='bg-white rounded-lg px-10 my-4 py-5'>
      <h2 className='text-xl font-bold text-thickGrayText'>Cart Subtotal</h2>

      <table className='border-collapse border border-gray-300 mt-3'>
        <thead>
          <tr>
            <th className='border border-gray-300 px-4 py-2 text-sm'>
              Product
            </th>
            <th className='border border-gray-300 px-4 py-2 text-sm'>
              Price(USD)
            </th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => {
            return (
              <tr>
                <td className='border border-gray-300 px-4 py-2 text-xs text-thickGrayText'>
                  {item.name}
                </td>
                <td className='border border-gray-300 px-4 py-2 text-xs text-thickGrayText'>
                  {item.price}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className='flex justify-between'>
        <h3 className='text-sm text-black my-2'>Amount</h3>
        <h3 className='text-sm text-black my-2'>USD {sum}</h3>
      </div>

      <div className='w-full text-center'>
        <button
          type='submit'
          className='bg-primary hover:opacity-9 cursor-pointer text-white font-medium py-3 px-4 rounded-md hover:opacity-3 mt-2'
          onClick={() => {
            // create order and navigate to the order page
            // put the run the create order function here
          }}
        >
          Proceed to Order
        </button>
      </div>
    </div>
  );
};

const Cart = () => {
  const dispatch = useDispatch();

  const { cart, isLoading, isClearing } = useSelector((state) => {
    return state.cart;
  });

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  function closeCart() {
    document.querySelector('.cart_overlay').style.display = 'none';
  }

  const handleMouseOver = () => {
    setDangerous(true);
  };

  const handleMouseOut = () => {
    setDangerous(false);
  };

  const [dangerous, setDangerous] = useState(false);

  return (
    <div className='cart_overlay overflow-x-scroll'>
      {isLoading ? (
        <span className='absolute top-1/2 left-1/2 zoom-2'>
          {' '}
          <Loading />{' '}
        </span>
      ) : (
        <div className='cart_container bg-[#f2f1ef] w-[100%] sm:w-[60%] h-full absolute right-0'>
          {/* _______ button fo close popupu _________  */}
          <div
            role='button'
            className='absolute right-10 top-10 bg-primary px-10 py-2 cursor-pointer rounded-md'
            onClick={closeCart}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                closeCart();
              }
            }}
            tabIndex={0}
          >
            <RxCrossCircled className='text-white' />
          </div>

          <h2 className='text-2xl text-primary my-10 ml-10 font-bold'>
            View Cart <BsCart4 className='inline-block text-2xl' />
          </h2>

          <div className='items_and_checkout flex sm:px-10 flex-col sm:flex-row justify-between'>
            <div className='h-[60vh] overflow-y-scroll'>
              {cart.length === 0 ? (
                <h1 className='text-thickGrayText text-lg font-bold my-[30%]'>
                  {isClearing ? <Loading /> : 'No items in cart'}
                </h1>
              ) : (
                cart.map((item) => {
                  return (
                    <SingleProduct
                      name={item.name}
                      details='Men’s Shoe and it is one of the best shoes in the world'
                      piecePrice='USD 122.00'
                      quantity={1}
                    />
                  );
                })
              )}
            </div>

            {/* _______ subtotal___________ */}
            <div className='subtotal'>
              <SubTotal
                cart={cart}
                sum={cart.reduce((acc, item) => {
                  return acc + item.price;
                }, 0)}
              />

              <div
                role='button'
                className='my-7 border bg-white rounded-md py-4 hover:bg-red-800 hover:text-white relative'
                onMouseOver={handleMouseOver}
                onMouseOut={handleMouseOut}
                onClick={() => {
                  dispatch(clearCart());
                }}
              >
                <p className='text-center text-sm'>Clear Cart</p>
                {dangerous && (
                  <h1 className='text-center text-xs'>
                    **This action cannot be undone!**
                  </h1>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

// user credentials with some things in carts
// "email": "joshua1@gmail.com",
// "password": "Testing@123",
