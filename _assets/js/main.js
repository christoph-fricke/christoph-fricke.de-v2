var token;
var oldToken;
var userScrolled;
var pageScrolled;

// Internet Explorer 6-11
var isIE = /*@cc_on!@*/false || !!document.documentMode;

// Edge 20+
var isEdge = !isIE && !!window.StyleMedia;

if(isIE || isEdge) {
    alert("This website uses the css grid feature which is not supported by your browser. Please use another browser till the feature is supported.");
}

document.addEventListener("DOMContentLoaded", function () {
    getToken();
    getProjects();
    // Handles the Fixbar handling depending on the window-size on load
    if (window.innerWidth > 450) {
        window.addEventListener("scroll", setUserScrolled, false);
    } else {
        document.querySelector(".fixbar").classList.add("fixbar--active");
    }
}, false);

window.addEventListener("scroll", function () {
    pageScrolled = true;
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
document.querySelectorAll(".fixbar__link, .appbar__link, .sidedrawer__link").forEach(function (element) {
    element.addEventListener("click", function (event) {
        event.preventDefault();
        //Position of the target negative the appbar and 10px margin
        var targetid = element.getAttribute("href").slice(1);
        var target = document.querySelector("#" + targetid).offsetTop - 74;
        scrollHandler(getScrollTop(), target, 300);
    }, false);
});

//Controls the sidedrawer handling
document.querySelector(".fixbar__sidedrawer-trigger").addEventListener("click", function () {
    document.querySelector(".sidedrawer").classList.add("sidedrawer--active");
    document.querySelector(".sidedrawer__spaner").classList.add("sidedrawer__spaner--active");
}, false);

document.querySelectorAll(".sidedrawer__link, .sidedrawer__spaner").forEach(function (element) {
    element.addEventListener("click", function () {
        document.querySelector(".sidedrawer").classList.remove("sidedrawer--active");
        document.querySelector(".sidedrawer__spaner").classList.remove("sidedrawer__spaner--active");
    }, false);
});

//Triggers the projects slider
document.querySelector(".projects__icon--left").addEventListener("click", function () {
    projectsSlider("left");
}, false);

document.querySelector(".projects__icon--right").addEventListener("click", function () {
    projectsSlider("right");
}, false);

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
    if (pageScrolled) {
        pageScrolled = false;
        positionHandler();
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
    oldToken = token;
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
 * Checks the contactformular for invalid inputs
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
        sendMail(name, email, message, feedbackField);
    }
}

/**
 * Send the contact formular values to the server and sets the feedbackfield
 * @param {string} name Contact name input value
 * @param {string} email Contact email input value
 * @param {string} message Contact message value
 * @param {Element} feedbackField The Feedbackfield
 */
function sendMail(name, email, message, feedbackField) {
    if (typeof token !== 'undefined' && token !== oldToken) {
        var request = new XMLHttpRequest();
        request.open("POST", "_assets/php/sendMail.php", true);
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        request.send("name=" + name + "&email=" + email + "&message=" + message + "&token=" + token);
        request.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                getToken();
                switch (this.responseText) {
                    case 1:
                        feedbackField.innerHTML = "Success: Email has been send!";
                        feedbackField.style.color = "rgba(76, 175, 80, 0.87)";
                        document.querySelector("#name").value = "";
                        document.querySelector("#email").value = "";
                        document.querySelector("#message").value = "";
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
    } else {
        setTimeout(function () {
            sendMail(name, email, message, feedbackField);
        }, 50);
    }
}

/**
 * Checks if an email has a valid pattern
 */
function validateEmail(email) {
    var pattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(email);
}

/**
 * Checks if a name has a valid pattern
 */
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
        if (scrollTop === target) {
            return;
        }
        scrollHandler(getScrollTop(), target, duration - 10);
    }, 10);
}

/**
 * Determines which navigation link has to be active depending on the position
 */
function positionHandler() {
    var scrollTop = getScrollTop();
    var topMargin = 74;
    if (window.innerWidth < 600) {
        if (scrollTop >= document.querySelector("#home").offsetTop - topMargin) {
            document.querySelector(".fixbar__header-span").innerHTML = "home";
        }
        if (scrollTop >= document.querySelector("#about").offsetTop - topMargin) {
            document.querySelector(".fixbar__header-span").innerHTML = "about";
        }
        if (scrollTop >= document.querySelector("#blog").offsetTop - topMargin) {
            document.querySelector(".fixbar__header-span").innerHTML = "blog";
        }
        if (scrollTop >= document.querySelector("#projects").offsetTop - topMargin) {
            document.querySelector(".fixbar__header-span").innerHTML = "projects";
        }
        if (scrollTop >= document.querySelector("#contact").offsetTop - topMargin) {
            document.querySelector(".fixbar__header-span").innerHTML = "contact";
        }
    } else {
        if (scrollTop >= document.querySelector("#home").offsetTop - topMargin) {
            document.querySelector("#linkHome").classList.add("fixbar__link--active");
            document.querySelector("#linkAbout").classList.remove("fixbar__link--active");
        }
        if (scrollTop >= document.querySelector("#about").offsetTop - topMargin) {
            document.querySelector("#linkAbout").classList.add("fixbar__link--active");
            document.querySelector("#linkHome").classList.remove("fixbar__link--active");
            document.querySelector("#linkBlog").classList.remove("fixbar__link--active");
        }
        if (scrollTop >= document.querySelector("#blog").offsetTop - topMargin) {
            document.querySelector("#linkBlog").classList.add("fixbar__link--active");
            document.querySelector("#linkAbout").classList.remove("fixbar__link--active");
            document.querySelector("#linkProjects").classList.remove("fixbar__link--active");
        }
        if (scrollTop >= document.querySelector("#projects").offsetTop - topMargin) {
            document.querySelector("#linkProjects").classList.add("fixbar__link--active");
            document.querySelector("#linkBlog").classList.remove("fixbar__link--active");
            document.querySelector("#linkContact").classList.remove("fixbar__link--active");
        }
        if (scrollTop >= document.querySelector("#contact").offsetTop - topMargin) {
            document.querySelector("#linkContact").classList.add("fixbar__link--active");
            document.querySelector("#linkProjects").classList.remove("fixbar__link--active");
        }
    }
}

