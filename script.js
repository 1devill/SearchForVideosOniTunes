"use strict"

let $searchForm = $("#search-form");
let $videoList = $('#video-list');
let $carouselInner = $('#carousel-inner');
let videos = [];

$searchForm.on("submit", function(event) {
    event.preventDefault();

    let query = $(this).find("#search-term").val().replace(/\s/g, "+");

    console.log(query);
    getVideos(query);
});

function getVideos(query) {
    let url = `https://itunes.apple.com/search?limit=10&entity=musicVideo&term=${query}`;

    $.ajax({
        url,
        method: "GET",
        dataType: "json"
    }).done((response) => {
        console.log(response);
        videos = response.results;
        console.log(videos);
        addVideos(videos);
    }).fail((error) => {
        console.log(error);
    })
}

function addVideos(data) {
    $carouselInner.empty();
    data.forEach(video => {
        console.log(video.previewUrl);
        $("<div>").addClass("carousel-item")
            .appendTo($carouselInner);
    });
    let $carouselItem = $(".carousel-item");
    data.forEach((item, index) => {
        $("<video>")
            .attr("src", data[index].previewUrl)
            .attr("controls", true)
            .width("100%")
            .height("350px")
            .appendTo($carouselItem[index]);
    });
    $(".carousel-item:first-child").addClass("active");
}

let $left = $(".carousel-control-prev");
$left.on("click", function (){
    $('video').trigger('pause');
});

let $right = $(".carousel-control-next");
$right.on("click", function (){
    $('video').trigger('pause');
});