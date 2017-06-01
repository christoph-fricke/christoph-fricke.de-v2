<?php
if($_SERVER['REQUEST_METHOD'] !== 'GET' || !isset($_GET['type'])) {
    die('No error type provided');
} else {
    $errorMessage = '';
    $errorText = '';
    $errorNumber = $_GET['type'];
    switch ($errorNumber) {
        case 401:
            $errorMessage = 'Unauthorized';
            break;
        case 403:
            $errorMessage = 'Forbidden';
            break;
        case 404:
            $errorMessage = 'Not Found';
            break;
        default:
            $errorMessage = 'Something went wrong';
            break;
    }
}
?>

<!DOCTYPE html>
<html>

    <head>
        <title><?php echo $errorNumber . ' | ' .  $errorMessage ?></title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no" />
        <link rel="icon" type="image/png" sizes="32x32" href="/_assets/img/favicons/favicon.png" />

        <link rel="manifest" href="manifest.json" />
        <meta name="theme-color" content="#009688">
        <meta name="author" content="Christoph Fricke" />
        <meta name="description" content="Portfolio site of Christoph Fricke" />

        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Noto+Sans:400,500,700|Roboto:400,500,700" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />

        <style>
            body {
                margin: 20px;
                display: flex;
                align-items: center;
                flex-direction: column;
                background-color: #FAFAFA;
            }
            h1, h2, p, a {
                font-family: 'Roboto', 'Noto Sans', sans-serif;
                font-size: 16px;
                font-weight: 400;
                line-height: 1.5;
                margin: 0;
                color: rgba(0, 0, 0, 0.87);
            }
            h1 {
                font-size: 8rem;
                font-weight: 700;
                margin-bottom: 30px;
            }
            h2 {
                font-size: 3rem;
                font-weight: 700;
                margin-bottom: 15px;
            }
            p {
                font-size: 2rem;
                font-weight: 500;
                margin-bottom: 10px;
            }
            a {
                text-decoration: none;
                text-transform: uppercase;
                font-size: 1.5rem;
                font-weight: 500;
                padding: 0.2em 0.4em;
                background-color: #FFD740;
                border-radius: 2px;
                cursor: pointer;
                outline: none;
                transition: all 200ms cubic-bezier(0.4, 0.0, 0.2, 1);
                box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
            }
            a:hover {
                box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);
            }
        </style>
    </head>

    <body>
        <h1><?php echo $errorNumber ?></h1>
        <h2><?php echo $errorMessage ?></h2>
        <p>Come back home</p>
        <a href="/">home</a>
    </body>

</html>