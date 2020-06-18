window.onload = async () => {
  getGithubRepos("shakeanehinds");
};

// ======= Handling menu color changes on scrolling =====//

window.addEventListener("scroll", function (e) {
  var nav = document.getElementById("nav");
  var nav_links = document.getElementById("nav-links");
  var links = nav_links.getElementsByTagName("a");
  var i;
  if (
    document.documentElement.scrollTop ||
    document.body.scrollTop > window.innerHeight
  ) {
    nav.classList.add("nav-bg");
    for (i = 0; i < links.length; i++) {
      links[i].style.color = "white";
    }
  } else {
    nav.classList.remove("nav-bg");
    for (i = 0; i < links.length; i++) {
      links[i].style.color = "#23232e";
    }
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

async function getGithubRepos(user) {
  // get the latest repositories that are being worked on
  let response = await fetch(
    `https://api.github.com/users/${user}/repos?sort=pushed`
  );

  let repos = (await response.json()).slice(0, 3);
  localStorage.setItem("repocache", repos);
  for (let repo of repos) {
    console.log(repo);
  }
  // Fetch repositories

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
    console.log(cta);

    curr_repo = repo.name;
    let languages = await fetch(
      `https://api.github.com/repos/${user}/${curr_repo}/languages`
    );

    let langs = await languages.json();
    console.log(langs);

    for (let lang of Object.keys(langs)) {
      let tagIcon = document.createElement("div");
      tagIcon.classList.add("tag-icon");

      let lang_ = document.createElement("h6");

      // Attempting to add icons for langauges

      // let tagInnerIcon = document.createElement("i");
      // tagInnerIcon.classList.add(
      //   "fab " + lang.includes("") ? "fa-js" : "fa-code"
      // );
      // lang_.appendChild(tagInnerIcon);

      //

      lang_.innerText = lang;

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
    console.log(projectCard);

    document.getElementById("projects").appendChild(projectCard);
  }
}
