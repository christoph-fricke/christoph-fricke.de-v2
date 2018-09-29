document.addEventListener("DOMContentLoaded", function () {
    document.querySelector('.footer__copy').innerHTML = `&copy; ${new Date().getFullYear()}, Christoph Fricke`;
    getBlogs();
}, false);

/**
 * Request all blog entries from the server and parses them to blogHandler()
 */
function getBlogs() {
    blogHandler([]);
}

/**
 * Inserts the received blogs into the page. Inserts an errorMessage if there are no blog entries
 * @param {Object} data 
 */
function blogHandler(data) {
    var blogContainer = document.querySelector(".entries__container");
    if (data.length === 0) {
        var message = "No blogs have been puplished yet."
        var errorMessage = document.createElement("h3");
        errorMessage.setAttribute("class", "entries__errorMessage");
        errorMessage.appendChild(document.createTextNode(message));

        blogContainer.appendChild(errorMessage);
    } else {
        for (var x = 0; x < data.length; x++) {
            //Creates needed elements
            var card = document.createElement("div");
            card.setAttribute("class", "entries__card card");

            var title = document.createElement("h2");
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
}