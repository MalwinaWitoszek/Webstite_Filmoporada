/* sticky top navigation */
 
        window.onscroll = function() {stickyNav()};
        
        var navbar = document.getElementById("mainHeader");
        var sticky = navbar.offsetTop;
        
        function stickyNav() {
          if (window.pageYOffset >= sticky) {
            navbar.classList.add("sticky")
          } else {
            navbar.classList.remove("sticky")
          }
        }

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

        var button = document.getElementsByClassName("menu-icon")[0];
    
        button.onclick = function() {
            document.getElementsByClassName("menu")[0].classList.toggle("show");
            return false;
    }