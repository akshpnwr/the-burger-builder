import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  state = {
    ingredients: {
      salad: 1,
      cheese: 1,
      meat: 1,
      bacon: 1,
    },
    totalPrice: null,
  };

  componentWillMount() {
    const urlParams = new URLSearchParams(this.props.location.search);

    const price = Number(urlParams.get('price'));

    let updatedIng = {};

    Object.keys(this.state.ingredients).forEach((key) => {
      updatedIng[key] = Number(urlParams.get(key));
    });

    this.setState({
      ingredients: updatedIng,
      totalPrice: price,
    });
  }

  checkoutCancelHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinueHandler = () => {
    this.props.history.push('/checkout/contact-data');
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutCancel={this.checkoutCancelHandler}
          checkoutContinue={this.checkoutContinueHandler}
        />
        <Route
          path={`${this.props.match.path}/contact-data`}
          component={(props) => (
            <ContactData
              ingredients={this.state.ingredients}
              totalPrice={this.state.totalPrice}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}

export default Checkout;
