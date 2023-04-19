import React from 'react'
import './../Stylesheets/Card.css'

export default function Card(props) {

	let options = props.options;
	let quantityOptions = Object.keys(options); //accessing only the keys (half,Full)

	return (
		<div>
			<div className="card mt-3 item" style={{ "backgroundColor": "#353535" }} >
				{/* must close img tag, notice the style attribute above /> */}
				<img src={props.imgSrc} className="card-img-top" alt="pizza" />
				<div className="card-body">
					<h5 className="card-title">{props.foodName}</h5>
					{/* <p className="card-text">Some quick example text.</p> */}
					<div className='container w-100'>
						<select className="m-2 h-100 p-1 dropdown rounded" >
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

						<select className="m-2 h-100 p-1 dropdown rounded" >
							{quantityOptions.map((data)=>{
								return <option key={data} value={data}>{data}</option>
							})}
						</select>

						<div className="d-inline h-100 fs-5">
							Total Price
						</div>

					</div>

				</div>
			</div>
		</div>
	)
}
