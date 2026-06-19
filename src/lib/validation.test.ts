import {
  ValidationError,
  assertProductId,
  assertSavedSearchId,
  assertSlug,
  isValidSlug,
} from './validation';

describe('validation', () => {
  describe('isValidSlug', () => {
    it('accepts valid slugs', () => {
      expect(isValidSlug('wireless-headphones')).toBe(true);
      expect(isValidSlug('  item-42  ')).toBe(true);
    });

    it('rejects invalid slugs', () => {
      expect(isValidSlug('')).toBe(false);
      expect(isValidSlug('Bad Slug')).toBe(false);
      expect(isValidSlug('-leading')).toBe(false);
    });
  });

  describe('assertSlug', () => {
    it('returns trimmed slug', () => {
      expect(assertSlug('  valid-slug  ')).toBe('valid-slug');
    });

    it('throws ValidationError for invalid slug', () => {
      expect(() => assertSlug('invalid slug!')).toThrow(ValidationError);
    });
  });

  describe('assertProductId', () => {
    it('returns valid ids', () => {
      expect(assertProductId(1)).toBe(1);
    });

    it('rejects invalid ids', () => {
      expect(() => assertProductId(0)).toThrow(ValidationError);
      expect(() => assertProductId(1.5)).toThrow(ValidationError);
    });
  });

  describe('assertSavedSearchId', () => {
    it('returns trimmed id', () => {
      expect(assertSavedSearchId('  search-1  ')).toBe('search-1');
    });

    it('rejects invalid ids', () => {
      expect(() => assertSavedSearchId('')).toThrow(ValidationError);
      expect(() => assertSavedSearchId('a'.repeat(65))).toThrow(ValidationError);
    });
  });
});
