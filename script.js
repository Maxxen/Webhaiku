

$(document).ready(function () {
    var rawJSON;
    var playlistArray = new Array();
    var playlist = "http://www.youtube.com/embed?playlist="
    var currentVideo = 0;
    var player;


    function youtube_parser(url) {
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
        var match = url.match(regExp);
        return (match && match[7].length == 11) ? match[7] : false;
    }

    $.ajaxSetup({
        async: false
    });

    $.getJSON("https://www.reddit.com/r/youtubehaiku/.json", function (links) {
        rawJSON = links;
    })

    console.log(rawJSON);

    for (var i = 0; i < rawJSON.data.children.length; i++) {
        var url = rawJSON.data.children[i].data.url;

        if (youtube_parser(url)) {
            playlistArray.push((youtube_parser(url)));
        }
    }
    
    playlist = playlist + playlistArray.join(",");

    
    console.log(playlistArray.join(","));
    
    console.log(playlistArray[0]);
    
    $("#videoWrapper").html('<iframe id="player" width="100%" height="100%" src="'+playlist+'"></iframe>')
});