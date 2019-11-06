import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {setOrder} from '../../actions/index';
import {postOrder} from '../../apiCalls';

export class OrderForm extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      name: '',
      ingredients: [],
      noIngredients: ''
    };
  }

  handleNameChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleIngredientChange = e => {
    e.preventDefault();
    this.setState({ingredients: [...this.state.ingredients, e.target.name]});
  }

  handleSubmit = async e => {
    const {ingredients} = this.state
    e.preventDefault();
    if(!ingredients.length) {
      this.setState({noIngredients: 'You must have at least one ingredient'})
    } else {
    const order = {name: this.state.name, ingredients: this.state.ingredients}
    try {
      let newOrder = await postOrder(order)
      this.props.setOrder(newOrder)
    } catch ({message}) {
      this.setState({noIngredients: message})
    }
      this.clearInputs();
      this.setState({noIngredients: ''})
    }
  }

  clearInputs = () => {
    this.setState({name: '', ingredients: []});
  }

  render() {
    const { noIngredients } = this.state;
    const possibleIngredients = ['beans', 'steak', 'carnitas', 'sofritas', 'lettuce', 'queso fresco', 'pico de gallo', 'hot sauce', 'guacamole', 'jalapenos', 'cilantro', 'sour cream'];
    const ingredientButtons = possibleIngredients.map(ingredient => {
      return (
        <button key={ingredient} name={ingredient} onClick={e => this.handleIngredientChange(e)}>
          {ingredient}
        </button>
      )
    });

    return (
      <form onSubmit={e => this.handleSubmit(e)}>
        <input
          type='text'
          placeholder='Name'
          name='name'
          value={this.state.name}
          onChange={e => this.handleNameChange(e)}
          required
        />

        { ingredientButtons }

        <p>Order: { this.state.ingredients.join(', ') || 'Nothing selected' }</p>
        {noIngredients && <p className="no-ingredients">{noIngredients}</p>}

        <button type="submit">
          Submit Order
        </button>
      </form>
    )
  }
}

export const mapDispatchToProps = dispatch => (
  bindActionCreators({
    setOrder,
  }, dispatch)
);

export default connect(null, mapDispatchToProps)(OrderForm);