import React, { useState, useEffect } from 'react';
import { useWaiter } from './useWaiter'
import styled from 'styled-components'

const WaiterDiv = styled.div`
  color: ${({ isResolved, isRejected }) => {
      if (isResolved) {
        return 'green';
      }
      if (isRejected) {
        return 'red';
      }
      return 'black';
    }};
  display: block;
`

function testRequest() {
  console.log('init testRequest = ')
  return new Promise(
    (resolve, reject) => {
      console.log('init promise = ')
      setTimeout(() => {
        console.log('on timeout = ')
        const num = Math.floor(Math.random() * 10)
        console.log('num = ', num)

        if (num % 2 === 1) {
          console.log('on reject = ')
          reject({ message: 'Sorry, rejected'})
          return
        }

        console.log('on resolve = ')
        resolve({ success: true })
      }, 5000)
    }
  )
}


function TestWaiter() {
  const {
    id,
    callWaiter,
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

  function ColorDiv ({ children }) {
    return (<WaiterDiv isResolved={isResolved} isRejected={isRejected}>
      {children}
    </WaiterDiv>)
  }

  return (
    <div style={{
      margin: '20px auto',
      maxWidth: '900px'
    }}>
      <div style={{
        width: '50%',
        display: 'inline-block',
        verticalAlign: 'top'
      }}>
        <ColorDiv>ID: {JSON.stringify(id)}</ColorDiv>
        <ColorDiv>response: {JSON.stringify(response)}</ColorDiv>
        <ColorDiv>error: {JSON.stringify(error)}</ColorDiv>
      </div>
      <div style={{
        width: '50%',
        display: 'inline-block',
        verticalAlign: 'top'
      }}>
        <div>isPending: {isPending.toString()}</div>
        <ColorDiv>isResolved: {isResolved.toString()}</ColorDiv>
        <ColorDiv>isRejected: {isRejected.toString()}</ColorDiv>
        <div>isCompleted: {isCompleted.toString()}</div>
      </div>
      <br />
      <div style={{
        width: '50%',
        display: 'inline-block',
        verticalAlign: 'top'
      }}>
        <ColorDiv>startTime: {startTime}</ColorDiv>
        <ColorDiv>endTime: {endTime}</ColorDiv>
        <ColorDiv>elapsedTime: {elapsedTime}</ColorDiv>
        <ColorDiv>lastModified: {lastModified}</ColorDiv>
      </div>
      <div style={{ padding: '20px' }}>
        <button onClick={callWaiter}>Run</button>
      </div>
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
