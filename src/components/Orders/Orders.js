import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setOrders, deleteOrder } from '../../actions';
import { getOrders, removeOrder } from '../../apiCalls';

import './Orders.css';


export class Orders extends Component { 

  componentDidMount() {
    getOrders()
      .then(data => this.props.setOrders(data.orders))
      .catch(err => console.error('Error fetching:', err));
  }

  getRidOfOrder = e => {
    const selectedId = parseInt(e.target.id)
    removeOrder(selectedId)
    this.props.deleteOrder(selectedId)
  }



    render() {
      const orderEls = this.props.orders.map((order, i) => {
        return (
          <div key={i} className="order">
            <h3>{order.name}</h3>
            <ul className="ingredient-list">
              {order.ingredients.map((ingredient, i) => {
                return <li key={i}>{ingredient}</li>
              })}
            </ul>
            <button id={order.id} onClick={this.getRidOfOrder}>Remove Order</button>
          </div>
        )
      });
    return (
      <section>
        { orderEls.length ? orderEls : <p>No orders yet!</p> }
      </section>
    )
  }
}

export const mapStateToProps = ({ orders }) => ({
  orders
});

export const mapDispatchToProps = dispatch => (
  bindActionCreators({
    setOrders,
    deleteOrder
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Orders);