<?php
// Expects an error type as get parameter.
// 0 means "no blog defined"
// 1 means "non existing blog id"
$errorType = $_GET['type'];
if($errorType == 0) {
    $message = 'No blog id provided as get parameter.';
} else if($errorType == 1) {
    $message = 'The requested blog entry does not exits.';
} else {
    $message = 'Something went wrong.';
}
echo $message;
?>