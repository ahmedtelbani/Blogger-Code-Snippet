/*
* add (_) before li item name to convert it to a sub-item from ul with a sub-menu class
* if the number of sub-items is more than 5, it will be nested from an ul with a big-sub-menu class
* edited
*/

document.addEventListener("DOMContentLoaded", function() {
    const linkList3 = document.getElementById("LinkList3");

    if (linkList3) {
        const navHTML = document.createElement("ul");
        navHTML.id = "nav";
        
        let parentStack = [navHTML]; // Keeps track of each level's parent <ul>

        // Iterate through each list item
        Array.from(linkList3.getElementsByTagName("li")).forEach((li) => {
            const text = li.textContent.trim();
            const underscoreCount = (text.match(/^_+/) || [""])[0].length;
            const content = text.slice(underscoreCount);
            const href = li.querySelector("a").getAttribute("href");

            // Adjust parent stack for current underscore level
            while (underscoreCount < parentStack.length - 1) parentStack.pop();
            while (underscoreCount > parentStack.length - 1) {
                const newSubMenu = document.createElement("ul");
                newSubMenu.classList.add("sub-menu");
                parentStack[parentStack.length - 1].lastElementChild.appendChild(newSubMenu);
                parentStack.push(newSubMenu);
            }

            // Create new list item and append to current level
            const newItem = document.createElement("li");
            newItem.innerHTML = `<a href="${href}">${content}</a>`;
            parentStack[parentStack.length - 1].appendChild(newItem);
        });

        // Replace original content with new structure
        linkList3.innerHTML = "";
        linkList3.appendChild(navHTML);

        // Apply 'has-sub' class and 'big-sub-menu' adjustment
        linkList3.querySelectorAll("ul.sub-menu").forEach((subMenu) => {
            const parentLink = subMenu.parentElement.querySelector("a");
            if (parentLink) parentLink.classList.add("has-sub");

            if (subMenu.children.length > 5) {
                subMenu.classList.replace("sub-menu", "big-sub-menu");
            }
        });
    }
});
