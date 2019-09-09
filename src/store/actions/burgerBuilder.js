import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';



export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    }
}
export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    }
}
export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENT,
        ingredients: ingredients
    }
}

export const initIngredients = () => {
    return dispatch => {
        axios.get('https://react-burger-builder-3c2a3.firebaseio.com/ingredients.json')
      .then(res => {
        dispatch(setIngredients(res.data))
      })
      .catch(err => {
        dispatch(fetchIngredientsFailed())
      })
    }
}

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}