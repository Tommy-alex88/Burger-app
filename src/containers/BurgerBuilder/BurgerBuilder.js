import React, { Component } from 'react'
import { connect } from 'react-redux';

import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import * as burgerBuilderActons from '../../store/actions/index';
import withErrorHandler from '../../hoc/withErrorHandler';
import axios from '../../axios-orders';

class BurgerBuilder extends Component {
    state = {
        purchasable: false,
        purchasing: false
    }

    componentDidMount() {
        console.log(this.props);
        this.props.onInitIngredients();
    }


    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0;
    }

    // addIngredientHandler = (type) => {
    //     const oldCount = this.props.ingr[type];
    //     const updatedCount = oldCount + 1;
    //     const updatedIngredients = {
    //         ...this.props.ingr
    //     };
    //     updatedIngredients[type] = updatedCount;
    //     const priceAddition = INGREDIENT_PRICES[type];
    //     const oldPrice = this.props.prc;
    //     const newPrice = oldPrice + priceAddition;
    //     //this.setState({ingredients:updatedIngredients, totalPrice: newPrice });
    //     this.props.addIngredient(updatedIngredients, newPrice);
    //     this.updatePurchaseState(updatedIngredients);
    // }

    // removeIngredientHandler = (type) => {
    //     const oldCount = this.props.ingr[type];
    //     if (oldCount <= 0) {
    //         return;
    //     }
    //     const updatedCount = oldCount - 1;
    //     const updatedIngredients = {
    //         ...this.props.ingr
    //     };
    //     updatedIngredients[type] = updatedCount;
    //     const priceDeduction = INGREDIENT_PRICES[type];
    //     const oldPrice = this.props.prc;
    //     const newPrice = oldPrice - priceDeduction;
    //     //this.setState({ingredients:updatedIngredients, totalPrice: newPrice });
    //     this.props.removeIngredient(updatedIngredients, newPrice);
    //     this.updatePurchaseState(updatedIngredients);
    // }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        // const queryParams = [];
        // for (let i in this.state.ingredients) {
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        // }
        // queryParams.push('price=' + this.state.totalPrice);
        // const queryString = queryParams.join('&');
        this.props.onInitPurchase();
        this.props.history.push('/checkout');         // search: '?' + queryString
    }

    render() {
        const disabledInfo = { ...this.props.ingr };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let burger = this.props.error ? <p>Ingredients can't be loaded</p> : <Burger ingredients={this.props.ingr} />
        return (
            <Auxiliary>
                <Modal
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}
                    purchaseCancelled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler} >
                    <OrderSummary
                        ingredients={this.props.ingr}
                        price={this.props.prc}
                    />
                </Modal>
                {burger}
                <BuildControls
                    ingredientAdded={this.props.onIngredientAdded}
                    ingredientRemoved={this.props.onIngredientRemoved}
                    disabled={disabledInfo}
                    purchasable={this.updatePurchaseState(this.props.ingr)}
                    totalPrice={this.props.prc}
                    ordered={this.purchaseHandler} />
            </Auxiliary>
        )
    }
}

const mapStateToProps = state => {
    return {
        ingr: state.burgerBuilder.ingredients,
        prc: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingrName) => dispatch(burgerBuilderActons.addIngredient(ingrName)),
        onIngredientRemoved: (ingrName) => dispatch(burgerBuilderActons.removeIngredient(ingrName)),
        onInitIngredients: () => dispatch(burgerBuilderActons.initIngredients()),
        onInitPurchase: () => dispatch(burgerBuilderActons.purchaseInit())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));