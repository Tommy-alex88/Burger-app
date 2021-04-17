import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    orders: [],
    purchased: false,
    loading: false
};


const purcaseInit = (state, action) => {
    return updateObject(state, { purchased: false });
};

const purcaseBurgerStart = (state, action) => {
    return updateObject(state, { loading: true });
};

const purcaseBurgerSuccess = (state, action) => {
    const newOrder = {
        ...action.orderData,
        id: action.orderId
    }
    return updateObject(state, {
        loading: false,
        purchased: true,
        orders: state.orders.concat(newOrder)
    });
};

const purcaseBurgerFail = (state, action) => {
    return updateObject(state, { loading: false });
};

const fetchOrdersStart = (state, action) => {
    return updateObject(state, { loading: true });
};

const fetchOrdersSuccess = (state, action) => {
    return updateObject(state, {
        orders: action.orders,
        loading: false
    });
};

const fetchOrdersFail = (state, action) => {
    return updateObject(state, { loading: false });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT: return purcaseInit(state, action);
        case actionTypes.PURCHASE_BURGER_START: return purcaseBurgerStart(state, action);
        case actionTypes.PURCHASE_BURGER_SUCCESS: return purcaseBurgerSuccess(state, action);
        case actionTypes.PURCHASE_BURGER_FAIL: return purcaseBurgerFail(state, action);
        case actionTypes.FETCH_ORDERS_START: return fetchOrdersStart(state, action);
        case actionTypes.FETCH_ORDERS_SUCCESS: return fetchOrdersSuccess(state, action);
        case actionTypes.FETCH_ORDERS_FAIL: return fetchOrdersFail(state, action);
        default:
            return state;
    }
};

export default reducer;