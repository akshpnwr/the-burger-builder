import axios from '../../../axios-orders';
import React, { Component } from 'react';
import Order from '../../../components/Order/Order';
import Spinner from '../../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  };

  componentDidMount() {
    axios
      .get('/orders.json')
      .then((res) => {
        console.log(res.data);
        this.setState({
          loading: false,
          orders: Object.keys(res.data).map((key) => {
            return {
              ...res.data[key],
              id: key,
            };
          }),
        });
      })
      .catch((err) => {
        this.setState({
          loading: false,
        });
      });
  }

  render() {
    console.log(this.state.orders);
    let orders = this.state.orders.map((order, i) => (
      <Order
        key={order.id}
        ingredients={order.ingredients}
        price={order.price}
      />
    ));

    if (this.state.loading) orders = <Spinner />;

    return <div>{orders}</div>;
  }
}

export default withErrorHandler(Orders, axios);
