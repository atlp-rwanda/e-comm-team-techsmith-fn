import React, { useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import {
  faCartShopping,
  faShoppingBag
} from '@fortawesome/free-solid-svg-icons';
import Button from '../components/Button';
import PopularProducts from './HomePopularProducts';
import BrowseByCategory from './HomeBrowseCategory';
import TopMerchants from './TopMerchants';
import Hero from './Hero';

const HomeContainer = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('changePassword')) {
      localStorage.clear();
      navigate('/login');
    }
  }, []);

  return (
    <>
      <Hero />
      <Banner />
      <PopularProducts />
      <BrowseByCategory />
      <TopMerchants />
      <RevisitCollections />
    </>
  );
};

// HOME BANNER COMPONENT
const Banner = () => {
  return (
    <div className='hero-banner flex screen-mid:flex-col py-8 px-8'>
      <section className='home-banner-text'>
        <h2 className='max-w-10/12 text-5xl screen-base:max-w-9/12 screen-mid:text-4xl'>
          OUR BIGGEST PROMOTION EVER IS HAPPENING NOW!
        </h2>
        <p className='max-w-10/12 screen-base:max-w-9/12'>
          GET UP TO 50% OFF EVERY PURCHASE YOU MAKE
        </p>
      </section>
      <section>
        <Button
          className='banner-btn primary-btn px-8 py-4 text-18 screen-mid:px-6 text-16 screen-mid:py-3 text-15'
          value='Explore'
          route='/category'
          onClick={() => {}}
        />
      </section>
    </div>
  );
};

// REVISIT YOUR COLLECTIONS
const RevisitCollections = () => {
  return (
    <div className='home_revisit_collections'>
      <section className='home_revisit_collections_header'>
        <h3>Revisit your collection</h3>
        <p>We keep your screenshots</p>
      </section>
      <section className='home_revisit_collections_cta'>
        <Button
          className='primary-btn home_revisit_collections_button'
          value={
            <span className='button_with_icon'>
              Go to cart{' '}
              <FontAwesomeIcon
                style={{
                  width: '3rem',
                  height: '3rem'
                }}
                icon={faCartShopping}
              />
            </span>
          }
          onClick={() => {
            document.querySelector('.cart_overlay').style.display = 'flex';
          }}
        />
        <Button
          className='primary-btn home_revisit_collections_button'
          route='/orders'
          value={
            <span className='button_with_icon'>
              Find all your orders{' '}
              <FontAwesomeIcon
                style={{
                  width: '3rem',
                  height: '3rem'
                }}
                icon={faShoppingBag}
              />
            </span>
          }
        />
      </section>
    </div>
  );
};

export default HomeContainer;
export { Banner, RevisitCollections };
