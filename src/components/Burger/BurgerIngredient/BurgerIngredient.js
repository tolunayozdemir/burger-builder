import React from 'react';
import classes from './burgerIngredient.module.css';
import PropTypes from 'prop-types'

const burgerIngredient = (props) => {
  let ingredient = null;
  
  switch(props.type){
    case 'bread-bottom':
      ingredient = <div className = {classes.BreadBottom}></div>
      break;
    case 'bread-top':
      ingredient = (
        <div className = {classes.BreadTop}>
          <div className = {classes.Seeds1}></div>
          <div className = {classes.Seeds2}></div>
        </div>
      )
      break;
    case 'cheese':
      ingredint = <div className = {classes.Cheese}></div>
      break;
    case 'meat':
      ingredint = <div className = {classes.Meat}></div>
      break;
    case 'salad':
      ingredint = <div className = {classes.Salad}></div>
      break;
    case 'bacon':
      ingredint = <div className = {classes.Bacon}></div>
      break;
    default:
      ingredient = null;
  }
  return ingredint;
}

burgerIngredient.propTypes = {
  type: propTypes.string.isRequired //prop types validation
}

export default burgerIngredient;
