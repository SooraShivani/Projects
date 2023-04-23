import React, { useState, useRef, useEffect } from 'react'
import './../Stylesheets/Card.css'
import { useDispatch, useCart } from './ContextReducer';

// to prevent using strings everywhere, prevents spelling mistakes
export const ACTION = {
	ADD: "add-tiem",
	UPDATE: "update-item",
	DELETE: "delete-item"
}

export default function Card(props) {

	// the exported context data, cart info and the dispatch function is stored
	let data = useCart()
	let dispatch = useDispatch();

	const priceRef = useRef(); //because, initailly the finalprice is NaN, then selecting an option, it showing proper value

	let options = props.options;
	let sizeOptions = Object.keys(options); //accessing only the keys (half,Full)
	const [qty, setQty] = useState(1)
	const [size, setSize] = useState("")  //half, full, regular, medium, large

	const handleAddToCart = async() =>{

		let food = []
		for (const item of data){
			if(item.id === props.foodItem._id){ //if the item is already existing in the cart
				food = item;
				// break;
			}
		}
		if(food !== []){
			for(let food_items of data){

				// this has to be checked for each item or else it will check with the first element it matches, and if its size is not same it simply adds it even if that required item is present at the end

				if( food_items.id === food.id && food_items.size === size){
					await dispatch({type: ACTION.UPDATE, id:props.foodItem._id, price: finalPrice, qty: qty, size: food_items.size})
					// when the food size(half/full) is same, then it will come under the same order, so the number of plates is changes
					// but when size is different, i.e., half plate is a different order and full plate is a different order
					return
				}
				
			}
		}

		await dispatch({type: ACTION.ADD, id:props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size})
		// console.log(props)
		console.log(data) // using this it will print all the cart items together
	}

	let finalPrice = qty * parseInt(options[size]);
	useEffect(() => {
		setSize(priceRef.current.value)
	},[]) 
	// [] means only on first load, the size will be set to whatever is displayed first in the drop-down menu
	return (
		<div>
			<div className="card mt-3 item" style={{ "backgroundColor": "#353535" }} >
				{/* must close img tag, notice the style attribute above /> */}
				<img src={props.foodItem.img} className="card-img-top card-images" alt="pizza" />
				<div className="card-body">
					<h5 className="card-title">{props.foodItem.name}</h5>
					{/* <p className="card-text">Some quick example text.</p> */}
					<div className='container w-100'>
						<select className="m-2 h-100 p-1 dropdown rounded" onChange={(e) => setQty(e.target.value)} >
							{
								// adding javascript here
								Array.from(Array(6), (e, i) => {
									return (
										// adding html here
										<option key={i + 1} value={i + 1}>{i + 1}</option>
									)
								})
							}
						</select>

						<select className="m-2 h-100 p-1 dropdown rounded" ref={priceRef} onChange={(e) => setSize(e.target.value)}>
							{sizeOptions.map((data)=>{
								return <option key={data} value={data}>{data}</option>
							})}
						</select>

						<div className="d-inline h-100 fs-5">
						₹{finalPrice}/-
						</div>
						<hr />
					<button className={`btn btn-cart `} onClick={handleAddToCart}>Add to Cart</button>

					</div>
				</div>
			</div>
		</div>
	)
}
