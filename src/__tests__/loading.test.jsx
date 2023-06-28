import React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRedux } from '../utils/TestUtils';
import Loading from '../components/Loading';
describe("Testing loading page",()=>{
    test('loading stage', () => {
      renderWithRedux( <Loading />);
          // Assertions
          const svgElement = screen.getByTestId('loading-svg');
          expect(svgElement).toBeInTheDocument();
          expect(svgElement).toHaveAttribute('class', 'w-5 h-5 w-[5] mr-2 text-white animate-spin fill-#243665');
          expect(svgElement).toHaveAttribute('aria-hidden', 'true');
          expect(svgElement).toHaveAttribute('viewBox', '0 0 100 101');
    });
})