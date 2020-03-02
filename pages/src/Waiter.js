import { useWaiter } from './useWaiter';

export function Waiter({ render, requestCreator, params }) {
  const {
    callWaiter,
    cancelWaiter,
    clearWaiter,

    id,
    request,
    response,
    error,

    isPending,
    isResolved,
    isRejected,
    isCompleted,
    isRefreshing,
    isCanceled,

    lastModified,
    startTime,
    endTime,
    elapsedTime,

  } = useWaiter(requestCreator, params)

  return (
    render({
      callWaiter,
      cancelWaiter,
      clearWaiter,
      params,

      id,
      request,
      response,
      error,

      isPending,
      isResolved,
      isRejected,
      isCompleted,
      isRefreshing,
      isCanceled,

      lastModified,
      startTime,
      endTime,
      elapsedTime,
    })
  )
}
