import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.7,
  meat: 1.3,
  cheese: 0.4,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasing: false,
    loading: false,
    error: false,
  };

  addIngredientHandler = (type) => {
    this.operationHandler(type, 'add');
  };

  removeIngredientHandler = (type) => {
    this.operationHandler(type, 'remove');
  };

  operationHandler = (type, operation) => {
    const oldCount = this.state.ingredients[type];

    let updatedCount, newPrice;

    if (operation === 'add') {
      updatedCount = oldCount + 1;
      newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
    }
    if (operation === 'remove') {
      updatedCount = oldCount - 1;
      newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
    }

    const updatedIng = {
      ...this.state.ingredients,
    };

    updatedIng[type] = updatedCount;

    this.setState({
      totalPrice: newPrice,
      ingredients: updatedIng,
    });
  };

  purchaseHandler = () => {
    this.setState({ purchasing: !this.state.purchasing });
  };

  purchaseContinueHandler = () => {
    const queryString =
      '?' +
      Object.keys(this.state.ingredients)
        .map(
          (key) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(
              this.state.ingredients[key]
            )}`
        )
        .join('&');

    this.props.history.push({
      pathname: '/checkout',
      search: `${queryString}&price=${this.state.totalPrice}`,
    });
  };

  componentDidMount() {
    axios
      .get('/ingredients.json')
      .then((res) => {
        this.setState({
          ingredients: { ...res.data },
        });
      })
      .catch((err) => {
        this.setState({ error: true });
      });
  }

  render() {
    const disabledInfo = {
      ...this.state.ingredients,
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;

    if (this.state.loading) orderSummary = <Spinner />;

    let burger = <Spinner />;
    if (this.state.error) burger = 'Something went wrong';

    if (this.state.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabledInfo={disabledInfo}
            price={this.state.totalPrice}
            ordered={this.purchaseHandler}
          />
        </Aux>
      );

      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          cancel={this.purchaseHandler}
          continue={this.purchaseContinueHandler}
          price={this.state.totalPrice}
        />
      );
    }

    if (this.state.loading) orderSummary = <Spinner />;

    return (
      <Aux>
        <Modal show={this.state.purchasing} ordered={this.purchaseHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
