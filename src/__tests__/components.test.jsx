import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRedux } from '../utils/TestUtils';
import { singleProduct } from './data/products';
import ProductCard from '../components/ProductCard';

test('Home Category Product Card', () => {
  renderWithRedux(
    <ProductCard
      image={singleProduct.image[0]}
      name={singleProduct.name}
      price={singleProduct.price}
      quantity={singleProduct.quantity}
      pId={singleProduct.id}
      category={singleProduct.categories.name}
      description={singleProduct.description}
    />
  );

  const headings = screen.queryAllByRole('heading');
  const images = screen.queryAllByRole('img');
  const buttons = screen.queryAllByRole('link' || 'button');

  expect(buttons).toBeTruthy();
  expect(headings).toBeTruthy();
  expect(images).toBeTruthy();
});
