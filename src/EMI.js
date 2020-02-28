import React from 'react';
import './App.css';

 import Chart from './Chart';




var DUMMY_DATA =[];


export default class EMI extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            emi:0,
            totalintrest:0,
            totalpayment:0,
            loansumm : DUMMY_DATA,
            annualsumm: DUMMY_DATA,
            chatdata:[       { y: 80, label: "Pricipal Loan Amount" },
            { y: 20, label: "Total Intrest" },	],
         }
    }
    emicalculator(){

        // var idannual ='annualsumm'+loanrowYear;
        // var ele = document.getElementsByClassName(classname);
        // var eleannual = document.getElementById(idannual);
        
            var loansu=[];
            var P = document.getElementById("loanAmt").value;
            var R = document.getElementById("IntRate").value;
            var N = document.getElementById("loanTenure").value;
            
            var RatePerMonth = (R/100)/12;
            var calval =   Math.pow((RatePerMonth*1)+1,N)
            var EMI = P*((RatePerMonth*calval)/(calval-1));
            
            var TotalPayment =N*EMI;
            var TotalIntrest =  TotalPayment-P;
            
            var TP = P;

            var  pertotalintrest = (TotalIntrest*100)/TotalPayment;

            this.setState({ chatdata: [
                { y: 100-pertotalintrest, label: "Pricipal Loan Amount" },
                { y: pertotalintrest, label: "Total Intrest" },	
            ]
        })

            var monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
            var dateofloan =new Date();
            var yearofloanstart = dateofloan.getFullYear();
            var monthofloanstart =dateofloan.getMonth();

            var remmonthsinyear= 12- monthofloanstart;
            var startingmonth = monthofloanstart;
            var startingyear =yearofloanstart;

            for(var i=0;i<N;i++){                        
                var IntPerMonth = Math.round( TP*RatePerMonth);
                var IntPerMonth = TP*RatePerMonth;
                var PrincPerMonth = EMI - IntPerMonth;           
                TP = TP- PrincPerMonth;
                var  BalanceNextMonth= TP;
                var LoanPaidPer = 100 - ((TP/P)*100);
                var year  = "";
                var month  = "";

                if(remmonthsinyear>0 && startingmonth<12)
                {
                    year=startingyear
                    month= monthNames[startingmonth];
                    remmonthsinyear--;
                    startingmonth++;
                } 
                else{
                    remmonthsinyear=12; startingmonth=0; startingyear=startingyear+1;
                    year=startingyear
                    month= monthNames[startingmonth];
                    remmonthsinyear--;
                    startingmonth++;

                }
                

                var loansu= {
                    "Year" : year,
                    "Month": month,
                     "PrincPerMonth": Math.round(PrincPerMonth),
                     "IntPerMonth":Math.round(IntPerMonth),
                     "EMI":Math.round(EMI),
                     "BalanceNextMonth": Math.abs(Math.round(BalanceNextMonth)),
                     "LoanPaidPer":LoanPaidPer.toFixed(2)
                }
                

                DUMMY_DATA=[...DUMMY_DATA,loansu]
            }

            // --------------Correct JSON format------------------

            var tjson=[];
            var tosearch = yearofloanstart;  
            var tem=1;         
            while(tem==1){
            var da =  DUMMY_DATA.filter(row => row.Year == tosearch)
            console.log("data",+da)
            if(da.length===0){ tem=0; console.log("enter"); break;}          
            tjson =[...tjson,  {[tosearch] : da  }]
            tosearch++;
            console.log(tjson)               
            }
            
           //-------------Average of Annual Loan Summary----------------         
            var annualsumm =[];
            var tempannualsumm =[];
            var tmpyear =yearofloanstart;
            var Balanceamt = P;
            for(var i=0;i<tjson.length;i++){ 
                var tt = tjson[i][tmpyear];
                tempannualsumm=[...tempannualsumm,  tt.reduce((acc, it,i) => { var ta={ "Year":tmpyear, "BalanceNextMonth":it.BalanceNextMonth , "LoanPaidPer":it.LoanPaidPer,
                 "EMI":  (i+1)*it.EMI, "Month":it.Month }          
                  return ta } , {})  ] 
                tmpyear++;
            }
            console.log("Annual summary",tempannualsumm) 
            annualsumm=[...annualsumm,  tempannualsumm.map((row) => { var ta={ "Year":row.Year, "Month":row.Month, "BalanceNextMonth":row.BalanceNextMonth , "LoanPaidPer":row.LoanPaidPer,
            "EMI":  row.EMI, "PrincPerMonth":(Balanceamt-row.BalanceNextMonth) , "IntPerMonth":( row.EMI)-(Balanceamt-row.BalanceNextMonth) } 
            Balanceamt=row.BalanceNextMonth;          
             return ta } , {})  ]           
            this.setState({ annualsumm:annualsumm[0], loansumm: DUMMY_DATA, emi:Math.round(EMI), totalintrest:Math.round(TotalIntrest),totalpayment:Math.round(TotalPayment) }, () => {
              });              
            DUMMY_DATA =[]
    }
    expandloansumm(loanrowYear){
         var classname= 'loansumm'+loanrowYear;
         var idannual ='annualsumm'+loanrowYear;
         var ele = document.getElementsByClassName(classname);
         var eleannual = document.getElementById(idannual);
          
 
    for (var j=0; j < ele.length; j++) {   
        if (ele[j].style.display === "table-row") {
            ele[j].style.display = "none";
            eleannual.className = "annualsumm text-center "; 
        } else {
            ele[j].style.display = "table-row";
            eleannual.className = "annualsumm text-center table-active "; 
            }
        }
    }
    render() { 
                console.log(this.state.loansumm)
        return ( 
            <div className="container col-sm-8">
                    <div>
                <h1>EMI Calculator</h1>
                <div className="row " style={{backgroundColor:'#282c34'}}>
                <div className="col-sm-6">
               <table>
                <tbody >
                <tr>
                    <th><label>Loan amount</label></th>  
                    <td> <input type="text" id="loanAmt"></input></td>  
                </tr>
                <tr>
                    <th><label>Intrest Rate</label></th>
                    <td><input type="text" id="IntRate"></input></td>
                </tr>
                <tr>
                    <th><label>Loan Tenure in months</label></th>
                    <td><input type="text" id="loanTenure"></input></td>
                </tr>
                </tbody>
                </table>
                
               
                <button onClick={()=>this.emicalculator()}>Calculate</button>

                <table>
                <tbody>
                <tr>
                    <th><label>Loan EMI</label></th>  
                    <td> {this.state.emi}</td>  
                </tr>
                <tr>
                    <th><label>Total Intrest Payable</label></th>
                    <td> {this.state.totalintrest}</td> 
                </tr>
                <tr>
                    <th><label>Total Payment(Principal + Interest)</label></th>
                    <td> {this.state.totalpayment}</td> 
                </tr>
                </tbody>
                </table>
                </div>
                <div  className="col-sm-6 " >
                {/* <div className="loanpie"> </div> */}
                 <Chart   data={this.state.chatdata} />
                 </div>
                 </div>
                
				{/* onRef={ref => this.chart = ref} */ }
			

                <table className="table table-striped table-light loanSummary" >
                <thead className="thead-dark">
                <tr>
                    <th><label>Year</label></th> 
                    <th><label>Principal</label></th>  
                    <th><label>Interest</label></th>  
                    <th><label>Total Payment(A + B)</label></th>  
                    <th><label>Balance</label></th> 
                    <th><label>Loan Paid To Date</label></th>   
                </tr>
                </thead>
                               
                {this.state.annualsumm.map((loanrow,i)=>  <tbody id="loansummarydata" key={i} className="table-striped ">  
                        <tr id={`${'annualsumm' + loanrow.Year}`}  className={`annualsumm text-center`}  >
                        <td >{loanrow.Year}    <button className="btn p-0 fa fa-plus" onClick={()=>this.expandloansumm(loanrow.Year)}></button> </td>
                        <td >{loanrow.PrincPerMonth}</td>
                        <td >{loanrow.IntPerMonth}</td>
                        <td >{loanrow.EMI}</td>
                        <td >{loanrow.BalanceNextMonth}</td>
                        <td >{loanrow.LoanPaidPer}</td>
                        </tr> 
                        

                        {this.state.loansumm.map((loaninrow,i)=> 
                         (loanrow.Year===loaninrow.Year) ?                  
                        <tr style={{display:"none"}} id={'loansumm'+ i} key={i}  className={`loansumm  ${'loansumm' + loaninrow.Year} text-center`}   >
                        <td >{loaninrow.Month}</td>             
                        <td >{loaninrow.PrincPerMonth}</td>
                        <td >{loaninrow.IntPerMonth}</td>
                        <td >{loaninrow.EMI}</td>
                        <td >{loaninrow.BalanceNextMonth}</td>
                        <td >{loaninrow.LoanPaidPer}</td>
                        </tr>                
                       :
                        <tr key={i}></tr>  
                        )}                         
                         </tbody> 
                         )}                 
                </table>
            </div>
            </div>
         );
    }
}
 
