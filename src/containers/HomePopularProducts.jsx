import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard';
import Button from '../components/Button';
import {
  useGetAllCategoriesQuery,
  useLazyGetAllWishlistAllUsersQuery
} from '../states/api/apiSlice';
import { removeDuplicates } from '../utils/Arrays';
import Loading from '../components/Loading';
import { getCatName } from '../utils/categories';

const PopularProducts = () => {
  const [allWishlistData, setAllWishlistData] = useState([]);

  const newWishlist = useSelector((state) => {
    return state.wishlist.newWishlist;
  });

  const { data, isLoading: categoriesLoading } = useGetAllCategoriesQuery();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (data) {
      setCategories(data.data);
    }
  }, [data]);

  const [getAllWishlistAllUsers, { data: allWishlist, isLoading, isSuccess }] =
    useLazyGetAllWishlistAllUsersQuery();

  useEffect(() => {
    getAllWishlistAllUsers({ size: 5, page: 1 });
    if (isSuccess) {
      setAllWishlistData(removeDuplicates(allWishlist.data?.availableProducts));
    }
  }, []);

  useEffect(() => {
    getAllWishlistAllUsers({ size: 5, page: 1 });
    if (isSuccess) {
      setAllWishlistData(removeDuplicates(allWishlist.data?.availableProducts));
    }
  }, [newWishlist, allWishlist]);

  if (isLoading) {
    return (
      <div className='min-h-[30vh] flex items-center justify-center'>
        <Loading width={50} />
      </div>
    );
  }

  if (allWishlistData.length === 0) {
    return null;
  }

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
        {isLoading && (
          <div className='min-h-[30vh] flex items-center justify-center'>
            <Loading width={50} />
          </div>
        )}
        {allWishlistData?.map((wishlist) => {
          return (
            <ProductCard
              key={wishlist?.id}
              name={wishlist?.product?.name || 'Loading...'}
              price={wishlist?.product?.price || 'Loading...'}
              category={
                categoriesLoading
                  ? 'Loading...'
                  : getCatName(wishlist?.product?.categoryId, categories)
              }
              pId={wishlist?.productId}
              image={
                wishlist?.product?.image[
                  random(wishlist?.product?.image.length)
                ]
              }
            />
          );
        })}
      </section>
    </div>
  );
};
export default PopularProducts;

const random = (size) => {
  return Math.floor(Math.random() * size);
};
