import React, {Component} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setOrders } from '../../actions';
import { getOrders } from '../../apiCalls';

import './Orders.css';


export class Orders extends Component { 

  componentDidMount() {
    getOrders()
      .then(data => this.props.setOrders(data.orders))
      .catch(err => console.error('Error fetching:', err));
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
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Orders);