import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSum from '../../components/Order/CheckoutSum/CheckoutSum';
import ContactData from './ContactData/ContactData';
import * as actions from './../../store/actions/';

class Checkout extends Component {

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    }

    render(){
        let sum = <Redirect to= '/' />
        if(this.props.ings) {
            const purchasedRedirect = this.props.purchased ? <Redirect to= '/' /> : null
            sum = (
                <div>
                {purchasedRedirect}
                    <CheckoutSum 
                        ingredients= {this.props.ings}
                        checkoutCancelled={this.checkoutCancelledHandler}
                        checkoutContinued={this.checkoutContinuedHandler} />
                    <Route 
                        path={this.props.match.path + '/contact-data'} 
                        component= {ContactData}/>
                </div>
            )
        }
        return sum;
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout);