import React from 'react';
import  CanvasJSReact from './canvasjs/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export default class Chart extends React.Component  {	
  constructor(props) {
    super(props);

}
    render() {
      const options = {
        animationEnabled: true,
        exportEnabled: true,
        theme: "dark2", // "light1", "dark1", "dark2"
        title:{
            text: "Trip Expenses"
        },
        data: [{
            type: "pie",
            indexLabel: "{label}: {y}%",		
            startAngle: -90,
            dataPoints:this.props.data
          //    [
          //     { y: 100-this.props.data, label: "Pricipal Loan Amount" },
          //     { y: this.props.data, label: "Total Intrest" },	
          // ]
            // this.props.data

            //  [
            //     { y: 20, label: "Airfare" },
            //     { y: 24, label: "Food & Drinks" },
            //     { y: 20, label: "Accomodation" },
            //     { y: 14, label: "Transportation" },
            //     { y: 12, label: "Activities" },
            //     { y: 10, label: "Misc" }	
            // ]
        }]
    }
  
     return (
        <div className="">
          
             <CanvasJSChart options = {options}/>
        </div>
      );
    }
  }