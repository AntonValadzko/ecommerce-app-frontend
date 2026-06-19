import { render, screen } from '@testing-library/react';
import { StarRating } from './StarRating';

describe('StarRating', () => {
  it('renders rating and review count', () => {
    render(<StarRating rating={4.3} reviewCount={1200} />);
    expect(screen.getByText('4.3')).toBeInTheDocument();
    expect(screen.getByText('(1,200)')).toBeInTheDocument();
  });
});
