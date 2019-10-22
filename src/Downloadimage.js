import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

var idname ='';
var persons='' ;

export default class Downloadimage extends Component {
  constructor(props) {
    super(props);
    this.state ={ filenames : null, render: false
    };
    this.getfilenames=this.getfilenames.bind(this);
}

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

      componentDidMount(){
        console.log(1);
        this.getfilenames();
      }
      getfilenames(){
        axios.get("http://localhost:8000/getfiles")
        .then(res=>{    persons = res.data;
                       
        })
        .then(()=>{ 
            this.setState({filenames: persons,render:true})
            // console.log(this.state.filenames)
            // console.log(this.state.filenames[0]) 
            // console.log(this.state.filenames.length) 
            
        })      
      }
    
    render() {
        console.log(window.location.href)
       // var filenames =this.props.fnames
       var boolfromupload =this.props.frompopup 
       var filenames =this.state.filenames
       console.log(filenames)
        // eslint-disable-next-line
        // var listItems = filenames.map((filename) => <a href= "#" id={filename} key={filename.toString()} onClick={()=>this.download(filename)} > <li > {filename} </li></a>  )
        
      return (
        <div className='download-main'>

        { this.state.render && !boolfromupload &&   
          <div className='download_inner'>
            <h1 style={{color:"black"}}>{this.props.text}</h1>
            <ul >{filenames.map((filename) => <a href= "#" id={filename} key={filename.toString()} onClick={()=>this.download(filename)} > <li style={{color:"white"}}> {filename} </li></a>  )}</ul> 
          </div>  
        }

      {boolfromupload && this.state.render &&    
                <div className='popup_inner'>
                <ul >{filenames.map((filename) => <a href= "#" id={filename} key={filename.toString()} onClick={()=>this.download(filename)} > <li style={{color:"black"}}> {filename} </li></a>  )}
                </ul> 
          </div>     
      }

        </div>
      );
    }
  }