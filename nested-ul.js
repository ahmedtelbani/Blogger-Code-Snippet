/*
* add (_) before li item name to convert it to a sub-item from ul with a sub-menu class
* if the number of sub-items is more than 5, it will be nested from an ul with a big-sub-menu class
*/

document.addEventListener("DOMContentLoaded", function() {
    const linkList3 = document.getElementById("LinkList3");

    if (linkList3) {
        let navHTML = "<ul id='nav'><li><ul class='sub-menu'>";

        // Iterate through each list item
        Array.from(linkList3.getElementsByTagName("li")).forEach((li) => {
            const text = li.textContent.trim();
            const prefix = text.charAt(0);
            const content = text.slice(1);
            const href = li.querySelector("a").getAttribute("href");

            if (prefix === "_") {
                // Add to sub-menu
                navHTML += `<li><a href="${href}">${content}</a></li>`;
            } else {
                // Close previous sub-menu and open a new one
                navHTML += `</ul></li><li><a href="${href}">${text}</a><ul class='sub-menu'>`;
            }
        });

        navHTML += "</ul></li></ul>";
        linkList3.innerHTML = navHTML;

        // Remove empty sub-menus and items
        linkList3.querySelectorAll("ul").forEach((ul) => {
            if (ul.textContent.trim() === "") ul.remove();
        });
        linkList3.querySelectorAll("li").forEach((li) => {
            if (li.textContent.trim() === "") li.remove();
        });

        // Add 'has-sub' class to parent links
        linkList3.querySelectorAll("ul.sub-menu").forEach((subMenu) => {
            const parentLink = subMenu.parentElement.querySelector("a");
            if (parentLink) parentLink.classList.add("has-sub");

            // Change class to 'big-sub-menu' if sub-menu has more than 5 items
            if (subMenu.children.length > 5) {
                subMenu.classList.replace("sub-menu", "big-sub-menu");
            }
        });
    }
});
