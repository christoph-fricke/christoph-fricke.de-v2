<?php
session_start();

$strFrom = "";
$strReceiver = "christoph@frickeonline.de";
$strSubject = "";
$strMessage = "";
$strToken = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $strFrom = "From: ".test_input($_POST["email"]);
    $strMessage = test_input($_POST["message"]);
    $strSubject = "Website - Email from ".test_input($_POST["name"]);
    $strToken = $_POST["token"];
}

if (isset($_SESSION["token"]) && $strToken == $_SESSION["token"]) {
    try {
        mail($strReceiver, $strSubject, $strMessage, $strFrom);
        $status = 1;
    } catch(Exeption $e) {
        //Email couldn't been send
        $status = 0;
    }
} else {
    $status = 0;
}

echo $status;

function test_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}
?>