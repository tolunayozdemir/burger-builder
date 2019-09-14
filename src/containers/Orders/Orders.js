import React from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import { connect } from 'react-redux'
import withErrorHandler from '../../hocc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends React.Component{
    
    componentDidMount(){
        this.props.onFetchOrders(this.props.token)
    }

    render(){
        
        let loading = <Spinner />
        if(!this.props.loading){
            loading = this.props.orders.map(order => (
                <Order key = {order.id }
                    ingredients = {order.ingredients}
                    price= {order.price} />
            ))
        }

        return (
            <div>
                {loading}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token) => dispatch(actions.fetchOrders(token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios)) ;