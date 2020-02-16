import getTime from '../../src/helpers/getTime'


describe('Helpers - getTime()', () => {
  it('should be a number', () => {
    expect(typeof getTime()).toBe('number')
  })
})
