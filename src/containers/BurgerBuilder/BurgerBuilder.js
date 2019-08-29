import React, { Component } from 'react';
import Aux from '../../hocc/Auxx';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

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
  }



  render() {

    const disabledInfo = {...this.state.ingredients};

    for(let key in disabledInfo){
      disabledInfo[key] = disabledInfo[key] === 0;
    }

    return (
      <Aux>
        <Burger ingredients = {this.state.ingredients} />
        <BuildControls addIngredient = {this.addIngredientHandler} 
          removeIngredient = {this.removeIngredientHandler}
          disabled = {disabledInfo}
          price={this.state.totalPrice} />
      </Aux>
    )
  }

}

export default BurgerBuilder;
