
function addAutoComplete(jq_item, source) {
    // jq_item = $('#songTable > tbody > tr:last').children('td').eq(2);
    jq_item.autocomplete({
        source: autoCompleteCallbackFactory(source),
        delay: 5,
        minLength: 2
    })
    jq_item.autocomplete( "option", "position", { my : "right top", at: "right bottom" } );
    jq_item.autocomplete("instance")._renderItem = renderfunc;
    return ac_object
}



function autoCompleteCallbackFactory(source) {
    return function (request, response) {
        var match_list = [];
        for (i = 0; i < source.length; i++) {
            // If matches
            if (isValidSong(source[i], request.term)) {
                match_list.push(get_item(source[i], request.term))
            }
        }
        response(match_list)
    }
}

function renderfunc(ul, item) {
    return $("<li>")
        .attr("data-value", item.value)
        .append("<a>" + item.label + "</a>")
        .appendTo(ul);
};


function norm_str(mystring) {
    var normalized = ""

    try {
        normalized = mystring.toUpperCase().normalize("NFD").replace(/\p{Diacritic}/gu, "")
    } catch (error) {
        normalized = mystring.toUpperCase()
    }

    return normalized
}

function get_match_html(song, val) {
    // Make the text show with the matching string in Bold
    var match_pos = norm_str(song).search(norm_str(val))
    var innerHTML = song.substr(0, match_pos);
    innerHTML += "<strong>" + song.substr(match_pos, val.length) + "</strong>";
    innerHTML += song.substr(match_pos + val.length);
    return innerHTML;
}

function get_item(song, val) {
    return {
        value: song,
        label: get_match_html(song, val)
    }
}

function isValidSong(songStr, testStr) {
    var nsong = norm_str(songStr.toUpperCase().replace("<I>", "").replace("</I>", ""))
    var songsarr = nsong.split(" ")
    var ts = norm_str(testStr)
    var t_firstword = ts.split(" ")[0]

    if ((nsong.includes(ts)) && (songsarr.some(x => x.startsWith(t_firstword)))) {
        return true
    }
    return false
}

function selectCell(element) {
    var selection = window.getSelection();
    var range = document.createRange();
    range.selectNodeContents(element);
    selection.removeAllRanges();
    selection.addRange(range);
}