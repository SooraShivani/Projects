import React from "react";
// import axios from "axios";

import './App.css';
import axios from "axios";

class App extends React.Component {
    state = {
        advice: ''
    };
    // the state contains the information used in the app, basically making data available
    // globally, else the scope of the advice data is just the function

    componentDidMount() {
        this.fetchAdvice();
    }
    // lifecycle methods: most important ones are:
    // render, componentdidMount, componentDidUpdate, componentUnmount 

    // defining a method to fetch data from the Advice API
    fetchAdvice = () => {
        axios.get('https://api.adviceslip.com/advice')
            .then((response) => {

                const { advice } = response.data.slip;
                // console.log(advice);

                this.setState({advice: advice});
                // this.setState({ advice}); //this also works since both the property name and the value 
                // have the same name.
                
                // the below can also be done, but the good practice is to destructure
                // console.log(response.data.slip.advice);
                // first print the response, then go through it and check what u want
                // keep going deeper by .something, try until you get what info u looking for
            })
            .catch((error) => {
                console.log(error);
            });
            
    }

    render() {
        const {advice} = this.state;
        return(
            <div className="app">
                <div className="card">
                    <h1 className="heading">{advice}</h1>
                    <button className="button" onClick={this.fetchAdvice}>
                        <span >Give me Advice!</span>
                    </button>
                </div>
            </div>
        );
        // using JSX here, it is used to add html into js code,
        // instead of the usual js into html code.
    }
}

export default App;