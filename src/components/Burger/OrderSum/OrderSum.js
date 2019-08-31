import React, { Component } from 'react';
import Aux from '../../../hocc/Auxx/Auxx';
import Button from '../../UI/Button/Button';

class OrderSum extends Component {
    
    

    render(){

        const ingredientSum = Object.keys(this.props.ingredients).map(igKey => {
            return (<li key= {igKey}><span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}</li>)
        })
        
        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientSum}
                </ul>
                <p><strong>Total price: {this.props.price.toFixed(2)}$</strong></p>
                <p>Continue to checkout?</p>
                <Button btnType= "Danger" clicked= {this.props.canceled}>CANCEL</Button>
                <Button btnType= "Success" clicked ={this.props.continued}>CONTINUE</Button>
            </Aux>
        )
    }

}

export default OrderSum;