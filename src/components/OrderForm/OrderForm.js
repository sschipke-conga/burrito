import React, { Component } from 'react';

class OrderForm extends Component {
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

  handleSubmit = e => {
    const {ingredients} = this.state
    e.preventDefault();
    if(!ingredients.length) {
      this.setState({noIngredients: 'You must have at least one ingredient'})
    } else {
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
      <form>
        <input
          type='text'
          placeholder='Name'
          name='name'
          value={this.state.name}
          onChange={e => this.handleNameChange(e)}
        />

        { ingredientButtons }

        <p>Order: { this.state.ingredients.join(', ') || 'Nothing selected' }</p>
        {noIngredients && <p className="no-ingredients">{noIngredients}</p>}

        <button onClick={e => this.handleSubmit(e)}>
          Submit Order
        </button>
      </form>
    )
  }
}

export default OrderForm;