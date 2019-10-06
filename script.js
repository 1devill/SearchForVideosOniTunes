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
    }).done((response) => {
        videos = response["results"];
        console.log(videos);
        console.log(response.resultCount);
        console.log(response);
        // addVideos(response.items);
    }).fail((error) => {
        console.log(error);
    })
}

// function addVideos(data) {
//     $carouselInner.empty();

//     data.forEach(video => {
//         $("<div>").addClass("carousel-item")
//             .attr("data-id", video.id)
//             .appendTo($carouselInner);
//     });
// }

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