import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

var idname ='';

export default class PopupWOLib extends Component {

    download(filename){

      let formdata =new FormData();
            formdata.append('file_name',filename);

      var promise = new Promise(function(resolve, reject) {
        // call resolve if the method succeeds
        axios.post("http://localhost:8000/downloadpost/",formdata)
         resolve(true);
      })
      promise.then(bool => console.log(""),
       idname = document.getElementById(filename),
       idname.href="http://localhost:8000/download/",
      )}
    
    render() {
        console.log(window.location.href)
        var filenames =this.props.fnames
        // eslint-disable-next-line
        var listItems = filenames.map((filename) => <a href= "#" id={filename} key={filename.toString()} onClick={()=>this.download(filename)} > <li > {filename} </li></a>  )
        
      return (
        <div className='popup'>
          <div className='popup_inner'>
            <h1 style={{color:"black"}}>{this.props.text}</h1>
            <ul style={{color:"black"}}>{listItems}</ul>
            {/* <p style={{color:"black"}}>{this.props.fnames}</p> */}
          <button onClick={this.props.closePopup}>close me</button>
          </div>
        </div>
      );
    }
  }