import React from 'react'
import { Waiter } from './Waiter'
import { fakerWaiter } from './utils/faker-waiter'

export function WaiterExample() {
  return (
    <Waiter
      requestCreator={fakerWaiter}
      render={({
        isPending,
        isResolved,
        isRejected,
        isCompleted,
      }) => (
        <div>
          isPending: {JSON.stringify(isPending)}
          <br />
          isResolved: {JSON.stringify(isResolved)}
          <br />
          isRejected: {JSON.stringify(isRejected)}
          <br />
          isCompleted: {JSON.stringify(isCompleted)}
        </div>
      )}
    />

  )
}

