import { describe, it, expect } from '@jest/globals';
import addTwoNumbers from '..';

describe('addTwoNumbers', () => {
  it('adds two numbers', () => {
    expect(addTwoNumbers(1, 2)).toEqual(3);
  });
});
