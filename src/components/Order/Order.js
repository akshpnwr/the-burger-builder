import React from 'react';
import classes from './Order.css';

const order = (props) => {
  const ingredientsList = Object.keys(props.ingredients)
    .map((key) => `${key} : ${props.ingredients[key]}`)
    .join(' ');

  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredientsList}</p>
      <p>
        Price : <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default order;
