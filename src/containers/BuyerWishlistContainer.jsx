import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import BuyerNavbar from './BuyerNavbar';
import { wis } from '../assets';
import Button from '../components/Button';

const BuyerWishlistContainer = () => {
  return (
    <div className='flex '>
      <div>
        <BuyerNavbar />
      </div>
      <div className='bg-gray-200 w-full py-12'>
        <div className='flex items-center justify-between px-24 w-[100%]'>
          <div className='wishlist-txt-title '>
            <h1 className='text-2xl font-semibold  text-[#243665]'>
              Shopping Wishlist
            </h1>
          </div>
          <div className='wishlist-btn-create'>
            <Button
              value={
                <span className='button_with_icon'>
                  Delete All{' '}
                  <FontAwesomeIcon
                    style={{
                      width: '2rem',
                      height: '2rem'
                    }}
                    icon={faTrash}
                  />
                </span>
              }
              className=' primary-btn   '
            />
          </div>
        </div>
        <div className='flex flex-wrap w-[100%] items-center px-20 py-12 gap-8'>
          <div className='bg-white  w-[32%]'>
            <div className='flex items-center '>
              <div className='w-56 m-8'>
                <img src={wis} alt='' />
              </div>
              <div className='block space-y-12'>
                <div>
                  <h1 className='ml-8 text-sm'>street walk</h1>
                </div>

                <div>
                  <p className='ml-8'>$250</p>
                </div>
              </div>
            </div>
          </div>
          <div className='bg-white   w-[32%]'>
            <div className='flex items-center '>
              <div className='w-56 m-8'>
                <img src={wis} alt='' />
              </div>
              <div className='block space-y-12'>
                <div>
                  <h1 className='ml-8 text-sm'>street walk</h1>
                </div>

                <div>
                  <p className='ml-8'>$250</p>
                </div>
              </div>
            </div>
          </div>
          <div className='bg-white   w-[32%]'>
            <div className='flex items-center '>
              <div className='w-56 m-8'>
                <img src={wis} alt='' />
              </div>
              <div className='block space-y-12'>
                <div>
                  <h1 className='ml-8 text-sm'>street walk</h1>
                </div>

                <div>
                  <p className='ml-8'>$250</p>
                </div>
              </div>
            </div>
          </div>
          <div className='bg-white   w-[32%]'>
            <div className='flex items-center '>
              <div className='w-56 m-8'>
                <img src={wis} alt='' />
              </div>
              <div className='block space-y-12'>
                <div>
                  <h1 className='ml-8 text-sm'>street walk</h1>
                </div>

                <div>
                  <p className='ml-8'>$250</p>
                </div>
              </div>
            </div>
          </div>
          <div className='bg-white   w-[32%]'>
            <div className='flex items-center '>
              <div className='w-56 m-8'>
                <img src={wis} alt='' />
              </div>
              <div className='block space-y-12'>
                <div>
                  <h1 className='ml-8 text-sm'>street walk</h1>
                </div>

                <div>
                  <p className='ml-8'>$250</p>
                </div>
              </div>
            </div>
          </div>
          <div className='bg-white   w-[32%]'>
            <div className='flex items-center '>
              <div className='w-56 m-8'>
                <img src={wis} alt='' />
              </div>
              <div className='block space-y-12'>
                <div>
                  <h1 className='ml-8 text-sm'>street walk</h1>
                </div>

                <div>
                  <p className='ml-8'>$250</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerWishlistContainer;
