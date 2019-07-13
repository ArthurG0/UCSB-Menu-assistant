//this program prints a list of open dining commons

//requiring the dotenv module to hide the api key
require('dotenv').config()
//requiring the XML module to make a POST request
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const httpRequest = new XMLHttpRequest();
var url = "https://api.ucsb.edu/dining/menu/v1/2019-07-12"
httpRequest.open("GET", url, true);
httpRequest.setRequestHeader("ucsb-api-key",process.env.UCSB_MU_APIKEY);
//with just the date, we expect to get the list of dining commons working on a specific day, let's say, today



console.log('\n' + "USING THIS API KEY TO MAKE A CALL: " + process.env.UCSB_MU_APIKEY + '\n');

//we want to print the result to console,but also save in into a file
var response;
httpRequest.onreadystatechange = function () {
    //if the request has returned:
    if(httpRequest.readyState === 4) {
      console.log(httpRequest.responseText);
      response = JSON.parse(httpRequest.responseText);
      //for each item (we expect a list of dining commons), print their names. 
      response.forEach(function(item){
          console.log(item.name);
      });
    }
};
httpRequest.send();
