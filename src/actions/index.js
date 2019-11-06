export const setOrders = orders => ({
  type: 'SET_ORDERS',
  orders
});

export const setOrder = order => ({
  type: 'SET_ORDER',
  order
})

export const deleteOrder = id => ({
  type: 'DELETE_ORDER',
  id
})