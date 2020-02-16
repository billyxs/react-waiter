import { useState, useEffect } from 'react'

export default function useWaiter(requestCreator) {
  // waiter result
  const [response, setResponse] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function requestRunner() {
      try {
        const data = await requestCreator()
        setResponse({ success: true })
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
