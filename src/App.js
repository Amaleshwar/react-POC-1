import React from 'react';
import logo from './logo.svg';
import './App.css';
import  Calculator from './Calculator';
import Clock from './Clock';
import Uploadimage from './Uploadimage';
import Login from './Login';
import Videoplayer from './Videoplayer';
import ReactVPlayer from './ReactVPlayer';
import Downloadimage from "./Downloadimage";
import Popupexample from "./Popupexample";

var button ='';


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { Loggedin: sessionStorage.getItem('state') ? JSON.parse(sessionStorage.getItem('state')).Loggedin : false,
                    temp:null,
                    CurComp: <Clock/>
                  }
    // this.state = { Loggedin: true,
    // temp:null,
    //}
  }





onUnload = (event) => {
  sessionStorage.setItem("state", JSON.stringify(this.state))
}
componentDidMount() {
 console.log(sessionStorage.getItem('state'))
 window.addEventListener("beforeunload", this.onUnload)
 //console.log(JSON.parse(sessionStorage.getItem('state')));
}

componentWillUnmount() {
// console.log(sessionStorage.getItem('state'))
  window.removeEventListener("beforeunload", this.onUnload)
  // console.log(sessionStorage.getItem('state'))
}
 
 Logout(){
  sessionStorage.setItem("loaded",false)
  sessionStorage.removeItem('loaded');
  this.setState({ Loggedin: false })
 }
 callbackFunction = (childData) => {
  if( childData ==='true' ){
  this.setState({ Loggedin: childData })
  this.onUnload();
  }
  else
  console.log("Else in Callback "+childData);
}


menuchange(menuitem){
 
 
    this.setState({ CurComp: menuitem })
 
 
}

render(){

   //var menuitems =  this.state.menuitems.map((menuitem)=> <div id="menu-link" onClick={()=>this.menuchange(menuitem)}> {menuitem}</div> )
  
  return (
    <div>


    <div className="App" id="appid" >
      <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
        <h2 className="header-Text">  React App <br/></h2>
        
  {this.state.Loggedin &&  <button  id="submit" className="Logout" value="Login" onClick={() => this.Logout()}>Logout </button>} 
      </header>
      <div className="Menu">  
          <div id="menu-link" onClick={()=>this.menuchange(<Calculator />)}> Calculator</div>
          <div id="menu-link" onClick={()=>this.menuchange( <Uploadimage />)}> Upload Image</div>
          <div id="menu-link" onClick={()=>this.menuchange( <Downloadimage/>)}> Download Image</div>
          <div id="menu-link" onClick={()=>this.menuchange(<ReactVPlayer/>)}> Video Player</div>
          <div id="menu-link" onClick={()=>this.menuchange(<Popupexample/>)}> Popup</div>
       </div>
      {/* Ternary operator */}
       {/*
{this.state.Loggedin ? <div  className="App-body"> 
 <Calculator /> <Clock /> <Uploadimage />  <Videoplayer/> <ReactVPlayer/></div> :
   <div  className="App-body"> <Login parentCallback = {this.callbackFunction}/>   <Clock />  </div> }   */}


{this.state.Loggedin ? <div  className="App-body"> 
  {this.state.CurComp} </div> :
   <div  className="App-body"> <Login parentCallback = {this.callbackFunction}/>   <Clock />  </div> }

    </div>
    </div>
  );
}
}
export default App;
