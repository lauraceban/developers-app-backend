const express = require("express");
const cors = require("cors");
const serverlessHttp = require("serverless-http");
const bodyParser = require("body-parser"); 
const mysql = require("mysql");

const app = express();
app.use(cors());
app.use(bodyParser.json());


const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password:  process.env.DB_PASSWORD,   
  database: "developers"
});



//GET 
app.get("/developers", function (request, response) {
  
  connection.query("SELECT * FROM Developers", function (err, data) {
    if (err) {
      response.status(500).json({
        error: err
      });
    } else {
      response.status(200).json({
        developers: data
      });
    }
  });
});



//POST 
app.post("/newDeveloper", function (request, response) {

  const newDeveloper = request.body;

  connection.query("INSERT INTO Developers SET ?", [newDeveloper], function (err, data) {
    if (err) {
      response.status(500).json({error: err});
    } else {
      newDeveloper.id = data.insertId;
      response.status(201).json(newDeveloper);
    }
  }); 
}); 



//PUT 
app.put("/developers/:id", function(request, response) {
  
  const updatedDeveloper = request.body;
  const id = request.params.id;
  

  connection.query(`UPDATE Developers SET ? WHERE id=?`, [updatedDeveloper, id], function (err) {
    if (err) {
      response.status(500).json({error: err});
    } else {
      response.sendStatus(200);
    }
  });
});



//DELETE 
app.delete("/developers/:id", function (request, response) {

  const id = request.params.developerId;
 
  connection.query(`DELETE FROM Developers WHERE developerId=?`, [id], function (err) {
    if (err) {
      response.status(500).json({
        error: err
      });
    } else {
      response.sendStatus(200);
    }
  }); 
}); 



module.exports.app = serverlessHttp(app);