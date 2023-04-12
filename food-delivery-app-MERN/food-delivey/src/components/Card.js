import React from 'react'
import './../Stylesheets/Card.css'

export default function Card() {
  return (
    <div>


        <div className="card mt-3 item" style={{"backgroundColor": "#353535"}} >
          {/* must close img tag, notice the style attribute above /> */}
          <img src="https://media.istockphoto.com/id/835271096/photo/slice-of-pizza-cheese-crust-seafood-topping-sauce-with-bell-pepper-vegetables-delicious-tasty.jpg?b=1&s=170667a&w=0&k=20&c=uweNCcZRaUjByzbqk7P9VwU9iN5Wy16KDJrnDP3uKX8=" className="card-img-top" alt="pizza"/>  
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">Some quick example text.</p>
              <div className='container w-100'>
                <select className="m-2 h-100 p-1 dropdown rounded" >
                  {
                    // adding javascript here
                    Array.from(Array(6), (e,i) =>{
                      return(
                        // adding html here
                        <option key={i+1} value={i+1}>{i+1}</option>
                      )
                    })
                  }
                </select>

                <select className="m-2 h-100 p-1 dropdown rounded" >
                  <option value="half">Half</option>
                  <option value="full">Full</option>
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
