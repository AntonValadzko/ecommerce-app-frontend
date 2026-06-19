/** @jest-environment node */

import { NextRequest } from 'next/server';

describe('middleware', () => {
  const originalNodeEnv = process.env.NODE_ENV;

  afterEach(() => {
    Object.assign(process.env, { NODE_ENV: originalNodeEnv });
    jest.resetModules();
  });

  it('sets security headers in development', async () => {
    Object.assign(process.env, { NODE_ENV: 'development' });
    const { middleware } = await import('./middleware');
    const request = new NextRequest('http://localhost:3001/');
    const response = middleware(request);

    expect(response.headers.get('Content-Security-Policy')).toContain("default-src 'self'");
    expect(response.headers.get('Content-Security-Policy')).toContain("'unsafe-eval'");
    expect(response.headers.get('X-Frame-Options')).toBe('DENY');
    expect(response.headers.get('Strict-Transport-Security')).toBeNull();
  });

  it('sets HSTS in production over HTTPS', async () => {
    Object.assign(process.env, { NODE_ENV: 'production' });
    const { middleware } = await import('./middleware');
    const request = new NextRequest('https://example.com/');
    const response = middleware(request);

    expect(response.headers.get('Content-Security-Policy')).not.toContain("'unsafe-eval'");
    expect(response.headers.get('Strict-Transport-Security')).toContain('max-age=63072000');
  });
});
