import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HomeTopSeller from '../components/HomeTopSeller';
import { useLazyGetAllSellersQuery } from '../states/api/apiSlice';
import Loading from '../components/Loading';
import { setSellers } from '../states/features/seller/sellerSlice';
import { defaultPhoto } from '../constants';

// TOP MERCHANTS
const TopMerchants = () => {

  const dispatch = useDispatch();

  const [getAllSellers, { data, isLoading, isError, isSuccess }] = useLazyGetAllSellersQuery();
  const sellers = useSelector((state) => {
    return state.seller.sellers;
  });

  useEffect(() => {
    getAllSellers({ size: 5, page: 0 });
  }, []);

  useEffect(() => {
    if (isSuccess) {
      dispatch(setSellers(data.data.rows));
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className='min-h-30vh w-full flex items-center justify-between'>
        <Loading width={50} />
      </div>
    )
  }

  if (isError) {
    return null
  }


  return (
    <div className='home_top_merchants'>
      <section className='home_top_merchants_header'>
        <h3>Our Top merchants</h3>
        <p>People are buying from here</p>
      </section>
      <section className='home_top_merchants_container flex flex-wrap justify-evenly'>
        {sellers.map((seller) => {
          return (
            <HomeTopSeller
              key={seller.id}
              name={seller.name}
              image={defaultPhoto}
              id={seller.id}
            />
          )
        })}
      </section>
    </div>
  );
};

export default TopMerchants;
