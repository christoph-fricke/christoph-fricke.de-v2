<?php
session_start();
if (!isset($_SESSION['token']) || $_SESSION['token'] != $_POST['token']) {
    die('No token is provided.');
}

require_once('dbConnector.php');

$sql = 'SELECT title, image, category, date, link, text FROM projects';
$result = $pdo -> query($sql);

$return = $result -> fetchAll(PDO::FETCH_ASSOC);
echo json_encode($return);
?>