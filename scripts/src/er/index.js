document.addEventListener('DOMContentLoaded', () => {
    chrome.tabs.executeScript(null, { file: "scripts/src/lib/jquery-3.1.1.min.js"}, () => {
        chrome.tabs.executeScript(null, { file: "scripts/src/er/remove.js" }, () => {
            console.log("All things removed.");
        });
    });



});

document.onmouseup = function() {
    const text = document.getSelection();
    if(text !== '') {
        // chrome.windows.create({'url': 'newPop.html', 'type': 'popup'}, function(window) {
        //
        // });
        console.log(text);
    }
};

document.addEventListener("mouseup", () => {
    const text = document.getSelection();

    console.log(text);
});
