import React from 'react';
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { useWaiter } from '../src';

Enzyme.configure({ adapter: new Adapter() });

export default function testHook(
  runHook,
  flushEffects = true
) {
  function HookWrapper() {
    const { response, error } = runHook();

    return (
      <span
        response={response}
        error={error}
        />
    );
  }

  const wrapperFunc = flushEffects ? mount : shallow;
  const wrapper = wrapperFunc(<HookWrapper />);

  return {
    getWrapper: () => wrapper,
    getProps: () => {
      return wrapper.find('span').props()
    }
  }
}

describe('useWaiter', () => {
  it('should be a function', () => {
    expect(typeof useWaiter).toBe('function');
  });

  describe('response', () => {
    it('should initialize as null', () => {
      const { getProps } = testHook(
          () => useWaiter(() => Promise.resolve()),
          false
      )
      expect(getProps().response).toBe(null);
      expect(getProps().error).toBe(null);
    })

    it('should set response', async () => {
      const { getWrapper, getProps } = testHook(
          () => useWaiter(() => Promise.resolve()),
          true
      )
      await new Promise((resolve) => setTimeout(resolve, 100))
      getWrapper().update()
      expect(getProps().response.success).toBe(true);
    })
  })

  describe('error', () => {
    it('should initialize as null', () => {
      const { getProps } = testHook(
          () => useWaiter(() => Promise.resolve()),
          false
      )
      expect(getProps().response).toBe(null);
    })

    it('should set error', async () => {
      const MOCK_ERROR = { message: 'error' }
      const { getWrapper, getProps } = testHook(
          () => useWaiter(() => Promise.reject(MOCK_ERROR)),
          true
      )
      await new Promise((resolve) => setTimeout(resolve, 100))
      getWrapper().update()
      expect(getProps().error).toBe(MOCK_ERROR);
    })
  })
});
