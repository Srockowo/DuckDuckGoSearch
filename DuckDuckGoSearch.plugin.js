/**
 * @name DuckDuckGoSearch
 * @author Srock
 * @version 1.0.0
 * @description Replaces "Search with Google" feature when right clicking a selection with the DuckDuckGo search engine.
 * @source https://github.com/Srockowo/DuckDuckGoSearch
 * @updateUrl https://github.com/Srockowo/DuckDuckGoSearch/DuckDuckGoSearch.plugin.js
 */

module.exports = (meta) => {
    function searchWithDDG(event) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();

        const selection = window.getSelection().toString();

        window.open(`https://duckduckgo.com/?q=${selection}`, "_blank");
    }

    function replaceGoogle(searchButton) {
        const child = searchButton.children[0];
        const text = child.innerText;
        child.innerText = text.replace("Google", "DuckDuckGo");

        searchButton.addEventListener("click", searchWithDDG);
    }

    function awaitSearchPopup(event) {
        // if it's not a right click, bye bye.
        if (event.button != 2) return;

        const selection = window.getSelection().toString();

        // if nothing selected, bye bye.
        if (!selection) return;

        let searchButton;
        const id = setInterval(() => {
            searchButton = document.querySelector("#message-search-google");
            if (!searchButton) return;

            clearInterval(id);
            replaceGoogle(searchButton);
        }, 10);
    }

    return {
        start() {
            window.addEventListener("mousedown", awaitSearchPopup);
        },

        stop() {
            window.removeEventListener("mousedown", awaitSearchPopup);
        },
    };
};
