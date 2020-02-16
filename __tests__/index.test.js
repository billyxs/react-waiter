import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks';
import { useWaiter } from '../src';

function createHookTest(promiseFunc) {
  return renderHook(() => useWaiter(() => new Promise(promiseFunc)));
}

describe('useWaiter', () => {
  it('should be a function', () => {
    expect(typeof useWaiter).toBe('function');
  });

  it('should handle response state', async () => {
    const MOCK_RESPONSE = { success: true };
    const { result, waitForNextUpdate } = createHookTest((resolve) =>
      setTimeout(() => resolve(MOCK_RESPONSE), 500)
    );
    expect(result.current.response).toBe(null);
    expect(result.current.error).toBe(null);

    expect(result.current.isPending).toBe(true);
    expect(result.current.isResolved).toBe(false);
    expect(result.current.isRejected).toBe(false);
    expect(result.current.isCompleted).toBe(false);

    expect(result.current.lastModified).toBeGreaterThan(0);

    await waitForNextUpdate();
    expect(result.current.response).toBe(MOCK_RESPONSE);
    expect(result.current.error).toBe(null);

    expect(result.current.isPending).toBe(false);
    expect(result.current.isResolved).toBe(true);
    expect(result.current.isRejected).toBe(false);
    expect(result.current.isCompleted).toBe(true);
  });

  it('should handle error state', async () => {
    const MOCK_ERROR = { message: 'error' };
    const { result, waitForNextUpdate } = createHookTest((resolve, reject) =>
      setTimeout(() => reject(MOCK_ERROR), 500)
    );
    expect(result.current.response).toBe(null);
    expect(result.current.error).toBe(null);
    await waitForNextUpdate();
    expect(result.current.response).toBe(null);
    expect(result.current.error).toBe(MOCK_ERROR);
  });
});
