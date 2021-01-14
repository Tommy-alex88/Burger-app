import React, { Component } from 'react'

import Auxiliary from '../../hoc/Auxiliary';
import BurgerIngredient from '../../components/Burger/BurgerIngredient/BurgerIngredient';

class BurgerBuilder extends Component {
  render() {
    return (
      <Auxiliary>
        <BurgerIngredient className='bred-top' />
        <BurgerIngredient className='cheese' />
        <BurgerIngredient className='meat' />
        <BurgerIngredient className='salad' />
        <BurgerIngredient className='bred-bottom' />
        <div>Build Controls</div>
      </Auxiliary>
    )
  }
}

export default BurgerBuilder;