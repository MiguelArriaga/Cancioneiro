

/*Function to find song*/
function findSong(song_name) {
    var sg = encodeURI(songs_dict_nice_id[song_name])
    window.location.href = "index.html#"+sg;

}