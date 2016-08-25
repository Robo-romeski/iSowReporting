var express = require('express');
var mysql      = require('mysql');
var pool = mysql.createPool({
   host     : 'internal-db.s203720.gridserver.com',
   user     : 'db203720_report',
   password : 'nYi8nr-Z8]@',
   database : 'db203720_sow',
   multipleStatements: true
 });
 var users;
 var app = module.exports = express();

 app.use(express.static(__dirname + '/public'));

 app.set('view engine', 'jade');
 app.set('views', __dirname + '/templates');

 // connection.connect(function(err){
 // if(!err) {
 //     console.log("Database is connected ... \n\n");  
 // } else {
 //     console.log("Error connecting database ... \n\n");  
 // }
 // });

 app.get('/', function(req, res){
  pool.getConnection(function(err, connection){
    if (err) {
      console.log('error connecting to database');
    }else{
connection.query('SELECT * from user LIMIT 6; SELECT count(id) as total FROM user; SELECT * from user WHERE contribution is not null;', function(error, results, fields){
      console.log(results[2]);
      res.render('index', {data: results[0], total:results[1] });
    });
}
connection.release();
});
 });
 app.get('/charts',function(req,res) {

  res.render('charts');
     
 });

 app.get('/tables',function(req,res) {

  res.render('tables');
     
 });
 

 app.listen(8080, function(){
  console.log('Server up and running on localhost:8080');
 });
