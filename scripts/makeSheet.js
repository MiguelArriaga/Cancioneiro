
const $songTable = $('#songTable');
const newTr = `
    <tr>
    <td class="text-center pt-3-half px-0">
      <div class="btn-group" role="group" aria-label="Basic example">
        <button type="button" class="btn btn-sm btn-primary px-2" onclick='moveSongUp(this);'>
          <i class="fas fa-arrow-up fa-lg" aria-hidden="true"></i>
        </button>
        <button type="button" class="btn btn-sm btn-primary px-2" onclick='moveSongDown(this);'>
          <i class="fas fa-arrow-down fa-lg" aria-hidden="true"></i>
        </button>
      </div>
    </td>
    <td class="text-center pt-3-half" contenteditable="true">[empty]</td>
    <td class="text-center pt-3-half" contenteditable="true" onClick="selectCell(this);"></td>
    <td class="text-center pt-3-half px-0 ">
        <button type="button" class="btn btn-rounded btn-danger btn-sm px-2" onclick='songDelete(this);'>
          <i class='fas fa-trash-alt fa-lg' aria-hidden="true"></i>
        </button>
    </td>
    </tr>
    `;

//    <td class="text-center pt-3-half">
//        <input type="search" class="form-control">
//    </td>

function loadGenSongSheetPage() {
  // First check if a <tbody> tag exists, add one if not
  if ($("#songTable tbody").length == 0) {
    $("#songTable").append("<tbody></tbody>");
  }

  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  for (const [key, value] of urlParams) {
    if (key[0] != "_") {
      var song_name = songs_dict_id_nice[key] || "";
      var mass_part = decodeURI(value) || "";

      addRow(mass_part, song_name)
    }
  }
}

function generateSongSheet() {
  var table = document.getElementById("songTable");
  var argslist = []
  var mp = ""
  var sg = ""
  rows = $('#songTable > tbody > tr')

  for (let i = 0; i < rows.length; i++) {
    [mp, sg_nice] = getRowData(rows.eq(i))
    sg = songs_dict_nice_id[sg_nice]
    argslist.push(sg + "=" + mp)
  }
  window.location.href = "Folha.html?" + argslist.join("&");
}

function saveSongSheet() {
  var table = document.getElementById("songTable");
  var argslist = []
  var mp = ""
  var sg = ""
  rows = $('#songTable > tbody > tr')

  for (let i = 0; i < rows.length; i++) {
    [mp, sg] = getRowData(rows.eq(i))
    argslist.push(sg + "=" + mp)
  }
  window.location.href = "MakeSongSheet.html?" + argslist.join("&");
}



function getRowData(row) {
  let row_cells = row.children('td')
  let section = row_cells.eq(1).text()
  let song = row_cells.eq(2).text()
  //  let song = row_cells.eq(2).children("input").val()
  return [section, song]
}

function setRowData(row, section = null, song = null) {
  let row_cells = row.children('td')
  if (section !== null) { row_cells.eq(1).text(section) }
  if (song !== null) { row_cells.eq(2).text(song) }
  //  if (song !== null) { row_cells.eq(2).children("input").val(song) }
}

function addRow(section = "", song = "") {
  $('#songTable > tbody').append(newTr);
  let last_row = $('#songTable > tbody > tr:last')
  setRowData(last_row, section, song)
  addAutoComplete(last_row.children('td').eq(2),Object.keys(songs_dict_nice_id).sort());
  // last_row.children('td').eq(2).autocomplete({ source: testcallback, delay: 5, minLength: 2 }).autocomplete("instance")._renderItem = renderfunc;
  // last_row.children('td').eq(2).autocomplete({ source: Object.keys(songs_dict_nice_id).sort() , delay: 5, minLength: 2});
  //  last_row.children('td').eq(2).children("input").autocomplete({ source: Object.keys(songs_dict_nice_id).sort() });
}


function songDelete(ctl) {
  // $(ctl).parents("tr").remove();
  $(ctl).parents('tr').detach();
}

function moveSongUp(ctl) {
  const $row = $(ctl).parents('tr');
  if ($row.index() === 0) {
    return;
  } $row.prev().before($row.get(0));
}

function moveSongDown(ctl) {
  const $row = $(ctl).parents('tr');
  $row.next().after($row.get(0));
}

function generateStandardMass() {
  // First check if a <tbody> tag exists, add one if not
  if ($("#songTable tbody").length == 0) {
    $("#songTable").append("<tbody></tbody>");
  }

  // Append songs to table
  addRow("Entrada");
  addRow("Kyrie");
  addRow("Glória");
  addRow("Salmo");
  addRow("Alleluia");
  addRow("Ofertório");
  addRow("Sanctus");
  addRow("Agnus Dei");
  addRow("Comunhão");
  addRow("Comunhão");
  addRow("Acção de Graças");
  addRow("Saída");

}
