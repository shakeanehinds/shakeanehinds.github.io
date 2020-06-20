window.onload = async () => {
  getGithubRepos("shakeanehinds");
  // insertDate();
};

// ======= Handling menu color changes on scrolling =====//

window.addEventListener("scroll", function (e) {
  var nav = document.getElementById("nav");
  var nav_links = document.getElementById("nav-links");
  var links = nav_links.getElementsByTagName("a");
  var i;
  var twitter = document.getElementById("twitter");
  if (
    document.documentElement.scrollTop ||
    document.body.scrollTop > window.innerHeight
  ) {
    nav.classList.add("nav-bg");
    for (i = 0; i < links.length; i++) {
      links[i].style.color = "white";
    }
    twitter.classList.add("slide-in-right");
  } else {
    nav.classList.remove("nav-bg");
    for (i = 0; i < links.length; i++) {
      links[i].style.color = "#23232e";
    }
    twitter.classList.remove("slide-in-right");
  }
});

// ======= Handling menu color changes on scrolling =====//

//   Remove hover effect from hero section

function kill_motion() {
  right = document.getElementById("right");
  left = document.getElementById("left");
  times = document.getElementById("timesbtn");
  times.classList.toggle("fa-times-circle");
  times.classList.toggle("fa-check-circle");
  right.classList.toggle("right-hov");
  left.classList.toggle("left-hov");
}

//   Remove hover effect from hero section
function cacheChecker() {
  let ticker =
    JSON.parse(localStorage.getItem("payload")) == null
      ? new Date().getTime() - 21600000
      : JSON.parse(localStorage.getItem("payload")).timestamp;
  let currentDate = new Date().getTime();

  if (currentDate - ticker >= 21600000) {
    console.log("Fetching fresh repos...");

    return true;
  }
  console.log("Not enough time passed to fetch repos from github");

  return false;
}
async function getGithubRepos(user) {
  let repos = {};
  let stale = false;

  if (cacheChecker()) {
    // get the latest repositories that are being worked on
    let response = await fetch(
      `https://api.github.com/users/${user}/repos?sort=pushed`
    );

    repos = (await response.json()).slice(0, 3);

    let payload = {
      timestamp: new Date().getTime(),
      repositories: repos,
    };
    localStorage.setItem("payload", JSON.stringify(payload));
    stale = true;
    // Fetch repositories
  } else {
    repos = JSON.parse(localStorage.getItem("payload")).repositories;
  }

  const projectListing = document.getElementById("project-listings");

  for (let repo of repos) {
    let projectCard = document.createElement("div");
    projectCard.classList.add("project-card");

    let cardImage = document.createElement("img");
    cardImage.setAttribute("src", "/assets/right.jpg");
    cardImage.setAttribute("alt", "Project Image");
    cardImage.classList.add("card-img");

    let content = document.createElement("div");
    content.classList.add("card-content");

    let title = document.createElement("h3");
    title.classList.add("card-title");
    title.innerText = repo.name.replace("-", " ");

    let commit = document.createElement("h4");
    commit.classList.add("card-subtitle");

    let updatedDate = repo.updated_at;
    updatedDate = updatedDate.slice(0, 10).split("-");
    updatedDate =
      updatedDate[2] + "." + updatedDate[1] + "." + updatedDate[0].slice(2);
    commit.innerText = "Last updated: " + updatedDate;

    let tags = document.createElement("div");
    tags.classList.add("tags");

    let body = document.createElement("p");
    body.classList.add("card-body");
    body.innerText = repo.description;

    let cta = document.createElement("div");
    cta.classList.add("project-cta");

    let link = document.createElement("a");
    link.setAttribute("href", repo.html_url);
    link.setAttribute("target", "_blank");

    let tip = document.createElement("h5");
    tip.classList.add("tip");
    let icon = document.createElement("i");
    icon.classList.add("fas");
    icon.classList.add("fa-long-arrow-alt-right");

    tip.innerText = "View Project ";
    tip.appendChild(icon);
    link.appendChild(tip);

    cta.appendChild(link);

    curr_repo = repo.name;
    let languages = {};
    let langs = [];

    if (stale) {
      languages = await fetch(
        `https://api.github.com/repos/${user}/${curr_repo}/languages`
      );
      langs = await languages.json();
      localStorage.setItem(curr_repo, JSON.stringify(langs));
    } else {
      langs = JSON.parse(localStorage.getItem(curr_repo));
    }

    for (let lang of Object.keys(langs)) {
      let tagIcon = document.createElement("div");
      tagIcon.classList.add("tag-icon");

      let lang_ = document.createElement("h6");

      // Attempting to add icons for langauges
      let results = iconfilter(lang);
      lang_.innerText = lang;
      lang_.innerHTML =
        `<i class="${results[0]} ${results[1]}"></i>          ` +
        lang_.innerHTML;

      // console.log(iconfilter(lang));

      tagIcon.appendChild(lang_);
      tags.appendChild(tagIcon);
    }

    content.appendChild(title);
    content.appendChild(commit);
    content.appendChild(tags);
    content.appendChild(body);
    content.appendChild(cta);
    projectCard.appendChild(cardImage);
    projectCard.appendChild(content);

    document.getElementById("projects").appendChild(projectCard);
  }
}

function iconfilter(icon) {
  let languageBank = [
    { name: "javascript", class: "fab fa-js" },
    { name: "css", class: "fab fa-css3-alt" },
    { name: "sass", class: "fab fa-sass" },
    { name: "angular", class: "fab fa-angular" },
    { name: "html", class: "fab fa-html5" },
    { name: "react", class: "fab fa-react" },
    { name: "python", class: "fab fa-python" },
    { name: "php", class: "fab fa-php" },
    { name: "java", class: "fab fa-java" },
  ];

  let iconClass = languageBank.filter(function (e) {
    return icon.toLowerCase().includes(e.name);
  });
  let res = iconClass.length > 0 ? iconClass[0].class : "fas fa-code";
  return res.split(" ");
}

// Get current date for footer

function insertDate() {
  let copy = document.getElementById("copyright");
  var d = new Date();
  copy.innerHTML =
    copy.innerHTML + ` | <i class="far fa-copyright"></i> ` + d.getFullYear();
}
