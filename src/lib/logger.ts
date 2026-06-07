export type LogMeta = Record<string, unknown>;

export interface AppLogger {
  error(message: string, meta?: LogMeta): void;
  warn(message: string, meta?: LogMeta): void;
  info(message: string, meta?: LogMeta): void;
  debug(message: string, meta?: LogMeta): void;
}

function createBrowserLogger(): AppLogger {
  const log =
    (fn: (...args: unknown[]) => void) =>
    (message: string, meta?: LogMeta) => {
      if (meta && Object.keys(meta).length > 0) fn(message, meta);
      else fn(message);
    };

  return {
    error: log(console.error),
    warn: log(console.warn),
    info: log(console.info),
    debug: log(console.debug),
  };
}

let instance: AppLogger | null = null;

function getLogger(): AppLogger {
  if (!instance) {
    if (typeof window === 'undefined') {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      instance = require('./logger.server').logger as AppLogger;
    } else {
      instance = createBrowserLogger();
    }
  }
  return instance;
}

export const logger: AppLogger = {
  error: (message, meta) => getLogger().error(message, meta),
  warn: (message, meta) => getLogger().warn(message, meta),
  info: (message, meta) => getLogger().info(message, meta),
  debug: (message, meta) => getLogger().debug(message, meta),
};
