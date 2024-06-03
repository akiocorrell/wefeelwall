//
//nedb documentation: https://github.com/louischatriot/nedb/blob/master/README.md
//

//
//const width = 360;
//const height = 640;

getData();
var json_data = {};
var user_data = [];

async function getData() {
  const response = await fetch("/api");
  const data = await response.json();

  json_data.user_data = user_data;
  json_data.user_data.push(data);

  // console.log(json_data);
  // console.log(user_data);
}


