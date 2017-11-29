<?php
header('Content-Type: application/json;charset=UTF-8');

require_once("../init.php");

$sql = "SELECT img,href FROM xz_index_carousel";
echo json_encode(sql_execute($sql));