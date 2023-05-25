import React from 'react';
import HomeTopSeller from '../components/HomeTopSeller';

// TOP MERCHANTS
const TopMerchants = () => {
  const props = {
    image:
      'https://res.cloudinary.com/nishimweprince/image/upload/v1685234037/ecommerce/professional-30-1024_yz5xqf.png',
    name: 'John Doe',
    rating: {
      rating: 3,
      count: 5
    }
  };
  return (
    <div className='home_top_merchants'>
      <section className='home_top_merchants_header'>
        <h3>Our Top merchants</h3>
        <p>People are buying from here</p>
      </section>
      <section className='home_top_merchants_container flex flex-wrap justify-evenly'>
        <HomeTopSeller {...props} />
        <HomeTopSeller {...props} />
        <HomeTopSeller {...props} />
        <HomeTopSeller {...props} />
        <HomeTopSeller {...props} />
      </section>
    </div>
  );
};

export default TopMerchants;
