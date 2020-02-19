import { useState, useEffect, useRef } from 'react';
import getTime from './helpers/getTime';

export default function useWaiter(requestCreator) {
  // waiter lifecyle
  const [isPending, setPending] = useState(false);
  const [isResolved, setResolved] = useState(false);
  const [isRejected, setRejected] = useState(false);
  const [isCompleted, setCompleted] = useState(false);

  // waiter timestamps
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [lastModified, setLastModified] = useState(null);

  // waiter
  const id = useRef(null);
  const [request, setRequest] = useState(null);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function requestRunner() {
      const waiterId = id.current + 1;
      id.current = waiterId;

      try {
        const request = requestCreator();
        setRequest(request);
        setStartTime(getTime());
        setLastModified(getTime());

        setPending(true);

        const data = await request;
        if (waiterId !== id.current) {
          return;
        }
        setResponse(data);
        setError(null);

        setPending(false);
        setResolved(true);
        setRejected(false);
        setCompleted(true);
      } catch (e) {
        if (waiterId !== id.current) {
          return;
        }
        setResponse(null);
        setError(e);

        setPending(false);
        setResolved(false);
        setRejected(true);
        setCompleted(true);
      }

      setEndTime(getTime());
      setLastModified(getTime());
    }

    requestRunner();
  }, []);

  return {
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
