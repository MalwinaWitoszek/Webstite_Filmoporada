/* sticky top navigation */
 
        window.onscroll = function() {myFunction()};
        
        var navbar = document.getElementById("mainHeader");
        var sticky = navbar.offsetTop;
        
        function myFunction() {
          if (window.pageYOffset >= sticky) {
            navbar.classList.add("sticky")
          } else {
            navbar.classList.remove("sticky")
          }
        }

/* aside accordion navigation*/

        var acc = document.getElementsByClassName("accHeader");
        var i;
        
        for (i = 0; i < acc.length; i++) {
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