import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  state = {
    ingredients: {
      salad: 1,
      bacon: 1,
      meat: 1,
      cheese: 1,
    },
  };

  componentDidMount() {
    console.log(this.props);
    // console.log(new URLSearchParams(this.props.location.search).get('bacon'));
    // console.log(new URLSearchParams(this.props.location.search).get('cheese'));
    // console.log(new URLSearchParams(this.props.location.search).get('meat'));

    const urlParams = new URLSearchParams(this.props.location.search);

    // console.log(urlParams.get('bacon'));

    let updatedIng = {};

    Object.keys(this.state.ingredients).forEach((key) => {
      updatedIng[key] = Number(urlParams.get(key));
    });

    this.setState({
      ingredients: updatedIng,
    });
  }

  checkoutCancelHandler = () => {
    console.log('cancelled');
    this.props.history.goBack();
  };

  checkoutContinueHandler = () => {
    console.log('continued');
    this.props.history.push('/checkout/contact-data');
  };

  render() {
    console.log(this.state.ingredients);
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutCancel={this.checkoutCancelHandler}
          checkoutContinue={this.checkoutContinueHandler}
        />
        <Route
          path={`${this.props.match.path}/contact-data`}
          component={ContactData}
        />
      </div>
    );
  }
}

export default Checkout;
