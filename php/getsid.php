<?php
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Method:POST,GET');
include "conn.php";
if(isset($_GET['sid'])){
    $sid = $_GET['sid'];
    $result = $mysqli->query("select * from youle where sid=$sid");
    echo json_encode($result->fetch_assoc());
}
?>