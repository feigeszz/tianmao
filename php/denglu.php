<?php
include "conn.php";
if(isset($_REQUEST['user'])&& isset($_REQUEST['pass'])){
    $user=$_REQUEST['user'];
    $pass=$_REQUEST['pass'];
    $sql="select * from registry where username='$user' and password='$pass'";
    $result=$mysqli->query($sql);
    if($result->num_rows>0){
        echo true;
    }else{
        echo false;
    }

}
?>