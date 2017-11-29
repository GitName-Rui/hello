<?php
session_start();
header("Content-Type:application/json");
require_once("../init.php");
@$uid=$_SESSION["uid"];
if($uid){
  $sql="select iid,product_id,title,spec,price,count from xz_shoppingcart_item inner join xz_laptop on product_id=lid where user_id=$uid";
  echo json_encode(sql_execute($sql));
}