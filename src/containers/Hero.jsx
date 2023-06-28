import React from 'react';
import Button from '../components/Button';
import { location } from '../constants';

const Hero = () => {
  return (
    <div className='home-hero flex flex-col screen-mid:flex-col'>
      <span className='home-hero-container grid grid-cols-2 screen-mid:grid-cols-1'>
        <section className='home-hero-text'>
          <p
            style={{
              textTransform: 'uppercase'
            }}
          >
            New Arrivals
          </p>
          <div>
            <h1>Feed Your Passion</h1>
            <p>And get a bargain in the process</p>
          </div>
          <p>$24</p>
          <Button
            route='/category'
            className='hero-btn primary-btn'
            value='Buy now'
          />
        </section>
        <section className='home-hero-image h-auto'>
          <img
            src='https://res.cloudinary.com/nishimweprince/image/upload/v1685026014/ecommerce/Adicolor_Classics_Adibreak_Track_Pants_Black_IB5924_25_outfit_wgwx2p.jpg'
            alt='Nike soccer woman'
          />
        </section>
      </span>
      <span className='home-hero-slider flex flex-wrap justify-evenly'>
        {location.map((address) => {
          return (
            <i
              key={address.name}
              className='w-full max-w-12 screen-mid:w-4 screen-base:w-1/10'
            />
          );
        })}
      </span>
    </div>
  );
};

export default Hero;
