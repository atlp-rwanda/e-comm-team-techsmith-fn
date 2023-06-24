import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import HomeCategoryProductCard from '../components/HomeCategoryProductCard';
import Button from '../components/Button';
import { useLazyGetAllWishlistAllUsersQuery } from '../states/api/apiSlice';
import { removeDuplicates } from '../utils/Arrays';
import Loading from '../components/Loading';

const PopularProducts = () => {

  const [allWishlistData, setAllWishlistData] = useState([])

  const newWishlist = useSelector((state) => {
    return state.wishlist.newWishlist;
  });

  const [getAllWishlistAllUsers, { data: allWishlist, isLoading, isSuccess }] = useLazyGetAllWishlistAllUsersQuery();

  useEffect(() => {
    getAllWishlistAllUsers({ size: 5, page: 1 });
    if (isSuccess) {
      setAllWishlistData(removeDuplicates(allWishlist.data?.availableProducts))
    }
  }, []);

  useEffect(() => {
    getAllWishlistAllUsers({ size: 5, page: 1 });
    if (isSuccess) {
      setAllWishlistData(removeDuplicates(allWishlist.data?.availableProducts))
    }
  }, [newWishlist, allWishlist]);


  return (
    <div className='popular_products'>
      <section className='popular_product_header'>
        <div>
          <h3>Most Wanted</h3>
          <p>Everyone is buying this</p>
        </div>
        <Button
          value='Browse '
          className='popular_products_cta bg-transparent'
          route='/category'
        />
      </section>
      <section className='popular_product_container flex flex-wrap justify-around'>
        { isLoading && <div className='min-h-[30vh] flex items-center justify-center'><Loading width={50} /></div>}
        {allWishlistData?.map((wishlist) => {
          return (
            <HomeCategoryProductCard
            key={wishlist.id}
            name={wishlist.product.name}
            price={wishlist.product.price}
            pId={wishlist.productId}
            image={wishlist.product.image[0]}
            />
          );
        })}
      </section>
    </div>
  );
};

export default PopularProducts;
