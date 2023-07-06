import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRedux } from '../utils/TestUtils';
import Loading from '../components/Loading';

describe('Testing loading page', () => {
  test('loading stage', () => {
    renderWithRedux(<Loading />);

    // Assertions
    const svgElement = screen.getByTestId('loading-svg');
    expect(svgElement).toBeTruthy();
  });
});
