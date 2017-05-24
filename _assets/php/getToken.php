<?php
session_start();
$length = 32;
$secure = true;

$token = bin2hex(openssl_random_pseudo_bytes($length, $secure));

echo $token;
$_SESSION['token'] = $token;
?>