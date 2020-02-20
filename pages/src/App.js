import React from 'react';
import styled from 'styled-components'
import ReactMarkdown from 'react-markdown';
import { useWaiter } from './useWaiter'

const Button = styled.button`
  cursor: pointer;
  padding: 8px 20px;
  background: none;
  font-size: 16px;
  :hover {
     background: #efefef;
  }
`

const WaiterDiv = styled.div`
  padding: 20px;
  margin-bottom: 10px;
  color: ${({ isPending, isResolved, isRejected }) => {
      if (isPending) {
        return 'orange';
      }
      if (isResolved) {
        return 'green';
      }
      if (isRejected) {
        return 'red';
      }
      return 'black';
    }};
  border: 1px solid #ccc;
  border-color: ${({ isPending, isResolved, isRejected }) => {
      if (isPending) {
        return 'orange';
      }
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
  return new Promise(
    (resolve, reject) => {
      setTimeout(() => {
        const num = Math.floor(Math.random() * 10)

        if (num % 2 === 1) {
          reject({ message: 'Sorry, rejected'})
          return
        }

        resolve({ success: true })
      }, 5000)
    }
  )
}


function TestWaiter() {
  const {
    id,
    params,

    callWaiter,
    response,
    error,

    isPending,
    isResolved,
    isRejected,
    isCompleted,
    isRefreshing,

    startTime,
    endTime,
    elapsedTime,
    lastModified
  } = useWaiter(testRequest, { param1: 'hello' })

  return (
    <div style={{
      margin: '20px auto',
      width: '900px',
      padding: '20px',
    }}>
      <h1>react-waiter</h1>
      <div>Managing the promise lifecyle for you react applications.</div>
      <br />
      <hr />
      <br />
      <h2>useWaiter()</h2>
      <div>
   <ReactMarkdown
    source={`
      function myRequest(params) {
        return apiRequest(params)
      }

      const myWaiter = usewaiter( myrequest, { param1: "hello" })

      const {
        id,
        params,

        callWaiter,
        response,
        error,

        isPending,
        isResolved,
        isRejected,
        isCompleted,
        isRefreshing,

        startTime,
        endTime,
        elapsedTime,
        lastModified
      } = myWaiter`}
    />
      </div>

      <h2>Run example</h2>
      <div style={{
        width: '35%',
        display: 'inline-block',
        padding: '15px',
        verticalAlign: 'top',
      }}>

        Button onClick with initiate callWaiter({JSON.stringify({preWaiterId: id})})
        <br />
        <br />
        <Button onClick={() => callWaiter({ prevWaiterId: id })} >
          Run with new params
        </Button>
        <br />
        <br />

        <WaiterDiv
          isPending={isPending}
          isResolved={isResolved}
          isRejected={isRejected}
        >
        { isPending && '...working' }
        { isResolved && 'Yes, success!' }
        { isRejected && 'Oh no, error' }
        <br />
        <br />
        params: { JSON.stringify(params) }
        <br />
        <br />
        { isResolved && <span>response: {JSON.stringify(response)}</span> }
        { isRejected && <span>error: {JSON.stringify(error)}</span> }

        </WaiterDiv>
      </div>
      <div style={{
        width: '55%',
        display: 'inline-block',
        padding: '15px',
        border: 'solid 1px #ddd',

      }}>
        <div>id: {JSON.stringify(id)}</div>
        <div>params: {JSON.stringify(params)}</div>
        <br />
        <div>response: {JSON.stringify(response)}</div>
        <div>error: {JSON.stringify(error)}</div>
        <br />
        <div>isPending: {isPending.toString()}</div>
        <div>isResolved: {isResolved.toString()}</div>
        <div>isRejected: {isRejected.toString()}</div>
        <div>isCompleted: {isCompleted.toString()}</div>
        <div>isRefreshing: {isRefreshing.toString()}</div>
        <br />
        <div>startTime: {startTime}</div>
        <div>endTime: {endTime}</div>
        <div>elapsedTime: {elapsedTime}</div>
        <div>lastModified: {lastModified}</div>
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
