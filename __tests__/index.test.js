import { renderHook } from '@testing-library/react-hooks';
import { useWaiter } from '../src';

function createHookTest(promiseFunc, params) {
  function testRequest() {
    return new Promise(promiseFunc);
  }
  return renderHook(() => useWaiter(testRequest, params));
}

describe('useWaiter', () => {
  it('should be a function', () => {
    expect(typeof useWaiter).toBe('function');
  });

  it('should handle response state', async () => {
    const TEST_PARAMS = { test: true };
    const MOCK_RESPONSE = { success: true };
    const { result, waitForNextUpdate } = createHookTest(
      (resolve) => setTimeout(() => resolve(MOCK_RESPONSE), 500),
      TEST_PARAMS
    );

    expect(result.current.id).toBe(1);
    expect(result.current.params).toBe(TEST_PARAMS);

    expect(result.current.response).toBe(null);
    expect(result.current.error).toBe(null);

    expect(result.current.isPending).toBe(true);
    expect(result.current.isResolved).toBe(false);
    expect(result.current.isRejected).toBe(false);
    expect(result.current.isCompleted).toBe(false);

    expect(result.current.lastModified).toBeGreaterThan(0);
    expect(result.current.startTime).toBeGreaterThan(0);
    expect(result.current.endTime).toBeNull();
    expect(result.current.elapsedTime).toBeNull();

    await waitForNextUpdate();

    expect(result.current.id).toBe(1);
    expect(result.current.params).toBe(TEST_PARAMS);

    expect(result.current.response).toBe(MOCK_RESPONSE);
    expect(result.current.error).toBe(null);

    expect(result.current.isPending).toBe(false);
    expect(result.current.isResolved).toBe(true);
    expect(result.current.isRejected).toBe(false);
    expect(result.current.isCompleted).toBe(true);

    expect(result.current.lastModified).toBeGreaterThan(0);
    expect(result.current.startTime).toBeGreaterThan(0);
    expect(result.current.endTime).toBeGreaterThan(0);
    expect(result.current.elapsedTime).toBeGreaterThan(0);
  });

  it('should handle error state', async () => {
    const MOCK_ERROR = { message: 'error' };
    const { result, waitForNextUpdate } = createHookTest((resolve, reject) =>
      setTimeout(() => reject(MOCK_ERROR), 500)
    );
    expect(result.current.id).toBe(1);
    expect(result.current.params).toBe(undefined);

    expect(result.current.response).toBe(null);
    expect(result.current.error).toBe(null);

    expect(result.current.isPending).toBe(true);
    expect(result.current.isResolved).toBe(false);
    expect(result.current.isRejected).toBe(false);
    expect(result.current.isCompleted).toBe(false);

    expect(result.current.lastModified).toBeGreaterThan(0);
    expect(result.current.startTime).toBeGreaterThan(0);
    expect(result.current.endTime).toBeNull();
    expect(result.current.elapsedTime).toBeNull();

    await waitForNextUpdate();
    expect(result.current.id).toBe(1);
    expect(result.current.params).toBe(undefined);

    expect(result.current.response).toBe(null);
    expect(result.current.error).toBe(MOCK_ERROR);

    expect(result.current.isPending).toBe(false);
    expect(result.current.isResolved).toBe(false);
    expect(result.current.isRejected).toBe(true);
    expect(result.current.isCompleted).toBe(true);

    expect(result.current.lastModified).toBeGreaterThan(0);
    expect(result.current.startTime).toBeGreaterThan(0);
    expect(result.current.endTime).toBeGreaterThan(0);
    expect(result.current.elapsedTime).toBeGreaterThan(0);
  });
});
