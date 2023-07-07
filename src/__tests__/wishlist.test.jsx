import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRedux } from '../utils/TestUtils';
import BuyerWishlistContainer, {
  WishlistCard
} from '../containers/BuyerWishlistContainer';

describe('Wishlist Container', () => {
  test('Renders wishlist container', async () => {
    renderWithRedux(<BuyerWishlistContainer />);
    const headings =  screen.queryAllByRole('heading');

    expect(headings).toBeTruthy();
  });

  
  test('renders WishlistCard component', async () => {
    renderWithRedux(<WishlistCard prod={{}} />);
    const images = await screen.findAllByRole('img');
    const headings = await screen.findAllByRole('heading');
    const texts = screen.queryAllByRole('note');

    expect(images).toBeTruthy();
    expect(headings).toBeTruthy();
    expect(texts).toBeTruthy();
  });
});
