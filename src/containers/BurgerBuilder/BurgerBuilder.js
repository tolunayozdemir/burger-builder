import React, { Component } from "react";
import { connect } from "react-redux";
import Aux from "../../hocc/Auxx/Auxx";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import withErrorHandler from "../../hocc/withErrorHandler/withErrorHandler";
import OrderSum from "../../components/Burger/OrderSum/OrderSum";
import Spinner from "../../components/UI/Spinner/Spinner";
import axios from "../../axios-orders";

import * as actions from "../../store/actions/";

class BurgerBuilder extends Component {
  state = {
    purchasing: false
  };

  componentDidMount() {
    this.props.onInitIngredients();
  }

  updatePurchasable(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((a, b) => {
        return a + b;
      }, 0);

    return sum > 0;
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
    if (this.props.isAuthenticated) {
      this.setState({ purchasing: true });
    } else {
      this.props.onSetAuthRedirectPath('/checkout')
      this.props.history.push('/auth')
    }
  };

  purcahaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push("/checkout");

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
  };

  render() {
    let disabledInfo = { ...this.props.ings };

    // for(let key in disabledInfo){
    //   disabledInfo[key] = disabledInfo[key] === 0;
    // }

    Object.keys(disabledInfo).forEach(igKey => {
      disabledInfo[igKey] = disabledInfo[igKey] === 0;
    });

    let orderSum = null;

    let burger = this.props.error ? (
      <p>Can not access the ingredients</p>
    ) : (
      <Spinner />
    );

    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            addIngredient={this.props.onIngredientAdded}
            removeIngredient={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            price={this.props.price}
            purchasable={this.updatePurchasable(this.props.ings)}
            isAuth={this.props.isAuthenticated}
            ordered={this.purchaseHandler}
          />
        </Aux>
      );

      orderSum = (
        <OrderSum
          ingredients={this.props.ings}
          canceled={this.purcahaseCancelHandler}
          continued={this.purchaseContinueHandler}
          price={this.props.price}
        />
      );
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purcahaseCancelHandler}
        >
          {orderSum}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingName => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: ingName => dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
