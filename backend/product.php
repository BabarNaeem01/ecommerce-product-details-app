<?php
require "db.php";
$result = $connection->query("SELECT id, title, image, price, description FROM products LIMIT 1");
echo json_encode($result->fetch_assoc());
?>
