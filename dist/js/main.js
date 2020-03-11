// ======= Handling menu color changes on scrolling =====//

window.addEventListener("scroll", function(e) {
  var nav = document.getElementById("nav");
  if (
    document.documentElement.scrollTop ||
    document.body.scrollTop > window.innerHeight
  ) {
    nav.classList.add("nav-bg");
  } else {
    nav.classList.remove("nav-bg");
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
