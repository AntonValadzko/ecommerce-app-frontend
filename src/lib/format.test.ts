import { discountPercent, formatPrice, formatRating } from './format';

describe('format', () => {
  it('formats price in USD', () => {
    expect(formatPrice(149.99)).toBe('$149.99');
  });

  it('formats rating to one decimal', () => {
    expect(formatRating(4.56)).toBe('4.6');
  });

  it('calculates discount percent', () => {
    expect(discountPercent(80, 100)).toBe(20);
    expect(discountPercent(100, 80)).toBeNull();
    expect(discountPercent(100, null)).toBeNull();
  });
});
