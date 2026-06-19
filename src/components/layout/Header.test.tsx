import { render, screen } from '@testing-library/react';
import { Header } from './Header';

describe('Header', () => {
  it('renders brand and catalog link', () => {
    render(<Header />);
    expect(screen.getByText('MarketPlace')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /catalog/i })).toHaveAttribute('href', '/');
  });
});
