$(() => {
    $(".top-banner-ad-container").remove();
    $(".ad-slot-container").remove();

    const $sb = $(`<div id="shanbay" />`);
    $(document.body).append($sb);

    $sb.click((e) => {
        //$sb.addClass("readable");

        $("body > .l-side-margins, body > footer, body > header").hide();

        // const $article = $("#article");
        //
        // $(document.body).remove();
        //
        // $sb.append($article);
    });
});
