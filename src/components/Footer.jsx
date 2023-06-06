import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { links, location, socials } from '../constants/Footer';
import { nameLogo } from '../assets';
import Input from './Input';
import Button from './Button';
import { primaryColor } from '../constants';

const Footer = () => {
  const { pathname } = useLocation();
  const { register, handleSubmit } = useForm();
  const [formData, setFormData] = useState({ email: '' });

  const onSubmit = (e) => {
    e.preventDefault();
    setFormData({ ...formData, email: e.target.value });
  };

  if (pathname === '/login') return null;
  return (
    <div className='updated_footer container max-w-full flex flex-col divide-y divide-transparent border border-none'>
      <span className='flex justify-evenly screen-base:flex-col screen-mid:grid grid-cols-2 px-12 divide-x divide-transparent max-w-full screen-base:grid-cols-1'>
        <section className='footer_logo container'>
          <img
            src={nameLogo}
            alt='Techmisth large logo'
            style={{
              maxWidth: '15rem',
              cursor: 'pointer'
            }}
          />
        </section>
        <section className='footer_location container'>
          <div>
            <h4>Address</h4>
          </div>
          <ul>
            {location.map((item, index) => {
              return (
                <li className='footer_location_li' key={index}>
                  {item.value}
                </li>
              );
            })}
          </ul>
        </section>
        <section className='footer_links container'>
          <div>
            <h4>Company</h4>
          </div>

          <ul>
            {links.map((item, index) => {
              return (
                <li key={index}>
                  <Button value={item.name} route={item.path} className='' />
                </li>
              );
            })}
          </ul>
        </section>
        <section className='footer_address container'>
          <div>
            <h4>Contact</h4>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}
          >
            <p>Newsletter</p>
            <form
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                alignItems: 'center'
              }}
              onSubmit={handleSubmit(onSubmit)}
            >
              <span className='footer_input_container'>
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className='footer_newsletter_icon'
                />
                <Input
                  type='text'
                  name='email'
                  placeholder='Enter your email'
                  className='px-4 py-2 rounded-lg outline-none focus:outline-none footer_newsletter'
                  refs={register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email'
                    }
                  })}
                />
              </span>
              <input
                type='submit'
                className='footer_newsletter_submit'
                value='Subscibe'
                style={{
                  width: '90%',
                  margin: '0 auto',
                  padding: '0.5rem 1rem',
                  cursor: 'pointer',
                  backgroundColor: 'white',
                  border: 'none',
                  color: primaryColor,
                  borderRadius: '0.5rem'
                }}
              />
            </form>
          </div>
          <ul className='footer_socials_list'>
            {socials.map((item, index) => {
              return (
                <li key={index}>
                  <Link target='_blank' to={item.path} />
                  <FontAwesomeIcon icon={item.icon} />
                </li>
              );
            })}
          </ul>
        </section>
      </span>
      <hr className='px my-8 bg-white w-11/12 mx-auto' />
      <span className='container max-w-full py-4'>
        <p className='text-center'>
          &copy; {new Date().getFullYear()} Techsmith. All rights reserved.
        </p>
      </span>
    </div>
  );
};

export default Footer;
