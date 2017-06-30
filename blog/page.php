<?php
require_once('../_assets/php/dbConnector.php');

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
        } else {
            $path = 'assets/error.php?type=1';
        }
    } catch (Exeption $e) {
        $path = 'assets/error.php?type=2';
    }
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Christoph Fricke | Blog</title>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" href="../_assets/img/favicon.ico" />

    <link rel="manifest" href="../manifest.json" />
    <meta name="theme-color" content="#009688">
    <meta name="author" content="Christoph Fricke" />
    <meta name="description" content="Blog page by of Christoph Fricke" />

    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Noto+Sans:400,500,700|Roboto:400,500,700" />   <link rel="stylesheet" href="../_assets/css/blogPage.css" />

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
        <a href="">Previous Post</a>
        <a href="">Next Post</a>
    </footer>
</body>
</html>
