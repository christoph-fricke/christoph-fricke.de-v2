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

//Calls the contact event
document.querySelector(".contact__form").addEventListener("submit", function (event) {
    contactHandler(event);
}, false);


//Controls wether the appBarHandler should get called when the page gets resized after load
window.addEventListener("resize", function () {
    if (window.innerWidth > 450) {
        window.addEventListener("scroll", setUserScrolled, false);
        appBarHandler();
    } else {
        window.removeEventListener("scroll", setUserScrolled, false);
        document.querySelector(".fixbar").classList.add("fixbar--active");
    }
}, false);


//Detects the click of navigation links and adds an event to smooth scroll the page
document.querySelectorAll(".fixbar__link, .appbar__link").forEach(function (element) {
    element.addEventListener("click", function (event) {
        event.preventDefault();
        //Position of the target negative the appbar and 10px margin
        var target = document.querySelector("#" + element.getAttribute("href").slice(1)).offsetTop - 74;
        scrollHandler(getScrollTop(), target, 400);
    }, false);
});

/**
 * Controls the appBarHandler calls
 */
function setUserScrolled() {
    userScrolled = true;
}

//Calls the appbarHandler every 100ms when the scroll event gets triggered
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
    request.open("POST", "_assets/php/getToken.php", true);
    request.send();
    request.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            token = request.responseText;
        }
    };
}

/**
 * Checks the contactformular and sends the data to the server
 * @param {Event} event 
 */
function contactHandler(event) {
    event.preventDefault();
    var name = document.querySelector("#name").value;
    var email = document.querySelector("#email").value;
    var message = document.querySelector("#message").value;
    var feedbackField = document.querySelector(".contact__feedback");

    if (name.length < 1 || email.length < 1 || message.length < 1) {
        feedbackField.innerHTML = "No empty inputs allowed!";
        feedbackField.style.color = "rgba(255, 152, 0, 0.87)";
    } else if (!validateName(name)) {
        feedbackField.innerHTML = "Please enter a valid name!";
        feedbackField.style.color = "rgba(255, 152, 0, 0.87)";
    } else if (!validateEmail(email)) {
        feedbackField.innerHTML = "Please enter a valid email!";
        feedbackField.style.color = "rgba(255, 152, 0, 0.87)";
    } else {
        var request = new XMLHttpRequest();
        request.open("POST", "_assets/php/sendMail.php", true);
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        request.send("name=" + name + "&email=" + email + "&message=" + message + "&token=" + token);
        request.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                switch (this.responseText) {
                    case 1:
                        feedbackField.innerHTML = "Success: Email has been send!";
                        feedbackField.style.color = "rgba(76, 175, 80, 0.87)";
                        break;
                    case 0:
                        feedbackField.innerHTML = "Error: Email could not been send!";
                        feedbackField.style.color = "rgba(244, 67, 54, 0.87)";
                        break;
                    default:
                        feedbackField.innerHTML = "Error: Email could not been send!";
                        feedbackField.style.color = "rgba(244, 67, 54, 0.87)";
                        break;
                }
            }
        };
        getToken();
    }
}

function validateEmail(email) {
    var pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(email);
}

function validateName(text) {
    var pattern = /^[A-Za-z ]{1,}$/;
    return pattern.test(text);
}

/**
 * Scrolls the page smoothly to a defined element
 * @param {number} scrollTop The scrollTop value of the browser (you should use getScrollTop() to set it)
 * @param {number} target OffsetTop of the target
 * @param {number} duration Scrolling duration
 */
function scrollHandler(scrollTop, target, duration) {
    if (duration <= 0) {
        return;
    }
    var difference = target - scrollTop;
    var perTick = difference / duration * 10;

    setTimeout(function () {
        window.scrollTo(0, scrollTop + perTick);
        if (getScrollTop() === target) {
            return;
        }
        scrollHandler(getScrollTop(), target, duration - 10);
    }, 10);
}