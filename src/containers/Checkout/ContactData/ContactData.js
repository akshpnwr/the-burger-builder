import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name',
        },
        value: '',
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'street',
        },
        value: '',
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'ZIP Code',
        },
        value: '',
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country',
        },
        value: '',
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your e-mail',
        },
        value: '',
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' },
          ],
        },
        value: '',
      },
    },
    loading: false,
  };

  orderHandler = (e) => {
    e.preventDefault();

    this.setState({
      loading: true,
    });

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      customer: {
        name: 'Akash',
        address: {
          street: 'tilwari road',
          zipcode: 248197,
          country: 'India',
        },
        email: 'test@test.com',
      },
      deliveryMethod: 'fastest',
    };
    axios
      .post(`/orders.json`, order)
      .then((res) => {
        this.setState({
          loading: false,
        });
        this.props.history.push('/');
      })
      .catch((err) => {
        this.setState({
          loading: false,
        });
      });
  };

  inputChangeHandler = (event, inputIdentifier) => {
    const updatedForm = { ...this.state.orderForm };

    const updatedFormElement = { ...updatedForm[inputIdentifier] };

    updatedFormElement.value = event.target.value;

    updatedForm[inputIdentifier] = { ...updatedFormElement };

    console.log(updatedFormElement);

    this.setState({ orderForm: updatedForm });
    // console.log(event.target.placeholder);

    // const ele = this.state.orderForm.find(
    //   (element) =>
    //     element.elementConfig.placeholder === event.target.placeholder
    // );

    // console.log(Object.keys(this.state.orderForm));

    // Object.keys(this.state.orderForm).forEach((key) => {
    //   const orderForm = { ...this.state.orderForm };
    //   if (orderForm[key].elementConfig.placeholder === event.target.placeholder)
    //     orderForm[key].value = event.target.value;

    //   this.setState({
    //     orderForm: orderForm,
    //   });
    // });
    // console.log(ele);
  };

  render() {
    const formElementsArray = Object.keys(this.state.orderForm).map((key) => {
      return {
        id: key,
        config: this.state.orderForm[key],
      };
    });

    let form = (
      <form>
        <h1>Enter your contact data : </h1>
        {formElementsArray.map((formElement) => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            changed={(event) => this.inputChangeHandler(event, formElement.id)}
          />
        ))}
        <Button type="Success" clicked={this.orderHandler}>
          ORDER
        </Button>
      </form>
    );

    if (this.state.loading) form = <Spinner />;

    return <div className={classes.ContactData}>{form}</div>;
  }
}

export default ContactData;
