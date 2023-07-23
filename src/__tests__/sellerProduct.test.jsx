import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRedux } from '../utils/TestUtils';
import SellerProductsContainer from '../containers/SellerProductsContainer';
import SellerNavigationDashbooard from '../containers/SellerNavigation';

describe('sellerProductsContainer', () => {
  test('View seller Products container', async () => {
    const buttons = screen.queryAllByRole('link' || 'button');
    expect(buttons).toBeTruthy();
  });

  test('ProdContainer', async () => {
    renderWithRedux(<SellerProductsContainer />);
    const headings = screen.queryAllByRole('heading');
    const buttons = await screen.findAllByRole('link' || 'button');

    expect(buttons).toBeTruthy();
    expect(headings).toBeTruthy();
  });

  test('renders sellingProd component', async () => {
    renderWithRedux(<SellerNavigationDashbooard />);
    const buttons = await screen.findAllByRole('link');
    const texts = screen.queryAllByRole('p');
    expect(buttons).toBeTruthy();
    expect(texts).toBeTruthy();
  });
});
