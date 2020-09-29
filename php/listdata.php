<?php
header('Access-Control-Allow-Origin:*');
header('Access-Control-Allow-Method:POST,GET');
include "conn.php";

$pagesize = 10; //单个页面展示的数据条数
if (isset($_GET['page'])) {
    $pagevalue = $_GET['page'];
} else {
    $pagevalue = 1;
}

$page = ($pagevalue - 1) * $pagesize;
$sql1 = "select * from youle limit $page,$pagesize";
$res = $mysqli->query($sql1);
$arr = array();
for ($i = 0; $i < $res->num_rows; $i++) {
    $arr[$i] = $res->fetch_assoc();
}
echo json_encode($arr);//输出接口