import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import BuyerNavbar from './BuyerNavbar';
import Button from '../components/Button';
import {
  useDeleteAllWishlistMutation,
  useDeleteSingleWishlistMutation,
  useLazyGetAllWishlistQuery
} from '../states/api/apiSlice';
import Loading from '../components/Loading';
import {
  removeFromWishlist,
  updateWishlist
} from '../states/features/wishlist/wishlistSlice';

const BuyerWishlistContainer = () => {
  const dispatch = useDispatch();

  const [getAllWishlist, { data, isError, isLoading, isSuccess }] =
    useLazyGetAllWishlistQuery();

  const newWishlist = useSelector((state) => {
    return state.wishlist.newWishlist;
  });

  useEffect(() => {
    getAllWishlist();
    if (isSuccess && data.data?.availableProducts) {
      dispatch(updateWishlist(data.data.availableProducts));
    }
  }, []);

  useEffect(() => {
    getAllWishlist();

    return () => {
      if (isSuccess && data.data?.availableProducts) {
        dispatch(updateWishlist(data.data.availableProducts));
      }
    };
  }, [newWishlist]);

  const [deleteAllWishlist] = useDeleteAllWishlistMutation();

  const wishlist = useSelector((state) => {
    return state.wishlist.wishlist;
  });

  const [wishlistData, setWishlistData] = useState([]);

  useEffect(() => {
    if (isSuccess && data.data?.availableProducts) {
      dispatch(updateWishlist(data.data.availableProducts));
      setWishlistData(data.data.availableProducts);
    }
  }, [data]);

  useEffect(() => {
    setWishlistData(wishlist);
  }, [wishlist]);

  if (isLoading)
    return (
      <div className='min-h-[80vh] flex items-center justify-center'>
        <Loading width={20} />
      </div>
    );

  if (isError) {
    return (
      <div className='min-h-[100vh] bg-gray-200 py-12 flex flex-col w-[100%] mx-auto justify-center gap-12 items-center'>
        <h1 className='text-[3rem] font-bold text-center'>
          Something went wrong. Please try again!
        </h1>
        <Button
          route='/category'
          value='Discover products'
          className='primary-btn w-full max-w-[30rem]'
        />
      </div>
    );
  }

  return (
    <div className='flex'>
      <div>
        <BuyerNavbar />
      </div>
      <div className='bg-gray-200 w-full py-12'>
        <div className='flex items-center justify-between px-48 w-[100%]'>
          <div className='wishlist-txt-title '>
            <h1 className='text-2xl font-semibold  text-[#243665]'>
              Shopping Wishlist
            </h1>
          </div>
          {wishlistData && (
            <div className='wishlist-btn-create'>
              <Button
                value={
                  <span className='button_with_icon bg-red-600'>
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
                className='primary-btn bg-red-600 hover:bg-red-600'
                onClick={() => {
                  deleteAllWishlist()
                    .unwrap()
                    .then(() => {
                      dispatch(updateWishlist([]));
                    })
                    .catch((err) => {
                      return err;
                    });
                }}
              />
            </div>
          )}
        </div>
        <div className='flex flex-wrap w-[90%] justify-evenly mx-auto h-full gap-8 p-12 items-start'>
          {wishlistData.length > 0 ? (
            wishlistData.map((prod) => {
              return <WishlistCard prod={prod} key={prod.id} />;
            })
          ) : (
            <div className='min-h-[80vh] flex flex-col w-[90%] mx-auto justify-center gap-12 items-center'>
              <h1 className='text-[3rem] font-bold text-center'>
                You don't have any products in your wishlist
              </h1>
              <Button
                route='/category'
                value='Discover products'
                className='primary-btn w-full max-w-[30rem]'
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const WishlistCard = ({ prod }) => {
  const dispatch = useDispatch();

  const [deleteSingleWishlist, { isLoading: wishlistLoading }] =
    useDeleteSingleWishlistMutation();
  return (
    <section
      key={prod.productId}
      className='prod_wishlist_container shadow-lg p-8 h-[35rem] w-[30%] min-w-[30rem] flex flex-col gap-8 items-center bg-white rounded-lg cursor-pointer hover:shadow-xl transition-all hover:scale-102'
    >
      <div className='w-full flex flex-col items-center h-[80%] gap-8'>
        <div className='produ_image_container w-full h-[70%] bg-gray-100 flex items-center justify-center rounded-lg'>
          <img
            alt='Wishlist avatar'
            className='h-full max-w-full object-contain rounded-lg'
            src={prod.product?.image[0]}
          />
        </div>
        <div className='prod_details w-full h-fit flex flex-col items-center justify-center gap-4'>
          <h3 className='max-w-[90%] text-[2rem] font-bold truncate text-ellipsis'>
            {prod.product?.name}
          </h3>
          <p className='text-[1.6rem] font-medium'>{prod.product?.price}</p>
        </div>
      </div>
      <Button
        className='primary-btn bg-red-600 text-white w-fit normal-case hover:bg-red-600 px-4 py-4 cursor-pointer'
        value={
          wishlistLoading ? (
            <div>
              <Loading width={20} className='w-fit max-w-4' />
            </div>
          ) : (
            <span className='text-[1.5rem] cursor-pointer flex items-center gap-4'>
              <FontAwesomeIcon
                icon={faTrash}
                className='bg-red-600 w-[1.5rem] h-[1.5rem]'
              />{' '}
              Remove
            </span>
          )
        }
        onClick={async () => {
          deleteSingleWishlist({ productId: prod.productId })
            .unwrap()
            .then(() => {
              dispatch(removeFromWishlist(prod.productId));
            })
            .catch((err) => {
              return err;
            });
        }}
      />
    </section>
  );
};

WishlistCard.propTypes = {
  prod: PropTypes.shape({
    productId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    product: PropTypes.shape({
      name: PropTypes.string,
      price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      image: PropTypes.arrayOf(PropTypes.string),
      description: PropTypes.string
    }).isRequired
  })
};

export default BuyerWishlistContainer;
export { WishlistCard };
