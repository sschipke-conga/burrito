export const getOrders = () => {
  return fetch('http://localhost:3001/api/v1/orders')
      .then(response => response.json())
}

export const postOrder = async (order) => {
  const options = {
    method: 'POST',
    body: JSON.stringify(order),
    headers: {
      'Content-Type': 'application/json'
    }
  };

  let res = await fetch('http://localhost:3001/api/v1/orders', options)
  return res.json()
}

export const removeOrder = async id => {
  const options = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  }
  fetch(`http://localhost:3001/api/v1/orders/${id}`, options)
}