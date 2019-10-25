import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
// import image1 from './images/atoms-background.png';
// import image2 from './images/hexagon-chemical.jpg';
// import image3 from './images/Quantum_Blog-toffoli.png';
var image1 = 'https://images.unsplash.com/photo-1569387623950-11c5f5be2f38?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80';
var image2 = 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60';
var image3 = 'https://images.unsplash.com/photo-1516905041604-7935af78f572?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60';
var image4 = 'https://images.unsplash.com/photo-1539683255143-73a6b838b106?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60';

export default class Imageslide  extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            images: [image1,image2,image3],
            counter:0
        }
    }
    componentDidMount() {
        this.interval = setInterval(() => {
          this.setState({ counter: ++this.state.counter % this.state.images.length })
        }, 5000); 
    }
    componentWillUnmount() {
        clearInterval(this.interval);
      }
    previmg(){
        if(this.state.counter === 0 ){
            this.setState({ counter: this.state.images.length -1 })
        }
        else
        {
        this.setState({ counter: this.state.counter -1 })
        }
      }
    nextimg(){
        if(this.state.counter === this.state.images.length -1 ){
            this.setState({ counter: 0 })
        }
        else
        {
        this.setState({ counter: this.state.counter +1 })
        }
      }
    render() { 
        return ( 
            <div className="imgslide-app">
                <div className="imgslide-wrapper">
                    
                    <img src={this.state.images[this.state.counter]} alt="Smiley face" height="242" max-width="100%" />
                    <button onClick={()=>this.previmg()}>prev</button>
                    <button onClick={()=>this.nextimg()}>next</button>
                </div>
            </div>
         );
    }
}

