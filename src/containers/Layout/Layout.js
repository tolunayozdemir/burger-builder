import React, {Component} from 'react';
import Aux from '../../hocc/Auxx/Auxx';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import classes from './Layout.module.css'

class Layout extends Component {

  state = {
    showSideDrawer: false
  }

  SideDrawerCloseHandler = () => {
    this.setState({showSideDrawer: false})
  }

  SideDrawerOpenHandler = () => {
    this.setState({showSideDrawer: true})
  }

  SideDrawerToggleHandler = () => {
    this.setState(prevState => {
      return {showSideDrawer: !prevState.showSideDrawer}
    })
  }

  render(){
    return(
      <Aux>
        <Toolbar drawerToggleClicked = {this.SideDrawerToggleHandler} />
        <SideDrawer show= {this.state.showSideDrawer} clicked = {this.SideDrawerCloseHandler} />
        <main className = {classes.Content}>
          {this.props.children}
        </main>
      </Aux>
    )
  }
}

export default Layout;
