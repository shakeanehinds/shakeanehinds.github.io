// ======= Handling menu collor changes on scrolling =====//

window.addEventListener('scroll', function (e) {
    var nav = document.getElementById('nav');
    if (document.documentElement.scrollTop || document.body.scrollTop > window.innerHeight) {
      nav.classList.add('nav-bg');
    } else {
      nav.classList.remove('nav-bg');
    }
  });
  
  // ======= Handling menu collor changes on scrolling =====//

//   Remove hover effect from hero section
    // needs fixing, check button should toggle when clicked
function kill_motion(){
    right = document.getElementById('right');
    left = document.getElementById('left');
    times = document.getElementById('timesbtn');
    times.classList.remove('fa-times-circle');
    times.classList.add('fa-check-circle')
    right.classList.toggle('right-hov');
    left.classList.toggle('left-hov');
}

//   Remove hover effect from hero section