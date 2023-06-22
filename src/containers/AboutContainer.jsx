import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { heroImages, description, newsOutlet } from '../constants';
import Button from '../components/Button';

const AboutContainer = () => {

  const [continueScrolling, setContinueScrolling] = useState(false);

  return (
    <>
      <section className='about_hero_container gap-12 h-full flex items-center w-[90%] mx-auto my-12 screen-mid:text-center screen-base:flex-col'>
        <div className='about_hero_text w-full max-w-[60%] flex flex-col gap-8 screen-mid:items-center screen-base:about-hero-text-sm'>
          <h1 className='text-4xl font-bold screen-mid:text-[3rem]'>About Techsmiths Stores</h1>
          <p className='max-w-[80%] screen-mid:text-center'>
            A student-built ecommerce gem from Andela's ATLP. Seamless shopping,
            cutting-edge tech products, and global reach. Innovation at your
            fingertips.
          </p>
          <div className='about_hero_cta flex items-center w-full justify-between gap-8 max-w-[80%] screen-mid:flex-col'>
            <Button value={
              <span className='text-[1.5rem] flex items-center gap-4'>
                <FontAwesomeIcon icon={['fas', 'bag-shopping']} className='h-full' />
                Start shopping
              </span>
            } className='primary-btn' route='/' />
            <Button
            onClick={() => {return setContinueScrolling(!continueScrolling)}}
            value={
              <span className='text-[1.5rem] flex items-center gap-4'>
                <FontAwesomeIcon icon={['fas', 'magnifying-glass-plus']} className='h-full' />
                Discover More
              </span>
            } className='primary-btn text-black bg-white border-[1px] border-slate-500 hover:bg-white text-[1.6rem] w-full px-8 py-4' />
          </div>
          <div className={`${continueScrolling ? 'flex' : 'invisible'} transition-all duration-150`}>
            <p className='text-[1.8rem] transition-all duration-150 font-medium'>Great, keep scrolling!!</p>
          </div>
        </div>
        <div className='about_hero_image w-fit mx-auto max-w-[40%] self-end grid grid-cols-2 gap-8 screen-mid:max-w-[60%] screen-base:hero-images-sm'>
          {heroImages.map((heroImage, index) => {
            return (
              <img
                key={index}
                src={heroImage.image}
                alt={heroImage.category}
                className='w-full h-full object-cover max-w-[20rem] cursor-pointer hover:scale-105'
              />
            );
          })}
        </div>
      </section>
      <section className='news_outlets my-12 flex flex-col max-w-[90%] mx-auto'>
        <h1 className='text-[3.5rem] text-center font-black'>Also featured in:</h1>
        <ul className='flex items-center justify-evenly screen-base:flex-wrap'>
          {newsOutlet.map((outlet, index) => {
            return (
              <li key={index} className='w-full flex items-center justify-between gap-12 screen-mid:flex-col'>
                <img alt={outlet.name} src={outlet.image} className='w-full max-w-[20rem] screen-base:max-w-[20rem]' />
              </li>
            );
          })}
        </ul>
      </section>
      <section id='about_description' className='about_description flex flex-col items-center gap-12 my-12 screen-base:tetx-center'>
        <h1 className='text-[3.5rem] font-black text-center max-w-[80%] screen-mid:text-[3rem] screen-base:text-[2.5rem]'>
          Techsmiths Stores aims to provide a seamless shopping experience at the core.
        </h1>
        <ul className='w-[80%] mx-auto flex flex-col gap-12 screen-mid:w-[90%]'>
          {description.map((desc, index) => {
            const even = index % 2 === 0;
            return (
              <li key={index} className={`w-full flex items-center justify-between gap-12 ${even ? 'flex-row-reverse' : null} screen-mid:text-center screen-base:flex-col`}>
                <div className='w-full flex flex-col gap-8 max-w-[50%] screen-base:max-w-[80%]'>
                  <h2 className='text-[2.5rem] font-black'>{desc.title}</h2>
                  <p>{desc.description}</p>
                </div>
                <div className='w-full flex flex-col gap-8 max-w-[50%] screen-base:max-w-[80%]'>
                  <img src={desc.image} alt={desc.title} className='w-[90%] h-full rounded-lg shadow-sm' />
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </>
  );
};

export default AboutContainer;
