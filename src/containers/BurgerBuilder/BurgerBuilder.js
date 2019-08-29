import React, { Component } from 'react';
import Aux from '../../hocc/Auxx';
import Burger from '../../components/Burger/Burger';

class BurgerBuilder extends Component {

  state = {
    ingredients: {
      "salad": 3,
      "cheese": 1,
      "meat": 2,
      "bacon": 1
    }
  }
  render() {
    return (
      <Aux>
        <Burger ingredients = {this.state.ingredients} />
        <div>BuildControls</div>
      </Aux>
    )
  }

}

export default BurgerBuilder;
