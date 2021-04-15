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
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'street',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'ZIP Code',
        },
        value: '',
        validation: {
          required: true,
          minLength: 6,
          maxLength: 6,
        },
        valid: false,
        touched: false,
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your e-mail',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' },
          ],
        },
        validation: {
          required: false,
        },
        value: '',
        valid: true,
      },
    },
    formIsValid: false,
    loading: false,
  };

  orderHandler = (e) => {
    e.preventDefault();

    this.setState({
      loading: true,
    });

    const formData = {};

    Object.keys(this.state.orderForm).forEach((key) => {
      formData[key] = this.state.orderForm[key].value;
    });

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      orderData: formData,
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

  checkValidity = (value, rules) => {
    let isValid = false;
    if (rules.required) isValid = value.trim() !== '';

    if (!isValid) return isValid;

    if (rules.minLength) isValid = value.length >= rules.minLength;

    if (!isValid) return isValid;

    if (rules.maxLength) isValid = value.length <= rules.maxLength;

    return isValid;
  };

  inputChangeHandler = (event, inputIdentifier) => {
    const updatedForm = { ...this.state.orderForm };

    const updatedFormElement = { ...updatedForm[inputIdentifier] };

    updatedFormElement.touched = true;
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );

    updatedForm[inputIdentifier] = { ...updatedFormElement };

    let formIsValid = true;

    Object.keys(updatedForm).forEach((inputIdentifier) => {
      formIsValid = updatedForm[inputIdentifier].valid && formIsValid;
    });

    console.log(formIsValid);
    this.setState({ orderForm: updatedForm, formIsValid: formIsValid });
  };

  render() {
    const formElementsArray = Object.keys(this.state.orderForm).map((key) => {
      return {
        id: key,
        config: this.state.orderForm[key],
      };
    });

    let form = (
      <form onSubmit={this.orderHandler}>
        <h1>Enter your contact data : </h1>
        {formElementsArray.map((formElement) => {
          return (
            <Input
              key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              changed={(event) =>
                this.inputChangeHandler(event, formElement.id)
              }
              valid={formElement.config.valid}
              shouldValidate={formElement.config.validation}
              touched={formElement.config.touched}
            />
          );
        })}
        <Button type="Success" disabled={!this.state.formIsValid}>
          ORDER
        </Button>
      </form>
    );

    if (this.state.loading) form = <Spinner />;

    return <div className={classes.ContactData}>{form}</div>;
  }
}

export default ContactData;
