var token;
var userScrolled;

document.addEventListener("DOMContentLoaded", function () {
    getToken();
    // Handles the Fixbar handling depending on the window-size on load
    if (window.innerWidth > 450) {
        window.addEventListener("scroll", setUserScrolled, false);
    } else {
        document.querySelector(".fixbar").classList.add("fixbar--active");
    }
}, false);

window.addEventListener("resize", function () {
    if (window.innerWidth > 450) {
        window.addEventListener("scroll", setUserScrolled, false);
        appBarHandler();
    } else {
        window.removeEventListener("scroll", setUserScrolled, false);
        document.querySelector(".fixbar").classList.add("fixbar--active");
    }
}, false);

function setUserScrolled() {
    userScrolled = true;
}

//Calls the appbarHandler every 100ms
setInterval(function () {
    if (userScrolled) {
        userScrolled = false;
        appBarHandler();
    }
}, 100);

/**
 * Checks wether the Fixbar has to be active and displays or removes it
 */
function appBarHandler() {
    console.log("AppbarHandler triggered");
    if (document.querySelector(".appbar").offsetTop <= getScrollTop()) {
        document.querySelector(".fixbar").classList.add("fixbar--active");
    } else if (document.querySelector(".appbar").offsetTop >= getScrollTop()) {
        document.querySelector(".fixbar").classList.remove("fixbar--active");
    }
}

/**
 * Get the scrollTop value depending on the browser
 * @return scrollTop value
 */
function getScrollTop() {
    if (document.querySelector("body").scrollTop != 0) {
        return document.querySelector("body").scrollTop;
    } else if (document.querySelector("html").scrollTop != 0) {
        return document.querySelector("html").scrollTop;
    } else {
        return 0;
    }
}

/**
 * Request a security token from the server and sets it as the global variable token.
 */
function getToken() {
    var request = new XMLHttpRequest();
    request.open("GET", "_assets/php/getToken.php", true);
    request.send();
    request.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            token = request.responseText;
        }
    };
}