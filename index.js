const displayResponse = document.querySelector("#response-container");
const form = document.querySelector("#search-form");
const searchField = document.querySelector("#search-keyword");
const error = document.querySelector(".error");
let searchedForText;

form.addEventListener("submit", function (e) {
  e.preventDefault();
  searchedForText = searchField.value;

  // if it is falsy value stop the function
  if (!searchedForText) return;

  // fetch an image and diplay it in the DOM
  fetch(
    `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`,
    {
      headers: {
        Authorization: "Client-ID mn4HLtOp8aKkJDiSHoQYwAcReGYcjDcD8_75RQiEpXw",
      },
    }
  )
    .then((imgs) => imgs.json())
    .then((imgs) => {
      const firstImg = imgs.results[0];
      displayResponse.innerHTML = `<figure>
                                     <img src="${firstImg.urls.regular}" alt="${firstImg.alt_description}">
                                     <figcaption>${searchedForText} by ${firstImg.user.name}</figcaption>
                                   </figure>`;
    })
    .catch(() => {
      displayResponse.innerHTML = `<div class="error-no-image">No Imgaes Avalible for ${searchedForText}</div>`;
    });

  // fetch articles and display them in the DOM
  fetch(
    `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=woU1cLaAX7cQFa5GKVE7PAu7zxPA3Ypz`
  )
    .then((articles) => articles.json())
    .then((articles) => {
      addArticles(articles.response.docs);
    })
    .catch(() => {
      displayResponse.insertAdjacentElement(
        "beforeend",
        `<div class="error-no-articles">No articles Avalible For ${searchedForText}</div>`
      );
    });

  function addArticles(articles) {
    const ul = document.createElement("ul");

    for (let article of articles) {
      const li = document.createElement("li");
      li.classList.add("article");

      const h2 = document.createElement("h2");

      const a = document.createElement("a");
      a.href = article.web_url;
      a.textContent = article.headline.main;

      h2.append(a);

      const p = document.createElement("p");
      p.textContent = article.snippet;

      li.append(h2, p);

      ul.append(li);
    }

    displayResponse.append(ul);
  }
});
