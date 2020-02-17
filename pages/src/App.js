import React, { useState, useEffect } from 'react';
import { useWaiter } from 'react-waiter'

function testRequest() {
  return new Promise(
    (resolve, reject) => {
      setTimeout(() => {
        const num = Math.floor(Math.random() * 10)
        console.log('num = ', num)

        if (num % 2 === 1) {
          reject({ message: 'Sorry, rejected'})
        }

        resolve({ success: true })
      }, 5000)
    }
  )
}

function useTimer() {
  const [time, setTime] = useState()

  useEffect(() => {
    setInterval(() => {
      setTime((new Date()).getTime())
    })
  })

  return {
    time,
  }

}

function TestWaiter() {
  const {
    response,
    error,

    isPending,
    isResolved,
    isRejected,
    isCompleted,

    startTime,
    endTime,
    elapsedTime,
    lastModified
  } = useWaiter(testRequest)
  const { time } = useTimer()

  return (
    <div>
      <div>isPending: {isPending.toString()}</div>
      <div>isResolved: {isResolved.toString()}</div>
      <div>isRejected: {isRejected.toString()}</div>
      <div>isCompleted: {isCompleted.toString()}</div>
      <br />
      <div>startTime: {startTime}</div>
      <div>endTime: {endTime}</div>
      <div>elapsedTime: {elapsedTime}</div>
      <div>lastModified: {lastModified}</div>
      <div>response: {JSON.stringify(response)}</div>
      <div>error: {JSON.stringify(error)}</div>
      <br />
      <div>running time: {time}</div>
      <br />
      <br />
    </div>
  )
}

function App() {
  return (
    <div>
      <TestWaiter />
    </div>
  );
}

export default App;
