# React Waiter

[![NPM](https://img.shields.io/npm/v/react-waiter)](https://npmjs.org/package/react-waiter)
[![Build Status](https://travis-ci.org/billyxs/react-waiter.svg?branch=master)](https://travis-ci.org/billyxs/react-waiter)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Installation

`npm i react-waiter --save`

## Basic Usage

```javascript
import React from 'react';
import { useWaiter } from 'react-waiter';

function requestCreator() {
  return Promise.resolve({ name: 'react-waiter' })
}

function Component() {
  const { 
    response, 
    isPending, 
    isResolved 
  } = useWaiter(requestCreator);

  if (isPending) {
    return <span>working...</span>;
  }

  if (response) {
    return <span>{response.name} success!</span>;
  }
}
```

## useWaiter(requestCreator)

A react hook for handling your async requests.

### defaults

```
// The request ID of the waiter. This will increment with each call.
id: null,

// The params sent to the requestCreator based on the last request
params: undefined,

// the promise returned from the requestCreator
request: null,

// resolved data
response: null,

// rejected error
error: null,

// true when the request is pending
isPending: false,

// true when the request has resolved successfully
isResolved: false,

// true when the request has rejected/errored out
isRejected: false,

// true when the request has rejected or resolved
isCompleted: false,

// true if the request completed previously and is being called again
isRefreshing: false,

// true if the request is canceled from calling cancelWaiter  
isCanceled: false,

// unix timestamp in milliseconds when the request is initialzed
startTime: null,

// unix timestamp in milliseconds when the request is completes
endTime: null,

// duration in milliseconds for the request to complete 
elapsedTime: null,

// unix timestamp in milliseconds of the last update to any property
lastModified: null,
```

### Hook properties

```javascript
const {
  callWaiter,
  cancelWaiter,
  clearWaiter,

  // waiter data
  id,
  request,
  params, 
  response,
  error,

  // lifecyle
  isPending,
  isResolved,
  isRejected,
  isCompleted,
  isRefreshing,
  isCanceled,

  // timestamps
  startTime,
  endTime,
  elapsedTime,
  lastModified,
} = useWaiter(requestCreator);
```

## callWaiter(params)

This will invoke your requestCreator with any new params. If your request previously succeeded before
calling callWaiter(), calling it a second time will set `isRefreshing` to be true.

```javascript
const { callWaiter } = useWaiter(() => myRequest()) 

callWaiter({ param: 'Hello' })
```

## cancelWaiter()

If your request is current pending, you can cancel the request with `cancelWaiter()`. If the request
is interrupted, `isCanceled` will be true. If the request completed, `cancelWaiter()` will have no effect.

```javascript
const { cancelWaiter, isCanceled } = useWaiter(() => myRequest()) 

cancelWaiter()
```

## clearWaiter()

This will clear all hook properties to look as if the requestCreator had never been invoked.
The `requestCreator` will stay intact and may be called again by `callWaiter()`. 

If a request is currently running, the request will not complete and any result will be ignored.


```javascript
const { clearWaiter } = useWaiter(() => myRequest()) 

clearWaiter()
```
