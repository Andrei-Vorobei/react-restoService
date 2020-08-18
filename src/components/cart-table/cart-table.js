import React from 'react';
import {connect} from 'react-redux';
import {deleteFromCart, clearCart} from '../../actions';
import WithRestoService from '../hoc';

import './cart-table.scss';

const CartTable = ({items, deleteFromCart, RestoService, clearCart}) => {
	return (
		<>
			<div className="cart__title">Ваш заказ:</div>
			<div className="cart__list">
				{
					items.map(item => {
						const {title, price, url, id, count} = item;
						return (
							<div className="cart__item" key={id}>
								<img src={url} className="cart__item-img" alt={title}></img>
						<div className="cart__item-title">{title} x {count}</div>
								<div className="cart__item-price">{price}$</div>
								<div className="cart__close"
									onClick={() => deleteFromCart(id)}>
										&times;
								</div>
							</div>
						)
					})
				}
			</div>
			<button className = "order"
				onClick = {() => {
					RestoService.setOrder( generateOrder(items));
					clearCart()
				}}>
					Оформить заказ</button>
		</>
	);
};

const generateOrder = (items) => {
	const newOrder = items.map(item => {
		return {
			id: item.id,
			count: item.count
		}
	});

	return newOrder;
}

const mapStateToProps = ({items}) => {
	return {
		items
	}
};

const mapDispatchToProps = {
	deleteFromCart,
	clearCart
}

export default WithRestoService()(connect(mapStateToProps, mapDispatchToProps)(CartTable));