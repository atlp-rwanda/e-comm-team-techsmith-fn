import React from 'react';
import { Link } from 'react-router-dom';

function HomeContainer() {
  return (
    <div className='home'>
      <h1 className='home-title'>TECHSMITH</h1>
      <p className='home-content'>
        Welcome to Techsmith eCommerce website, your one-stop destination for
        all your shopping needs. Whether you are looking for the latest fashion
        trends, high-quality electronics, or unique home decor, we are got you
        covered. Our online store offers a wide range of products, carefully
        curated to cater to your diverse tastes and preferences.
      </p>

      <div>
        <Link className='home-button' to='/login'>
          Login
        </Link>
      </div>
    </div>
  );
}

export default HomeContainer;
