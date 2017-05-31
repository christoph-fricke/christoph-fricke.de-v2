<?php
require_once('dbConnector.php');

$sql = 'SELECT title, image, category, date, link, text FROM projects';
$result = $pdo -> query($sql);

$return = $result -> fetchAll(PDO::FETCH_ASSOC);
echo json_encode($return);
?>