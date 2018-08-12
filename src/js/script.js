/* sticky top navigation */
var navbar = document.getElementById("topMenu");
var leftbar = document.getElementById("sideNav");
var topPos = navbar.offsetTop;

function stickyNav() {
  if (window.pageYOffset >= topPos) {
    navbar.classList.add("stickyTopMenu");
    leftbar.classList.add("stickyLeftNav");
  } else {
    navbar.classList.remove("stickyTopMenu")
    leftbar.classList.remove("stickyLeftNav")
  }
}

window.onscroll = function() {stickyNav()};


/* aside accordion navigation*/

var acc = document.getElementsByClassName("accHeader");

for (var i = 0, max = acc.length; i < max; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight){
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
}

/* Show/Hide menu hamburger */

var buttonHamburger = document.getElementsByClassName("menu-icon")[0];

buttonHamburger.onclick = function() {
    document.getElementsByClassName("menu")[0].classList.toggle("show");
    return false;
}