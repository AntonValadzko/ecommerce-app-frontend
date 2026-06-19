import { render, screen, fireEvent } from '@testing-library/react';
import { PriceRangeSlider } from './PriceRangeSlider';

describe('PriceRangeSlider', () => {
  it('commits selected range on mouse up', () => {
    const onChange = jest.fn();
    const { container } = render(
      <PriceRangeSlider min={0} max={100} valueMin={10} valueMax={90} onChange={onChange} />
    );

    const sliders = container.querySelectorAll('input[type="range"]');
    fireEvent.change(sliders[0], { target: { value: '20' } });
    fireEvent.mouseUp(sliders[0]);
    expect(onChange).toHaveBeenCalled();
    expect(screen.getByText('$20.00')).toBeInTheDocument();
  });
});
