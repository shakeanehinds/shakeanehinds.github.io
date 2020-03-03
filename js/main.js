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