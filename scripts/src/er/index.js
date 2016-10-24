document.addEventListener('DOMContentLoaded', () => {
    chrome.tabs.executeScript(null, { file: "scripts/src/lib/jquery-3.1.1.min.js"}, () => {
        chrome.tabs.executeScript(null, { file: "scripts/src/er/remove.js" }, () => {
            console.log("All things removed.");
        });
    });
});

document.addEventListener("keyup", (e) => {
    if (e.keyCode === 69) { // E or e
        //show bubble
        const text = document.getSelection();
        if (text !== "") {
            console.log(text.toString());
        }
    }
});
