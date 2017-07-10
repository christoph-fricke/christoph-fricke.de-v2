<?php
// Expects an error type as a "get" parameter.
// 0 means "no blog defined"
// 1 means "non existing blog id"
$errorType = $_GET['type'];
if ($errorType == 0) {
    $message = 'No blog id provided as a parameter.';
} else if ($errorType == 1) {
    $message = 'The requested blog post does not exits.';
} else {
    $message = 'Something went wrong.';
}
?>

<!DOCTYPE html>
<html>
<head>
<title>Blog Error</title>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<link rel="icon" href="assets/img/favicon.ico" />

<meta name="author" content="Christoph Fricke" />

<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Noto+Sans:400,500,700|Roboto:400,500,700" />
<style>
    html, body {
        height: 100%;
        margin: 0;
    }
    body {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    h1 {
        font-family: 'Roboto', 'Noto Sans', sans-serif;
        font-size: 64px;
        text-align:center;
        color: rgba(0, 0, 0, 0.70);
        margin: 0 20px;
    }
    @media screen and (max-width: 600px) {
        h1 {
            font-size: 48px;
        }
    }
</style>
</head>
<body>
<h1><?php echo $message?></h1>
</body>
</html>
