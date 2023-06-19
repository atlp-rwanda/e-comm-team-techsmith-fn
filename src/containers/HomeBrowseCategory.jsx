import React, { useEffect } from 'react';
import Button from '../components/Button';
import Loading from '../components/Loading';
import HomeCategoryProductCard from '../components/HomeCategoryProductCard';
import { useGetAllCategoriesQuery } from '../states/api/apiSlice';
import { setCategories } from '../states/features/categories/categorySlice';

// BROWSE BY CATEGORY
const BrowseByCategory = () => {
  const props = {
    image:
      'https://res.cloudinary.com/nishimweprince/image/upload/v1685229667/ecommerce/c08012248_thyevv.png',
    description: 'Brand new HP Envy 15, 256GB',
    price: '$1499',
    name: 'HP All-in-One',
    category: 'Electronics',
    rating: {
      rating: 3,
      count: 5
    },
    className:
      'home_category_product_card flex flex-col justify-between my-4 w-fit max-w-1/5'
  };

  return (
    <div className='home_browse_category'>
      <section className='home_browse_category_header'>
        <h3>Browse by category</h3>
        <p>Discover your niche</p>
      </section>
      <Categories />
      <section className='home_browse_category_container flex flex-wrap justify-around'>
        <HomeCategoryProductCard {...props} />
        <HomeCategoryProductCard {...props} />
        <HomeCategoryProductCard {...props} />
        <HomeCategoryProductCard {...props} />
        <HomeCategoryProductCard {...props} />
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
