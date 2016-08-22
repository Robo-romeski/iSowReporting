<?php

error_reporting(E_ALL);
ini_set('display_errors', 'on');

$link = @mysqli_connect('internal-db.s203720.gridserver.com', 'db203720_report', 'nYi8nr-Z8]@');
if(!$link) {
    die('failed to connect to the server: ' . mysqli_connect_error());
}

if(!@mysqli_select_db($link, 'db203720_sow')) {
    die('failed to connect to the database: ' . mysqli_error($link));
}