<?php
// This file can be used to test the projectRequest. It returns some example projects
session_start();
// if(!isset($_SESSION['token']) || $_SESSION['token'] != $_POST['token']) {
//     return;
// }
$response = array('Pioneers', 'Website', 'March, 2017', 'http://shpioneers.de', 'shpioneers.jpg', 'I created the website together with a friend for a racing team in our school. They participate in the "F1 in schools" compettion. They were able to enchange the social interactions with the help of their new website.');

echo json_encode($response);
?>