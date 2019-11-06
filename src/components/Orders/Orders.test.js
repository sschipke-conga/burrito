import React from 'react';
import { Orders, mapDispatchToProps, mapStateToProps } from './Orders';
import { shallow } from 'enzyme';
import { setOrders } from '../../actions';
import { getOrders } from '../../apiCalls';

jest.mock('../../apiCalls')
const mockOrders = [{
  name: 'Alex', ingredients: ['queso', 'pico', 'cheese']
}, {
  name: 'Steve', ingredients: ['garlic', 'bread', 'bagels']
}]

const mockSetOrders = jest.fn();
getOrders.mockImplementation(() =>{ 
  return Promise.resolve({orders: Promise.resolve(mockOrders)}) 
})

describe('Orders', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Orders 
      orders={mockOrders}
    setOrders={mockSetOrders}
    />)
  })
  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })
  it('should call getOrders when mounted', () => {
    expect(getOrders).toHaveBeenCalled()
  })
  describe('mapDispatchToProps and mapStateToProps', () => {
    it('should call Dispatch with setQuestions actions when setQuestions is called', () => {
      const mockDispatch = jest.fn();
      const actionToDispatch = setOrders('SET_ORDERS', mockOrders)
      const mappedProps = mapDispatchToProps(mockDispatch)
      mappedProps.setOrders('SET_ORDERS', mockOrders)
      expect(mockDispatch).toHaveBeenCalledWith(actionToDispatch)
    })
    it('mapStateToProps gives all orders', () => {
      const mockState = {
        orders:mockOrders
      };
      const expected = {
        orders: mockState.orders
      };
      const mappedProps = mapStateToProps(mockState)
      expect(mappedProps).toEqual(expected)
    })
  })
})