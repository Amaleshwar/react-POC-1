var express = require('express');
var app = express();
var fileUpload = require('express-fileupload');
app.use(fileUpload());
var cors = require('cors');
app.use(cors());
var path = require('path');
var fs = require('fs');

var filePath ='';

app.post('/upload', function (req, res) { 
       var dropoffLocation = '/public/images/';
        let fs = req.files.file2;
       let filename = fs.name;
       var dropoffpath =  __dirname + dropoffLocation+ filename; 
       console.log(filename) 
        fs.mv(dropoffpath, function(err) {
          if (err) {
            return res.status(500).send(err);
          }
        })      
          res.send('File uploaded to ' + dropoffpath);
})

app.get('/getfiles', function (req, res) {


    //to get the names of all files in a folder.                          
  let filedir = path.join(__dirname, '/public/images/');
  var files = fs.readdirSync(filedir);
  //res.send(files);
  console.log(files.length);
  res.send(files);

});



 app.get('/download', function (req, res) {
  
    res.download(filePath); 
    console.log("File Successfully downloaded from ",filePath);
 });

//------------------------------------------------------------------------------------


 app.post('/downloadpost', function (req, res) {

   let filename = req.body.file_name.trim();
   //console.log(filename);

  var dropoffLocation = '/public/images/';
  
   filePath =  __dirname + dropoffLocation + filename;
 // console.log(filePath);
  res.send(filePath);


});

//-------------------------------------------------------------------------------------


app.post('/validate', function (req, res) {
  var sql = require("mssql");
  // config for your database
  var config = {
      user: 'amaleshwar',
      password: '8977Amal868654',
      server: 'WKSBAN18ALF7042\\SQLEXPRESS', 
      database: 'Login_Db' 
  };
  
  let username = req.body.user_name.trim();
  let userpwd = req.body.user_pwd.trim();
  console.log(username,userpwd)
  const getUserDetails = 'select User_Name, Password from Login_Details where User_Name=@uname and Password=@pwd';

  // const getUserDetails = 'select *  from Login_Details';

  // connect to your database
  
  sql.connect(config).then( function () {

   
    var request = new sql.Request();
    request.input('uname',username);
    request.input('pwd',userpwd);
   // request.multiple =true;

    request.query(getUserDetails).then(function (recordSet){   
      console.log(recordSet);
     

      if(recordSet.rowsAffected==1)
      {
      // console.log(recordSet.rowsAffected[0]);
      console.log(recordSet.recordset[0].User_Name);  // to get username
      var result =recordSet.rowsAffected[0].toLocaleString();
      res.send(result);
      sql.close();
      }
      else 
      {
      res.send("Enter correct details");
      sql.close();
      }     
    }).catch(function (err){
        console.log(err);
        res.send("Error");
       sql.close();
    });
  }).catch(function (err){
    console.log(err);
    res.send("Error");
  }); 
});

app.listen(8000, function() {
    console.log('App running on port 8000');
});


 
  
   
      