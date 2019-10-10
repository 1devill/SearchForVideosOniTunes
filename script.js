"use strict"

let $searchForm = $("#search-form");
let $videoList = $('#video-list');
let $carouselInner = $('#carousel-inner');
let videos = [];
// let $carouselItem = $(".carousel-item");
// console.log($carouselItem);

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
        // console.log(response.resultCount);
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
    $("<video>")
            .attr("src", data[0].previewUrl)
            .appendTo(".carousel-item");
    // for (let i = 0; i < data.length; i++) {
    //     if ($(".carousel-item:has(video)")) {
    //         console.log("nothing");   
    //     } 
    //         $("<video>")
    //             .attr("src", data[i].previewUrl)
    //             .appendTo(".carousel-item");
    // }
}

// $carouselInner.on("click", "[data-id]", function(event) {
//     event.preventDefault();

//     let bookId = $(this).data("id");

//     let book = books.find((item) => item.id === bookId);
//     $currentBook.fadeIn();

//     $currentBook.find(".book-title").text(`${book.volumeInfo.title} 
//     | ${book.volumeInfo.authors ? book.volumeInfo.authors.join(", ") : "No author"}
//     ${book.volumeInfo.publishedDate}`)

//     $bookDescription.empty();
//     $("<img>").attr("src", book.volumeInfo.imageLinks.thumbnail)
//         .appendTo($bookDescription);

//     $("<p>").text(book.volumeInfo.description).appendTo($bookDescription);

//     $("<a>").attr("href", book.volumeInfo.previewLink)
//         .attr("target", "_blank")
//         .text("Read more...")
//         .addClass("read-link")
//         .appendTo($bookDescription);
// });