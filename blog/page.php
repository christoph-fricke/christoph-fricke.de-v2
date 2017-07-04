<?php
require_once('../_assets/php/dbConnector.php');

$path = '';
$pathNext = '';
$pathPrevious = '';

if (!isset($_GET['blog'])) {
    $path = 'assets/error.php?type=0';
} else {
    $blogID = $_GET['blog'];
    try {
        $sql = 'SELECT path FROM blogs WHERE id = :id';
        $prepared = $pdo -> prepare($sql);
        $prepared -> execute(array('id' => $blogID));
        $result = $prepared -> fetch(PDO::FETCH_ASSOC);

        if ($result !== false) {
            $path = "entries/{$result['path']}";
            $idNext = getNextBlog($pdo, $blogID);
            $idPrevious = getPreviousBlog($pdo, $blogID);
        } else {
            $path = 'assets/error.php?type=1';
        }
    } catch (Exeption $e) {
        $path = 'assets/error.php?type=2';
    }
}

function getNextBlog($pdo, $blogID)
{
    $sql = 'SELECT id FROM blogs WHERE id > :id ORDER BY id LIMIT 1';
    $prepared = $pdo -> prepare($sql);
    $prepared -> execute(array('id' => $blogID));
    $result = $prepared -> fetch(PDO::FETCH_ASSOC);

    if ($result !== false) {
        return "page.php?blog={$result['id']}";
    } else {
        return '';
    }
}

function getPreviousBlog($pdo, $blogID)
{
    $sql = 'SELECT id FROM blogs WHERE id < :id ORDER BY id DESC LIMIT 1 ';
    $prepared = $pdo -> prepare($sql);
    $prepared -> execute(array('id' => $blogID));
    $result = $prepared -> fetch(PDO::FETCH_ASSOC);

    if ($result !== false) {
        return "page.php?blog={$result['id']}";
    } else {
        return '';
    }
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Christoph Fricke | Blog</title>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" href="../_assets/img/favicons/favicon.ico" />

    <link rel="manifest" href="../manifest.json" />
    <meta name="theme-color" content="#009688">
    <meta name="author" content="Christoph Fricke" />
    <meta name="description" content="Blog page by of Christoph Fricke" />

    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Noto+Sans:400,500,700|Roboto:400,500,700" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
    <link rel="stylesheet" href="../_assets/css/blogPage.css" />

    <script>
        (function (i, s, o, g, r, a, m) {
            i['GoogleAnalyticsObject'] = r;
            i[r] = i[r] || function () {
                (i[r].q = i[r].q || []).push(arguments)
            }, i[r].l = 1 * new Date();
            a = s.createElement(o),
                m = s.getElementsByTagName(o)[0];
            a.async = 1;
            a.src = g;
            m.parentNode.insertBefore(a, m)
        })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

        ga('create', 'UA-100417616-1', 'auto');
        ga('send', 'pageview');
    </script>
</head>
<body>
    <iframe class="display" src="<?php echo $path ?>"></iframe>
    <footer class="footer">
        <a class="footer__home" href="./">
            <svg class="footer__icon" version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192.000000 192.000000" preserveAspectRatio="xMidYMid meet">
                <g transform="translate(0.000000,192.000000) scale(0.100000,-0.100000)" stroke="none">
                    <path d="M785 1901 c-168 -35 -297 -96 -430 -202 -245 -195 -388 -548 -345 -854 52 -373 295 -674 637 -791 132 -45 23 -58 368 -51 218 10 419 92 590 241 l40 35 -84 85 -84 84 -61 -49 c-327 -264 -818 -189 -1051 161 -274 413 -59 968 425 1097 88 23 262 23 350 -1 92 -25 216 -88 278 -142 l54 -47 84 84 85 84 -55 50 c-61 57 -157 116 -255 158 -162 70 -380 93 -546 58z"/>
                    <path d="M600 960 l0 -480 120 0 120 0 0 180 0 180 120 0 120 0 0 120 0 120 -120 0 -120 0 0 60 0 60 240 0 240 0 0 120 0 120 -360 0 -360 0 0 -480z"/>
                </g>
            </svg>
        </a>
        <a class="footer__navigation button--flat" href="<?php echo $idPrevious ?>"><i class="material-icons">arrow_back</i>Previous</a>
        <a class="footer__navigation button--flat" href="<?php echo $idNext ?>">Next<i class="material-icons">arrow_forward</i></a>
    </footer>

    <script>
        document.addEventListener("DOMContentLoaded", function () {
            document.querySelectorAll(".footer__navigation").forEach(function(element) {
                if(element.getAttribute("href") === "") {
                    element.classList.add("footer__navigation--disabled");
                    element.addEventListener("click", function(event) {
                        event.preventDefault();
                    }, false);
                }
            });
        }, false);
    </script>
</body>
</html>
