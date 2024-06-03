const fs = require("fs");
const express = require("express");
const DataStore = require("nedb");
const app = express();
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Starting server at ${port}`);
});
app.use(express.static("public"));
app.use(express.json({ limit: "1mb" })); //parses incoming data as json

const database = new DataStore({
  filename: "database.db",
  autoload: true,
  onload: (err) => {
    if (err) {
      console.error("Error while loading the db!", err);
    }
  },
});
database.loadDatabase();

database.count({}, function (err, count) {
  console.log("There are " + count + " items in the database");
  if (err) console.log("There's a problem with the database: ", err);
  else if (count <= 0) {
    database.insert(user_data, function (err, usersAdded) {
      if (err) console.log("There's a problem with the database: ", err);
      else if (usersAdded)
        console.log("Default items inserted in the database");
    });
  }
});


app.post("/api", (request, response) => {
  const data = request.body;
  const timestamp = Date.now();
  data.timestamp = timestamp;
  database.insert(data);
  response.json(data);
});

var json_data = {};
var user_data = [];

app.get("/api", (request, response) => {
  database.find({}, (err, data) => {
    if (err) {
      response.end();
      return;
    }
    response.json(data);
    // console.log(data); //all the data
    json_data.user_data = user_data;
    json_data.user_data.push(data);
    fs.writeFileSync("mydata.json", JSON.stringify(json_data));

  });
});

