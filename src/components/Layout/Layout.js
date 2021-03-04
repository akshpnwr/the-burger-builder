import React from 'react';
import Aux from '../../hoc/Auxiliary';
import classes from './Layout.css';

const layout = (props) => (
  <Aux>
    <div>Toolbar, SideDrawer and Backdrop</div>
    <main className={classes.content}>{props.children}</main>
  </Aux>
);

export default layout;
