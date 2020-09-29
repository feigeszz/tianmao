<?php
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Method:POST,GET');
include "conn.php";
$pagesize = 10; //单个页面展示的数据条数
$sql = "select * from youle"; 
$result = $mysqli->query($sql); 
$num = $result->num_rows; 
$pagenum = ceil($num / $pagesize); 
echo json_encode($pagenum);