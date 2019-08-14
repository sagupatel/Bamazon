var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
  
    port: 3300,
  
    user: "root",
    password: "rootroot",
    database: "bamazon_DB"
  });

  connection.connect(function(err) {
    if (err) throw err;
    start();
  });

  function start() {
      inquirer.prompt({
          name: "options",
          type: "list" ,
          message: "What would you like to do?",
          choices: ["Products for Sale", "Low Inventory", "Add Inventory", "Add New"]
      })
      .then(function(answer){
          if (answer.options === "Products for Sale"){
              viewProducts();
          }
          else if(answer.options === "Low Inventory"){
              viewInventory();
          }
          else if(answer.options === "Add Inventory"){
              addInventory();
          }
          else if(answer.options === "Add New"){
              addProduct();
          } else{
              connection.end();
          }

      });
  }

  function viewProducts(){
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.log(res);
        connection.end();
      });      
  }
 
  function viewInventory(){
        connection.query("SELECT name, quantity FROM products WHERE quantity <= 5", function(err, res) {
            if(err)throw err;
            console.log(res);
      })
    }


  