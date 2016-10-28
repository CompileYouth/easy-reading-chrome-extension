webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(3);
	module.exports = __webpack_require__(6);


/***/ },
/* 1 */,
/* 2 */,
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {"use strict";

	var _Er = __webpack_require__(5);

	var _Er2 = _interopRequireDefault(_Er);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	$(function () {
	    $(".top-banner-ad-container").remove();
	    $(".ad-slot-container").remove();

	    var easyReading = new _Er2.default();
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },
/* 4 */,
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Shanbay = function () {
	    function Shanbay() {
	        _classCallCheck(this, Shanbay);

	        this._init();

	        // Append Shanbay circle
	        $(document.body).append(this.$sb);

	        // Append word detail panel
	        $(document.body).append(this.$detail);
	        this.$detail.find(".overlay").hide();
	        this.$detail.find(".tip-error").hide();
	        this.$detail.hide();

	        this.$sb.click(this._$sbClick.bind(this));
	        $(document.body).on("mouseup", this._documentMouseup.bind(this));

	        $(document.body).on("keyup", this._documentKeyup.bind(this));
	    }

	    _createClass(Shanbay, [{
	        key: "_init",
	        value: function _init() {
	            this.$sb = $("<div id=\"shanbay\" />");

	            this._hiddenEles = ["body > header", "body > .l-side-margins > .content-footer", "#article > header > div.content__header .content__labels", "#article .content__main .content__secondary-column", "#article > .content__main .content__meta-container", "#article .content__main .gs-container .content__main-column .content__article-body aside", "#article > .content__main .submeta", "#adContent", "body > footer"];

	            this.$detail = $("\n            <div class=\"word-detail\">\n                <div class=\"overlay\"></div>\n                <div class=\"tip-error\">\u672A\u627E\u5230\u6240\u9009\u5355\u8BCD</div>\n                <header>\n                    <div class=\"word\"></div>\n                    <div class=\"pronu\">\n                        <span class=\"tip-en\">\u82F1</span>\n                        <span class=\"mp mp-en\"></span>\n                        <span class=\"tip-an\">\u7F8E</span>\n                        <span class=\"mp mp-an\"></span>\n                    </div>\n                </header>\n                <main></main>\n                <footer>powered by shanbay.com <a target=\"_blank\">\u66F4\u591A</a></footer>\n            </div>\n        ");

	            this.uk_audio = $('<audio id="uk_audio" style="visibility:hidden" autoplay><source type="audio/mp3" /></audio>').replaceWith('#uk_audio')[0];
	            this.us_audio = $('<audio id="es_audio" style="visibility:hidden" autoplay><source type="audio/mp3" /></audio>').replaceWith('#us_audio')[0];

	            this.detailPanelWidth = 200;
	            this.detailPanelHeight = 120;
	            this.gap = 10;

	            this.pageCount = -1;
	            this.currentPage = 1;

	            this._show = false;
	        }
	    }, {
	        key: "_hideOtherElements",
	        value: function _hideOtherElements() {
	            for (var i = 0; i < this._hiddenEles.length; i++) {
	                $(this._hiddenEles[i]).hide();
	            }
	        }
	    }, {
	        key: "_$sbClick",
	        value: function _$sbClick(e) {
	            var _this = this;

	            this.$sb.addClass("toReadable");
	            $(".l-side-margins").css({
	                opacity: 0,
	                "z-index": 10000
	            });

	            setTimeout(function () {
	                _this._hideOtherElements();

	                _this.$sb.addClass("readable");
	                $(document.body).scrollTop(0);
	                var totalHeight = $(document.body).height();
	                var pageHeight = window.innerHeight;
	                _this.pageCount = Math.ceil(totalHeight / pageHeight);
	                $(document.body).height(_this.pageCount * pageHeight);

	                setTimeout(function () {
	                    $(".l-side-margins").addClass("reading");
	                }, 300);
	            }, 500);
	        }
	    }, {
	        key: "_documentMouseup",
	        value: function _documentMouseup() {
	            var _this2 = this;

	            var selection = this.getSelectionText();
	            if (selection !== "") {
	                var clientRect = window.getSelection().getRangeAt(0).getBoundingClientRect();
	                var relative = document.body.parentNode.getBoundingClientRect();
	                var position = {
	                    top: this.getDetailPanelTop(clientRect, relative),
	                    left: this.getDetailPanelLeft(clientRect, relative)
	                };

	                if (!this._isShow) {
	                    this.$detail.find(".overlay").show();
	                }
	                this.$detail.find(".tip-error").hide();
	                this.getWordDetail(selection.trim(), function (res) {
	                    _this2.$detail.find(".overlay").hide();
	                    if (res.status_code === 1) {
	                        _this2.$detail.find(".tip-error").show();
	                    } else {
	                        // show detail
	                        _this2.$detail.find(".word").text(res.data.content);
	                        _this2.$detail.find(".pronu > .mp-en").attr("data-play", res.data.audio_addresses.uk[0]);
	                        _this2.$detail.find(".pronu > .mp-an").attr("data-play", res.data.audio_addresses.us[0]);
	                        _this2.$detail.find("main").text(res.data.definition);
	                        _this2.$detail.find("footer > a").attr("href", "https://www.shanbay.com/bdc/vocabulary/" + res.data.conent_id + "/");

	                        _this2.$detail.find(".pronu > .mp-en").click(function (e) {
	                            _this2.uk_audio.setAttribute("src", _this2.$detail.find(".pronu > .mp-en").attr("data-play"));
	                            _this2.uk_audio.load();
	                        });
	                        _this2.$detail.find(".pronu > .mp-an").click(function (e) {
	                            _this2.us_audio.setAttribute("src", _this2.$detail.find(".pronu > .mp-an").attr("data-play"));
	                            _this2.us_audio.load();
	                        });
	                    }
	                });

	                if (!this._isShow) {
	                    this.showDetailPanel(position);
	                }

	                $(document.body).on("mousedown", function (e) {
	                    if (!$.contains(_this2.$detail[0], e.target)) {
	                        _this2.$detail.hide();
	                        _this2._isShow = false;
	                        $(document.body).off("mousedown");
	                        _this2.$detail.find(".pronu > .mp-en").off("click");
	                        _this2.$detail.find(".pronu > .mp-an").off("click");
	                    }
	                });
	            }
	        }
	    }, {
	        key: "_documentKeyup",
	        value: function _documentKeyup(e) {
	            if (e.keyCode === 39 && this.currentPage < this.pageCount) {
	                this.currentPage = this.currentPage + 1;

	                $(document.body).stop().animate({ scrollTop: window.innerHeight * (this.currentPage - 1) }, "500", "swing");
	            } else if (e.keyCode === 37 && this.currentPage > 1) {
	                this.currentPage = this.currentPage - 1;

	                $(document.body).stop().animate({ scrollTop: window.innerHeight * (this.currentPage - 1) }, "500", "swing");
	            }
	        }
	    }, {
	        key: "showDetailPanel",
	        value: function showDetailPanel(position) {
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
	    }, {
	        key: "getSelectionText",
	        value: function getSelectionText() {
	            var text = "";
	            if (window.getSelection) {
	                text = window.getSelection().toString();
	            } else if (document.selection && document.selection.type != "Control") {
	                text = document.selection.createRange().text;
	            }

	            return text.trim();
	        }
	    }, {
	        key: "getDetailPanelTop",
	        value: function getDetailPanelTop(clientRect, relative) {
	            if (clientRect.top + clientRect.height + this.detailPanelHeight + this.gap > window.innerHeight) {
	                // panel is lower than the last line
	                return clientRect.bottom - relative.top - clientRect.height - this.detailPanelHeight - this.gap - 25;
	            } else {
	                return clientRect.bottom - relative.top + this.gap;
	            }
	        }
	    }, {
	        key: "getDetailPanelLeft",
	        value: function getDetailPanelLeft(clientRect, relative) {
	            if (clientRect.left + this.detailPanelWidth + this.gap > window.innerWidth) {
	                // panel is overrided by right border
	                return window.innerWidth - this.detailPanelWidth - this.gap - 20;
	            } else {
	                return clientRect.left - relative.left;
	            }
	        }
	    }, {
	        key: "getWordDetail",
	        value: function getWordDetail(word, callback) {
	            $.ajax({
	                url: "https://api.shanbay.com/bdc/search/?word=" + word
	            }).done(function (data) {
	                callback(data);
	            });
	        }
	    }]);

	    return Shanbay;
	}();

	exports.default = Shanbay;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ },
/* 6 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
]);