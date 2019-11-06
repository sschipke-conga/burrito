import {setOrders, setOrder} from './index';

describe('action creators', () => {
  it('setOrders should return the correct object', () => {
    const mockOrders =[{
    name: 'Alex', ingredients: ['queso', 'pico', 'cheese']
  }, {
    name: 'Steve', ingredients: ['garlic', 'bread', 'bagels']
  }]
    const expected = {
      type: 'SET_ORDERS',
      orders: mockOrders
    }
    expect(setOrders(mockOrders)).toEqual(expected)
  })
  it('setOrder should return the correct object', () => {
    const mockOrder = {
      name: 'Alex', ingredients: ['queso', 'pico', 'cheese']
    }
    const expected = {
      type: 'SET_ORDER',
      order: mockOrder
    }
    expect(setOrder(mockOrder)).toEqual(expected)
  })
})