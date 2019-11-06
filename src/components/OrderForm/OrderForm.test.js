import React from 'react';
import { OrderForm, mapDispatchToProps } from './OrderForm';
import { shallow } from 'enzyme';
import { postOrder } from '../../apiCalls';
import * as actions from '../../actions/index';


jest.mock('../../apiCalls');

actions.setOrder = jest.fn();

const mockOrder = {id: 0, name: 'Alex', ingredients: ['guac','pico', 'queso']}

postOrder.mockImplementation(() => Promise.resolve(mockOrder))

describe('OrderForm', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<OrderForm 
    setOrder={actions.setOrder}
    />)
  })
  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })
  describe('handleNameChange', () => {
    const mockEvent = {target:{name:'name', value:'Steve'}}
    it('should set the state if if there is a change', () => {
      expect(wrapper.state('name')).toEqual('')
      wrapper.find('input').simulate('change', mockEvent)
      expect(wrapper.state('name')).toEqual('Steve')
    })
  })
  describe('handleIngredientChange', () => {
    const mockEvent = {
      target : {name: 'queso'},
      preventDefault: jest.fn()
    }
    it('should prevent the default behavior', () => {
      wrapper.instance().handleIngredientChange(mockEvent)
      expect(mockEvent.preventDefault).toHaveBeenCalled()
    })
    it('should update the state with ingredients onClick' ,() => {
      expect(wrapper.state('ingredients')).toEqual([])
      wrapper.find('button').at(2).simulate('click', mockEvent)
      expect(wrapper.state('ingredients')).toEqual(['queso'])
    })
    it('should update state with multiple ingredients', () => {
      const otherMockEvent = {
        target: { name: 'carnitas' },
        preventDefault: jest.fn()
      }
      const anotherMockEvent = {
        target: { name: 'peppers' },
        preventDefault: jest.fn()        
      }
      expect(wrapper.state('ingredients')).toEqual([])
      wrapper.instance().handleIngredientChange(mockEvent)
      expect(wrapper.state('ingredients')).toEqual(['queso'])
      wrapper.instance().handleIngredientChange(otherMockEvent)
      expect(wrapper.state('ingredients')).toEqual(['queso', 'carnitas'])
      wrapper.instance().handleIngredientChange(anotherMockEvent)
      expect(wrapper.state('ingredients')).toEqual(['queso', 'carnitas', 'peppers'])
    })
  })
  describe('handleSubmit', () => {
    const mockStateOrder = { name: 'Alex', ingredients: ['guac', 'pico', 'queso'] }
    const mockEvent = {preventDefault: jest.fn()}
    it('should prevent the default behavior', () => {
      wrapper.instance().handleSubmit(mockEvent)
      expect(mockEvent.preventDefault).toHaveBeenCalled()
    })
    it('if there are no ingredients it should update the state to reflect that', () => {
      expect(wrapper.state('noIngredients')).toEqual('')
      wrapper.instance().handleSubmit(mockEvent)
      expect(wrapper.state('noIngredients')).toEqual('You must have at least one ingredient')      
    })
    it('should call postOrder', () => {
      wrapper.instance().setState(mockStateOrder)
      wrapper.instance().handleSubmit(mockEvent)
      expect(postOrder).toHaveBeenCalledWith(mockStateOrder)
    })
    it('should call setOrder', () => {
      wrapper.instance().setState(mockStateOrder)
      wrapper.instance().handleSubmit(mockEvent)
      expect(actions.setOrder).toHaveBeenCalledWith(mockOrder)
    })
    it('should call clearInputs', () => {
      wrapper.instance().clearInputs = jest.fn()
      wrapper.instance().forceUpdate()
      wrapper.instance().handleSubmit(mockEvent)
      expect(wrapper.instance.clearInputs).toHaveBeenCalled()
    })
  })
})