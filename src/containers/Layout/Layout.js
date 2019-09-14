import React, { Component } from "react";
import { connect } from "react-redux";
import Aux from "../../hocc/Auxx/Auxx";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import classes from "./Layout.module.css";

class Layout extends Component {
  state = {
    showSideDrawer: false
  };

  SideDrawerCloseHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  SideDrawerOpenHandler = () => {
    this.setState({ showSideDrawer: true });
  };

  SideDrawerToggleHandler = () => {
    this.setState(prevState => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };

  render() {
    return (
      <Aux>
        <Toolbar
          drawerToggleClicked={this.SideDrawerToggleHandler}
          isAuth={this.props.isAuthenticated}
        />
        <SideDrawer
          show={this.state.showSideDrawer}
          drawerToggleClicked={this.SideDrawerToggleHandler}
          clicked={this.SideDrawerCloseHandler}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

export default connect(
  mapStateToProps,
  null
)(Layout);
