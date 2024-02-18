import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { act } from 'react-dom/test-utils';
import App from '../App';

describe('Add to shopping cart', () => {
  it('shopping cart is added', () => {
    render(<App />);
    setTimeout(() => {
      const button = screen.getByTestId('1');
      act(() => {
        button.props.onClick();
      });
      expect(screen.getByTestId('shopping-cart')).toBeInTheDocument();
    }, 2000);
  });
});

describe('add to shopping cart', () => {
  it('add two of one to a shopping cart', () => {
    const item = { item: 'me' };
    const quantity = 2;
    const arr = [];

    function handleClick() {
      arr.push(item * quantity);
    }
    render(<App />);
    setTimeout(() => {
      handleClick();
      expect(arr.length).toBe(2);
    }, 2000);
  }, 2000);
});
