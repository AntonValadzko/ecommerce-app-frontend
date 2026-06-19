import { render, screen } from '@testing-library/react';
import HomePage from './page';

jest.mock('@/components/catalog/CatalogPage', () => ({
  CatalogPage: () => <div>Catalog page content</div>,
}));

describe('HomePage', () => {
  it('renders catalog page', () => {
    render(<HomePage />);
    expect(screen.getByText('Catalog page content')).toBeInTheDocument();
  });
});
