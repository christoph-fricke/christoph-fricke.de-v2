<?php
require_once('dbconfig.php');

try {
    $pdo = new PDO(DSN, USER, PASS);
    $pdo -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}
?>
