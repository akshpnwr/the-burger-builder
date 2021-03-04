import React, { Component } from 'react';
import classes from './BurgerIngredient.css';
import PropTypes from 'prop-types';

class BurgerIngredient extends Component {
  ingredient = null;

  render() {
    switch (this.props.type) {
      case 'bread-bottom':
        this.ingredient = <div className={classes.BreadBottom}></div>;
        break;

      case 'bread-top':
        this.ingredient = (
          <div className={classes.BreadTop}>
            <div className={classes.Seeds1}></div>
            <div className={classes.Seeds2}></div>
          </div>
        );
        break;

      case 'meat':
        this.ingredient = <div className={classes.Meat}></div>;
        break;

      case 'cheese':
        this.ingredient = <div className={classes.Cheese}></div>;
        break;

      case 'salod':
        this.ingredient = <div className={classes.Salod}></div>;
        break;

      case 'bacon':
        this.ingredient = <div className={classes.Bacon}></div>;
        break;

      default:
        break;
    }

    return this.ingredient;
  }
}

BurgerIngredient.propTypes = {
  type: PropTypes.string.isRequired,
};

export default BurgerIngredient;
