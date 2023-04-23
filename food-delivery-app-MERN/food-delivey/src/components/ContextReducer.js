import React, { createContext, useContext, useReducer } from 'react';
import { ACTION } from './Card';

const CartStateContext = createContext();
const CartDispatchContext = createContext();

// all the cart options like add, delete and update are defined here
const reducer = (state, action) => {
	switch (action.type) {
		case ACTION.ADD:
			return [...state,{id:action.id, name:action.name, size: action.size, price: action.price, img: action.img, qty: action.qty}]
			// this means that to the existing list of items in state, a new item is appended
		case ACTION.DELETE:
			let newArr = [...state]
			newArr.splice(action.index, 1)
			return newArr;
		case ACTION.UPDATE:
			let arr = [...state]
			arr.find((food,index) =>{
				if(food.id === action.id && food.size === action.size){
					arr[index] = {...food, qty:parseInt(action.qty)+food.qty, price: action.price+food.price}
				}
			})
			return arr;
		default:
			return state;
	}
};

export const CartProvider = ({ children }) => {
	// initially the cart is empty, so state=[]
	const [state, dispatch] = useReducer(reducer, []);

	return (
		<CartDispatchContext.Provider value={dispatch}>
			<CartStateContext.Provider value={state}>
				{children}
			</CartStateContext.Provider>
		</CartDispatchContext.Provider>
	);
};

export const useCart = () => useContext(CartStateContext);
export const useDispatch = () => useContext(CartDispatchContext);

// so whatever items are there in the cart will be stored in the state variable, so on refresh it will be lost.
// in prodution environment it is better to store it in local storage or on server.
