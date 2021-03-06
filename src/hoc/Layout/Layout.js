import React, { Component } from 'react';
import Aux from '../Auxiliary/Auxiliary';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/Sidedrawer/SideDrawer';

class layout extends Component {
  state = {
    showSideDrawer: false,
  };

  sideDrawerHandler = () => {
    const reverse = !this.state.showSideDrawer;

    this.setState({
      showSideDrawer: reverse,
    });
  };

  render() {
    return (
      <Aux>
        <Toolbar opened={this.sideDrawerHandler} />
        <SideDrawer
          open={this.state.showSideDrawer}
          closed={this.sideDrawerHandler}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

export default layout;
