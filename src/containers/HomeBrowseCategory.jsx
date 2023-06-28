import React, { useEffect, useState } from 'react';
import Button from '../components/Button';
import Loading from '../components/Loading';
import ProductCard from '../components/ProductCard';
import {
  useGetAllCategoriesQuery,
  useLazyGetAllProductsQuery
} from '../states/api/apiSlice';
import { setCategories } from '../states/features/categories/categorySlice';

// BROWSE BY CATEGORY
const BrowseByCategory = () => {
  const [getAllProducts] = useLazyGetAllProductsQuery();
  const [populars, setPopulars] = useState([]);
  const category = 'BEAUTY';
  useEffect(() => {
    const size = 5;
    const page = randomProduct(20);
    getAllProducts({ size, page })
      .then(({ data }) => {
        setPopulars(data.data.products);
      })
      .catch((err) => {
        return err;
      });
  }, []);

  return (
    <div className='home_browse_category'>
      <section className='home_browse_category_header'>
        <h3>Browse by category</h3>
        <p>Discover your niche</p>
      </section>
      <Categories />
      <section className='home_browse_category_container flex flex-wrap justify-around'>
        {populars.map((item) => {
          return (
            <ProductCard
              image={item.image[randomProduct(item.image.length)]}
              key={item.id}
              description={item.description}
              name={item.name}
              category={category}
              price={item.price}
              quantity={item.quantity}
              pId={item.id}
            />
          );
        })}
      </section>
      <section className='home_browse_category_categories flex flex-wrap justify-center'>
        <Button
          className='home_browse_category_option bg-transparent'
          route='/category'
          value='View more >>'
        />
      </section>
    </div>
  );
};

export default BrowseByCategory;

const Categories = () => {
  const {
    data: categories,
    isLoading,
    isError,
    isSuccess
  } = useGetAllCategoriesQuery();

  useEffect(() => {
    if (isSuccess) {
      setCategories(categories.data);
    }
  }, [categories]);

  if (isLoading) {
    return (
      <div className='w-full max-w-[100%] min-w-[50%] min-h-[100vh] flex items-center justify-center'>
        <Loading width={50} />
      </div>
    );
  }

  if (isError) {
    return <div>Error...</div>;
  }
  if (isSuccess) {
    return (
      <section className='home_browse_category_categories flex flex-wrap justify-center'>
        {categories.data.map((category) => {
          const { id, name } = category;
          return (
            <Button
              key={id}
              className='home_browse_category_option bg-transparent'
              route='/category'
              value={name}
            />
          );
        })}
      </section>
    );
  }
  if (isError) {
    return <div>Error...</div>;
  }

  return null;
};

const randomProduct = (size) => {
  return Math.floor(Math.random() * size);
};
