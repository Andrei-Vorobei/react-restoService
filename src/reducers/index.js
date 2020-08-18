const initialState = {
	menu: [],
	loading: true,
	error: false,
	items: [],
	totalPrice: 0
}

const reducer = (state = initialState, action) => {
	console.log(state);
	switch (action.type) {
		case 'MENU_LOADED':
			return {
				...state,
				menu: action.payload,
				loading: false
			};

		case 'MENU_REQUESTED':
			return {
				...state,
				loading: true
			};

		case 'CLEAR_CART':
			return {
				...state,
				items: [],
				totalPrice: 0
			};

		case 'MENU_ERROR':
			return {
			...state,
			loading: true,
			error: true
		};

		case 'ITEM_ADD_TO_CART':
			const id = action.payload;
			const itemInCart = state.items.find(item => item.id === id)

			if (!itemInCart) {
				const itemToCart = state.menu.find(item => item.id === id);

				const newItem = {
					...itemToCart,
					count: 1
				}

				return {
					...state,
					items: [
						...state.items,
						newItem
					],
					totalPrice: state.totalPrice + itemToCart.price
				};
			} else {
				const newItems = state.items.map(item => {
					if (item.id === id) {
						item.count += 1;
					}
					return item;
				});
				
				return {
					...state,
					items: [
						...newItems
					],
					totalPrice: state.totalPrice + itemInCart.price
				};
			}

		case 'ITEM_REMOVE_FROM_CART':
			const key = action.payload;
			const itemIndex = state.items.findIndex(item => item.id === key);
			const price = state.items[itemIndex].price;
			
			if (state.items[itemIndex].count === 1) {
				const newItems = state.items.filter((item, i) => {
					return itemIndex !== i;
				});
				return {
					...state,
					items: [
						...newItems
					],
					totalPrice: state.totalPrice - price
				};
			} else {
				const newItems = state.items.map(item => {
					if (item.id === key) {
						item.count -= 1;
					}
					return item;
				});

				return {
					...state,
					items: [
						...newItems
					],
					totalPrice: state.totalPrice - price
				};
			}

		default: 
			return state;
	}
}

export default reducer;