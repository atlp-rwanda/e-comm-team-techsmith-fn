import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AdminManageUserContainer from '../containers/UsersContainer';
import { renderWithRedux } from '../utils/TestUtils';
import { Userlist } from '../containers/Userlist';
import { userList } from './data/users';
import NavigationDashboard from '../containers/UsersNavigationBigScreen';

describe('Renders adminManageUser component', () => {
  it('renders the component', () => {
    renderWithRedux(<AdminManageUserContainer />);
    expect(screen.getByText('Manage Users')).toBeInTheDocument();
    expect(screen.getByText('List of users')).toBeInTheDocument();
  });

  describe('NavigationDashboard', () => {
    it('renders the component', () => {
      renderWithRedux(<NavigationDashboard />);
    });
  });

  describe('Userlist', () => {
    it('it render the users to manage', () => {
      renderWithRedux(<Userlist userList={userList} />);
      const images = screen.queryAllByRole('img');
      expect(images).toBeTruthy();
    });
  });
});
