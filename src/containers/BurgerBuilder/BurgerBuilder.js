import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../../hocc/Auxx/Auxx';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import withErrorHandler from '../../hocc/withErrorHandler/withErrorHandler';
import OrderSum from '../../components/Burger/OrderSum/OrderSum';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import * as actionTypes from '../../store/actions';


class BurgerBuilder extends Component {

  state = {
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false,
  }

  componentDidMount () {
    // axios.get('https://react-burger-builder-3c2a3.firebaseio.com/ingredients.json')
    //   .then(res => {
    //     this.setState({ingredients: res.data})
    //   })
    //   .catch(err => {
    //     this.setState({
    //       error: true
    //     })
    //   })
  }

  updatePurchasable (ingredients) {

    const sum = Object.keys(ingredients).map(igKey => {
      return ingredients[igKey]
    }).reduce((a, b)=> {
      return a+b
    },0)

    return sum > 0
  }

  // addIngredientHandler = (type) => {
  //   if(this.state.ingredients[type] > 3) return;

  //   const newCount = this.state.ingredients[type] + 1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients
  //   }
  //   updatedIngredients[type] = newCount;

  //   const newPrice = this.state.totalPrice + INGREDIENT_PRICE[type];

  //   this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
  //   this.updatePurchasable(updatedIngredients)


  // }

  // removeIngredientHandler = (type) => {
  //   if(this.state.ingredients[type] <= 0) return;

  //   const newCount = this.state.ingredients[type] - 1;
  //   const updatedIngredients = {
  //     ...this.state.ingredients
  //   }
  //   updatedIngredients[type] = newCount;

  //   const newPrice = this.state.totalPrice - INGREDIENT_PRICE[type];

  //   this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
    
  //   this.updatePurchasable(updatedIngredients)
  // }

  purchaseHandler = () => {
    this.setState({purchasing: true})
  }

  purcahaseCancelHandler = () => {
    this.setState({purchasing: false})
  }
  
  purchaseContinueHandler = () => {
    this.props.history.push('/checkout')

    //  const queryParams = [];

    // //  for(let i in this.state.ingredients){
    // //    queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
    // //  }
    //  Object.keys(this.state.ingredients).forEach(i => {
    //   queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
    //  })

    //  queryParams.push('price=' + this.state.totalPrice)

    //  const queryString = queryParams.join('&');

    // this.props.history.push({
    //   pathname: '/checkout',
    //   search: '?' + queryString
    // })
  }

  render() {
    
    let disabledInfo = {...this.props.ings};
  
    // for(let key in disabledInfo){
    //   disabledInfo[key] = disabledInfo[key] === 0;
    // }
    
    Object.keys(disabledInfo).forEach((igKey) => {
      disabledInfo[igKey] = disabledInfo[igKey] === 0
    })

    let orderSum = null;
    

    let burger = this.state.error ? <p>Can not access the ingredients</p> : <Spinner />;

    if(this.props.ings){
      burger = 
        <Aux>
          <Burger ingredients = {this.props.ings} />
          <BuildControls addIngredient = {this.props.onIngredientAdded} 
            removeIngredient = {this.props.onIngredientRemoved}
            disabled = {disabledInfo}
            price={this.props.price}
            purchasable = {this.updatePurchasable(this.props.ings)}
            ordered = {this.purchaseHandler}
            />
        </Aux>

        orderSum = <OrderSum 
        ingredients = {this.props.ings} 
        canceled = {this.purcahaseCancelHandler} continued= {this.purchaseContinueHandler}
        price = {this.props.price}/>
    }

    return (
      <Aux>
        <Modal show= {this.state.purchasing} modalClosed = {this.purcahaseCancelHandler}>
          {orderSum}
        </Modal>
        {burger}
      </Aux>
    )
  }

}

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
    onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
