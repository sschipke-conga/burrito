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
    wrapper = shallow(<OrderForm />)
  })
  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot()
  })
  describe('handleNameChange', () => {
    const mockEvent = {target:{name:'name', value:'Steve'}, preventDefault: jest.fn()}
    it('should set the state if if there is a change', () => {
      expect(wrapper.state('name')).toEqual('')
      wrapper.find('input').simulate('change', mockEvent)
      expect(wrapper.state('name')).toEqual('Steve')
    })
  })
})