/**
 * Request the projects from the server. Call getProjectsTest for testing
 * @return Object containing all projects
 */
function getProjects() {
    if (typeof token !== 'undefined' && token !== oldToken) {
        var response;
        var request = new XMLHttpRequest();
        request.open("POST", "_assets/php/getProjects.php", true);
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        request.send("token=" + token);
        request.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                getToken();
                response = JSON.parse(this.responseText);
                projectsHandler(response);
            }
        };
    } else {
        setTimeout(function () {
            getProjects();
        }, 50);
    }

}

/**
 * Inserts the data recieved from the server into the page
 * @param {Object} data the data recieved from the server
 */
function projectsHandler(data) {
    var projectsContainer = document.querySelector("#projects");
    //X loops over every project so a card is generated for every project
    for (var x = 0; x < data.length; x++) {
        //Creates needed elements
        var card = document.createElement("div");
        card.setAttribute("class", "projects__card card");

        var imageContainer = document.createElement("div");
        imageContainer.setAttribute("class", "projects__image-container");
        imageContainer.setAttribute("style", "background-image: url(_assets/img/projects/" + data[x].image + ")");

        var headerContainer = document.createElement("div");
        headerContainer.setAttribute("class", "projects__header-container");

        var header = document.createElement("h4");
        header.setAttribute("class", "projects__header");
        header.appendChild(document.createTextNode(data[x].title));

        var projectsRow = document.createElement("div");
        projectsRow.setAttribute("class", "projects__info-row");

        var infoTextCategory = document.createElement("h5");
        infoTextCategory.setAttribute("class", "projects__info-text");
        infoTextCategory.appendChild(document.createTextNode("Category: "));

        var infoTextDate = document.createElement("h5");
        infoTextDate.setAttribute("class", "projects__info-text");
        infoTextDate.appendChild(document.createTextNode("Date: "));

        var infoTextLink = document.createElement("h5");
        infoTextLink.setAttribute("class", "projects__info-text");
        infoTextLink.appendChild(document.createTextNode("Link: "));

        var textSpanCategory = document.createElement("span");
        textSpanCategory.setAttribute("class", "projects__info-text projects__info-text--faded");
        textSpanCategory.appendChild(document.createTextNode(data[x].category));

        var textSpanDate = document.createElement("span");
        textSpanDate.setAttribute("class", "projects__info-text projects__info-text--faded");
        textSpanDate.appendChild(document.createTextNode(data[x].date));

        var textSpanLink = document.createElement("a");
        textSpanLink.setAttribute("class", "projects__info-text projects__info-text--faded projects__info-text--link");
        textSpanLink.setAttribute("href", data[x].link);
        textSpanLink.setAttribute("target", "_blank");
        textSpanLink.appendChild(document.createTextNode(data[x].link));

        var text = document.createElement("p");
        text.setAttribute("class", "projects__text");
        text.appendChild(document.createTextNode(data[x].text));

        //Build the DOM
        infoTextCategory.appendChild(textSpanCategory);
        infoTextDate.appendChild(textSpanDate);
        infoTextLink.appendChild(textSpanLink);

        projectsRow.appendChild(infoTextCategory);
        projectsRow.appendChild(infoTextDate);
        projectsRow.appendChild(infoTextLink);

        headerContainer.appendChild(header);
        imageContainer.appendChild(headerContainer);

        card.appendChild(imageContainer);
        card.appendChild(projectsRow);
        card.appendChild(text);

        projectsContainer.appendChild(card);
    }
    document.querySelectorAll(".projects__card")[0].classList.add("projects__card--active");
}

/**
 * Controls the projects slider
 * @param {string} direction The direction the projects card has to slide
 */
function projectsSlider(direction) {
    var cards = document.querySelectorAll(".projects__card");
    for (var n = 0; n < cards.length; n++) {
        if (cards[n].classList.contains("projects__card--active")) {
            cards[n].classList.remove("projects__card--active");

            if (direction === "left") {
                //Jumps to the end if we are already displaying the first image
                if (n === 0) {
                    cards[cards.length - 1].classList.add("projects__card--active");
                }
                cards[n - 1].classList.add("projects__card--active");
                break;
            } else if (direction === "right") {
                //Jumps to the beginning if we are already displaying the last image
                if (n === cards.length - 1) {
                    cards[0].classList.add("projects__card--active");
                }
                cards[n + 1].classList.add("projects__card--active");
                break;
            }
        }
    }
}