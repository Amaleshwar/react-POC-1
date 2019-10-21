import React from 'react';
import Axios from 'axios';


export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = { errormsg:''}
         }
         
    componentDidMount(){
        this.loginpopup();
    }
    loginpopup(){
        document.getElementById('LoginPopup').style.display='block';
    }
    validateUser(){
            let username = document.getElementById("username").value;
            let password = document.getElementById("password").value;
            var result;
            let formdata =new FormData();
            formdata.append('user_name',username);
            formdata.append('user_pwd',password);
            Axios.post("http://localhost:8000/validate",formdata)
            .then(res=>{console.log(res.statusText)
            result =res.data;
            
            if(result===1){
                sessionStorage.setItem("loaded",true)
                this.sendData();
                this.setState({errormsg:''})
            }
            else
            {
                this.setState({errormsg:result})
               // document.getElementById('LoginPopup').style.display='block';
            }
        })
    }
    sendData = () => {
        this.props.parentCallback("true");
        console.log("to_parent")
      }
    render() { 
        return ( 
        <div id="LoginPopup" className="modal" display="none" align="center">
      
                <div className="content">
                    <div className="imgcontainer">
                        <strong></strong>
                    </div>
                    <div> <strong>  Username: </strong><input type="text" name="username" id="username" title="Enter User Name" placeholder="Enter UserName" /> <br /> </div>

                    <div>  <strong> Password: </strong> <input type="password"  name="password" id="password" placeholder="Enter Password" /> <br /> 
                    </div>
                    <div>
                        <button  id="submit" value="Login" onClick={(e) => this.validateUser(e)}>LOGIN </button>
                    </div>{this.state.errormsg}
                </div>
         
    </div> );
    }
}
