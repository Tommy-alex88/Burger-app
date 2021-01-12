import React from "react";
import PropTypes from 'prop-types';

import classes from "./BurgerIngredients.module.css";
const burgerIngredient = (props) => {
    let ingredient = null;
    switch (props.type) {
        case ("bred-bottom"):
            ingredient = <div className={classes.BredBottom}></div>;
            break;
        case ("bred-top"):
            ingredient = (
                <div className={classes.BredTop}>
                    <div className={classes.Seeds1}></div>
                    <div className={classes.Seeds2}></div>
                </div>
            );
            break;
        case ('meat'):
            ingredient = <div className={classes.Meat}></div>;
            break;
        case ('cheese'):
            ingredient = <div className={classes.Cheese}></div>;
            break;
        case ('salad'):
            ingredient = <div className={classes.Salad}></div>;
            break;
        case ('bacon'):
            ingredient = <div className={classes.Bacon}></div>;
            break;
        default:
            ingredient = null;
    }
    return ingredient;
};

export default burgerIngredient;

burgerIngredients.propTypes = {
    type: PropTypes.string.isRequired,
}