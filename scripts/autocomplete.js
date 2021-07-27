
function norm_str(mystring) {
    var normalized = ""

    try {
      normalized = mystring.toUpperCase().normalize("NFD").replace(/\p{Diacritic}/gu, "")
    } catch (error) {
      normalized = mystring.toUpperCase()
    }

    return normalized
}

function isValidSong(songStr,testStr) {
    var nsong = norm_str(songStr.toUpperCase().replace("<I>", "").replace("</I>", ""))
    var songsarr = nsong.split(" ")
    var ts = norm_str(testStr)
    var t_firstword = ts.split(" ")[0]

    if ((nsong.includes(ts)) && (songsarr.some(x => x.startsWith(t_firstword)))){
        return true
    }
    return false
}


function get_match_inner_html(song,val) {
    // Make the text show with the matching string in Bold
    var match_pos = norm_str(song).search(norm_str(val))
    var innerHTML = song.substr(0,match_pos);
    innerHTML += "<strong>" + song.substr(match_pos, val.length) + "</strong>";
    innerHTML += song.substr(match_pos+val.length);
    innerHTML += "<input type='hidden' value='" + song + "'>";
    return innerHTML;
}

function autocomplete(auto_complete_field, dictionary_with_mapping, autosearch = false) {

    var inp_field = document.getElementById(auto_complete_field);
    var arr = Object.keys(dictionary_with_mapping).sort();
    var currentFocus = -1;

    inp_field.addEventListener("input", create_dynamic_dropdown);
    inp_field.addEventListener("keydown", move_selection);

    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function(e) {
        closeAllLists(e.target);
    });

    function create_dynamic_dropdown(e) {

        //    Close previous dropdown
        closeAllLists();
        var a, b, i, match_pos, val = this.value;
        if (!val) {return false;}

        currentFocus = -1;

        // Div element of the dropdown
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        this.parentNode.appendChild(a);

        // Search for all matching songs
        for (i = 0; i < arr.length; i++) {
            // If matches
            if (isValidSong(arr[i], val)) {
                // Div element of match
                b = document.createElement("DIV");
                b.innerHTML = get_match_inner_html(arr[i],val)

                /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function(e) {
                    inp_field.value = this.getElementsByTagName("input")[0].value;
                    closeAllLists();
                    if (autosearch) {findSong();}
                });
                a.appendChild(b);
            }
        }
    }

    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document, except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp_field) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }

    function move_selection(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) { //Down
            currentFocus++;
            addActive(x, currentFocus);
        } else if (e.keyCode == 38) { //up
            currentFocus--;
            addActive(x, currentFocus);
        } else if (e.keyCode == 13) { //Enter
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
            }
        }
    };

    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }

    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }


}