import React from 'react';
import Aux from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
  const ingredients = Object.keys(props.ingredients).map((key) => {
    return (
      <li key={key}>
        <span style={{ textTransform: 'capitalize' }}>{key}</span> :{' '}
        {props.ingredients[key]}
      </li>
    );
  });

  return (
    <Aux>
      <h3>Your order : </h3>
      <p>A delicious burger with the following ingredients : </p>
      <ul>{ingredients}</ul>
      <h3>Price : {props.price}</h3>
      <p>Continue to checkout : </p>
      <Button type={'Danger'} clicked={props.cancel}>
        Cancel
      </Button>
      <Button type={'Success'} clicked={props.continue}>
        Continue
      </Button>
    </Aux>
  );
};

export default orderSummary;
