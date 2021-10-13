
function getRoot(){
    const loc = window.location;

    if ((loc.hostname == "localhost") || (loc.hostname.startsWith("127.0.0"))){
        return ""
    }

    var path = loc.pathname

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
        if (key[0] != "_") {
            row = indextable.insertRow(currRow)
            row.insertCell(0).innerHTML = value
            songsection.innerHTML+="<p class='pre_title'>"+value+"</p>"

            if (key != 'undefined'){
                var new_name = songs_dict_id_nice[key].split(" - ")[0]
                link = '<a href="#'+key+'">' + new_name + '</a>'
                row.insertCell(1).innerHTML = link
                songsection.innerHTML+= "<div w3-include-html='"+base_loc+key+".html'></div>"
            }

            currRow +=1
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