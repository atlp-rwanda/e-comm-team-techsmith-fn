import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { useLazyGetSingleSellerQuery } from '../states/api/apiSlice';
import { updateSeller } from '../states/features/seller/sellerSlice';
import Loading from '../components/Loading';
import Button from '../components/Button';
import { defaultPhoto } from '../constants';

const SingleSellerPage = ({ id }) => {
  const { seller } = useSelector((state) => {
    return state.seller;
  });

  const dispatch = useDispatch();

  const [getSingleSeller, { data, isSuccess, isError, isLoading }] =
    useLazyGetSingleSellerQuery();

  useEffect(() => {
    getSingleSeller(id);
  }, []);

  useEffect(() => {
    if (isSuccess) {
      dispatch(updateSeller(data.data));
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className='min-h-[50vh] w-[90%] mx-auto flex items-center justify-center'>
        <Loading width={50} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className='min-h-[50vh] w-[90%] mx-auto flex flex-col items-center gap-12 justify-center'>
        <h1 className='text-[3rem] text-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary slate-200 to-pink-300'>
          Could not find this seller's information. Please try again later.
        </h1>
        <Button value='Browse products' route='/category' />
      </div>
    );
  }

  return (
    <section className='max-w-[90%] w-fit min-w-[50%] p-12 mx-auto my-12 flex flex-col gap-12 items-center justify-center rounded-lg shadow-lg'>
      <div className='w-full max-w-[50%] flex flex-col items-center gap-6'>
        <img
          src={defaultPhoto}
          alt={seller.name}
          className='w-full max-w-[20rem] object-cover'
        />
        <h1 className='text-[3rem] text-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary slate-200 to-pink-300'>
          {seller.name}
        </h1>
        <span className='flex items-center rounded-lg gap-4 justify-center shadow-lg p-6'>
          <p>{seller.email}</p>
          <p>{seller.gender}</p>
        </span>
      </div>
      <span className='flex items-center rounded-lg justify-evenly gap-5'>
        <div className='flex flex-col items-center rounded-lg gap-4 shadow-lg p-6'>
          <p>Birth Date: {moment(seller.birthDate).format('YYYY-MM-DD')}</p>
          <p>Address: {seller.physicalAddress}</p>
        </div>
        <div className='flex flex-col items-center rounded-lg gap-4 shadow-lg p-6'>
          <p>Total Products: {seller.totalProducts}</p>
          <p>Preferred Currency: {seller.preferredCurrency}</p>
        </div>
      </span>
    </section>
  );
};

SingleSellerPage.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};

export default SingleSellerPage;
