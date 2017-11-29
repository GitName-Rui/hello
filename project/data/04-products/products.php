<?php
header("Content-Type:application/json;charset=UTF-8");
require_once("../init.php");

@$kw=$_REQUEST["kw"];
$cond="";
if($kw){
  $kws=explode(" ",$kw);
  for($i=0;$i<count($kws);$i++){
    $kws[$i]="title like '%".$kws[$i]."%'";
  }
  $cond=" where ".join(" and ",$kws)." order by sold_count DESC";
}
$sql="SELECT count(*) FROM xz_laptop ".$cond;
$output=[
  "recordCount"=>0, 
  "pageSize"=>9, "pageCount"=>0,"pno"=>1,      
  "data"=>null   
];
$output["recordCount"]=
  sql_execute($sql)[0]["count(*)"];
$output["pageCount"]=ceil(
  $output["recordCount"]/$output["pageSize"]
);
$sql="SELECT lid,title,price,sold_count,is_onsale,(select md from xz_laptop_pic where laptop_id=lid limit 0,1) as pic FROM xz_laptop ".$cond;
@$pno=$_REQUEST["pno"];
if($pno){
  $output["pno"]=$pno;
  $start=$output["pageSize"]*($pno-1);
  $sql=$sql." limit $start,".$output["pageSize"];
}
$output["data"]=sql_execute($sql);
echo json_encode($output);
