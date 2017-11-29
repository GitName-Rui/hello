<?php
header("Content-Type:text/plain");
require_once("../init.php");
@$iid=$_REQUEST["iid"];
$sql="delete from xz_shoppingcart_item where iid=$iid";
sql_execute($sql);