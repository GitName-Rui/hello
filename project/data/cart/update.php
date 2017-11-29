<?php
header("Content-Type:text/plain");
require_once("../init.php");
@$iid=$_REQUEST["iid"];
@$count=$_REQUEST["count"];
$sql="update xz_shoppingcart_item set count=$count where iid=$iid";
sql_execute($sql);
