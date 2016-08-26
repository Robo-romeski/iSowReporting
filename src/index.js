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
connection.query('SELECT * from user ORDER BY user.created DESC LIMIT 10; SELECT count(DISTINCT id) as total FROM user; SELECT * from user WHERE contribution is not null; SELECT ROUND(AVG ( amount ), 0) AS amount FROM cost; SELECT DISTINCT * FROM  invest ORDER BY  invest.amount DESC LIMIT 10; SELECT ROUND(AVG( amount ), 0) AS amount, AVG( days ) AS days FROM project; SELECT COUNT( user ) AS childBear FROM invest WHERE child IS NOT NULL; SELECT AVG( YEAR(now()) - YEAR(dob) ) as avg FROM user_personal WHERE dob IS NOT NULL; SELECT ROUND(SUM( project_amount ), 0) AS amount FROM invest', function(error, results, fields){
      console.log(results[0]);// all from user
      console.log(results[1]);// count of users
      console.log(results[2]);// not null contributions
      console.log(results[3]);// avg from cost
      console.log(results[4]);// all distinct from invest - high gross
      console.log(results[5]);// average amount and time sow
      console.log(results[6]);// users with children
      console.log(results[7]);// average ages of sower
      console.log(results[8]);//Total contribution from invest
      res.render('index', {total:results[0], queone:results[1], quetwo: results[2], quethree: results[3], data: results[4], average:results[5], quesix: results[6], queseven: results[7], contrib: results[8] });
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

 app.get('/rows', function (req,res) {
   pool.getConnection(function (error, connection) {
     if (error) {
     console.log('connection bad');
     }else{
   connection.query('SELECT name, email from user LIMIT 10', function(error, results, fields){
    //console.log(results);
    res.send(results);
   });
   }
   });

 });
 

 app.listen(process.env.PORT || 8080, function(){
  console.log('Server up and running on localhost:8080');
 });
