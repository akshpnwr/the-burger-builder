import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.7,
  meat: 1.3,
  cheese: 0.4,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 4,
    purchasing: false,
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
    this.setState({ purchasing: true });
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients,
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    return (
      <Aux>
        <Modal show={this.state.purchasing}>
          <OrderSummary ingredients={this.state.ingredients} />
        </Modal>

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
  }
}

export default BurgerBuilder;
