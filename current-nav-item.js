/*
  You should have the same class names
*/

document.addEventListener("DOMContentLoaded", function() {
        var currentUrl = window.location.pathname;  // after blog domain
        var navLis = document.querySelectorAll("header #Main-Nav ul li");
        navLis.forEach(function(li) {
  			var aLink = li.querySelector("a");
            if (aLink.getAttribute("href") === currentUrl) {
                li.classList.add("current");
            }
        });
    });
