/*
* add (_) before li item name to convert it to a sub-item into ul with sub-menu class
* if the number of sub-items is more than 5, it will be in big-sub-menu class
*/
document.addEventListener("DOMContentLoaded", function() {
    const linkList3 = document.getElementById("LinkList3");

    if (linkList3) {
        const navHTML = document.createElement("ul");
        navHTML.id = "nav";
        let currentParent = navHTML;

        // Stack to keep track of nested levels
        const parentStack = [navHTML];

        // Iterate through each list item
        Array.from(linkList3.getElementsByTagName("li")).forEach((li) => {
            const text = li.textContent.trim();
            const underscoreCount = text.match(/^_+/)?.[0].length || 0;
            const content = text.slice(underscoreCount);
            const href = li.querySelector("a").getAttribute("href");

            // Adjust the current parent level based on underscore count
            while (underscoreCount < parentStack.length - 1) parentStack.pop();
            while (underscoreCount > parentStack.length - 1) {
                const newSubMenu = document.createElement("ul");
                newSubMenu.classList.add("sub-menu");
                parentStack[parentStack.length - 1].lastElementChild.appendChild(newSubMenu);
                parentStack.push(newSubMenu);
            }

            // Create the new list item and append it to the current parent level
            const newItem = document.createElement("li");
            newItem.innerHTML = `<a href="${href}">${content}</a>`;
            parentStack[parentStack.length - 1].appendChild(newItem);
        });

        // Replace the original content with the new structure
        linkList3.innerHTML = "";
        linkList3.appendChild(navHTML);

        // Add 'has-sub' class to parent links and adjust classes based on sub-menu size
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

