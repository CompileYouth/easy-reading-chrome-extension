document.addEventListener('DOMContentLoaded', () => {
    chrome.tabs.executeScript(null, { file: "scripts/src/lib/jquery-3.1.1.min.js"}, () => {
        chrome.tabs.executeScript(null, { file: "scripts/src/er/remove.js" }, () => {
            console.log("All things removed.");
        });
    });



});

document.addEventListener("dblclick", () => {
    const text = document.getSelection();
    console.log(text);
    if (text !== "") {
        console.log(text.toString());
    }

});
