import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";

import classes from "./NavigationItems.module.css";

const navigationItems = props => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/">Burger Builder</NavigationItem>
    {props.isAuthenticated ? <NavigationItem link="/orders">Orders</NavigationItem> : null}
    {props.isAuthenticated ? 
        <NavigationItem link="/logout">Log out</NavigationItem>:
        <NavigationItem link="/auth">Log In</NavigationItem>}
  </ul>
);

export default navigationItems;
