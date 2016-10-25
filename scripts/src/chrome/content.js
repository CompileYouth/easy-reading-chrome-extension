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
});
