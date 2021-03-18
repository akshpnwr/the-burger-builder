import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.css';
import { Link } from 'react-router-dom';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' },
  { label: 'Bacon', type: 'bacon' },
];

const buildControls = (props) => {
  const transformedControls = controls.map((control) => {
    return (
      <BuildControl
        label={control.label}
        key={control.label}
        type
        addClick={() => props.ingredientAdded(control.type)}
        removeClick={() => props.ingredientRemoved(control.type)}
        disabled={props.disabledInfo[control.type]}
      />
    );
  });

  return (
    <div className={classes.BuildControls}>
      <p>
        Current price : <strong>{props.price.toFixed(2)}</strong>
      </p>
      {transformedControls}
      <button
        disabled={props.price === 4}
        className={classes.OrderButton}
        onClick={props.ordered}
      >
        ORDER NOW
      </button>
    </div>
  );
};

export default buildControls;
