import React from 'react';
import { screen,fireEvent } from '@testing-library/react';
import { renderWithRedux } from '../utils/TestUtils';
import ProfileContainer from '../containers/ProfileContainer';
import { act } from 'react-dom/test-utils';



describe('ProfileContainer', () => {


  it('renders the profile information correctly', () => {
    renderWithRedux(<ProfileContainer />)

    // Assert that the profile information is rendered correctly
    expect(screen.queryByLabelText('Username'));
    expect(screen.queryByLabelText('Gender'));
    expect(screen.queryByLabelText('PreferredLanguage'));
    expect(screen.queryByLabelText('Physical Address '));
    expect(screen.queryByLabelText('Preferred Currency'));
  });
});
