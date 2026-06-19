/** @jest-environment node */

import { parseConfigEnv, parsePublicEnv, parseServerEnv, validateEnv } from './env';

function env(overrides: Record<string, string | undefined>): NodeJS.ProcessEnv {
  return overrides as NodeJS.ProcessEnv;
}

describe('parsePublicEnv', () => {
  it('defaults NEXT_PUBLIC_API_BASE to /api/v1', () => {
    expect(parsePublicEnv(env({}))).toEqual({ NEXT_PUBLIC_API_BASE: '/api/v1' });
  });

  it('normalizes relative paths and strips trailing slashes', () => {
    expect(parsePublicEnv(env({ NEXT_PUBLIC_API_BASE: '/api/v1/' }))).toEqual({
      NEXT_PUBLIC_API_BASE: '/api/v1',
    });
  });

  it('accepts absolute http(s) URLs', () => {
    expect(
      parsePublicEnv(env({ NEXT_PUBLIC_API_BASE: 'https://api.example.com/v1/' }))
    ).toEqual({ NEXT_PUBLIC_API_BASE: 'https://api.example.com/v1' });
  });

  it('rejects values that are neither relative paths nor valid URLs', () => {
    expect(() => parsePublicEnv(env({ NEXT_PUBLIC_API_BASE: 'not-a-valid-path' }))).toThrow(
      'Invalid environment variable NEXT_PUBLIC_API_BASE'
    );
  });

  it('rejects non-http(s) absolute URLs', () => {
    expect(() => parsePublicEnv(env({ NEXT_PUBLIC_API_BASE: 'ftp://api.example.com' }))).toThrow(
      'absolute values must use http:// or https://'
    );
  });
});

describe('parseServerEnv', () => {
  it('applies local development defaults', () => {
    expect(parseServerEnv(env({ NODE_ENV: 'development' }))).toEqual({
      API_URL: 'http://localhost:3000',
      LOG_LEVEL: 'debug',
      NODE_ENV: 'development',
      isProd: false,
      isDev: true,
    });
  });

  it('allows localhost API_URL in development', () => {
    expect(
      parseServerEnv(
        env({
          NODE_ENV: 'development',
          API_URL: 'http://127.0.0.1:4000/',
        })
      ).API_URL
    ).toBe('http://127.0.0.1:4000');
  });

  it('applies production defaults', () => {
    expect(
      parseServerEnv(
        env({
          NODE_ENV: 'production',
          API_URL: 'https://api.example.com',
        })
      )
    ).toEqual({
      API_URL: 'https://api.example.com',
      LOG_LEVEL: 'info',
      NODE_ENV: 'production',
      isProd: true,
      isDev: false,
    });
  });

  it('rejects localhost API_URL in production', () => {
    expect(() =>
      parseServerEnv(
        env({
          NODE_ENV: 'production',
          API_URL: 'http://localhost:3000',
        })
      )
    ).toThrow('must not point to localhost in production');
  });

  it('rejects invalid NODE_ENV', () => {
    expect(() => parseServerEnv(env({ NODE_ENV: 'staging' }))).toThrow(
      'must be development, production, or test'
    );
  });

  it('rejects invalid LOG_LEVEL', () => {
    expect(() =>
      parseServerEnv(
        env({
          NODE_ENV: 'development',
          LOG_LEVEL: 'verbose',
        })
      )
    ).toThrow('must be one of error, warn, info, debug');
  });

  it('rejects invalid API_URL', () => {
    expect(() =>
      parseServerEnv(
        env({
          NODE_ENV: 'development',
          API_URL: 'not-a-url',
        })
      )
    ).toThrow('must be a valid HTTP or HTTPS URL');
  });

  it('rejects non-http(s) API_URL protocols', () => {
    expect(() =>
      parseServerEnv(
        env({
          NODE_ENV: 'development',
          API_URL: 'file:///tmp/api',
        })
      )
    ).toThrow('must use http:// or https://');
  });

  it('parses test NODE_ENV', () => {
    expect(parseServerEnv(env({ NODE_ENV: 'test' })).NODE_ENV).toBe('test');
  });
});

describe('parseConfigEnv', () => {
  it('returns parsed API_URL using the same rules as server env', () => {
    expect(
      parseConfigEnv(
        env({
          NODE_ENV: 'production',
          API_URL: 'https://api.example.com/',
        })
      )
    ).toEqual({ API_URL: 'https://api.example.com' });
  });
});

describe('validateEnv', () => {
  it('does not throw for valid local configuration', () => {
    expect(() =>
      validateEnv(
        env({
          NODE_ENV: 'development',
          API_URL: 'http://localhost:3000',
          NEXT_PUBLIC_API_BASE: '/api/v1',
        })
      )
    ).not.toThrow();
  });

  it('does not throw for valid production configuration', () => {
    expect(() =>
      validateEnv(
        env({
          NODE_ENV: 'production',
          API_URL: 'https://api.example.com',
          NEXT_PUBLIC_API_BASE: '/api/v1',
          LOG_LEVEL: 'info',
        })
      )
    ).not.toThrow();
  });

  it('throws when any variable is invalid', () => {
    expect(() =>
      validateEnv(
        env({
          NODE_ENV: 'production',
          API_URL: 'http://localhost:3000',
        })
      )
    ).toThrow('must not point to localhost in production');
  });
});

describe('getServerEnv', () => {
  const originalWindow = global.window;

  afterEach(() => {
    if (originalWindow === undefined) {
      // @ts-expect-error cleanup test shim
      delete global.window;
    } else {
      global.window = originalWindow;
    }
    jest.resetModules();
  });

  it('throws when called in the browser', async () => {
    // @ts-expect-error simulate client runtime
    global.window = {};

    await jest.isolateModulesAsync(async () => {
      const { getServerEnv } = await import('./env');
      expect(() => getServerEnv()).toThrow('getServerEnv() is only available on the server');
    });
  });

  it('caches parsed server env on the server', async () => {
    await jest.isolateModulesAsync(async () => {
      const envModule = await import('./env');
      const first = envModule.getServerEnv();
      const second = envModule.getServerEnv();
      expect(second).toBe(first);
    });
  });
});
