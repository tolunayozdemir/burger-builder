import React from 'react';
import Aux from '../../hocc/Auxx';
import Toolbar from '../Navigation/Toolbar/Toolbar'
import classes from './Layout.module.css'

const layout = (props) => {
  
  return(
    <Aux>
      <Toolbar />
      <main className = {classes.Content}>
        {props.children}
      </main>
    </Aux>
  )
}

export default layout;
