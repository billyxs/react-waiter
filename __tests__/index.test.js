import React from 'react';
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { useWaiter } from '../src';

Enzyme.configure({ adapter: new Adapter() });

export default function testHook(runHook, flushEffects = true) {
  function HookWrapper() {
    const output = runHook();

    return (
      <span output={output} />
    );
  }

  const wrapperFunc = flushEffects ? mount : shallow;
  const wrapper = wrapperFunc(<HookWrapper />);

  return wrapper.find('span').props().output;
}

describe('useWaiter', () => {
  it('should be a function', () => {
    expect(typeof useWaiter).toBe('function');
  });

  it('should', () => {
    const value = testHook(() => useWaiter(), false)
    expect(value.response).toBe(undefined);

  })
});
