<?php

    $user = 'db203720_report';
    $pass = 'nYi8nr-Z8]@';
    $db   = 'db203720_sow';
    $host = 'internal-db.s203720.gridserver.com';

$conn = new mysql_connect($host, $user, $pass, $db);

// Check connection
if ($conn->connect_error) {
     die("Connection failed: " . $conn->connect_error);
} 

$sql = "SELECT id, fname, lname FROM user";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
     // output data of each row
     while($row = $result->fetch_assoc()) {
         echo "<br> id: ". $row["id"]. " - Name: ". $row["fname"]. " " . $row["lname"] . "<br>";
     }
} else {
     echo "0 results";
}

$conn->close();

?>