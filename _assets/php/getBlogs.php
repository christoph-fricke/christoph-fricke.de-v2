<?php
session_start();
if (!isset($_SESSION['token']) || $_SESSION['token'] != $_POST['token']) {
    die('No token is provided.');
}

try {
    require_once('dbConnector.php');
    $sql = 'SELECT title, date, summary, id FROM blogs';
    $result = $pdo -> query($sql);

    $return = $result -> fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($return);
} catch (PDOException $e) {
}
