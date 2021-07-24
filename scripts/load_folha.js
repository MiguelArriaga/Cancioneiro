
function getRoot(){
    const loc = window.location;
    console.log(loc.protocol)
    console.log(loc.hostname)
    console.log(loc.pathname)

    if (loc.hostname == "localhost"){return ""}

    var path = loc.pathname
    console.log(path)
    if (path.endsWith(".html")) {
        path = path.substr(0, path.lastIndexOf("/"));
    }
    console.log(path)

    return loc.protocol + "//" + loc.hostname +"/" + path + "/";
}


function editSheet(){
    const queryString = window.location.search;
    window.location.href = "MakeSongSheet.html"+queryString;
}

function loadFolhaPage() {


    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    var songID = "";
    var songSection = "";
    var indextable = document.getElementById("songIndexTable");
    var songsection = document.getElementById("songsSection");

    var base_loc = getRoot()+ 'songs/'

    var currRow = 1;
    var link = ""

    for (const [key, value] of urlParams) {
        if (key[0] != "_" && key != 'undefined') {

            row = indextable.insertRow(currRow)
            row.insertCell(0).innerHTML = value
            var new_name = songs_dict_id_nice[key].split(" - ")[0]
            link = '<a href="#'+key+'">' + new_name + '</a>'
            row.insertCell(1).innerHTML = link
            currRow +=1

            songsection.innerHTML+="<p class='pre_title'>"+value+"</p>"
            songsection.innerHTML+= "<div w3-include-html='"+base_loc+key+".html'></div>"
        }
    }
    includeHTML();
}

function basicParamCheck(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    var songID = ""
    var songSection = ""

    for (const [key, value] of urlParams) {
        if (key[0] != "_") {
            console.log(key +"  :  "+ value);
            console.log(typeof key === 'undefined');
            console.log(key == 'undefined');
        }

    }
}