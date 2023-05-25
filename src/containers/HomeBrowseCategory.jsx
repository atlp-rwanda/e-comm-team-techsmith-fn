import React from 'react';
import Button from '../components/Button';
import HomeCategoryProductCard from '../components/HomeCategoryProductCard';

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
    }
  };

  return (
    <div className='home_browse_category'>
      <section className='home_browse_category_header'>
        <h3>Browse by category</h3>
        <p>Discover your niche</p>
      </section>
      <section className='home_browse_category_categories'>
        <Button
          className='home_browse_category_option active'
          route='#'
          value='Electronics'
        />
        <Button
          className='home_browse_category_option'
          route='#'
          value='Beauty'
        />
        <Button
          className='home_browse_category_option'
          route='#'
          value='Sports'
        />
        <Button
          className='home_browse_category_option'
          route='#'
          value='Fashion'
        />
        <Button
          className='home_browse_category_option'
          route='#'
          value='Appliances'
        />
      </section>
      <section className='home_browse_category_container'>
        <HomeCategoryProductCard {...props} />
        <HomeCategoryProductCard {...props} />
        <HomeCategoryProductCard {...props} />
        <HomeCategoryProductCard {...props} />
        <HomeCategoryProductCard {...props} />
      </section>
    </div>
  );
};

export default BrowseByCategory;
