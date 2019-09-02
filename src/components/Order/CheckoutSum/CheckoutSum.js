import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

import classes from './CheckoutSum.module.css';

const checkoutSum = (props) => {
    return (
        <div className={classes.CheckoutSum}>
            <h1>We hope it tastes well!</h1>
            <Burger ingredients ={props.ingredients}/>
            <Button btnType='Danger' clicked={props.checkoutCancelled}>Cancel</Button>
            <Button btnType='Success' clicked={props.checkoutContinued}>Continue</Button>
        </div>
    )
}

export default checkoutSum;