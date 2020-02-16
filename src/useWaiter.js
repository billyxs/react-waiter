import { useState } from 'react'

export default function useWaiter(request) {
  const {response, setResponse} = useState(null)

  return { response }
}
