import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ServiceUnavailable } from './ServiceUnavailable';

describe('ServiceUnavailable', () => {
  it('renders default message', () => {
    render(<ServiceUnavailable />);
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('Service temporarily unavailable')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /back to catalog/i })).toHaveAttribute('href', '/');
  });

  it('calls onRetry when try again is clicked', async () => {
    const onRetry = jest.fn();
    const user = userEvent.setup();
    render(<ServiceUnavailable onRetry={onRetry} />);

    await user.click(screen.getByRole('button', { name: /try again/i }));
    expect(onRetry).toHaveBeenCalledTimes(1);
  });
});
