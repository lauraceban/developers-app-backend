const express = require("express");
const cors = require("cors");
const serverlessHttp = require("serverless-http");
const bodyParser = require("body-parser"); 

const app = express();
app.use(cors());
app.use(bodyParser.json());

//GET 
app.get("/developers", function (request, response) {
  
  response.status(200).json({
    developers: [
      {
        name: "Ena",
        available: true,
        date_joined: "2020-01-09",
        kills: "HTML, CSS, React, NodeJS, AWS, Git",
        id: 1
      },
      {
        name: "Sue",
        available: true,
        date_joined: "2020-01-10",
        skills: "Agile, NodeJS, React, C#",
        id: 2
      },
      {
        name: "Sitara",
        available: false,
        date_joined: "2020-01-11",
        skills: "Java, NodeJs, Git, TDD",
        id: 3
      }
    ]
  });
});

//POST 
app.post("/newDeveloper", function (request, response) {

  const newDeveloper = request.body;
 
  response.status(200).json({
      message: `Received a request to add ${newDeveloper.name}, available ${newDeveloper.available}, joined ${newDeveloper.date_joined}. ${newDeveloper.name} has the following skills: ${newDeveloper.skills}.`
  }); 
}); 


//PUT 
app.put("/developers/:id", function(request, response) {

  const updatedDeveloper = request.body;
  const id = request.params.id;
 
  response.status(200).json({ 
    message: `Successfully update developer ID ${id} with name: ${updatedDeveloper.name}, available: ${updatedDeveloper.available}, skills: ${updatedDeveloper.skills}`
  });
});


//DELETE 
app.delete("/developers/:id", function (request, response) {

  const id = request.params.id;
 
  response.status(200).json({
      message: `You issued a delete request for ID: ${id}.`
  }); 
}); 


module.exports.app = serverlessHttp(app);

