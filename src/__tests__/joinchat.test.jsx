import React from 'react';
import { screen, render } from '@testing-library/react';
import { renderWithRedux } from '../utils/TestUtils';
import JoinChat from '../components/Chatroom/JoinChat';

describe('JoinChat', () => {
  test('renders JoinChat component', async () => {
    renderWithRedux(<JoinChat />);
    const Button = screen.queryAllByRole('link' || 'button');
    const images = await screen.findAllByRole('img');
    const headings = screen.queryAllByRole('heading');

    // ASSERTIONS
    expect(Button).toBeTruthy();
    expect(headings).toBeTruthy();
    expect(images).toBeTruthy();
  });
});
