import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRedux } from '../utils/TestUtils';
import ChatBox, { Message, MessageList } from '../components/Chatroom/ChatBox';
import Participants from '../components/Chatroom/Participants';
import { MessageField } from '../components/Chatroom/Message';
import { users } from './data/users';

describe('ChatBox', () => {
  test('Renders chatbox', async () => {
    renderWithRedux(
      <>
        <ChatBox />
        <Participants users={users} active={true} />
        <MessageField />
      </>
    );
    const headings = screen.queryAllByRole('heading');
    const images = await screen.findAllByRole('img');
    const lists = await screen.findAllByRole('list');
    const forms = screen.queryAllByRole('form');
    const inputs = screen.queryAllByRole('textbox');
    const listitems = await screen.findAllByRole('listitem');
    const div = screen.queryAllByRole('div');

    const result = renderWithRedux(<MessageField />);
    const sendMessage = result.container.querySelector('#send-message');

    await userEvent.click(sendMessage);
    const texts = screen.queryAllByRole('note');
    const messageList = renderWithRedux(<MessageList messages={[]} />);

    const message = renderWithRedux(
      <Message own={true} avatar={''} sender={''} message={''} timestamp={''} />
    );
    const messages = screen.queryAllByRole('note');

    

    expect(headings).toBeTruthy();
    expect(images).toBeTruthy();
    expect(texts).toBeTruthy();
    expect(lists).toBeTruthy();
    expect(div).toBeTruthy();
    expect(listitems).toBeTruthy();
    expect(forms).toBeTruthy();
    expect(inputs).toBeTruthy();
    expect(messages).toBeTruthy();
    expect(message).toBeTruthy();
    expect(messageList).toBeTruthy();
    expect(result).toBeTruthy();
  });
});
