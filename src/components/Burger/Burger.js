import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {

    //transformed ingredient is an array that contains ingredients as arrays
    const transformedIngredient= Object.keys(props.ingredients).map(igKey => {
        return [...Array(props.ingredients[igKey])].map((_,i) => {
            return <BurgerIngredient type = {igKey} key={igKey + i} />                
        })
    })
    //ingredient contains ingredients in an array
    let ingredient = transformedIngredient.reduce((a, b) => {
        return a.concat(b)
    }, [])

    if(!(ingredient.length)) {
        ingredient = <p>Please start adding ingredients!</p>
    }
   
    
    return (
    <div className={classes.Burger}>
        <BurgerIngredient type="bread-top"/>
        {ingredient}
        <BurgerIngredient type="bread-bottom"/>
    </div>
    )
}

export default burger;