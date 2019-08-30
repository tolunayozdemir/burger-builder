import React from 'react';
import burgerLogo from '../../assest/images/burger-logo.png';

import classes from './Logo.module.css'

const logo = () => {
    return(
        <div className ={classes.Logo}>
            <img src= {burgerLogo} alt= "MyBurger" />
        </div>
    )
}

export default logo;