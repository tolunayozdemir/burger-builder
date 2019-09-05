import React, {Component} from 'react';

import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component{
    state = {
      // inputChangedHandler = (event, formElementIdentifier) => {
      //   const updatedOrderForm = {...this.state.orderForm};
      //   const updatedFormElement = {...updatedOrderForm[formElementIdentifier]}
  
      //   updatedFormElement.value = event.target.value
      //   updatedOrderForm[formElementIdentifier] = updatedFormElement
      //   this.setState({orderForm: updatedOrderForm})
      // }
        orderForm: {                     
          name: {
            elementType: 'input',
            elementConfig: {
              type: 'text',
              placeholder: 'Your Name'
            },
            value: ''
          },
          email: {
            elementType: 'input',
            elementConfig: {
              type: 'email',
              placeholder: 'Your Email'
            },
            value: ''
          },
          street: {
            elementType: 'input',
            elementConfig: {
              type: 'text',
              placeholder: 'Your Street'
            },
            value: ''
          },
          country: {
            elementType: 'input',
            elementConfig: {
              type: 'text',
              placeholder: 'Your Country'
            },
            value: ''
          },
          zipCode: {
            elementType: 'input',
            elementConfig: {
              type: 'text',
              placeholder: 'ZIP Code'
            },
            value: ''
          },
          deliveryMethod: {
            elementType: 'select',
            elementConfig: {
              options: [
                {value: 'fastest', displayValue: 'Fastest'},
                {value: 'Cheapest', displayValue: 'Cheapest'}
              ]
            },
            value: ''
          }
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();

        const formData = {}
        for (let formElementIdentifier in this.state.orderForm) {
          formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
        }
        console.log(formData);
        

        this.setState( {loading: true} )
        const order = {
          ingredients: this.props.ingredients,
          price: this.props.price,
          orderData: formData
          
        }
        axios.post('/orders.json', order)
          .then(response => {
            this.setState({loading: false})
            this.props.history.push('/')
          })
          .catch(err =>{
            this.setState({loading: false})
          })
    }

    inputChangedHandler = (event, formElementIdentifier) => {
      const updatedOrderForm = {...this.state.orderForm};
      const updatedFormElement = {...updatedOrderForm[formElementIdentifier]}

      updatedFormElement.value = event.target.value
      updatedOrderForm[formElementIdentifier] = updatedFormElement
      this.setState({orderForm: updatedOrderForm})
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
                {formElementsArray.map(formElement => (
                  <Input
                    key = {formElement.id} 
                    elementType = {formElement.config.elementType}
                    elementConfig = {formElement.config.elementConfig}
                    value = {formElement.config.value}
                    changed = {(event) => this.inputChangedHandler(event, formElement.id)}  />
                ))}
                <Button btnType='Success'>Order</Button>
            </form>
      );

      if(this.state.loading){
        form = <Spinner />
      }

      return (
        <div className = {classes.ContactData}>
            <h4>Enter your contact data</h4>
            {form}
        </div>
        )
    }
}

export default ContactData;