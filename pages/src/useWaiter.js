import { useState, useEffect, useCallback, useRef } from 'react';
function getTime() {
  return new Date().getTime()
}

export function useWaiter(requestCreator) {
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
  const id = useRef(0);
  const [request, setRequest] = useState(null);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  async function requestRunner() {
    const currentId = id.current + 1
    id.current = currentId
    try {
      // reset request and data
      setRequest(null);
      setError(null);

      // timestamps
      setStartTime(getTime());
      setEndTime(null);

      // reset lifecycle
      setPending(true);
      setResolved(false);
      setRejected(false);
      setCompleted(false);

      // init request
      const request = requestCreator();
      if (id.current !== currentId) {
        return
      }

      setRequest(request);
      setLastModified(getTime());

      // handle resolved request
      const data = await request;
      setResponse(data);
      setError(null);

      setPending(false);
      setResolved(true);
      setRejected(false);
      setCompleted(true);
    } catch (e) {
      if (id.current !== currentId) {
        return
      }
      // handle rejected request
      setResponse(null);
      setError(e);

      setPending(false);
      setResolved(false);
      setRejected(true);
      setCompleted(true);
    }

    // ending timestamps
    setEndTime(getTime());
    setLastModified(getTime());
    console.log('endTime = ', endTime)
    console.log('duration', endTime - startTime)

  }

  const callWaiter = useCallback(
    (params) => {
      requestRunner(params);
    }, []
  )

  useEffect(() => {
    callWaiter();
  }, [callWaiter])


  return {
    callWaiter,

    id,
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
