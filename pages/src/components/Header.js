import React from 'react';

export function Header() {
  return (
    <div>
      <h1>
        react-waiter
        &nbsp;
        &nbsp;
        &nbsp;
      </h1>
      <div>Managing the promise lifecyle for you react applications.
        <br />
        <br />
        <a href="https://npmjs.org/package/react-waiter">
          <img alt="npm" src="https://img.shields.io/npm/v/react-waiter" />
        </a>
        {' '}
        <a href="https://travis-ci.org/billxys/react-waiter">
          <img src="https://travis-ci.org/billyxs/react-waiter.svg?branch=master" alt="travis build badge" />
        </a>
        {' '}
        <a href="https://img.shields.io/npm/l/react-waiter?color=blue">
          <img alt="NPM" src="https://img.shields.io/npm/l/react-waiter?color=blue&amp;label=License" />
        </a>
      </div>
      <br />
      <hr />
    </div>
  )
}
