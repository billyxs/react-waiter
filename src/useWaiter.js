import { useState, useEffect } from 'react'

export default function useWaiter(requestCreator) {
  // waiter result
  const [response, setResponse] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function requestRunner() {
      try {
        const data = await requestCreator()
        setResponse(data)
      } catch(e) {
        setError(e)
      }
    }

    requestRunner()
  }, [])

  return {
    response,
    error,
  }
}
