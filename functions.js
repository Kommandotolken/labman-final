const mysql = require('promise-mysql');
const config = require('./config/config.json');
var bcrypt = require('bcrypt');
var hashp;
let db;

(async function() {
db = await mysql.createConnection(config);
process.on("exit", () => {
        db.end();
});
})();
async function showBookingsFunc(){
    let res;
    return new Promise((resolve, reject) => {
        let sql = "SELECT * FROM v_bookinglist";
        let res;

        res = db.query(sql, function(error, results, fields){
            console.log(results);
            console.log(res[0]);
            resolve(results);
            return res[0];
        });
     

    })
 
};

async function loginFunc(_username, _password) {
    let res;
   
   
    return new Promise((resolve, reject) => {
        console.log(_username, hashp);
      
        res = db.query('SELECT * FROM users WHERE id = ? AND hashpassword = ?', [_username, _password], function(error, results, fields) {
           if (error) {
               console.log("Wrong credentials");
           }
        
           console.log(results);
           resolve(results);
           return res[0];
        });
       
    })

};

async function showEquipmentFunc() {

};


async function bookingEquipmentFunc(_id, _username) {
  
    return new Promise((resolve, reject) =>{
      let res;
      res = db.query('INSERT INTO booking(userid, equipmentid) VALUES(?, ?)', [_username, _id], function(error, results, fields) {
          if (error) {
              console.log(error)
              results = 0;
          }

          resolve(results);
          console.log("Res är", results);
          return results;
      });
    });
     
};


async function getBookingsFunc(_id) {
    console.log("Id är", _id);
    let res;
    return new Promise((resolve, reject) =>{
        res = db.query('SELECT * FROM booking WHERE booking.userid = ?', [_id], function(error, results, fields){
            if (error) {
                console.log(error);
            }
            resolve(results);
        })
    });
};

async function getPasswordFunc(_username) {
    return new Promise((resolve, reject) => {
        db.query('SELECT hashpassword FROM users WHERE id = ?', [_username], function(error, results, fields) {
            if (error) { 
                console.log("Error retrieving password", error);
            }

            resolve(results);
        })
    });
}

async function getBookingsFunc(_id) {
    let res;
    console.log("Id är", _id);
    return new Promise((resolve, reject) =>{
        res = db.query('SELECT * FROM booking WHERE booking.userid = ? ' [_id], function(error, results, fields) {   
            if (error) {
                console.log("Error", error);
                results = 0;
            }
            console.log("results är", results);
            resolve(results);
            return res[0];
        });
    })
}
async function registerFunc(_forename, _lastname, _password, _id, _email) {
    hashp = await bcrypt.hash(_password, 10);
    return new Promise((resolve, reject) =>{
            db.query('INSERT INTO users(id, fornamn, efternamn, hashpassword, email) VALUES(?,?,?,?,?)', [_id, _forename, _lastname, hashp, _email], function(error, results, fields){
            if (error) {
                console.log("Wrong input", error);
                results = 0;
            }
            console.log(results);
            resolve(results);
            
            
          
        });
      
    })
     

};



async function getUserFunc(_id) {

    return new Promise((resolve, reject) =>{
        let res;
        console.log(_id);
        res = db.query('SELECT * FROM users WHERE id = ?; SELECT * FROM booking WHERE booking.userid = ?', [_id, _id], function(error, results, fields){
          if (error) {
              console.log("Wrong input", error);
          }
         
          console.log("User func")
          resolve(results);
          console.log(res[0]);
           //return res[0];
        
      });
    
  })
   
}


module.exports = {
    showBookings: showBookingsFunc,
    getBookings: getBookingsFunc,
    login: loginFunc,
    showEqiupment: showEquipmentFunc,
    register: registerFunc,
   bookingEquipment: bookingEquipmentFunc,
   //retrieveBooking: retrieveBookingFunc,
   getUser: getUserFunc,
   getPassword: getPasswordFunc,

}