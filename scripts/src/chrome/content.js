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

    // const $tools = $(`
    //     <div class="tools">
    //         <div class="pre"></div>
    //         <div class="next"></div>
    //     </div>
    // `);
    // $(document.body).append($tools);

    let pageCount;

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
            $(document.body).scrollTop(0);
            const totalHeight = $(document.body).height();
            const pageHeight = window.innerHeight;
            pageCount = Math.ceil(totalHeight / pageHeight);
            $(document.body).height(pageCount * pageHeight);

            setTimeout(() => {
                $(`.l-side-margins`).addClass("reading");
            }, 500);
        }, 800);

    });

    const $detail = $(`
        <div class="word-detail">
            <div class="overlay"></div>
            <div class="tip-error">未找到所选单词</div>
            <header>
                <div class="word"></div>
                <div class="pronu">
                    <span class="tip-en">英</span>
                    <span class="mp mp-en"></span>
                    <span class="tip-an">美</span>
                    <span class="mp mp-an"></span>
                </div>
            </header>
            <main></main>
            <footer>powered by shanbay.com <a target="_blank">更多</a></footer>
        </div>
    `);
    $(document.body).append($detail);
    $detail.find(".overlay").hide();
    $detail.find(".tip-error").hide();
    $detail.hide();

    // Listen to mouseup to decide if show detail panel
    $(document.body).on("mouseup", (e) => {
        console.log("mouseup");
        const selection = getSelectionText();
        if (selection !== "") {
            const clientRect = window.getSelection().getRangeAt(0).getBoundingClientRect();
            const relative = document.body.parentNode.getBoundingClientRect();
            const position = {
                top: getDetailPanelTop(clientRect, relative),
                left: getDetailPanelLeft(clientRect, relative)
            };

            $detail.find(".overlay").show();
            $detail.find(".tip-error").hide();
            getWordDetail(selection.trim(), (res) => {
                $detail.find(".overlay").hide();
                if (res.status_code === 1) {
                    $detail.find(".tip-error").show();
                }
                else {
                    // show detail
                    $detail.find(".word").text(res.data.content);
                    $detail.find(".pronu > .mp-en").attr("data-play", res.data.audio_addresses.uk[0]);
                    $detail.find(".pronu > .mp-an").attr("data-play", res.data.audio_addresses.us[0]);
                    $detail.find("main").text(res.data.definition);
                    $detail.find("footer > a").attr("href", `https://www.shanbay.com/bdc/vocabulary/${res.data.conent_id}/`);

                    const uk_audio = $('<audio id="uk_audio" style="visibility:hidden" autoplay><source type="audio/mp3" /></audio>').replaceWith('#uk_audio')[0];;
		            const us_audio = $('<audio id="es_audio" style="visibility:hidden" autoplay><source type="audio/mp3" /></audio>').replaceWith('#us_audio')[0];
            		$detail.find(".pronu > .mp-en").click((e) => {
            			uk_audio.setAttribute("src", $detail.find(".pronu > .mp-en").attr("data-play"));
            			uk_audio.load();
            		});
                    $detail.find(".pronu > .mp-an").click((e) => {
            			us_audio.setAttribute("src", $detail.find(".pronu > .mp-an").attr("data-play"));
            			us_audio.load();
            		});
                }
            });

            if (!isShow) {
                showDetailPanel($detail, position);
            }

            $(document.body).on("mousedown", (e) => {
                console.log("mousedown");
                if (!$.contains($detail[0], e.target)) {
                    $detail.hide();
                    isShow = false;
                }
                else {
                    console.log("do nothing");
                }

            });
        }
    });

    let currentPage = 1;
    $(document.body).on("keyup", (e) => {
        if (e.keyCode === 39 && currentPage < pageCount) {
            currentPage = currentPage + 1;
            //document.body.scrollTop = window.innerHeight * (currentPage - 1);
            $(document.body).scrollTop(window.innerHeight * (currentPage - 1));
        }
        else if (e.keyCode === 37 && currentPage > 1) {
            currentPage = currentPage - 1;
            //document.body.scrollTop = window.innerHeight * (currentPage - 1);
            $(document.body).scrollTop(window.innerHeight * (currentPage - 1));
        }
    });

});

let isShow = false;

function showDetailPanel($detail, position) {
    if (isShow) {
        $detail.hide();
    }

    $detail.css({
        top: position.top,
        left: position.left
    });
    $detail.slideDown();
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

function getWordDetail(word, callback) {
    $.ajax({
        url: `https://api.shanbay.com/bdc/search/?word=${word}`
    }).done((data) => {
        callback(data);
    });
}
