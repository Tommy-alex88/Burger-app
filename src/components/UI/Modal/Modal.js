import React, { Component } from 'react';

import classes from './Modal.module.css';
import Auxiliary from '../../../hoc/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';
import Button from '../../UI/Button/Button';

class Modal extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show;
    };

    componentDidUpdate() {
        console.log('Modal rendered');
    }

    render() {
        return (
            <Auxiliary>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
                <div
                    className={classes.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}>
                    {this.props.children}
                    <Button btnType={'Danger'} clicked={this.props.purchaseCancelled}>CANCEL</Button>
                    <Button btnType={'Success'} clicked={this.props.purchaseContinued}>CONTINUE</Button>
                </div>
            </Auxiliary>
        );
    }
}

export default Modal;