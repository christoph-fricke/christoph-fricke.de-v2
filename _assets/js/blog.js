var token;
var oldToken;

document.addEventListener("DOMContentLoaded", function () {
    getToken();
    getBlogs();
}, false);

/**
 * Request a security token from the server and sets it as the global variable token.
 */
function getToken() {
    oldToken = token;
    var request = new XMLHttpRequest();
    request.open("POST", "../_assets/php/getToken.php", true);
    request.send();
    request.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            token = request.responseText;
        }
    };
}

/**
 * Request all blog entries from the server and parses them to blogHandler()
 */
function getBlogs() {
    if (typeof token !== 'undefined' && token !== oldToken) {
        var response;
        var request = new XMLHttpRequest();
        request.open("POST", "../_assets/php/getBlogs.php", true);
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        request.send("token=" + token);
        request.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                getToken();
                response = JSON.parse(this.responseText);
                blogHandler(response);
            }
        };
    } else {
        setTimeout(function () {
            getBlogs();
        }, 50);
    }
}

/**
 * Inserts the recieves blogs into the page
 * @param {Object} data 
 */
function blogHandler(data) {
    var blogContainer = document.querySelector(".entries__container");
    for (var x = 0; x < data.length; x++) {
        //Creates needed elements
        var card = document.createElement("div");
        card.setAttribute("class", "entries__card card");

        var title = document.createElement("h1");
        title.setAttribute("class", "entries__title");
        title.appendChild(document.createTextNode(data[x].title));

        var date = document.createElement("p");
        date.setAttribute("class", "entries__date");
        date.appendChild(document.createTextNode(data[x].date));

        var summary = document.createElement("p");
        summary.setAttribute("class", "entries__summary");
        summary.appendChild(document.createTextNode(data[x].summary));

        var buttonContainer = document.createElement("div");
        buttonContainer.setAttribute("class", "entries__buttonContainer");

        var button = document.createElement("a");
        button.setAttribute("class", "button--flat");
        button.setAttribute("href", "page.php?blog=" + data[x].id);
        button.appendChild(document.createTextNode("Read more"));

        //Build the DOM
        card.appendChild(title);
        card.appendChild(date);
        card.appendChild(summary);
        buttonContainer.appendChild(button);
        card.appendChild(buttonContainer);

        blogContainer.appendChild(card);
    }
}