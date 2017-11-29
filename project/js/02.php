<?php
	header("Content-Type:application/json;charset=utf-8");
	$conn=mysqli_connect("127.0.0.1","root","123456","web1706a",3306);
	mysqli_query($conn,"set names utf8");
	$sql="select * from stu";
	$result=mysqli_query($conn,$sql);
	$row=mysqli_fetch_all($result,MYSQLI_ASSOC);
	echo json_encode($row);
?>