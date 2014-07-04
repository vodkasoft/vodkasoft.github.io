<?php
echo "holaaa";
$serverName = 'ALBIN-PC\MSSQLSERVER';
$connectionInfo = array("Database"=>"Homeworks_PRIME_DB");
$conn = sqlsrv_connecT($serverName, $connectionInfo);

if($conn){
	echo "Connection established<br/>";
}else{
	echo "Connection could not be established<br>";
	die(print_r(sqlsrv_errors(), true));
}
?>