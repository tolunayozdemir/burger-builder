import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {

    const transformedIngredint= Object.keys(props.ingredients).map(igKey => {
        return [...Array(props.ingredients[igKey])].map((_,i) => {
            return <BurgerIngredient type = {igKey} key={igKey + i} />
        })
    })
   
    
    
    console.log(transformedIngredint);
    

    return (
    <div className={classes.Burger}>
        <BurgerIngredient type="bread-top"/>
        {transformedIngredint}
        <BurgerIngredient type="bread-bottom"/>
    </div>
    )
}

export default burger;