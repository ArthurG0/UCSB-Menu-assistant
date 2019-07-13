//this program prints a list of open dining commons
console.log("\/\/START OF TESTING BLOCK");

console.log("\/\/END OF TESTING BLOCK");

//requiring the dotenv module to hide the api key
require('dotenv').config()
//requiring the XML module to make a POST request
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const httpRequest = new XMLHttpRequest();
//we need to subtract by 25200000 to get into the correct timezone
var today = new Date(new Date().getTime() - 25200000);
let dateInFormat =  today.getFullYear() + '-' + ((today.getMonth()+1) > 9 ? today.getMonth()+1 : '0'+(today.getMonth()+1)) + '-' + today.getDate();
var url = "https://api.ucsb.edu/dining/menu/v1/" + dateInFormat;
httpRequest.open("GET", url, true);
httpRequest.setRequestHeader("ucsb-api-key",process.env.UCSB_MU_APIKEY);
//with just the date, we expect to get the list of dining commons working on a specific day, let's say, today

  //console.log('\n' + "USING THIS API KEY TO MAKE A CALL: " + process.env.UCSB_MU_APIKEY + '\n');

//we want to print the result to console,but also save into a file
var response;
httpRequest.onreadystatechange = function () {
    //if the request has returned:
    if(httpRequest.readyState === 4) {
      console.log('\n' + httpRequest.responseText);
      response = JSON.parse(httpRequest.responseText);
      //for each item (we expect a list of dining commons), print their names.
      console.log("\n\nDining commons that are open today, " + dateInFormat + ": ") 
      response.forEach(function(item){
          console.log(item.name);
      });

      console.log("\nwith codes: ") 
      response.forEach(function(item){
          console.log(item.code);
      });

      response.forEach(function(item){
          let mealsRequest = new XMLHttpRequest();
          let mealsRequestResponse;
          console.log(url+ '/' + item.code);
          mealsRequest.open("GET", (url+ '/' + item.code), true);
          mealsRequest.setRequestHeader("ucsb-api-key",process.env.UCSB_MU_APIKEY);
          mealsRequest.onreadystatechange = function () {
            if(mealsRequest.readyState === 4) {
                console.log('\n' + item.name + " serves:");
                mealsRequestResponse = JSON.parse(mealsRequest.responseText);
                mealsRequestResponse.forEach(function(meal){
                    console.log(meal.name);
                })

            }
          };
          mealsRequest.send();

      });

    }
};
httpRequest.send();
