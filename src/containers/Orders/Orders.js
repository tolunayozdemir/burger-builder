import React from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';

class Orders extends React.Component{
    
    state = {
        orders: [],
        loading: true
    }

    componentDidMount(){
        axios.get('https://react-burger-builder-3c2a3.firebaseio.com/orders.json')
            .then(res => {
                const fetchedOrders = []
                for(let key in res.data){
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    })
                }
                this.setState({orders: fetchedOrders, loading: false})
            })
    }
    render(){
        return (
            <div>
                {this.state.orders.map(order => (
                    <Order key = {order.id }
                        ingredients = {order.ingredients}
                        price= {order.price} />
                ))}
            </div>
        )
    }
}

export default Orders;