import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Aux from '../../../hocc/Auxx/Auxx';
import Backdrop from '../../UI/Backdrop/Backdrop';

import classes from './SideDrawer.module.css';

const sideDrawer = (props) => {

    let attachedClass = [classes.SideDrawer, classes.Close];
    if(props.show){
        attachedClass = [classes.SideDrawer, classes.Open];
    }
    
    return (
        <Aux>
            <Backdrop show={props.show} clicked = {props.clicked} />
            <div className = {attachedClass.join(' ')}>
                <div className = {classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Aux>
    )
}

export default sideDrawer;