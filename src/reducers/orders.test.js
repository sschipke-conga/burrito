import {orders} from './orders';

describe('orders reducer', () => {
  it('should return the initial state of an empty array', () => {
    const expected = [];
    const result = orders(undefined, {});
    expect(result).toEqual(expected);
  })
  it('should return state with current orders', () => {
    const mockOrders = [{
      name: 'Alex', ingredients: ['queso', 'pico', 'cheese']
    }, {
      name: 'Steve', ingredients: ['garlic', 'bread', 'bagels']
    }]
    const mockAction = {
      type: 'SET_ORDERS',
      orders: mockOrders
    }
    const result = orders([], mockAction);
    expect(result).toEqual(mockOrders)
  })
  it('should return state with new order in it', () => {
    const mockOrder = {
      name: 'Alex', ingredients: ['queso', 'pico', 'cheese']
    }
    const mockAction = {
      type: 'SET_ORDER',
      order: mockOrder
    }
    const result = orders([], mockAction);
    expect(result).toEqual([mockOrder])
  })
})