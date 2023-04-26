import axios from "axios";

const appContainer = document.getElementById("app");
const searchButton = document.getElementById("search-button");
const deleteButton = document.getElementById("del-search-button");
const createButton = document.getElementById("create-button");
const updateButton = document.getElementById("update-button")

axios.get("http://ec2-3-249-202-253.eu-west-1.compute.amazonaws.com/articles")
    .then(response => {
        const articles = response.data;
        articles.forEach(article => {
            const articleElement = document.createElement("div");
            articleElement.classList.add("grid-item");
            articleElement.innerHTML = `
          <h2>${article.title}</h2>
          <p>${article.description}</p>
          <p>Author: ${article.author}</p>
          <p>${article.body}</p>
        `;
            appContainer.appendChild(articleElement);
        });
    })
    .catch(error => {
        console.log(error);
    });

searchButton.addEventListener("click", () => {
    const articleId = document.getElementById("article-id-input").value;

    appContainer.innerHTML = "";

    const notFound = document.createElement("div");
    notFound.classList.add("grid-item");
    notFound.innerHTML = "<p>Not found! Try entering another id!</p>";
    appContainer.appendChild(notFound);

    let foundArticle = false;
    axios.get(`http://ec2-3-249-202-253.eu-west-1.compute.amazonaws.com/articles/${articleId}`)
        .then(response => {
            const article = response.data;
            const articleElement = document.createElement("div");
            articleElement.classList.add("grid-item");
            articleElement.innerHTML = `
        <h2>${article.title}</h2>
        <p>${article.description}</p>
        <p>Author: ${article.author}</p>
        <p>${article.body}</p>
      `;
            appContainer.innerHTML = "";
            appContainer.appendChild(articleElement);
            foundArticle = true;
        })
        .catch(error => {
            if (!foundArticle) {
                const errorElement = document.createElement("div");
                errorElement.classList.add("grid-item");
                errorElement.innerHTML = `
            <p>Article with ID ${articleId} not found.</p>
          `;
                appContainer.innerHTML = "";
                appContainer.appendChild(errorElement);
            } else {
                console.log(error);
            }
        });
});

deleteButton.addEventListener("click", () => {
    const articleId = document.getElementById("delete-article-id-input").value;

    axios.delete(`http://ec2-3-249-202-253.eu-west-1.compute.amazonaws.com/articles/${articleId}`)
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.log(error);
        });

    setTimeout(function() {
        window.location.reload();
    }, 500);
});

createButton.addEventListener("click", () => {
    const title = document.getElementById("create-article-title-input").value;
    const description = document.getElementById("create-description-title-input").value;
    const author = document.getElementById("create-author-title-input").value;
    const body = document.getElementById("create-body-title-input").value;

    axios.post("http://ec2-3-249-202-253.eu-west-1.compute.amazonaws.com/articles", {
            title: title,
            description: description,
            author: author,
            body: body
        })
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.log(error);
        });

    setTimeout(function() {
        window.location.reload();
    }, 500);
});

updateButton.addEventListener("click", () => {
    const articleId = document.getElementById("id-update-title-input").value;
    const title = document.getElementById("update-article-title-input").value;
    const description = document.getElementById("update-description-title-input").value;
    const author = document.getElementById("update-author-title-input").value;
    const body = document.getElementById("update-body-title-input").value;

    axios.put(`http://ec2-3-249-202-253.eu-west-1.compute.amazonaws.com/articles/${articleId}`, {
            title: title,
            description: description,
            author: author,
            body: body
        })
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.log(error);
        });

    setTimeout(function() {
        window.location.reload();
    }, 500);
});