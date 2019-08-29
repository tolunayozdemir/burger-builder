import React from 'react';
import BuildControl from './BuildControl/BuildControl'
import classes from './BuildControls.module.css';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'},
]

const buildControls = (props) => {
    
    return(
    <div className = {classes.BuildControls}>
        
        <p>Current Price: {props.price.toFixed(2)}$</p>

        {controls.map(ctrl => {
            return <BuildControl 
                key = {ctrl.label} 
                type = {ctrl.type} 
                label = {ctrl.label} 
                added = {() => props.addIngredient(ctrl.type)}
                removed = {() => props.removeIngredient(ctrl.type)}
                disable = {props.disabled[ctrl.type]}
                />
        })}
    </div>
    )
    

}

export default buildControls;