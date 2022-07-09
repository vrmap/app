
var famiglie = []
function Upload() {
    //Reference the FileUpload element.
    var fileUpload = document.getElementById("fileUpload");
    var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.xls|.xlsx)$/;
    if (regex.test(fileUpload.value.toLowerCase())) {
        if (typeof (FileReader) != "undefined") {
            var reader = new FileReader();

            //For Browsers other than IE.
            if (reader.readAsBinaryString) {
                reader.onload = function (e) {
                    ProcessExcel(e.target.result);
                };
                reader.readAsBinaryString(fileUpload.files[0]);
            } else {
                //For IE Browser.
                reader.onload = function (e) {
                    var data = "";
                    var bytes = new Uint8Array(e.target.result);
                    for (var i = 0; i < bytes.byteLength; i++) {
                        data += String.fromCharCode(bytes[i]);
                    }
                    ProcessExcel(data);
                };
                reader.readAsArrayBuffer(fileUpload.files[0]);
            }
        } else {
            alert("This browser does not support HTML5.");
        }
    } else {
        alert("Please upload a valid Excel file.");
    }
};

function ProcessExcel(data) {
    //Read the Excel File data.
    var workbook = XLSX.read(data, {
        type: 'binary', raw: true
    });

    //Fetch the name of First Sheet.
    var firstSheet = workbook.SheetNames[0];
    var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheet[0]]);

    //Read all rows from First Sheet into an JSON array.
    var excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet], { header: 1 }).splice(1);// crea un oggetto json contenente tutte le righe del excel salta la prima riga

    famiglie = excelRows
    mostra_mia_lista()
}
function mostra_mia_lista() {
    var excelRows = famiglie

    var mia_lista = [];
    for (var i = 0; i < excelRows.length; i++) {
        mia_lista.push({
            id: excelRows[i][0],
            codice_fiscale: excelRows[i][0],
            cognome: excelRows[i][2],
            nome: excelRows[i][3],
            ruolo: "Titolare",
            data_nascita: excelRows[i][5],
            //anno_nascita: excelRows[i][5].substr(0, 4),
            eta: excelRows[i][6],
            luogo_nascita: excelRows[i][7],
            nazione_nascita: excelRows[i][8],
            nazionalita: excelRows[i][9],
            sesso: excelRows[i][10],
            presentato_da: excelRows[i][23],
            sospeso: excelRows[i][25],
            scadenza: excelRows[i][24],
            cognome_titolare: excelRows[i][2],
            nome_titolare: excelRows[i][3]
        });
        if (excelRows[i][35] != undefined && excelRows[i][35] != "") {
            mia_lista.push({
                id: excelRows[i][0],
                codice_fiscale: excelRows[i][35],
                cognome: excelRows[i][36],
                nome: excelRows[i][37],
                ruolo: excelRows[i][38],
                data_nascita: excelRows[i][39],
                eta: excelRows[i][40],
                luogo_nascita: excelRows[i][41],
                nazione_nascita: excelRows[i][42],
                nazionalita: excelRows[i][43],
                sesso: excelRows[i][44],
                presentato_da: excelRows[i][23],
                sospeso: excelRows[i][25],
                scadenza: excelRows[i][24],
                cognome_titolare: excelRows[i][2],
                nome_titolare: excelRows[i][3]
            });
        }
        if (excelRows[i][45] != undefined && excelRows[i][45] != "") {
            mia_lista.push({
                id: excelRows[i][0],
                codice_fiscale: excelRows[i][45],
                cognome: excelRows[i][46],
                nome: excelRows[i][47],
                ruolo: excelRows[i][48],
                data_nascita: excelRows[i][49],
                eta: excelRows[i][50],
                luogo_nascita: excelRows[i][51],
                nazione_nascita: excelRows[i][52],
                nazionalita: excelRows[i][53],
                sesso: excelRows[i][54],
                presentato_da: excelRows[i][23],
                sospeso: excelRows[i][25],
                scadenza: excelRows[i][24],
                cognome_titolare: excelRows[i][2],
                nome_titolare: excelRows[i][3]
            });
        }
        if (excelRows[i][55] != undefined && excelRows[i][55] != "") {
            mia_lista.push({
                id: excelRows[i][0],
                codice_fiscale: excelRows[i][55],
                cognome: excelRows[i][56],
                nome: excelRows[i][57],
                ruolo: excelRows[i][58],
                data_nascita: excelRows[i][59],
                eta: excelRows[i][60],
                luogo_nascita: excelRows[i][61],
                nazione_nascita: excelRows[i][62],
                nazionalita: excelRows[i][63],
                sesso: excelRows[i][64],
                presentato_da: excelRows[i][23],
                sospeso: excelRows[i][25],
                scadenza: excelRows[i][24],
                cognome_titolare: excelRows[i][2],
                nome_titolare: excelRows[i][3]
            });
        }
        if (excelRows[i][65] != undefined && excelRows[i][65] != "") {
            mia_lista.push({
                id: excelRows[i][0],
                codice_fiscale: excelRows[i][65],
                cognome: excelRows[i][66],
                nome: excelRows[i][67],
                ruolo: excelRows[i][68],
                data_nascita: excelRows[i][69],
                eta: excelRows[i][70],
                luogo_nascita: excelRows[i][71],
                nazione_nascita: excelRows[i][72],
                nazionalita: excelRows[i][73],
                sesso: excelRows[i][74],
                presentato_da: excelRows[i][23],
                sospeso: excelRows[i][25],
                scadenza: excelRows[i][24],
                cognome_titolare: excelRows[i][2],
                nome_titolare: excelRows[i][3]
            });
        }
        if (excelRows[i][75] != undefined && excelRows[i][75] != "") {
            mia_lista.push({
                id: excelRows[i][0],
                codice_fiscale: excelRows[i][75],
                cognome: excelRows[i][76],
                nome: excelRows[i][77],
                ruolo: excelRows[i][78],
                data_nascita: excelRows[i][79],
                eta: excelRows[i][80],
                luogo_nascita: excelRows[i][81],
                nazione_nascita: excelRows[i][82],
                nazionalita: excelRows[i][83],
                sesso: excelRows[i][84],
                presentato_da: excelRows[i][23],
                sospeso: excelRows[i][25],
                scadenza: excelRows[i][24],
                cognome_titolare: excelRows[i][2],
                nome_titolare: excelRows[i][3]
            });
        }
        if (excelRows[i][85] != undefined && excelRows[i][85] != "") {
            mia_lista.push({
                id: excelRows[i][0],
                codice_fiscale: excelRows[i][85],
                cognome: excelRows[i][86],
                nome: excelRows[i][87],
                ruolo: excelRows[i][88],
                data_nascita: excelRows[i][89],
                eta: excelRows[i][90],
                luogo_nascita: excelRows[i][91],
                nazione_nascita: excelRows[i][92],
                nazionalita: excelRows[i][93],
                sesso: excelRows[i][94],
                presentato_da: excelRows[i][23],
                sospeso: excelRows[i][25],
                scadenza: excelRows[i][24],
                cognome_titolare: excelRows[i][2],
                nome_titolare: excelRows[i][3]
            });
        }
        if (excelRows[i][95] != undefined && excelRows[i][95] != "") {
            mia_lista.push({
                id: excelRows[i][0],
                codice_fiscale: excelRows[i][95],
                cognome: excelRows[i][96],
                nome: excelRows[i][97],
                ruolo: excelRows[i][98],
                data_nascita: excelRows[i][99],
                eta: excelRows[i][100],
                luogo_nascita: excelRows[i][101],
                nazione_nascita: excelRows[i][102],
                nazionalita: excelRows[i][103],
                sesso: excelRows[i][104],
                presentato_da: excelRows[i][23],
                sospeso: excelRows[i][25],
                scadenza: excelRows[i][24],
                cognome_titolare: excelRows[i][2],
                nome_titolare: excelRows[i][3]
            });
        }
        if (excelRows[i][105] != undefined && excelRows[i][105] != "") {
            mia_lista.push({
                id: excelRows[i][0],
                codice_fiscale: excelRows[i][105],
                cognome: excelRows[i][106],
                nome: excelRows[i][107],
                ruolo: excelRows[i][108],
                data_nascita: excelRows[i][109],
                eta: excelRows[i][110],
                luogo_nascita: excelRows[i][111],
                nazione_nascita: excelRows[i][112],
                nazionalita: excelRows[i][113],
                sesso: excelRows[i][104],
                presentato_da: excelRows[i][23],
                sospeso: excelRows[i][25],
                scadenza: excelRows[i][24],
                cognome_titolare: excelRows[i][2],
                nome_titolare: excelRows[i][3]
            });
        }
    }
    console.log("mia_lista")
    console.log(mia_lista)
    //console.log(mia_lista[i].data_nascita)


    if (mia_lista) {
        const visualizzaNum = document.querySelector('#num');
        const visualizzaId = document.querySelector('#id');
        const visualizzaCf = document.querySelector('#cf');
        const visualizzaCog = document.querySelector('#cog');
        //const visualizzaNomCf = document.querySelector('#cf');
        //const visualizzaRuo = document.querySelector('#cog');

        if (visualizzaNum.checked == false) var intestazioneNum = '<th style="display:none;">Num</th>';
        else var intestazioneNum = '<th>Num</th>';
        if (visualizzaId.checked == false) var intestazioneId = '<th style="display:none;">Id</th>';
        else var intestazioneId = '<th>Id</th>';
        if (visualizzaCf.checked == false) var intestazioneCf = '<th style="display:none;">Codice Fiscale</th>';
        else var intestazioneCf = '<th>Codice Fiscale</th>';
        if (visualizzaCog.checked == false) var intestazioneCog = '<th style="display:none;">Cognome</th>';
        else var intestazioneCog = '<th>Cognome</th>';




        var result = "<table id='tabella' class='display'>" +
            "<thead id = 'riga_intestazione'>" +
            "<tr>" +                               //Change table headings to match witht he Google Sheet
            //"<th>Delete</th>"+
            intestazioneNum +
            intestazioneId +
            intestazioneCf +
            //"<th>i</th>"+                      
            intestazioneCog +
            "<th>Nome</th>" +
            "<th>Ruolo</th>" +
            "<th>Data nascita</th>" +
            "<th>Anno nascita</th>" +
            "<th align='center'>Età</th>" +
            "<th>Luogo nascita</th>" +
            "<th>Nazione nascita</th>" +
            "<th>Nazionalità</th>" +
            "<th>Sesso</th>" +
            "<th>Presentato_da</th>" +
            "<th>Sospeso</th>" +
            "<th>Età precisa</th>" +
            "<th>Scadenza</th>" +
            "<th>Cognome Titolare</th>" +
            "<th>Nome Titolare</th>" +

            "</tr>" +
            "</thead>";

        //if (mia_lista[i].data_nascita !== undefined) var annoNascita = mia_lista[i].data_nascita.substr(0, 4)
        //console.log(annoNascita)
        var k = 0; // contatore colonna Num della tabella
        var z = 0; // contafamiglie
        var now = moment();
        const dataCorrente = moment(new Date(now));
        var precedente = "";

        //FILTRI
        var filtro_elimina_sospesi = document.querySelector('input[name="radio_sospesi"]:checked').value;
        var filtro_tessera_valida = document.querySelector('input[name="radio_tessera_valida"]:checked').value;
        var filtro_comune_selezionato = document.querySelector('input[name="radioFilter"]:checked').value;
        var filtro_anni = document.querySelector('input[name="anniFilter"]:checked').value;






        if (filtro_elimina_sospesi === "si") {
            mia_lista = mia_lista.filter((f) => f.sospeso != 1
            );
        }
        if (filtro_tessera_valida === "si") {
            mia_lista = mia_lista.filter((f) => moment(f.scadenza, "YYYY-MM-DD") >= dataCorrente
            );
        }

        if (filtro_comune_selezionato !== "tutti") {
            mia_lista = mia_lista.filter((f) => f.presentato_da == filtro_comune_selezionato
            );
        }

        if (filtro_anni == "0-15") {
            mia_lista = mia_lista.filter((f) => f.eta <= 15
            );
        }
        if (filtro_anni == "16-64") {
            mia_lista = mia_lista.filter((f) => f.eta >= 16 && f.eta < 64
            );
        }
        if (filtro_anni == ">64") {
            mia_lista = mia_lista.filter((f) => f.eta >= 64
            );
        }
        if (filtro_anni == "16-17") {
            mia_lista = mia_lista.filter((f) => f.eta == 16 || f.eta == 17
            );
        }



        if (filtro_anni == "2004-2016") {
            if (mia_lista[i].data_nascita !== undefined && mia_lista[i].data_nascita !== "") {
                mia_lista = mia_lista.filter((f) => f.mia_lista[i].data_nascita.substr(0, 4) >= 2004
                );
            }
        }


        for (var i = 0; i < mia_lista.length; i++) {
            var query_altro = mia_lista[i].codice_fiscale !== "ALTRO";
            var query_operasilente = mia_lista[i].codice_fiscale !== "OPERASILENTE";
            if (query_altro && query_operasilente) {

                //if (mia_lista[i].codice_fiscale != "ALTRO" & mia_lista[i].codice_fiscale != "OPERASILENTE") {

                var k = parseInt(i) + 1; // contatore colonna Num della tabella
                var id = mia_lista[i].id;
                var codice_fiscale = mia_lista[i].codice_fiscale;
                var cognome = mia_lista[i].cognome;
                var nome = mia_lista[i].nome;
                var ruolo = mia_lista[i].ruolo;
                if (ruolo == undefined) ruolo = "";

                var data_nascita = mia_lista[i].data_nascita;
                if (data_nascita !== undefined && data_nascita !== "") {
                    var data_nascita_formattata = moment(data_nascita).format("DD/MM/YYYY");
                    //var now = moment();
                    //const dataCorrente = moment(new Date(now));
                    const returnDate = moment(new Date(data_nascita));
                    var eta_precisa = dataCorrente.diff(returnDate, 'years', true).toFixed(1);
                    const data_Nascita_Array = data_nascita.split("-");
                    var anno_nascita = data_Nascita_Array[0];
                    //console.log(anno_nascita)
                }
                else {
                    var data_nascita_formattata = "";
                    var eta_precisa = "";
                    var anno_nascita = "";
                }

                var eta = mia_lista[i].eta;
                if (eta == undefined) eta = "";
                var luogo_nascita = mia_lista[i].luogo_nascita;
                if (luogo_nascita == undefined) luogo_nascita = "";
                var nazione_nascita = mia_lista[i].nazione_nascita;
                if (nazione_nascita == undefined) nazione_nascita = "";
                var nazionalita = mia_lista[i].nazionalita;
                if (nazionalita == undefined) nazionalita = "";
                var sesso = mia_lista[i].sesso;
                if (sesso == undefined) sesso = "";
                var presentato_da = mia_lista[i].presentato_da;
                if (presentato_da == undefined) presentato_da = "";
                var sospeso = mia_lista[i].sospeso;
                if (sospeso == undefined) sospeso = "";
                var scadenza = mia_lista[i].scadenza;
                if (scadenza == undefined) scadenza = "";
                var cognome_titolare = mia_lista[i].cognome_titolare;
                var nome_titolare = mia_lista[i].nome_titolare;







                if (visualizzaNum.checked == false) var rigaNum = "<td style='display:none;' id = 'num'>" + k + "</td>";
                else var rigaNum = "<td id = 'num'>" + k + "</td>";
                if (visualizzaId.checked == false) var rigaId = "<td style='display:none;'>" + id + "</td>";
                else var rigaId = "<td>" + id + "</td>";
                if (visualizzaCf.checked == false) var rigaCf = "<td style='display:none;'>" + codice_fiscale + "</td>";
                else var rigaCf = "<td>" + codice_fiscale + "</td>";
                if (visualizzaCog.checked == false) var rigaCog = "<td style='display:none;'>" + cognome + "</td>";
                else var rigaCog = "<td>" + cognome + "</td>";



                result += "<tr id = 'riga'>" +
                    rigaNum +
                    rigaId +
                    rigaCf +
                    rigaCog +
                    "<td>" + nome + "</td>" +
                    "<td>" + ruolo + "</td>" +
                    "<td>" + data_nascita_formattata + "</td>" +
                    "<td>" + anno_nascita + "</td>" +
                    "<td id = 'eta'>" + eta + "</td>" +
                    "<td>" + luogo_nascita + "</td>" +
                    "<td>" + nazione_nascita + "</td>" +
                    "<td>" + nazionalita + "</td>" +
                    "<td id = 'sesso'>" + sesso + "</td>" +
                    "<td>" + presentato_da + "</td>" +
                    "<td id = 'sospeso'>" + sospeso + "</td>" +
                    "<td id = 'eta_precisa'>" + eta_precisa + "</td>" +
                    "<td id = 'scadenza'>" + scadenza + "</td>" +
                    "<td>" + cognome_titolare + "</td>" +
                    "<td>" + nome_titolare + "</td>" +

                    "</tr>";

                if (id != precedente) {
                    precedente = id
                    z++// contafamiglie
                }
            }
        }

        console.log(mia_lista);
        console.log(k);
        console.log(z);
        let testo_statistiche = z + " famiglie " + k + " componenti";
        document.getElementById("Messaggio_Statistiche").innerHTML = testo_statistiche;










        result += "</table>";
        var div = document.getElementById('dataTable');
        div.innerHTML = result;
    }

}
