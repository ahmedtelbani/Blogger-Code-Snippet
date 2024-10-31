/*
* add (_) before li item name to convert it to a sub-item into ul with sub-menu class
* if the number of sub-items is more than 5, it will be in big-sub-menu class
*/
document.addEventListener("DOMContentLoaded", function() {
    var linkList = document.getElementById("LinkList3");
    
    if (linkList) {
        var e = "<ul id='nav'><li><ul id='sub-menu'>";
        var items = linkList.getElementsByTagName("li");
        
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            var t = item.textContent; // Get the text of the current list item
            var n = t.substr(0, 1);    // Get the first character
            var r = t.substr(1);       // Get the rest of the text
            var link = item.querySelector("a"); // Get the anchor element

            if (n === "_") {
                // If the first character is an underscore
                if (link) {
                    n = link.getAttribute("href"); // Get the href attribute
                    e += '<li><a href="' + n + '">' + r + "</a></li>"; // Add to the sub-menu
                }
            } else {
                // Otherwise, create a new menu item
                if (link) {
                    n = link.getAttribute("href"); // Get the href attribute
                    e += '</ul></li><li><a href="' + n + '">' + t + "</a><ul id='sub-menu'>"; // Open new sub-menu
                }
            }
        }

        e += "</ul></li></ul>"; // Close the menu structure
        linkList.innerHTML = e; // Set the generated HTML as the content of #LinkList3

        // Remove empty sub-menus
        var subMenus = linkList.getElementsByTagName("ul");
        for (var j = subMenus.length - 1; j >= 0; j--) {
            var subMenu = subMenus[j];
            if (subMenu.innerHTML.replace(/\s|&nbsp;/g, "").length === 0) {
                subMenu.remove();
            }
        }

        // Check sub-menu lengths and update classes
        var allSubMenus = linkList.querySelectorAll("ul#sub-menu");
        allSubMenus.forEach(function(subMenu) {
            var itemsInSubMenu = subMenu.getElementsByTagName("li");
            if (itemsInSubMenu.length > 5) {
                subMenu.id = 'big-sub-menu'; // Change the sub-menu ID to big-sub-menu
                subMenu.classList.add('big-sub-menu'); // Add the big-sub-menu class
            }
        });

        // Remove empty list items
        var listItems = linkList.getElementsByTagName("li");
        for (var k = listItems.length - 1; k >= 0; k--) {
            var listItem = listItems[k];
            if (listItem.innerHTML.replace(/\s|&nbsp;/g, "").length === 0) {
                listItem.remove();
            }
        }

        // Add 'has-sub' class to links that have a sub-menu
        var parentLinks = linkList.querySelectorAll('ul#sub-menu').parentNode.querySelectorAll('a');
        parentLinks.forEach(function(link) {
            link.classList.add('has-sub');
        });
    }
});
