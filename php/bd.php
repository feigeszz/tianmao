<?php
include "conn.php";
if(isset($_REQUEST['username'])){
    $user=$_REQUEST['username'];
    $sql="select * from registry where username='$user'";
    $result=$mysqli->query($sql);
    if($result->num_rows>0){
        echo '{"flag":false,"msg":"用户名已存在"}';
    }else{
        echo '{"flag":true,"msg":"用户名可以使用"}';
    }
   

}

  
   




?>