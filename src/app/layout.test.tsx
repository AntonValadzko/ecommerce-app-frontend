import { render, screen } from '@testing-library/react';
import RootLayout from './layout';

describe('RootLayout', () => {
  it('renders header and children', () => {
    render(
      <RootLayout>
        <div>Page content</div>
      </RootLayout>
    );

    expect(screen.getByText('MarketPlace')).toBeInTheDocument();
    expect(screen.getByText('Page content')).toBeInTheDocument();
  });
});
