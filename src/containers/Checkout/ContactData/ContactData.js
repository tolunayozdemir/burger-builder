import React, {Component} from 'react';

import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hocc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/';

class ContactData extends Component{
    state = {
        orderForm: {                     
          name: {
            elementType: 'input',
            elementConfig: {
              type: 'text',
              placeholder: 'Your Name'
            },
            value: '',
            validation: {
              required: true
            },
            touched: false,
            valid: false
          },
          email: {
            elementType: 'input',
            elementConfig: {
              type: 'email',
              placeholder: 'Your Email'
            },
            value: '',
            validation: {
              required: true
            },
            touched: false,
            valid: false
          },
          street: {
            elementType: 'input',
            elementConfig: {
              type: 'text',
              placeholder: 'Your Street'
            },
            value: '',
            validation: {
              required: true
            },
            touched: false,
            valid: false
          },
          country: {
            elementType: 'input',
            elementConfig: {
              type: 'text',
              placeholder: 'Your Country'
            },
            value: '',
            validation: {
              required: true
            },
            touched: false,
            valid: false
          },
          zipCode: {
            elementType: 'input',
            elementConfig: {
              type: 'text',
              placeholder: 'ZIP Code'
            },
            value: '',
            validation: {
              required: true,
              minLength: 5,
              maxLength: 5
            },
            touched: false,
            valid: false
          },
          deliveryMethod: {
            elementType: 'select',
            elementConfig: {
              options: [
                {value: 'fastest', displayValue: 'Fastest'},
                {value: 'Cheapest', displayValue: 'Cheapest'}
              ]
            },
            value: 'fastest',
            validation : {},
            valid: true,
            touched: true
          }
        },
        formIsValid: false
    }

    checkValidity(value, rules) {
      let isValid = true;
      
      if(rules.required){
        isValid = value.trim() !== '' && isValid
      }

      if(rules.minLength) {
        isValid = value.length >= rules.minLength && isValid
      }
      if(rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid
      }
      return isValid;
    }

    orderHandler = (event) => {
        event.preventDefault();

        const formData = {}
        for (let formElementIdentifier in this.state.orderForm) {
          formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
        }

        const order = {
          ingredients: this.props.ings,
          price: this.props.price,
          orderData: formData
        }
        this.props.onOrderBurger(order);
    }

    inputChangedHandler = (event, formElementIdentifier) => {
      const updatedOrderForm = {...this.state.orderForm};
      const updatedFormElement = {...updatedOrderForm[formElementIdentifier]}

      updatedFormElement.value = event.target.value
      updatedFormElement.touched = true
      updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
      updatedOrderForm[formElementIdentifier] = updatedFormElement

      let formIsValid = true;
      for(let formElementIdentifier in updatedOrderForm) {
        formIsValid = updatedOrderForm[formElementIdentifier].valid && formIsValid
      }
      
      this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid})
    }

    render() {

      const formElementsArray = [];
      for(let key in this.state.orderForm){
        formElementsArray.push(
          {
            id: key,
            config: this.state.orderForm[key]
          }
        )
      }
      
      let form = (
        <form onSubmit = {this.orderHandler}>
        <h4>Enter your contact data</h4>
                {formElementsArray.map(formElement => (
                  <Input
                    key = {formElement.id} 
                    elementType = {formElement.config.elementType}
                    elementConfig = {formElement.config.elementConfig}
                    value = {formElement.config.value}
                    changed = {(event) => this.inputChangedHandler(event, formElement.id)}  
                    invalid = {!formElement.config.valid}
                    shouldValidate = {formElement.config.validation}
                    touched = {formElement.config.touched}/>
                ))}
                <Button btnType='Success' disabled= {!this.state.formIsValid}>Order</Button>
            </form>
      );

      if(this.props.loading){
        form = <Spinner />
      }

      return (
        <div className = {classes.ContactData}>
            
            {form}
        </div>
        )
    }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onOrderBurger: (orderData) => dispatch(actions.purchaseBurger(orderData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));