const express = require('express');
const config = require('./config/config.json');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
// const passport = require('passport');
// const initializePassport = require('./passport-config');
// initializePassport.initialize(passport);
const bcrypt = require('bcrypt');
//logic
var functions = require('./functions.js');
let language = 'english';

const app = express();
app.use(express.static(__dirname + '/public'));
const port = 3000;

//Username variables
var akronym;


app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());


app.post('/auth', async (req, res) =>{
    
    akronym = req.body.akronym;
    var password = req.body.password;
    
    let ans;
    let hashp;
    console.log(akronym); 
    if (akronym && password) {
        hashp = await functions.getPassword(akronym);
        console.log(hashp[0].hashpassword);
        ans = await functions.login(akronym ,hashp[0].hashpassword)
      console.log(ans[0]);
    } 
    if (ans.length > 0) {
       
        console.log("inside here");
        bcrypt.compare(password, hashp[0].hashpassword, function(err, isMatch) {
         if (err) {
             throw err
         } else if (!isMatch) {
             console.log("Wrong password!");
         } else {
             console.log("Password matches!");
         }
     })
    req.session.loggedin = true;
    req.session.akronym = akronym;
    res.redirect('./index');
    }
    else {
        res.send("Incorrect username and/or password");
    }
    res.end();
});

app.get('/index', async (req, res)=> {
    if (req.session.loggedin) {
        res.render(`pages/${language}/index`);
    } else {
        res.send("Please login to view this page!");
    }
    res.end();
});


app.get('/logout', async (req, res)=> {
    if (req.session.loggedin) {
        req.session.loggedin = false;
        req.session.akronym = "";
        
        res.render(`pages/${language}/loggedout`);
    } else {
        res.send("Please login to view this page!");
    }
    res.end();
});


app.post('/register', async (req, res) =>{
    var id = req.body.id;
    var forename = req.body.forename;
    var lastname = req.body.lastname;
    var password = req.body.password;
    var email = req.body.email;
    let ans;
    if (forename && lastname && password && id && email) {

       ans =  await functions.register(forename, lastname, password, id, email);
 
       if (ans == 0) {
           ans = {}
         
           ans.message = "Error registering, possibly already registered";
       
       }
       else  {
    
        ans.message = "You successfully registered";
       }
      
       res.render(`pages/${language}/register`, ans);
    } 

});

app.set('view engine', 'ejs');

app.get('/', async (req, res)=>{
    if (req.session.loggedin) {

        res.render(`pages/${language}/index`);
    } else {
        res.render(`pages/${language}/login`);
    }
    
});

app.get('/booking', async(req, res) =>{
    let data = {title: "bookings"};
   
    if (req.session.loggedin) {
     
      data.res = await functions.showBookings();
    
      res.render(`pages/${language}/booking`, data);
    
    
    } else {
        res.send("Please login to view this page!");
    }


    
        
});

app.get('/booking/:id', async(req, res) =>{
    let message;
    
    if (req.session.loggedin) {
        let id = req.params.id;
        let ans;
        let data = {};
      ans = await functions.bookingEquipment(id, akronym);
      if (ans == 0) {
        message = "There was an error while booking"
        res.render(`pages/${language}/error`, message)
    }
       data.res = await functions.showBookings();
       
        res.render(`pages/${language}/booking`, data);
    } else {
        res.send("Please login to view this page!");
    }
   
});

app.get('/account', async (req, res)=>{
    if (req.session.loggedin) {
        let id = req.session.akronym;
       
        let data = {title: 'account'};
       data.userRes = await functions.getUser(id);
      data.usr = data.userRes[0];
      data.book = data.userRes[1];
       console.log("usr är", data.userRes[0]);
       console.log("booking är", data.userRes[1]);
     // console.log("Data user res är", data.userRes);
      // console.log(usr, booking);
         res.render(`pages/${language}/account`, data);
    } else {
        res.send("Please login to view this page!");
    }
   
});
app.get('/svenska', async (req, res)=>{
    if (req.session.loggedin) {
      language = "svenska";
         res.render(`pages/${language}/index`);
    } else {
        res.send("Please login to view this page!");
    }
   
});

app.get('/english', async (req, res)=>{
    if (req.session.loggedin) {
   language = "english";
         res.render(`pages/${language}/index`);
    } else {
        res.send("Please login to view this page!");
    }
   
});



app.listen(port, function(){
    console.log(`Listening on port: ${port}`);
});

