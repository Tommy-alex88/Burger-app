import React from 'react';

import classes from './Modal.module.css';
import Auxiliary from '../../../hoc/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';
import Button from '../../UI/Button/Button';

const modal = (props) => {
	return (
		<Auxiliary>
			<Backdrop show={props.show} clicked={props.modalClosed} />
			<div
				className={classes.Modal}
				style={{
					transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
					opacity: props.show ? '1' : '0'
				}}>
				{props.children}
				<Button btnType={'Danger'} clicked={props.purchaseCancelled}>CANCEL</Button>
				<Button btnType={'Success'} clicked={props.purchaseContinued}>CONTINUE</Button>
			</div>
		</Auxiliary>
	);
};

export default modal;