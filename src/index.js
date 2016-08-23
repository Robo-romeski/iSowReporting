var express = require('express');
var mysql      = require('mysql');
var connection = mysql.createConnection({
   host     : 'internal-db.s203720.gridserver.com',
   user     : 'db203720_report',
   password : 'nYi8nr-Z8]@',
   database : 'db203720_sow'
 });
 var users;
 var app = module.exports = express();

 app.use(express.static(__dirname + '/public'));

 app.set('view engine', 'jade');
 app.set('views', __dirname + '/templates');

 connection.connect(function(err){
 if(!err) {
     console.log("Database is connected ... \n\n");  
 } else {
     console.log("Error connecting database ... \n\n");  
 }
 });

 app.get('/', function(req, res){
connection.query('SELECT * from user LIMIT 1', function(error, results, fields){
      console.log(results);
      res.render('index', {data: results});
    });
connection.end();
 });
 app.get('/charts',function(req,res) {

  res.render('charts');
     
 });

 app.get('/tables',function(req,res) {

  res.render('tables');
     
 });
 

 app.listen(8080);
