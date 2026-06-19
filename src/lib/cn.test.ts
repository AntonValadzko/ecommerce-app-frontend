import { cn } from './cn';

describe('cn', () => {
  it('joins truthy class names', () => {
    expect(cn('a', false && 'b', null, 'c')).toBe('a c');
  });
});
