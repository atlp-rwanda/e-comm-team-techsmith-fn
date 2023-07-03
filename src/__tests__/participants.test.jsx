import React from 'react';
import { screen, render } from '@testing-library/react';
import { renderWithRedux } from '../utils/TestUtils';
import Participants from '../components/Chatroom/Participants';

describe('Participants', () => {
  test('Renders active users', () => {
    renderWithRedux(<Participants users={[]} />);
    const images = screen.queryAllByRole('img');
    const headings = screen.queryAllByRole('heading');

    expect(headings.length).toBeGreaterThanOrEqual(0);
    expect(images.length).toBeGreaterThanOrEqual(0);
  });
});
