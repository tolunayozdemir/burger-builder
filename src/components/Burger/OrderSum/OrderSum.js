import React from 'react';
import Aux from '../../../hocc/Auxx';

const orderSum = props => {
    
    const ingredientSum = Object.keys(props.ingredients).map(igKey => {
        return (<li key= {igKey}><span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}</li>)
    })

    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSum}
            </ul>
            <p>Continue to checkout?</p>
        </Aux>
    )
}

export default orderSum;