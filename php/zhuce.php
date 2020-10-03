<?php
include "conn.php";
if(isset($_REQUEST['username'])&&isset($_REQUEST['password'])&&isset($_REQUEST['email'])){
    $user=$_REQUEST['username'];
    $pass=sha1($_REQUEST['password']);
    $email=$_REQUEST['email'];
    $insert="insert into registry values(default,'$user','$pass','$email',NOW())";
    $res=$mysqli->query($insert);
    $mysqli->close();
    //前端跳转页面
    if($res){
        echo '{"flag":true}';
    }else{
        exit('非法操作');
    }

}


?>