import React, { Component } from 'react';
import './App.css';
// const axios = require("axios");
import axios from 'axios';
import Popup from "reactjs-popup";
import Downloadimage from "./Downloadimage";


var persons='' ;

export default class Uploadimage extends Component {
    constructor(props) {
        super(props);
        this.state ={
            selectedFile: null,
            btndisable:true,
            msgflag:false,
            popupToggle:false,
            filenames : null,
        };
    }
    onFormSubmit(e){
       const data = new FormData();
       data.append('file2',this.state.selectedFile);

       axios.post("http://localhost:8000/upload",data).then(res=>{console.log(res.statusText,res.data)})
        
    }
    onChange(e) {
        if(e.target.files[0].size>52000)
        {
                alert(" can't upload ")
                this.setState({btndisable:true,msgflag:true});
                return;
        }
        else
        {
          this.setState({
              selectedFile:e.target.files[0],
              btndisable:false,
              msgflag:false,
        });
        }
        console.log(e.target.files[0].size, e.target.files[0].name)

        
    }
    getfilename(){
      
    }
    handlePopupToggle(){

      axios.get("http://localhost:8000/getfiles")
        .then(res=>{    persons = res.data;
                       
        })
        .then(()=>{ 
            this.setState({popupToggle: !this.state.popupToggle,
                            filenames: persons})
            // console.log(this.state.filenames)
            // console.log(this.state.filenames[0]) 
            // console.log(this.state.filenames.length) 
            
        })       
    }

    render() { 
        return ( 
        <div className="upimg-app">
            <div className="upimg-wrapper"> 

                <p>File Upload</p>
                <input type="file" name="file" onChange={(e)=>this.onChange(e)} /> {/* use "multiple"  for uploading multipule files  */}
                <button disabled={this.state.btndisable} type="button" onClick={(e)=>this.onFormSubmit(e)}>Upload</button>
                <a href="http://localhost:8000/download">Download image</a>

                <button onClick={()=>this.handlePopupToggle()}>popup without Library</button>
                { this.state.popupToggle && <Downloadimage text='Close Me'  fnames={this.state.filenames} closePopup={()=>this.handlePopupToggle()} /> }
                
                <Popup trigger={<button> popup @ Library</button>} position="right center"> 
                    <div style={{color:"black"}}>Popup content here !!</div>
                </Popup>

               {this.state.msgflag && <p>Please Upload correct File.</p>}
               </div>
        </div> 
        );
    }
}
 
