import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import BuyerNavbar from './BuyerNavbar';
import Button from '../components/Button';
import { useGetAllWishlistQuery } from '../states/api/apiSlice';
import Loading from '../components/Loading';
import Navigate from '../outlets/Navigate';

const BuyerWishlistContainer = () => {
  const { data, isError, isLoading } = useGetAllWishlistQuery();

  if (isLoading)
    return (
      <div className='min-h-[80vh] flex items-center justify-center'>
        <Loading width={20} />
      </div>
    );

  if (isError) {
    return (
      <div className='min-h-[80vh] flex items-center justify-center text-[3rem] font-bold'>
        <Navigate />
      </div>
    );
  }

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
              className=' primary-btn'
            />
          </div>
        </div>
        <div className='flex flex-wrap w-[90%] justify-evenly mx-auto h-full gap-8 p-12 items-start'>
          {data.data.availableProducts ? (
            data.data.availableProducts.map((prod) => {
              return (
                <section className='prod_wishlist_container shadow-lg p-8 h-full max-h-[37rem] w-[30%] min-w-[30rem] flex flex-col gap-8 items-center bg-white rounded-lg'>
                  <div
                    className='w-full flex flex-col items-center h-full justify-between gap-8'
                    key={prod.productId}
                  >
                    <div className='produ_image_container w-full h-full min-h-[20rem] bg-gray-100'>
                      <img
                        alt='Wishlist avatar'
                        className='w-full h-full object-contain'
                        src={prod.product.image[0]}
                      />
                    </div>
                    <div className='prod_details w-full h-full flex flex-col items-center justify-between'>
                      <h3 className='max-w-[90%] text-[2rem] font-bold truncate text-ellipsis'>
                        {prod.product.name}
                      </h3>
                      <p className='text-[1.6rem] font-medium'>
                        {prod.product.price}
                      </p>
                    </div>
                  </div>
                  <div>
                    <Button
                      className='primary-btn bg-red-600 text-white normal-case hover:bg-red-600 px-4 py-4 cursor-pointer'
                      value={
                        <span className='text-[1.5rem] cursor-pointer'>
                          <FontAwesomeIcon
                            icon={faTrash}
                            className='bg-red-600 w-[1.5rem] h-[1.5rem]'
                          />{' '}
                          Remove
                        </span>
                      }
                    />
                  </div>
                </section>
              );
            })
          ) : (
            <div>No products available</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BuyerWishlistContainer;
