import React, { Component } from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
  componentDidUpdate() {
    console.log('[OrderSummary] willUpdate');
  }

  render() {
    const ingredients = Object.keys(this.props.ingredients).map((key) => {
      return (
        <li key={key}>
          <span style={{ textTransform: 'capitalize' }}>{key}</span> :{' '}
          {this.props.ingredients[key]}
        </li>
      );
    });

    return (
      <Aux>
        <h3>Your order : </h3>
        <p>A delicious burger with the following ingredients : </p>
        <ul>{ingredients}</ul>
        <h3>Price : {this.props.price}</h3>
        <p>Continue to checkout : </p>
        <Button type={'Danger'} clicked={this.props.cancel}>
          Cancel
        </Button>
        <Button type={'Success'} clicked={this.props.continue}>
          Continue
        </Button>
      </Aux>
    );
  }
}

export default OrderSummary;
