import React from 'react';
import logo from './logo.svg';
import './App.css';
import  Calculator from './Calculator';
import Clock from './Clock';
import Uploadimage from './Uploadimage';
import Login from './Login';
import Videoplayer from './Videoplayer';
import ReactVPlayer from './ReactVPlayer';





//const el  = document.querySelector("#myVideo");
// var SCREEN_WIDTH = window.innerWidth;
// var SCREEN_HEIGHT = window.innerHeight;
//let renders = parseInt(sessionStorage.getItem('var'));
class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { Loggedin: sessionStorage.getItem('state') ? JSON.parse(sessionStorage.getItem('state')).Loggedin : false,
                    temp:null,
                  }
    // this.state = { Loggedin: true,
    // temp:null,
    //}
  }
//Loggedin: sessionStorage.getItem('state') ? JSON.parse(sessionStorage.getItem('state')).Loggedin : false




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



render(){

 // renders += 1;
//  console.log(renders);
  return (
    <div>

      {/* <div className="background-test">    
      <video id="myVideo" loop autoPlay>
      <source src={video} type="video/mp4" />
      Your browser does not support the video tag.
      </video>
      <img className='inst-img'  id="myVideo" src={image} alt="" />
      <div className="content">
        <h1>Heading</h1>
        <p>Lorem ipsum dolor sit amet, an his etiam torquatos. Tollit soleat phaedrum te duo, eum cu recteque expetendis neglegentur. Cu mentitum maiestatis persequeris pro, pri ponderum tractatos ei. Id qui nemore latine molestiae, ad mutat oblique delicatissimi pro.</p>
        <button id="myBtn" onclick="myFunction()">Pause</button>
      </div>
      </div> */}

    <div className="App" id="appid" >
      <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
        <h2 className="header-Text">Calculator - React App <br/></h2>
  {/* {this.state.Loggedin &&  <button  id="submit" value="Login" onClick={() => this.Logout()}>Logout </button>} */}
      </header>
      {/* <div  className="App-body">
  {!this.state.Loggedin && <Login parentCallback = {this.callbackFunction}/> }
  {this.state.Loggedin && <Calculator /> }
  {this.state.Loggedin && <Clock /> }
  {this.state.Loggedin && <Uploadimage /> }
</div> */}


{this.state.Loggedin ? <div  className="App-body">  <button  id="submit" value="Login" onClick={() => this.Logout()}>Logout </button>
 <Calculator /> <Clock /> <Uploadimage />  <Videoplayer/> <ReactVPlayer/></div> :
   <div  className="App-body"> <Login parentCallback = {this.callbackFunction}/>    </div> }

    </div>
    </div>
  );
}
}
export default App;
