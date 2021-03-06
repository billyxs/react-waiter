import { useState, useEffect, useCallback, useRef } from 'react';
import getTime from './helpers/getTime';

export function useWaiter(requestCreator, requestParams) {
  // waiter request data
  // mutables
  const id = useRef(null);
  const params = useRef(null);
  const response = useRef(null);
  const isCanceled = useRef(false);

  const [request, setRequest] = useState(null);
  const [error, setError] = useState(null);

  // waiter lifecyle
  const [isPending, setPending] = useState(false);
  const [isResolved, setResolved] = useState(false);
  const [isRejected, setRejected] = useState(false);
  const [isCompleted, setCompleted] = useState(false);
  const [isRefreshing, setRefreshing] = useState(false);

  // waiter timestamps
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [lastModified, setLastModified] = useState(null);

  async function requestRunner(runnerParams) {
    isCanceled.current = false;
    params.current = runnerParams;

    const waiterId = id.current + 1;
    id.current = waiterId;

    try {
      const nextRequest = requestCreator();
      // if we have a response already, we're refreshing
      const refresh = !!response.current;
      setRefreshing(refresh);

      // waiter request init
      setRequest(nextRequest);
      setError(null);

      // waiter lifecycle init
      setPending(true);
      setResolved(false);
      setRejected(false);
      setCompleted(false);

      // waiter timestamps init
      setStartTime(getTime());
      setEndTime(null);
      setLastModified(getTime());

      const data = await nextRequest;
      if (waiterId !== id.current) {
        return;
      }

      if (isCanceled.current) {
        return;
      }

      // waiter success changes
      response.current = data;
      setResolved(true);
    } catch (e) {
      if (waiterId !== id.current) {
        return;
      }
      if (isCanceled.current) {
        return;
      }
      // request error changes
      response.current = null;
      setError(e);
      setRejected(true);
    }

    // waiter completed changes
    setPending(false);
    setCompleted(true);
    setRefreshing(false);
    setEndTime(getTime());
    setLastModified(getTime());
  }

  const callWaiter = useCallback((callbackParams) => {
    requestRunner(callbackParams);
  }, []);

  const clearWaiter = useCallback(() => {
    id.current = null;
    isCanceled.current = false;
    response.current = null;
    params.current = null;

    setError(null);
    setRequest(null);

    setPending(false);
    setResolved(false);
    setRejected(false);
    setCompleted(false);
    setRefreshing(false);

    setStartTime(null);
    setEndTime(null);
    setLastModified(getTime());
  }, []);

  const cancelWaiter = useCallback(() => {
    if (id.current == null || isCompleted) {
      return;
    }
    isCanceled.current = true;
    response.current = null;

    setRequest(null);
    setError(null);

    setPending(false);
    setResolved(false);
    setRejected(false);
    setCompleted(false);
    setRefreshing(false);

    setStartTime(null);
    setEndTime(null);
    setLastModified(getTime());
  }, [isCompleted]);

  useEffect(() => {
    callWaiter(requestParams);
  }, [callWaiter]);

  return {
    callWaiter,
    cancelWaiter,
    clearWaiter,
    params: params.current,

    id: id.current,
    request,
    response: response.current,
    error,

    isPending,
    isResolved,
    isRejected,
    isCompleted,
    isRefreshing,
    isCanceled: isCanceled.current,

    lastModified,
    startTime,
    endTime,
    elapsedTime: endTime ? endTime - startTime : null,
  };
}
