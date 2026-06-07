const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const SLUG_MAX_LENGTH = 200;

const SAVED_SEARCH_ID_PATTERN = /^[a-zA-Z0-9_-]{1,64}$/;

export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export function isValidSlug(slug: string): boolean {
  const trimmed = slug.trim();
  return trimmed.length > 0 && trimmed.length <= SLUG_MAX_LENGTH && SLUG_PATTERN.test(trimmed);
}

export function assertSlug(slug: string): string {
  const trimmed = slug.trim();
  if (!isValidSlug(trimmed)) {
    throw new ValidationError('Invalid slug format');
  }
  return trimmed;
}

export function assertProductId(id: number): number {
  if (!Number.isInteger(id) || id < 1 || id > Number.MAX_SAFE_INTEGER) {
    throw new ValidationError('Invalid product id');
  }
  return id;
}

export function assertSavedSearchId(id: string): string {
  const trimmed = id.trim();
  if (!SAVED_SEARCH_ID_PATTERN.test(trimmed)) {
    throw new ValidationError('Invalid saved search id');
  }
  return trimmed;
}
