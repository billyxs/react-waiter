import { useState, useEffect, useCallback, useRef } from 'react';
import getTime from './helpers/getTime';

export default function useWaiter(requestCreator) {
  // mutables
  const id = useRef(0);

  // waiter lifecyle
  const [isPending, setPending] = useState(false);
  const [isResolved, setResolved] = useState(false);
  const [isRejected, setRejected] = useState(false);
  const [isCompleted, setCompleted] = useState(false);

  // waiter timestamps
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [lastModified, setLastModified] = useState(null);

  // waiter request data
  const [request, setRequest] = useState(null);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  async function requestRunner() {
    const waiterId = id.current + 1;
    id.current = waiterId;

    try {
      const request = requestCreator();
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
      setResponse(data);
      setResolved(true);
    } catch (e) {
      if (waiterId !== id.current) {
        return;
      }
      // request error changes
      setResponse(null);
      setError(e);
      setRejected(true);
    }

    // waiter completed changes
    setPending(false);
    setCompleted(true);
    setEndTime(getTime());
    setLastModified(getTime());
  }

  const callWaiter = useCallback((params) => {
    requestRunner(params);
  }, []);

  useEffect(() => {
    callWaiter();
  }, [callWaiter]);

  return {
    callWaiter,

    id: id.current,
    request,
    response,
    error,

    isPending,
    isResolved,
    isRejected,
    isCompleted,

    lastModified,
    startTime,
    endTime,
    elapsedTime: endTime ? endTime - startTime : null,
  };
}
