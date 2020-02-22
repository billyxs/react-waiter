import { renderHook, act } from '@testing-library/react-hooks';
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
    expect(result.current.isRefreshing).toBe(false);

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
    expect(result.current.isRefreshing).toBe(false);

    expect(result.current.lastModified).toBeGreaterThan(0);
    expect(result.current.startTime).toBeGreaterThan(0);
    expect(result.current.endTime).toBeGreaterThan(0);
    expect(result.current.elapsedTime).toBeGreaterThan(0);
  });

  it('should handle refresh state', async () => {
    const TEST_PARAMS = { test: true };
    const MOCK_RESPONSE = { success: true };
    const { result, waitForNextUpdate } = createHookTest(
      (resolve) => setTimeout(() => resolve(MOCK_RESPONSE), 500),
      TEST_PARAMS
    );
    // normal cycle
    expect(result.current.id).toBe(1);
    expect(result.current.response).toBe(null);
    expect(result.current.isRefreshing).toBe(false);

    await waitForNextUpdate();

    expect(result.current.id).toBe(1);
    expect(result.current.response).toBe(MOCK_RESPONSE);
    expect(result.current.isRefreshing).toBe(false);

    // Start refresh cycle
    act(() => result.current.callWaiter());

    expect(result.current.id).toBe(2);
    expect(result.current.params).toBeUndefined();
    expect(result.current.response).toBe(MOCK_RESPONSE);
    expect(result.current.error).toBe(null);

    expect(result.current.isPending).toBe(true);
    expect(result.current.isResolved).toBe(false);
    expect(result.current.isRejected).toBe(false);
    expect(result.current.isCompleted).toBe(false);
    expect(result.current.isRefreshing).toBe(true);

    expect(result.current.lastModified).toBeGreaterThan(0);
    expect(result.current.startTime).toBeGreaterThan(0);
    expect(result.current.endTime).toBe(null);
    expect(result.current.elapsedTime).toBe(null);

    await waitForNextUpdate();

    expect(result.current.id).toBe(2);
    expect(result.current.params).toBeUndefined();
    expect(result.current.response).toBe(MOCK_RESPONSE);
    expect(result.current.error).toBe(null);

    expect(result.current.isPending).toBe(false);
    expect(result.current.isResolved).toBe(true);
    expect(result.current.isRejected).toBe(false);
    expect(result.current.isCompleted).toBe(true);
    expect(result.current.isRefreshing).toBe(false);

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
    expect(result.current.isRefreshing).toBe(false);

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
    expect(result.current.isRefreshing).toBe(false);

    expect(result.current.lastModified).toBeGreaterThan(0);
    expect(result.current.startTime).toBeGreaterThan(0);
    expect(result.current.endTime).toBeGreaterThan(0);
    expect(result.current.elapsedTime).toBeGreaterThan(0);
  });

  it('should handle cancel state', async () => {
    const { result } = createHookTest((resolve) =>
      setTimeout(() => resolve(null), 900)
    );

    act(() => result.current.cancelWaiter());
    expect(result.current.id).toBe(1);
    expect(result.current.params).toBe(undefined);

    expect(result.current.request).toBe(null);
    expect(result.current.response).toBe(null);
    expect(result.current.error).toBe(null);

    expect(result.current.isCanceled).toBe(true);
    expect(result.current.isResolved).toBe(false);
    expect(result.current.isRejected).toBe(false);
    expect(result.current.isCompleted).toBe(false);
    expect(result.current.isRefreshing).toBe(false);

    expect(result.current.lastModified).toBeGreaterThan(0);
    expect(result.current.startTime).toBe(null);
    expect(result.current.endTime).toBe(null);
    expect(result.current.elapsedTime).toBe(null);
  });

  it('should handle clear state', async () => {
    const { result } = createHookTest((resolve) =>
      setTimeout(() => resolve(null), 900)
    );

    expect(result.current.id).toBe(1);

    act(() => result.current.clearWaiter());

    expect(result.current.id).toBe(null);
    expect(result.current.params).toBe(null);

    expect(result.current.request).toBe(null);
    expect(result.current.response).toBe(null);
    expect(result.current.error).toBe(null);

    expect(result.current.isResolved).toBe(false);
    expect(result.current.isRejected).toBe(false);
    expect(result.current.isCompleted).toBe(false);
    expect(result.current.isRefreshing).toBe(false);
    expect(result.current.isCanceled).toBe(false);

    expect(result.current.lastModified).toBeGreaterThan(0);
    expect(result.current.startTime).toBe(null);
    expect(result.current.endTime).toBe(null);
    expect(result.current.elapsedTime).toBe(null);
  });
});
