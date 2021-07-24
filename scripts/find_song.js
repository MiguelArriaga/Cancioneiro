

/*Function to find song*/
function findSong() {
    var search_inp = document.getElementById("SearchSongInput");
    var song_name = search_inp.value;
    var sg = encodeURI(songs_dict_nice_id[song_name])
    window.location.href = "index.html#"+sg;

}