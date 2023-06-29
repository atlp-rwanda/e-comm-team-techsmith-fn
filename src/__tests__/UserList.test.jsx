import React from 'react';
import { renderWithRedux } from '../utils/TestUtils';
import { screen, fireEvent } from '@testing-library/react';
import { Userlist } from '../containers/Userlist';
import { userDetails } from './data/users';

test('should render the list of all users', () => {
  renderWithRedux(<Userlist userList={userDetails} />);

  const image = screen.queryAllByRole('img');
  const username = screen.queryAllByRole('p');
  const select = screen.queryAllByRole('combobox');
  const button = screen.queryAllByRole('button');

  fireEvent.change(select[0], { target: { value: '1' } });
  fireEvent.change(select[1], { target: { value: '2' } });
  fireEvent.change(select[2], { target: { value: '3' } });

  expect(select).toBeTruthy();
  expect(image).toBeTruthy();
  expect(username).toBeTruthy();
  expect(button).toBeTruthy();
});
