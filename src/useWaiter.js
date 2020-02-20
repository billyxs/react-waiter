import { useState, useEffect, useCallback, useRef } from 'react';
import getTime from './helpers/getTime';

export function useWaiter(requestCreator, requestParams) {
  // waiter request data
  // mutables
  const id = useRef(null);
  const params = useRef(null);
  const response = useRef(null);

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
    params.current = runnerParams;
    const waiterId = id.current + 1;
    id.current = waiterId;

    try {
      const request = requestCreator();
      // if we have a response already, we're refreshing
      const refresh = !!response.current;
      setRefreshing(refresh);

      // waiter request init
      setRequest(request);
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

      const data = await request;
      if (waiterId !== id.current) {
        return;
      }
      // waiter success changes
      response.current = data;
      setResolved(true);
    } catch (e) {
      if (waiterId !== id.current) {
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

  useEffect(() => {
    callWaiter(requestParams);
  }, [callWaiter]);

  return {
    callWaiter,
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

    lastModified,
    startTime,
    endTime,
    elapsedTime: endTime ? endTime - startTime : null,
  };
}
