/** @jest-environment jsdom */

import { logger } from './logger';

describe('logger', () => {
  it('logs to console in the browser', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    logger.error('test error', { code: 1 });
    expect(errorSpy).toHaveBeenCalledWith('test error', { code: 1 });
    errorSpy.mockRestore();
  });
});
