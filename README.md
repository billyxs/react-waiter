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

function Component() {
  const { response, isPending, isResolved } = useWaiter(
    () => Promise.resolve({ name: 'react-waiter' })
  );

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

// unix timestamp in milliseconds when the request is initialzed
startTime: null,

// unix timestamp in milliseconds when the request is completes
endTime: null,

// unix timestamp in milliseconds of the request processing time
elapsedTime: null,

// unix timestamp in milliseconds of the last update to any property
lastModified: null,
```

### 

```javascript
const {
  // initialized promise
  request,

  // result data
  response,
  error,

  // lifecyle
  isPending,
  isResolved,
  isRejected,
  isCompleted,

  // timestamps
  startTime,
  endTime,
  elapsedTime,
  lastModified,
} = useWaiter(requestCreator);
```
