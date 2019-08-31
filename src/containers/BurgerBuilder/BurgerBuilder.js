import React, { Component } from 'react';
import Aux from '../../hocc/Auxx/Auxx';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import withErrorHandler from '../../hocc/withErrorHandler/withErrorHandler';
import OrderSum from '../../components/Burger/OrderSum/OrderSum';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';


const INGREDIENT_PRICE = {
  salad: 1,
  cheese: 2.5,
  meat: 4,
  bacon: 3
}

class BurgerBuilder extends Component {

  state = {
    ingredients: {
      "salad": 0,
      "cheese": 0,
      "meat": 0,
      "bacon": 0  
    },
    totalPrice: 5,
    purchasable: false,
    purchasing: false,
    loading: false,
  }

  updatePurchasable = (ingredients) => {

    const sum = Object.keys(ingredients).map(igKey => {
      return ingredients[igKey]
    }).reduce((a, b)=> {
      return a+b
    },0)

    this.setState({purchasable: sum > 0})
  }

  addIngredientHandler = (type) => {
    if(this.state.ingredients[type] > 3) return;

    const newCount = this.state.ingredients[type] + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    }
    updatedIngredients[type] = newCount;

    const newPrice = this.state.totalPrice + INGREDIENT_PRICE[type];

    this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
    this.updatePurchasable(updatedIngredients)


  }

  removeIngredientHandler = (type) => {
    if(this.state.ingredients[type] <= 0) return;

    const newCount = this.state.ingredients[type] - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    }
    updatedIngredients[type] = newCount;

    const newPrice = this.state.totalPrice - INGREDIENT_PRICE[type];

    this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
    
    this.updatePurchasable(updatedIngredients)
  }

  purchaseHandler = () => {
    this.setState({purchasing: true})
  }

  purcahaseCancelHandler = () => {
    this.setState({purchasing: false})
  }
  
  purchaseContinueHandler = () => {
    this.setState( {loading: true} )
    const order = {
      ingredients: this.state.ingredients,
      price: this.totalPrice,
      customer: {
        name: 'Tolunay',
        address: {
          street: 'test street',
          countr: 'Turkey'

        },
        email: 'test@test.com'
      },
      deliveryMethod: 'fastest'
    }
    axios.post('/orders.json', order)
      .then(response => {
        this.setState({loading: false, purchasing: false})
      })
      .catch(err =>{
        this.setState({loading: false, purchasing: false})
      })
  }

  render() {
    
    const disabledInfo = {...this.state.ingredients};
  
    for(let key in disabledInfo){
      disabledInfo[key] = disabledInfo[key] === 0;
    }

    
    let orderSum = <OrderSum 
      ingredients = {this.state.ingredients} 
      canceled = {this.purcahaseCancelHandler} continued= {this.purchaseContinueHandler}
      price = {this.state.totalPrice}/>
    
    if(this.state.loading){
      orderSum = <Spinner />
    }

    return (
      <Aux>
        <Modal show= {this.state.purchasing} modalClosed = {this.purcahaseCancelHandler}>
          {orderSum}
        </Modal>
        <Burger ingredients = {this.state.ingredients} />
        <BuildControls addIngredient = {this.addIngredientHandler} 
          removeIngredient = {this.removeIngredientHandler}
          disabled = {disabledInfo}
          price={this.state.totalPrice}
          purchasable = {this.state.purchasable}
          ordered = {this.purchaseHandler}
          />
      </Aux>
    )
  }

}

export default withErrorHandler(BurgerBuilder, axios);
