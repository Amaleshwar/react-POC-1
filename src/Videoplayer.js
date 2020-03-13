import React, { Component } from 'react';
import './App.css';
import { Player } from  'video-react';
import video from './images/trailer_hd.mp4';



export default class Videoplayer extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (  
            <div className="vidplay-app">
                <div className="vidplay-wrapper"> 
                         <h3>Video Player........................................................</h3>
                        <Player>
                            <source src={video} />
                        </Player>
                       
                </div>
            </div>
        );
    }
}
