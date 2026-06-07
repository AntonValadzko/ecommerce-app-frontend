const LOG_LEVELS = ['error', 'warn', 'info', 'debug'] as const;

export type LogLevel = (typeof LOG_LEVELS)[number];

export type NodeEnv = 'development' | 'production' | 'test';

export interface PublicEnv {
  NEXT_PUBLIC_API_BASE: string;
}

export interface ServerEnv {
  API_URL: string;
  LOG_LEVEL: LogLevel;
  NODE_ENV: NodeEnv;
  isProd: boolean;
  isDev: boolean;
}

export interface ConfigEnv {
  API_URL: string;
}

const LOCALHOST_PATTERN = /localhost|127\.0\.0\.1|\[::1\]/i;

function formatEnvError(variable: string, message: string, value?: string): string {
  const hint = value !== undefined ? ` (received "${value}")` : '';
  return `Invalid environment variable ${variable}: ${message}${hint}`;
}

function parseNodeEnv(value: string | undefined): NodeEnv {
  const env = value ?? 'development';
  if (env === 'development' || env === 'production' || env === 'test') {
    return env;
  }
  throw new Error(formatEnvError('NODE_ENV', 'must be development, production, or test', env));
}

function parseLogLevel(value: string | undefined, nodeEnv: NodeEnv): LogLevel {
  const fallback: LogLevel = nodeEnv === 'production' ? 'info' : 'debug';
  if (!value) return fallback;

  const normalized = value.toLowerCase();
  if (LOG_LEVELS.includes(normalized as LogLevel)) {
    return normalized as LogLevel;
  }

  throw new Error(
    formatEnvError('LOG_LEVEL', `must be one of ${LOG_LEVELS.join(', ')}`, value)
  );
}

function parseApiUrl(value: string | undefined, nodeEnv: NodeEnv): string {
  const fallback = 'http://localhost:3000';
  const raw = (value ?? fallback).trim();

  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    throw new Error(formatEnvError('API_URL', 'must be a valid HTTP or HTTPS URL', raw));
  }

  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    throw new Error(
      formatEnvError('API_URL', 'must use http:// or https://', raw)
    );
  }

  if (nodeEnv === 'production' && LOCALHOST_PATTERN.test(url.hostname)) {
    throw new Error(
      formatEnvError(
        'API_URL',
        'must not point to localhost in production — set it to your deployed backend URL',
        raw
      )
    );
  }

  return raw.replace(/\/+$/, '');
}

function parsePublicApiBase(value: string | undefined): string {
  const raw = (value ?? '/api/v1').trim();

  if (raw.startsWith('/')) {
    const normalized = raw.replace(/\/+$/, '') || '/api/v1';
    if (!normalized.startsWith('/')) {
      throw new Error(
        formatEnvError('NEXT_PUBLIC_API_BASE', 'relative paths must start with /', raw)
      );
    }
    return normalized;
  }

  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    throw new Error(
      formatEnvError(
        'NEXT_PUBLIC_API_BASE',
        'must be a relative path (e.g. /api/v1) or absolute http(s) URL',
        raw
      )
    );
  }

  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    throw new Error(
      formatEnvError(
        'NEXT_PUBLIC_API_BASE',
        'absolute values must use http:// or https://',
        raw
      )
    );
  }

  return raw.replace(/\/+$/, '');
}

function readProcessEnv(): NodeJS.ProcessEnv {
  return typeof process !== 'undefined' ? process.env : ({} as NodeJS.ProcessEnv);
}

export function parsePublicEnv(source: NodeJS.ProcessEnv = readProcessEnv()): PublicEnv {
  return {
    NEXT_PUBLIC_API_BASE: parsePublicApiBase(source.NEXT_PUBLIC_API_BASE),
  };
}

export function parseServerEnv(source: NodeJS.ProcessEnv = readProcessEnv()): ServerEnv {
  const nodeEnv = parseNodeEnv(source.NODE_ENV);

  return {
    API_URL: parseApiUrl(source.API_URL, nodeEnv),
    LOG_LEVEL: parseLogLevel(source.LOG_LEVEL, nodeEnv),
    NODE_ENV: nodeEnv,
    isProd: nodeEnv === 'production',
    isDev: nodeEnv !== 'production',
  };
}

export function parseConfigEnv(source: NodeJS.ProcessEnv = readProcessEnv()): ConfigEnv {
  const nodeEnv = parseNodeEnv(source.NODE_ENV);

  return {
    API_URL: parseApiUrl(source.API_URL, nodeEnv),
  };
}

export const publicEnv = parsePublicEnv();

let cachedServerEnv: ServerEnv | null = null;

export function getServerEnv(): ServerEnv {
  if (typeof window !== 'undefined') {
    throw new Error('getServerEnv() is only available on the server');
  }

  if (!cachedServerEnv) {
    cachedServerEnv = parseServerEnv();
  }

  return cachedServerEnv;
}

export function validateEnv(source: NodeJS.ProcessEnv = readProcessEnv()): void {
  parsePublicEnv(source);
  parseServerEnv(source);
  parseConfigEnv(source);
}
