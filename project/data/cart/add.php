<?php
session_start();
header("Content-Type:text/plain");
require_once("../init.php");
@$uid=1;
@$lid=$_REQUEST["lid"];
@$count=$_REQUEST["count"];
if($uid){
  $sql="select count(*) from xz_shoppingcart_item where user_id=$uid and product_id=$lid";
  if(sql_execute($sql)[0]["count(*)"]==1){
    $sql="update xz_shoppingcart_item set count=count+$count where user_id=$uid and product_id=$lid";
  }else{
    $sql="insert into xz_shoppingcart_item values(null,$uid,$lid,$count,false)";
  }
  sql_execute($sql);
}
