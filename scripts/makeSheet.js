
// Next id for adding a new Song
var nextId = 1;
// ID of Song currently editing
var activeId = 0;


function loadGenSongSheetPage() {
    // First check if a <tbody> tag exists, add one if not
    if ($("#songTable tbody").length == 0) {
      $("#songTable").append("<tbody></tbody>");
    }

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    for (const [key, value] of urlParams) {
        if (key[0] != "_" && key != 'undefined') {
            var song_name = songs_dict_id_nice[key];
            var mass_part = decodeURI(value);
            $("#songTable tbody").append(songManualRow(nextId,mass_part,song_name));
            nextId += 1;
        }
    }
}

function generateSongSheet() {
    var table = document.getElementById("songTable");
    var argslist = []
    var mp = ""
    var sg = ""
    for (var i = 1, row; row = table.rows[i]; i++) {
        mp = encodeURI(row.cells[1].innerHTML)
        sg = encodeURI(songs_dict_nice_id[row.cells[2].innerHTML])
        argslist.push(sg+"="+mp)
    }
    window.location.href = "Folha.html?"+argslist.join("&");

//    var linkToSheet = document.getElementById("linkToSheet");
//    linkToSheet.setAttribute("href", "Folha.html?"+argslist.join("&"));
//    linkToSheet.innerHTML = "Link to Sheet";

}

function generateStandardMass() {
  // First check if a <tbody> tag exists, add one if not
  if ($("#songTable tbody").length == 0) {
    $("#songTable").append("<tbody></tbody>");
  }

  // Append song to table
  $("#songTable tbody").append(songManualRow(0,"Entrada",""));
  $("#songTable tbody").append(songManualRow(1,"Kyrie",""));
  $("#songTable tbody").append(songManualRow(2,"Glória",""));
  $("#songTable tbody").append(songManualRow(3,"Salmo",""));
  $("#songTable tbody").append(songManualRow(4,"Alleluia",""));
  $("#songTable tbody").append(songManualRow(5,"Ofertório",""));
  $("#songTable tbody").append(songManualRow(6,"Sanctus",""));
  $("#songTable tbody").append(songManualRow(7,"Agnus Dei",""));
  $("#songTable tbody").append(songManualRow(8,"Comunhão",""));
  $("#songTable tbody").append(songManualRow(9,"Comunhão",""));
  $("#songTable tbody").append(songManualRow(10,"Acção de Graças",""));
  $("#songTable tbody").append(songManualRow(11,"Saída",""));

  // Increment next ID to use
  nextId = 12;

}
function songManualRow(id,section,song) {
  var ret =
  "<tr>" +
    "<td>" +
      "<button type='button' onclick='songDisplay(this);' data-id='"+id+"'><i class='fas fa-edit'></i></button>" +
    "</td>" +
    "<td>" + section + "</td>" +
    "<td>" + song + "</td>" +
    "<td>" +
      "<button type='button' onclick='songDelete(this);' data-id='"+id+"'><i class='far fa-trash-alt'></i></button>" +
    "</td>" +
  "</tr>"
  return ret;
}



function songDisplay(ctl) {
  var row = $(ctl).parents("tr");
  var cols = row.children("td");

  activeId = $($(cols[0]).children("button")[0]).data("id");
  $("#SongSection").val($(cols[1]).text());
  $("#SearchSongInput").val($(cols[2]).text());

  // Change Update Button Text
  $("#updateButton").text("Update");
}

function songUpdate() {
  if ($("#updateButton").text() == "Update") {
    songUpdateInTable(activeId);
  }
  else {
    songAddToTable();
  }

  // Clear form fields
  formClear();

  // Focus to song name field
  $("#SearchSongInput").focus();
}

// Add song to <table>
function songAddToTable() {
  // First check if a <tbody> tag exists, add one if not
  if ($("#songTable tbody").length == 0) {
    $("#songTable").append("<tbody></tbody>");
  }

  // Append song to table
  $("#songTable tbody").append(
    songBuildTableRow(nextId));

  // Increment next ID to use
  nextId += 1;
}

// Update song in <table>
function songUpdateInTable(id) {
  // Find Song in <table>
  var row = $("#songTable button[data-id='" + id + "']")
            .parents("tr")[0];

  // Add changed song to table
  $(row).after(songBuildTableRow(id));
  // Remove original song
  $(row).remove();

  // Clear form fields
  formClear();

  // Change Update Button Text
  $("#updateButton").text("Add");
}

// Build a <table> row of Song data
function songBuildTableRow(id) {
  var ret = songManualRow(id,$("#SongSection").val(),$("#SearchSongInput").val())
  return ret;
}

// Delete song from <table>
function songDelete(ctl) {
  $(ctl).parents("tr").remove();
}

    // Clear form fields
    function formClear() {
      $("#SearchSongInput").val("");
      $("#SongSection").val("");
      $("#url").val("");
    }