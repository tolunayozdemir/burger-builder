import React, {Component} from 'react';
import Aux from '../Auxx/Auxx';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = ( WrappedComponent, axios ) => {
    return class extends Component {

        state = {
            error: null
        }

        componentWillMount(){
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null})
                return req
            })
            this.resInterceptor = axios.interceptors.response.use(res => res, err => {
                this.setState({error: err})
            })
        }

        componentDidMount(){
            axios.interceptors.response.eject(this.resInterceptor)
            axios.interceptors.request.eject(this.reqInterceptor)
        }

        errorConfirmedHandler = () => {
            this.setState({error: null})
        }

        render (){
            return (
                <Aux>
                    <Modal show={this.state.error} modalClosed = {this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            )
        }
    } 
        
    
}

export default withErrorHandler;