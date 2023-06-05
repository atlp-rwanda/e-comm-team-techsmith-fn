import React from 'react';
import HomePopularProductCard from '../components/HomePopularProductCard';
import Button from '../components/Button';

// POPULAR PRODUCTS
const PopularProducts = () => {
  // RENDER PRODUCT CARD
  const renderProductCard = (count) => {
    const componentProps = {
      image:
        'https://res.cloudinary.com/nishimweprince/image/upload/v1685095429/ecommerce/iphone_se_hero__gd586pazxqqa_medium_2x_vcu3nz.jpg',
      description: 'Brand new iPhone 14 Plus, 256GB',
      rating: {
        rating: 4,
        count: 5
      },
      price: '$1499',
      name: 'iPhone 14 Pro',
      category: 'Electronics'
    };
    const cards = [];
    for (let i = 0; i < count; i++) {
      cards.push(<HomePopularProductCard key={i} {...componentProps} />);
    }
    return cards;
  };

  return (
    <div className='popular_products'>
      <section className='popular_product_header'>
        <div>
          <h3>Most Wanted</h3>
          <p>Everyone is buying this</p>
        </div>
        <Button
          value='Browse >>'
          className='popular_products_cta'
          route='/category'
        />
      </section>
      <section className='popular_product_container flex flex-wrap justify-around'>
        {renderProductCard(5)}
      </section>
    </div>
  );
};

export default PopularProducts;
