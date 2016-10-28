export default class Shanbay {
    constructor() {
        this._init();

        // Append Shanbay circle
        $(document.body).append(this.$sb);

        // Append word detail panel
        $(document.body).append(this.$detail);
        this.$detail.find(".overlay").hide();
        this.$detail.find(".tip-error").hide();
        this.$detail.hide();



        this.$sb.click(this._$sbClick.bind(this));
        $(document.body).on("mouseup", this._documentClick.bind(this));
    }

    _init() {
        this.$sb = $(`<div id="shanbay" />`);

        this._hiddenEles = [
            "body > header",
            "body > .l-side-margins > .content-footer",
            "#article > header > div.content__header .content__labels",
            "#article .content__main .content__secondary-column",
            "#article > .content__main .content__meta-container",
            "#article .content__main .gs-container .content__main-column .content__article-body aside",
            "#article > .content__main .submeta",
            "#adContent",
            "body > footer"
        ];

        this.$detail = $(`
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

        this.uk_audio = $('<audio id="uk_audio" style="visibility:hidden" autoplay><source type="audio/mp3" /></audio>').replaceWith('#uk_audio')[0];
        this.us_audio = $('<audio id="es_audio" style="visibility:hidden" autoplay><source type="audio/mp3" /></audio>').replaceWith('#us_audio')[0];

        this.detailPanelWidth = 200;
        this.detailPanelHeight = 120;
        this.gap = 10;

        this._show = false;
    }

    _hideOtherElements() {
        for (let i = 0; i < this._hiddenEles.length; i++) {
            $(this._hiddenEles[i]).hide();
        }
    }

    _$sbClick(e) {
        this.$sb.addClass("toReadable");
        $(`.l-side-margins`).css({
            opacity: 0,
            "z-index": 10000
        });

        setTimeout(() => {
            this._hideOtherElements();

            this.$sb.addClass("readable");
            $(document.body).scrollTop(0);
            const totalHeight = $(document.body).height();
            const pageHeight = window.innerHeight;
            this.pageCount = Math.ceil(totalHeight / pageHeight);
            $(document.body).height(this.pageCount * pageHeight);

            setTimeout(() => {
                $(`.l-side-margins`).addClass("reading");
            }, 500);
        }, 800);

    }

    _documentClick() {
        const selection = this.getSelectionText();
        if (selection !== "") {
            const clientRect = window.getSelection().getRangeAt(0).getBoundingClientRect();
            const relative = document.body.parentNode.getBoundingClientRect();
            const position = {
                top: this.getDetailPanelTop(clientRect, relative),
                left: this.getDetailPanelLeft(clientRect, relative)
            };

            this.$detail.find(".overlay").show();
            this.$detail.find(".tip-error").hide();
            this.getWordDetail(selection.trim(), (res) => {
                this.$detail.find(".overlay").hide();
                if (res.status_code === 1) {
                    this.$detail.find(".tip-error").show();
                }
                else {
                    // show detail
                    this.$detail.find(".word").text(res.data.content);
                    this.$detail.find(".pronu > .mp-en").attr("data-play", res.data.audio_addresses.uk[0]);
                    this.$detail.find(".pronu > .mp-an").attr("data-play", res.data.audio_addresses.us[0]);
                    this.$detail.find("main").text(res.data.definition);
                    this.$detail.find("footer > a").attr("href", `https://www.shanbay.com/bdc/vocabulary/${res.data.conent_id}/`);

                    this.$detail.find(".pronu > .mp-en").click((e) => {
                        this.uk_audio.setAttribute("src", this.$detail.find(".pronu > .mp-en").attr("data-play"));
                        this.uk_audio.load();
                    });
                    this.$detail.find(".pronu > .mp-an").click((e) => {
                        this.us_audio.setAttribute("src", this.$detail.find(".pronu > .mp-an").attr("data-play"));
                        this.us_audio.load();
                    });
                }
            });

            if (!this._isShow) {
                this.showDetailPanel(position);
            }

            $(document.body).on("mousedown", (e) => {
                if (!$.contains(this.$detail[0], e.target)) {
                    this.$detail.hide();
                    this._isShow = false;
                    $(document.body).off("mousedown");
                    this.$detail.find(".pronu > .mp-en").off("click");
                    this.$detail.find(".pronu > .mp-an").off("click");
                }

            });
        }
    }

    showDetailPanel(position) {
        if (this._isShow) {
            this.$detail.hide();
        }

        this.$detail.css({
            top: position.top,
            left: position.left
        });
        this.$detail.slideDown();
        this._isShow = true;
    }

    getSelectionText() {
        let text = "";
        if (window.getSelection) {
            text = window.getSelection().toString();
        } else if (document.selection && document.selection.type != "Control") {
            text = document.selection.createRange().text;
        }

        return text.trim();
    }

    getDetailPanelTop(clientRect, relative) {
        if (clientRect.top + clientRect.height + this.detailPanelHeight + this.gap > window.innerHeight) {
            // panel is lower than the last line
            return clientRect.bottom - relative.top - clientRect.height - this.detailPanelHeight - this.gap;
        }
        else {
            return clientRect.bottom - relative.top + this.gap;
        }
    }

    getDetailPanelLeft(clientRect, relative) {
        if (clientRect.left + this.detailPanelWidth + this.gap > window.innerWidth) {
            // panel is overrided by right border
            return window.innerWidth - this.detailPanelWidth - this.gap -20;
        }
        else {
            return clientRect.left - relative.left;
        }
    }

    getWordDetail(word, callback) {
        $.ajax({
            url: `https://api.shanbay.com/bdc/search/?word=${word}`
        }).done((data) => {
            callback(data);
        });
    }
}
