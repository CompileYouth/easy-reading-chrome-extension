$(() => {
    $(".top-banner-ad-container").remove();
    $(".ad-slot-container").remove();

    const $sb = $(`<div id="shanbay" />`);
    $(document.body).append($sb);

    const hiddenEles = [
        "body > header",
        "body > .l-side-margins > .content-footer",
        "#article > header > div.content__header .content__labels",
        "#article .content__main .content__secondary-column",
        "#article > .content__main .content__meta-container",
        "#article .content__main .gs-container .content__main-column .content__article-body .element",
        "#article > .content__main .submeta",
        "body > footer"
    ];

    $sb.click((e) => {
        $sb.addClass("toReadable");
        $(`.l-side-margins`).css({
            opacity: 0,
            "z-index": 10000
        });

        setTimeout(() => {
            for (let i = 0; i < hiddenEles.length; i++) {
                $(hiddenEles[i]).hide();
            }
            $sb.addClass("readable");


            setTimeout(() => {
                $(`.l-side-margins`).addClass("reading");
            }, 500);
        }, 800);

    });

    const $detail = $(`
        <div class="word-detail">
            <div class="overlay"></div>
            <header>
                <span class="word"></span>
                <span class="microphone"></span>
            </header>
            <main></main>
        </div>
    `);

    // Listen to mouseup to decide if show detail panel
    $(document).on("mouseup", (e) => {
        const selection = getSelectionText();
        if (selection !== "") {
            const clientRect = window.getSelection().getRangeAt(0).getBoundingClientRect();
            const relative = document.body.parentNode.getBoundingClientRect();
            const direction = getDirection(clientRect, relative);
            $detail.css({
                top: getDetailPanelTop(clientRect, relative),
                left: getDetailPanelLeft(clientRect, relative)
            });
            showDetailPanel($detail, direction);
        }
    });
});

let isShow = false;

function showDetailPanel($detail, direction) {

    $(document.body).append($detail);
    isShow = true;
}

function getSelectionText() {
    let text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }

    return text.trim();
}

const detailPanelWidth = 200;
const detailPanelHeight = 120;
const gap = 10;

function getDetailPanelTop(clientRect, relative) {
    if (clientRect.top + clientRect.height + detailPanelHeight + gap > window.innerHeight) {
        // panel is lower than the last line
        return clientRect.bottom - relative.top - clientRect.height - detailPanelHeight - gap;
    }
    else {
        return clientRect.bottom - relative.top + gap;
    }
}

function getDetailPanelLeft(clientRect, relative) {
    if (clientRect.left + detailPanelWidth + gap > window.innerWidth) {
        // panel is overrided by right border
        return window.innerWidth - detailPanelWidth - gap -20;
    }
    else {
        return clientRect.left - relative.left;
    }
}

function getDirection(clientRect, relative) {
    if (clientRect.top + clientRect.height + detailPanelHeight + gap > window.innerHeight) {
        return "up";
    }
    else {
        return "down";
    }
}
