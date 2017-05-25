var token;

document.addEventListener("DOMContentLoaded", function () {
    getToken();
}, false);

window.addEventListener("scroll", appBarHandler, false);

/**
 * Request a security token from the server and sets it as the global variable token.
 */
function getToken() {
    var request = new XMLHttpRequest();
    request.open("GET", "_assets/php/getToken.php", true);
    request.send();
    request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            token = request.responseText;
        }
    };
}

function appBarHandler() {
    console.log("User scrolled");
}