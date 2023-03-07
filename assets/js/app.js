$(document).ready(function () {
    if ($('#filter-1').is(':checked')) { $("#filter-7a").hide(); $("#filter-7b").hide(); }

});
var famiglie = []
var mia_lista = []
var selezionati = []
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
    var now = moment();
    const dataCorrente = moment(new Date(now));
    var excelRows = famiglie
    selezionati = []
    mia_lista = [];
    for (var i = 0; i < excelRows.length; i++) {
        //console.log(excelRows[i][0])
        if (excelRows[i][0] != undefined && excelRows[i][0] != "") {

            if (excelRows[i][5] !== undefined && excelRows[i][5] !== "") {
                var data_nascita_formattata = moment(excelRows[i][5]).format("DD/MM/YYYY");
                var anno_nascita = excelRows[i][5].split("-")[0];
                var eta_precisa = dataCorrente.diff(moment(new Date(excelRows[i][5])), 'years', true).toFixed(1);
            }
            else {
                var data_nascita_formattata = "";
                var anno_nascita = "";
                var eta_precisa = "";
            }
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
                telefono1: excelRows[i][15],
                telefono2: excelRows[i][16],
                presentato_da: excelRows[i][23],
                sospeso: excelRows[i][25],
                scadenza: excelRows[i][24],
                cognome_titolare: excelRows[i][2],
                nome_titolare: excelRows[i][3],
                tipo_tessera: excelRows[i][1],
                data_nascita_formattata: data_nascita_formattata,
                anno_nascita: anno_nascita,
                eta_precisa: eta_precisa
            });
        }

        if (excelRows[i][35] != undefined && excelRows[i][35] != "") {
            if (excelRows[i][39] !== undefined && excelRows[i][39] !== "") {
                var data_nascita_formattata = moment(excelRows[i][39]).format("DD/MM/YYYY");
                var anno_nascita = excelRows[i][39].split("-")[0];
                var eta_precisa = dataCorrente.diff(moment(new Date(excelRows[i][39])), 'years', true).toFixed(1);
            }
            else {
                var data_nascita_formattata = "";
                var anno_nascita = "";
                var eta_precisa = "";
            }
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
                telefono1: excelRows[i][15],
                telefono2: excelRows[i][16],
                presentato_da: excelRows[i][23],
                sospeso: excelRows[i][25],
                scadenza: excelRows[i][24],
                cognome_titolare: excelRows[i][2],
                nome_titolare: excelRows[i][3],
                tipo_tessera: excelRows[i][1],
                data_nascita_formattata: data_nascita_formattata,
                anno_nascita: anno_nascita,
                eta_precisa: eta_precisa
            });
        }
        if (excelRows[i][45] != undefined && excelRows[i][45] != "") {
            if (excelRows[i][49] !== undefined && excelRows[i][49] !== "") {
                var data_nascita_formattata = moment(excelRows[i][49]).format("DD/MM/YYYY");
                var anno_nascita = excelRows[i][49].split("-")[0];
                var eta_precisa = dataCorrente.diff(moment(new Date(excelRows[i][49])), 'years', true).toFixed(1);
            }
            else {
                var data_nascita_formattata = "";
                var anno_nascita = "";
                var eta_precisa = "";
            }
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
                telefono1: excelRows[i][15],
                telefono2: excelRows[i][16],
                presentato_da: excelRows[i][23],
                sospeso: excelRows[i][25],
                scadenza: excelRows[i][24],
                cognome_titolare: excelRows[i][2],
                nome_titolare: excelRows[i][3],
                tipo_tessera: excelRows[i][1],
                data_nascita_formattata: data_nascita_formattata,
                anno_nascita: anno_nascita,
                eta_precisa: eta_precisa
            });
        }
        if (excelRows[i][55] != undefined && excelRows[i][55] != "") {
            if (excelRows[i][59] !== undefined && excelRows[i][59] !== "") {
                var data_nascita_formattata = moment(excelRows[i][59]).format("DD/MM/YYYY");
                var anno_nascita = excelRows[i][59].split("-")[0];
                var eta_precisa = dataCorrente.diff(moment(new Date(excelRows[i][59])), 'years', true).toFixed(1);
            }
            else {
                var data_nascita_formattata = "";
                var anno_nascita = "";
                var eta_precisa = "";
            }
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
                telefono1: excelRows[i][15],
                telefono2: excelRows[i][16],
                presentato_da: excelRows[i][23],
                sospeso: excelRows[i][25],
                scadenza: excelRows[i][24],
                cognome_titolare: excelRows[i][2],
                nome_titolare: excelRows[i][3],
                tipo_tessera: excelRows[i][1],
                data_nascita_formattata: data_nascita_formattata,
                anno_nascita: anno_nascita,
                eta_precisa: eta_precisa
            });
        }
        if (excelRows[i][65] != undefined && excelRows[i][65] != "") {
            if (excelRows[i][69] !== undefined && excelRows[i][69] !== "") {
                var data_nascita_formattata = moment(excelRows[i][69]).format("DD/MM/YYYY");
                var anno_nascita = excelRows[i][69].split("-")[0];
                var eta_precisa = dataCorrente.diff(moment(new Date(excelRows[i][69])), 'years', true).toFixed(1);
            }
            else {
                var data_nascita_formattata = "";
                var anno_nascita = "";
                var eta_precisa = "";
            }
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
                telefono1: excelRows[i][15],
                telefono2: excelRows[i][16],
                presentato_da: excelRows[i][23],
                sospeso: excelRows[i][25],
                scadenza: excelRows[i][24],
                cognome_titolare: excelRows[i][2],
                nome_titolare: excelRows[i][3],
                tipo_tessera: excelRows[i][1],
                data_nascita_formattata: data_nascita_formattata,
                anno_nascita: anno_nascita,
                eta_precisa: eta_precisa
            });
        }
        if (excelRows[i][75] != undefined && excelRows[i][75] != "") {
            if (excelRows[i][79] !== undefined && excelRows[i][79] !== "") {
                var data_nascita_formattata = moment(excelRows[i][79]).format("DD/MM/YYYY");
                var anno_nascita = excelRows[i][79].split("-")[0];
                var eta_precisa = dataCorrente.diff(moment(new Date(excelRows[i][79])), 'years', true).toFixed(1);
            }
            else {
                var data_nascita_formattata = "";
                var anno_nascita = "";
                var eta_precisa = "";
            }
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
                telefono1: excelRows[i][15],
                telefono2: excelRows[i][16],
                presentato_da: excelRows[i][23],
                sospeso: excelRows[i][25],
                scadenza: excelRows[i][24],
                cognome_titolare: excelRows[i][2],
                nome_titolare: excelRows[i][3],
                tipo_tessera: excelRows[i][1],
                data_nascita_formattata: data_nascita_formattata,
                anno_nascita: anno_nascita,
                eta_precisa: eta_precisa
            });
        }
        if (excelRows[i][85] != undefined && excelRows[i][85] != "") {
            if (excelRows[i][89] !== undefined && excelRows[i][89] !== "") {
                var data_nascita_formattata = moment(excelRows[i][89]).format("DD/MM/YYYY");
                var anno_nascita = excelRows[i][89].split("-")[0];
                var eta_precisa = dataCorrente.diff(moment(new Date(excelRows[i][89])), 'years', true).toFixed(1);
            }
            else {
                var data_nascita_formattata = "";
                var anno_nascita = "";
                var eta_precisa = "";
            }
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
                telefono1: excelRows[i][15],
                telefono2: excelRows[i][16],
                presentato_da: excelRows[i][23],
                sospeso: excelRows[i][25],
                scadenza: excelRows[i][24],
                cognome_titolare: excelRows[i][2],
                nome_titolare: excelRows[i][3],
                tipo_tessera: excelRows[i][1],
                data_nascita_formattata: data_nascita_formattata,
                anno_nascita: anno_nascita,
                eta_precisa: eta_precisa
            });
        }
        if (excelRows[i][95] != undefined && excelRows[i][95] != "") {
            if (excelRows[i][99] !== undefined && excelRows[i][99] !== "") {
                var data_nascita_formattata = moment(excelRows[i][99]).format("DD/MM/YYYY");
                var anno_nascita = excelRows[i][99].split("-")[0];
                var eta_precisa = dataCorrente.diff(moment(new Date(excelRows[i][99])), 'years', true).toFixed(1);
            }
            else {
                var data_nascita_formattata = "";
                var anno_nascita = "";
                var eta_precisa = "";
            }
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
                telefono1: excelRows[i][15],
                telefono2: excelRows[i][16],
                presentato_da: excelRows[i][23],
                sospeso: excelRows[i][25],
                scadenza: excelRows[i][24],
                cognome_titolare: excelRows[i][2],
                nome_titolare: excelRows[i][3],
                tipo_tessera: excelRows[i][1],
                data_nascita_formattata: data_nascita_formattata,
                anno_nascita: anno_nascita,
                eta_precisa: eta_precisa
            });
        }
        if (excelRows[i][105] != undefined && excelRows[i][105] != "") {
            if (excelRows[i][109] !== undefined && excelRows[i][109] !== "") {
                var data_nascita_formattata = moment(excelRows[i][109]).format("DD/MM/YYYY");
                var anno_nascita = excelRows[i][109].split("-")[0];
                var eta_precisa = dataCorrente.diff(moment(new Date(excelRows[i][109])), 'years', true).toFixed(1);
            }
            else {
                var data_nascita_formattata = "";
                var anno_nascita = "";
                var eta_precisa = "";
            }
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
                telefono1: excelRows[i][15],
                telefono2: excelRows[i][16],
                presentato_da: excelRows[i][23],
                sospeso: excelRows[i][25],
                scadenza: excelRows[i][24],
                cognome_titolare: excelRows[i][2],
                nome_titolare: excelRows[i][3],
                tipo_tessera: excelRows[i][1],
                data_nascita_formattata: data_nascita_formattata,
                anno_nascita: anno_nascita,
                eta_precisa: eta_precisa
            });
        }
        // INIZIO AGGIUNTA
        if (excelRows[i][115] != undefined && excelRows[i][115] != "") {
            if (excelRows[i][119] !== undefined && excelRows[i][119] !== "") {
                var data_nascita_formattata = moment(excelRows[i][119]).format("DD/MM/YYYY");
                var anno_nascita = excelRows[i][119].split("-")[0];
                var eta_precisa = dataCorrente.diff(moment(new Date(excelRows[i][119])), 'years', true).toFixed(1);
            }
            else {
                var data_nascita_formattata = "";
                var anno_nascita = "";
                var eta_precisa = "";
            }
            mia_lista.push({
                id: excelRows[i][0],
                codice_fiscale: excelRows[i][115],
                cognome: excelRows[i][116],
                nome: excelRows[i][117],
                ruolo: excelRows[i][118],
                data_nascita: excelRows[i][119],
                eta: excelRows[i][120],
                luogo_nascita: excelRows[i][121],
                nazione_nascita: excelRows[i][122],
                nazionalita: excelRows[i][123],
                sesso: excelRows[i][124],
                telefono1: excelRows[i][15],
                telefono2: excelRows[i][16],
                presentato_da: excelRows[i][23],
                sospeso: excelRows[i][25],
                scadenza: excelRows[i][24],
                cognome_titolare: excelRows[i][2],
                nome_titolare: excelRows[i][3],
                tipo_tessera: excelRows[i][1],
                data_nascita_formattata: data_nascita_formattata,
                anno_nascita: anno_nascita,
                eta_precisa: eta_precisa
            });
        }
        if (excelRows[i][125] != undefined && excelRows[i][125] != "") {
            if (excelRows[i][129] !== undefined && excelRows[i][129] !== "") {
                var data_nascita_formattata = moment(excelRows[i][129]).format("DD/MM/YYYY");
                var anno_nascita = excelRows[i][129].split("-")[0];
                var eta_precisa = dataCorrente.diff(moment(new Date(excelRows[i][129])), 'years', true).toFixed(1);
            }
            else {
                var data_nascita_formattata = "";
                var anno_nascita = "";
                var eta_precisa = "";
            }
            mia_lista.push({
                id: excelRows[i][0],
                codice_fiscale: excelRows[i][125],
                cognome: excelRows[i][126],
                nome: excelRows[i][127],
                ruolo: excelRows[i][128],
                data_nascita: excelRows[i][129],
                eta: excelRows[i][130],
                luogo_nascita: excelRows[i][131],
                nazione_nascita: excelRows[i][132],
                nazionalita: excelRows[i][133],
                sesso: excelRows[i][134],
                telefono1: excelRows[i][15],
                telefono2: excelRows[i][16],
                presentato_da: excelRows[i][23],
                sospeso: excelRows[i][25],
                scadenza: excelRows[i][24],
                cognome_titolare: excelRows[i][2],
                nome_titolare: excelRows[i][3],
                tipo_tessera: excelRows[i][1],
                data_nascita_formattata: data_nascita_formattata,
                anno_nascita: anno_nascita,
                eta_precisa: eta_precisa
            });
        }
        if (excelRows[i][135] != undefined && excelRows[i][135] != "") {
            if (excelRows[i][139] !== undefined && excelRows[i][139] !== "") {
                var data_nascita_formattata = moment(excelRows[i][139]).format("DD/MM/YYYY");
                var anno_nascita = excelRows[i][139].split("-")[0];
                var eta_precisa = dataCorrente.diff(moment(new Date(excelRows[i][139])), 'years', true).toFixed(1);
            }
            else {
                var data_nascita_formattata = "";
                var anno_nascita = "";
                var eta_precisa = "";
            }
            mia_lista.push({
                id: excelRows[i][0],
                codice_fiscale: excelRows[i][135],
                cognome: excelRows[i][136],
                nome: excelRows[i][137],
                ruolo: excelRows[i][138],
                data_nascita: excelRows[i][139],
                eta: excelRows[i][140],
                luogo_nascita: excelRows[i][141],
                nazione_nascita: excelRows[i][142],
                nazionalita: excelRows[i][143],
                sesso: excelRows[i][144],
                telefono1: excelRows[i][15],
                telefono2: excelRows[i][16],
                presentato_da: excelRows[i][23],
                sospeso: excelRows[i][25],
                scadenza: excelRows[i][24],
                cognome_titolare: excelRows[i][2],
                nome_titolare: excelRows[i][3],
                tipo_tessera: excelRows[i][1],
                data_nascita_formattata: data_nascita_formattata,
                anno_nascita: anno_nascita,
                eta_precisa: eta_precisa
            });
        }
        // FINE AGGIUNTA
    }

    // ===========================================================================================
    if (mia_lista) {
        const visualizzaNum = document.querySelector('#num');
        const visualizzaId = document.querySelector('#id');
        const visualizzaCf = document.querySelector('#cf');
        const visualizzaCog = document.querySelector('#cog');
        const visualizzaNom = document.querySelector('#nom');
        const visualizzaRuo = document.querySelector('#ruo');
        const visualizzaDataNascita = document.querySelector('#data_nasc');
        const visualizzaAnnoNascita = document.querySelector('#anno_nasc');
        const visualizzaEta = document.querySelector('#eta');
        const visualizzaEtaPrecisa = document.querySelector('#eta_prec');
        const visualizzaLuogoNascita = document.querySelector('#luo_nasc');
        const visualizzaNazioneNascita = document.querySelector('#naz_nasc');
        const visualizzaNazionalita = document.querySelector('#naz');
        const visualizzaSesso = document.querySelector('#sesso');
        const visualizzaCognomeTitolare = document.querySelector('#cog_tit');
        const visualizzaNomeTitolare = document.querySelector('#nom_tit');
        const visualizzaTipoTessera = document.querySelector('#tip_tess');
        const visualizzaPresentatoDa = document.querySelector('#pr_da');
        const visualizzaSospeso = document.querySelector('#sos');
        const visualizzaScadenza = document.querySelector('#scad');
        const visualizzaTelefono1 = document.querySelector('#tf1');
        const visualizzaTelefono2 = document.querySelector('#tf2');        

        if (visualizzaNum.checked == true) { var intestazioneNum = '<th>Num</th>'; selezionati.push("selnum") } else { var intestazioneNum = ''; selezionati.push("") }
        if (visualizzaId.checked == true) { var intestazioneId = '<th>Id</th>'; selezionati.push("selid") } else { var intestazioneId = ""; selezionati.push("") }
        if (visualizzaCf.checked == true) { var intestazioneCf = '<th>Codice Fiscale</th>'; selezionati.push("selcf") } else { var intestazioneCf = ""; selezionati.push("") }
        if (visualizzaCog.checked == true) { var intestazioneCog = '<th>Cognome</th>'; selezionati.push("selcog") } else { var intestazioneCog = ""; selezionati.push("") }
        if (visualizzaNom.checked == true) { var intestazioneNom = '<th>Nome</th>'; selezionati.push("selnom") } else { var intestazioneNom = ""; selezionati.push("") }
        if (visualizzaRuo.checked == true) { var intestazioneRuo = '<th>Ruolo</th>'; selezionati.push("selruo") } else { var intestazioneRuo = ""; selezionati.push("") }
        if (visualizzaDataNascita.checked == true) { var intestazioneDataNascita = '<th>Data Nascita</th>'; selezionati.push("seldatnasc") } else { var intestazioneDataNascita = ""; selezionati.push("") }
        if (visualizzaAnnoNascita.checked == true) { var intestazioneAnnoNascita = '<th>Anno Nascita</th>'; selezionati.push("selannnasc") } else { var intestazioneAnnoNascita = ""; selezionati.push("") }
        if (visualizzaEta.checked == true) { var intestazioneEta = '<th>Età</th>'; selezionati.push("seleta") } else { var intestazioneEta = ""; selezionati.push("") }
        if (visualizzaEtaPrecisa.checked == true) { var intestazioneEtaPrecisa = '<th>Età precisa</th>'; selezionati.push("seletaprecisa") } else { var intestazioneEtaPrecisa = ""; selezionati.push("") }
        if (visualizzaLuogoNascita.checked == true) { var intestazioneLuogoNascita = '<th>Luogo nascita</th>'; selezionati.push("selluonas") } else { var intestazioneLuogoNascita = ""; selezionati.push("") }
        if (visualizzaNazioneNascita.checked == true) { var intestazioneNazioneNascita = '<th>Nazione nascita</th>'; selezionati.push("selnaznas") } else { var intestazioneNazioneNascita = ""; selezionati.push("") }
        if (visualizzaNazionalita.checked == true) { var intestazioneNazionalita = '<th>Nazionalità</th>'; selezionati.push("selnaz") } else { var intestazioneNazionalita = ""; selezionati.push("") }
        if (visualizzaSesso.checked == true) { var intestazioneSesso = '<th>Sesso</th>'; selezionati.push("selses") } else { var intestazioneSesso = ""; selezionati.push("") }
        if (visualizzaCognomeTitolare.checked == true) { var intestazioneCognomeTitolare = '<th>Cognome Titolare</th>'; selezionati.push("selcogtit") } else { var intestazioneCognomeTitolare = ""; selezionati.push("") }
        if (visualizzaNomeTitolare.checked == true) { var intestazioneNomeTitolare = '<th>Nome Titolare</th>'; selezionati.push("selnomtit") } else { var intestazioneNomeTitolare = ""; selezionati.push("") }
        if (visualizzaTipoTessera.checked == true) { var intestazioneTipoTessera = '<th>Tipo Tessera</th>'; selezionati.push("seltiptes") } else { var intestazioneTipoTessera = ""; selezionati.push("") }
        if (visualizzaPresentatoDa.checked == true) { var intestazionePresentatoDa = '<th>Presentato da</th>'; selezionati.push("selprda") } else { var intestazionePresentatoDa = ""; selezionati.push("") }
        if (visualizzaSospeso.checked == true) { var intestazioneSospeso = '<th>Sospeso</th>'; selezionati.push("selsos") } else { var intestazioneSospeso = ""; selezionati.push("") }
        if (visualizzaScadenza.checked == true) { var intestazioneScadenza = '<th>Scadenza</th>'; selezionati.push("selscad") } else { var intestazioneScadenza = ""; selezionati.push("") }
        if (visualizzaTelefono1.checked == true) { var intestazioneTelefono1 = '<th>Telefono1</th>'; selezionati.push("seltf1") } else { var intestazioneTelefono1 = ""; selezionati.push("") }
        if (visualizzaTelefono2.checked == true) { var intestazioneTelefono2 = '<th>Telefono2</th>'; selezionati.push("seltf2") } else { var intestazioneTelefono2 = ""; selezionati.push("") }



        var result = "<table  id='tabella' class='table table-striped table-responsive{-sm|-md|-lg|-xl}'>" +
            "<thead id = 'riga_intestazione'>" +
            "<tr>" +                               //Change table headings to match witht he Google Sheet
            //"<th>Delete</th>"+
            intestazioneNum +
            intestazioneId +
            intestazioneCf +
            //"<th>i</th>"+                      
            intestazioneCog +
            intestazioneNom +
            intestazioneRuo +
            intestazioneDataNascita +
            intestazioneAnnoNascita +
            intestazioneEta +
            intestazioneEtaPrecisa +
            intestazioneLuogoNascita +
            intestazioneNazioneNascita +
            intestazioneNazionalita +
            intestazioneSesso +
            intestazioneCognomeTitolare +
            intestazioneNomeTitolare +
            intestazioneTipoTessera +
            intestazionePresentatoDa +
            intestazioneSospeso +
            intestazioneScadenza +
            intestazioneTelefono1 +
            intestazioneTelefono2 +
            "</tr>" +
            "</thead>";

        var k = 0; // contatore colonna Num della tabella
        var z = 0; // contafamiglie

        var precedente = "";

        //FILTRI
        var filtro_elimina_sospesi = document.querySelector('input[name="radio_sospesi"]:checked').value;
        var filtro_tessera_valida = document.querySelector('input[name="radio_tessera_valida"]:checked').value;
        var filtro_comune_selezionato = document.querySelector('input[name="radioFilter"]:checked').value;
        var filtro_anni = document.querySelector('input[name="anniFilter"]:checked').value;
        var filtro_sesso = document.querySelector('input[name="sessoFilter"]:checked').value;
        var filtro_ucraina = document.querySelector('input[name="ucrainaFilter"]:checked').value;

        if (filtro_elimina_sospesi === "si") {
            var messaggio_Sospesi = "<span style='color:red;'>| elimina sospesi </span>";
            mia_lista = mia_lista.filter((f) => f.sospeso != 1
            );
        }
        else var messaggio_Sospesi = "";

        if (filtro_tessera_valida === "si") {
            var messaggio_Tessera_Valida = "<span style='color:red;'>| elimina tessera scaduta </span>";
            mia_lista = mia_lista.filter((f) => moment(f.scadenza, "YYYY-MM-DD") >= dataCorrente
            );
        }
        else var messaggio_Tessera_Valida = "";

        if (filtro_comune_selezionato !== "tutti") {
            var messaggio_Comune_Selezionato = "<span style='color:red;'>| " + filtro_comune_selezionato + " </span>";
            mia_lista = mia_lista.filter((f) => f.presentato_da == filtro_comune_selezionato
            );
        }
        else var messaggio_Comune_Selezionato = "";
        
        if (filtro_anni == "tutti") {
            $("#filter-7a").hide();
            $("#filter-7b").hide();
        }

        if (filtro_anni == "0-16") {
            $("#filter-7a").hide();
            $("#filter-7b").hide();
            var messaggio_finoaquindici = "<span style='color:red;'>| " + filtro_anni + " </span>";
            mia_lista = mia_lista.filter((f) => f.eta < 16
            );
        }
        else var messaggio_finoaquindici = "";

        if (filtro_anni == "16-64") {
            $("#filter-7a").hide();
            $("#filter-7b").hide();
            var messaggio_sedicisessantaquattro = "<span style='color:red;'>| " + filtro_anni + " </span>";
            mia_lista = mia_lista.filter((f) => f.eta >= 16 && f.eta < 64
            );
        }
        else var messaggio_sedicisessantaquattro = "";

        if (filtro_anni == ">64") {
            $("#filter-7a").hide();
            $("#filter-7b").hide();
            var messaggio_maggioressantaquattro = "<span style='color:red;'>| " + filtro_anni + " </span>";
            mia_lista = mia_lista.filter((f) => f.eta >= 64
            );
        }
        else var messaggio_maggioressantaquattro = "";

        if (filtro_anni == "16-17") {
            $("#filter-7a").hide();
            $("#filter-7b").hide();
            var messaggio_sedicidiciassette = "<span style='color:red;'>| " + filtro_anni + " </span>";
            mia_lista = mia_lista.filter((f) => f.eta == 16 || f.eta == 17
            );
        }
        else var messaggio_sedicidiciassette = "";

        if (filtro_anni == "2004-2016") {
            $("#filter-7a").hide();
            $("#filter-7b").hide();
            var messaggio_duemilaquattroduemilasedici = "<span style='color:red;'>| " + filtro_anni + " </span>";
            mia_lista = mia_lista.filter((f) => f.data_nascita != undefined && parseInt(f.data_nascita.substr(0, 4)) >= 2004 && f.data_nascita != undefined && parseInt(f.data_nascita.substr(0, 4)) <= 2016
            );
        }
        else var messaggio_duemilaquattroduemilasedici = "";
        
        if (filtro_anni == "range_anni") {
            $("#filter-7a").show();
            $("#filter-7b").show();
            var messaggio_rangeanni = "<span style='color:red;'>| " + filtro_anni + " </span>";
            var filtro_range_dal = document.getElementById("filter-7a").value;
            var filtro_range_al = document.getElementById("filter-7b").value;
            var messaggio_rangeanni = "<span style='color:red;'>| dal " + filtro_range_dal + " al " + filtro_range_al + " </span>";
            mia_lista = mia_lista.filter((f) => f.data_nascita != undefined && parseInt(f.data_nascita.substr(0, 4)) >= filtro_range_dal && f.data_nascita != undefined && parseInt(f.data_nascita.substr(0, 4)) <= filtro_range_al);
        }
        else var messaggio_rangeanni = "";

        if (filtro_sesso == "F") {
            var messaggio_Sesso_Femmine = "<span style='color:red;'>| solo femmine </span>";
            mia_lista = mia_lista.filter((f) => f.sesso == "F"
            );
        }
        else var messaggio_Sesso_Femmine = "";

        if (filtro_sesso == "M") {
            var messaggio_Sesso_Maschi = "<span style='color:red;'>| solo maschi </span>";
            mia_lista = mia_lista.filter((f) => f.sesso == "M"
            );
        }
        else var messaggio_Sesso_Maschi = "";

        if (filtro_ucraina == "si") {
            var messaggio_Ucraina = "<span style='color:red;'>| solo Ucraina </span>";
            mia_lista = mia_lista.filter((f) => f.tipo_tessera == "Emergenza Ucraina"
            );
        }
        else var messaggio_Ucraina = "";

        mia_lista = mia_lista.filter((f) => f.codice_fiscale !== "ALTRO" && f.codice_fiscale !== "OPERASILENTE" && f.codice_fiscale !== "CARITAS");

        for (var i = 0; i < mia_lista.length; i++) {
            var k = parseInt(i) + 1; // contatore colonna Num della tabella
            var id = mia_lista[i].id;
            var codice_fiscale = mia_lista[i].codice_fiscale;
            var cognome = mia_lista[i].cognome;
            var nome = mia_lista[i].nome;
            var ruolo = mia_lista[i].ruolo;
            if (ruolo == undefined) ruolo = "";

            if (mia_lista[i].data_nascita !== undefined && mia_lista[i].data_nascita !== "") {
                var data_nascita_tabella = moment(mia_lista[i].data_nascita).format("DD/MM/YYYY");
                var eta_precisa_tabella = dataCorrente.diff(moment(new Date(mia_lista[i].data_nascita)), 'years', true).toFixed(1);
                var anno_nascita_tabella = mia_lista[i].data_nascita.split("-")[0];
            }
            else {
                var data_nascita_tabella = "";
                var eta_precisa_tabella = "";
                var anno_nascita_tabella = "";
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
            var tipo_tessera = mia_lista[i].tipo_tessera;
            if (tipo_tessera == undefined) tipo_tessera = "";

            var telefono1 = mia_lista[i].telefono1;
            if (telefono1 == undefined) telefono1 = "";
            var telefono2 = mia_lista[i].telefono2;
            if (telefono2 == undefined) telefono2 = "";



            if (visualizzaNum.checked == true) var rigaNum = "<td id = 'num'>" + k + "</td>"; else var rigaNum = ""
            if (visualizzaId.checked == true) var colId = "<td>" + id + "</td>"; else var colId = ""
            if (visualizzaCf.checked == true) var colCf = "<td>" + codice_fiscale + "</td>"; else var colCf = ""
            if (visualizzaCog.checked == true) var colCog = "<td>" + cognome + "</td>"; else var colCog = ""
            if (visualizzaNom.checked == true) var colNom = "<td>" + nome + "</td>"; else var colNom = ""
            if (visualizzaRuo.checked == true) var colRuo = "<td>" + ruolo + "</td>"; else var colRuo = ""
            if (visualizzaDataNascita.checked == true) var colDatNasc = "<td>" + data_nascita_tabella + "</td>"; else var colDatNasc = ""
            if (visualizzaAnnoNascita.checked == true) var colAnnnasc = "<td id = 'anno_nascita'>" + anno_nascita_tabella + "</td>"; else var colAnnnasc = ""
            if (visualizzaEta.checked == true) var colEta = "<td id = 'eta'>" + eta + "</td>"; else var colEta = ""
            if (visualizzaEtaPrecisa.checked == true) var colEtaPrecisa = "<td id = 'eta_precisa'>" + eta_precisa_tabella + "</td>"; else var colEtaPrecisa = ""
            if (visualizzaLuogoNascita.checked == true) var colLuoNas = "<td>" + luogo_nascita + "</td>"; else var colLuoNas = ""
            if (visualizzaNazioneNascita.checked == true) var colNazNas = "<td>" + nazione_nascita + "</td>"; else var colNazNas = ""
            if (visualizzaNazionalita.checked == true) var colNaz = "<td>" + nazionalita + "</td>"; else var colNaz = ""
            if (visualizzaSesso.checked == true) var colSes = "<td id = 'sesso'>" + sesso + "</td>"; else var colSes = ""
            if (visualizzaCognomeTitolare.checked == true) var colCogTit = "<td>" + cognome_titolare + "</td>"; else var colCogTit = ""
            if (visualizzaNomeTitolare.checked == true) var colNomTit = "<td>" + nome_titolare + "</td>"; else var colNomTit = ""
            if (visualizzaTipoTessera.checked == true) var colTipTes = "<td>" + tipo_tessera + "</td>"; else var colTipTes = ""
            if (visualizzaPresentatoDa.checked == true) var coPrDa = "<td id = 'sesso'>" + presentato_da + "</td>"; else var coPrDa = ""
            if (visualizzaSospeso.checked == true) var colSos = "<td id = 'sospeso'>" + sospeso + "</td>"; else var colSos = ""
            if (visualizzaScadenza.checked == true) var colScad = "<td id = 'scadenza'>" + scadenza + "</td>"; else var colScad = ""
            if (visualizzaTelefono1.checked == true) var colTf1 = "<td id = 'telefono1'>" + telefono1 + "</td>"; else var colTf1 = ""
            if (visualizzaTelefono2.checked == true) var colTf2 = "<td id = 'telefono2'>" + telefono2 + "</td>"; else var colTf2 = ""

            result += "<tr id = 'riga'>" +
                rigaNum +
                colId +
                colCf +
                colCog +
                colNom +
                colRuo +
                colDatNasc +
                colAnnnasc +
                colEta +
                colEtaPrecisa +
                colLuoNas +
                colNazNas +
                colNaz +
                colSes +
                colCogTit +
                colNomTit +
                colTipTes +
                coPrDa +
                colSos +
                colScad +
                colTf1 +
                colTf2 +
                "</tr>";

            if (id != precedente) {
                console.log(codice_fiscale);
                precedente = id
                z++// contafamiglie
            }
        }

        console.log(mia_lista);
        console.log(k);
        console.log(z);


        let testo_filtro = "Filtri applicati: " +
            messaggio_Sospesi +
            messaggio_Tessera_Valida +
            messaggio_Sesso_Maschi +
            messaggio_Sesso_Femmine +
            messaggio_Ucraina +
            messaggio_Comune_Selezionato +
            messaggio_finoaquindici +
            messaggio_sedicisessantaquattro +
            messaggio_maggioressantaquattro +
            messaggio_sedicidiciassette +
            messaggio_duemilaquattroduemilasedici +
            messaggio_rangeanni
            ;
        document.getElementById("Messaggio_Filtro").innerHTML = testo_filtro;
        let testo_statistiche = z + " famiglie " + k + " componenti";
        document.getElementById("Messaggio_Statistiche").innerHTML = testo_statistiche;
        result += "</table>";
        var div = document.getElementById('dataTable');
        div.innerHTML = result;
    }

    console.log(selezionati)
    var dvExcel = document.getElementById("dvExcel");
    dvExcel.innerHTML = "";
    dvExcel.appendChild(tabella);
    // crea il bottone per il download in alto a destra
    var dow = document.getElementById("dow");
    dow.innerHTML = '<button class="btn btn-primary" id="export" onclick="ExportExcel()">Download</button>';
}

function ExportExcel() {
    var excel = [];
    var righeExcel = []

    if (selezionati[1] == "selid") righeExcel.push("Id");
    if (selezionati[2] == "selcf") righeExcel.push("Codice Fiscale");
    if (selezionati[3] == "selcog") righeExcel.push("Cognome");
    if (selezionati[4] == "selnom") righeExcel.push("Nome");
    if (selezionati[5] == "selruo") righeExcel.push("Ruolo");
    if (selezionati[6] == "seldatnasc") righeExcel.push("Data Nascita");
    if (selezionati[7] == "selannnasc") righeExcel.push("Anno");
    if (selezionati[8] == "seleta") righeExcel.push("Età");
    if (selezionati[9] == "seletaprecisa") righeExcel.push("Età precisa");
    if (selezionati[10] == "selluonas") righeExcel.push("Luogo nascita");
    if (selezionati[11] == "selnaznas") righeExcel.push("Nazione nascita");
    if (selezionati[12] == "selnaz") righeExcel.push("Nazionalità");
    if (selezionati[13] == "selses") righeExcel.push("Sesso");
    if (selezionati[14] == "selcogtit") righeExcel.push("Cognome Titolare");
    if (selezionati[15] == "selnomtit") righeExcel.push("Nome Titolare");
    if (selezionati[16] == "seltiptes") righeExcel.push("Tipo Tessera");
    if (selezionati[17] == "selprda") righeExcel.push("Presentato da");
    if (selezionati[18] == "selsos") righeExcel.push("Sospeso");
    if (selezionati[19] == "selscad") righeExcel.push("Scadenza");
    if (selezionati[20] == "seltf1") righeExcel.push("Telefono1");
    if (selezionati[21] == "seltf2") righeExcel.push("Telefono2");
    excel.push(righeExcel)

    for (var f in mia_lista) {
        righeExcel = []
        if (selezionati[1] == "selid") righeExcel.push(mia_lista[f].id);
        if (selezionati[2] == "selcf") righeExcel.push(mia_lista[f].codice_fiscale);
        if (selezionati[3] == "selcog") righeExcel.push(mia_lista[f].cognome);
        if (selezionati[4] == "selnom") righeExcel.push(mia_lista[f].nome);
        if (selezionati[5] == "selruo") righeExcel.push(mia_lista[f].ruolo);
        if (selezionati[6] == "seldatnasc") righeExcel.push(mia_lista[f].data_nascita_formattata);
        if (selezionati[7] == "selannnasc") righeExcel.push(mia_lista[f].anno_nascita);
        if (selezionati[8] == "seleta") righeExcel.push(mia_lista[f].eta);
        if (selezionati[9] == "seletaprecisa") righeExcel.push(mia_lista[f].eta_precisa);
        if (selezionati[10] == "selluonas") righeExcel.push(mia_lista[f].luogo_nascita);
        if (selezionati[11] == "selnaznas") righeExcel.push(mia_lista[f].nazione_nascita);
        if (selezionati[12] == "selnaz") righeExcel.push(mia_lista[f].nazionalita);
        if (selezionati[13] == "selses") righeExcel.push(mia_lista[f].sesso);
        if (selezionati[14] == "selcogtit") righeExcel.push(mia_lista[f].cognome_titolare);
        if (selezionati[15] == "selnomtit") righeExcel.push(mia_lista[f].nome_titolare);
        if (selezionati[16] == "seltiptes") righeExcel.push(mia_lista[f].tipo_tessera);
        if (selezionati[17] == "selprda") righeExcel.push(mia_lista[f].presentato_da);
        if (selezionati[18] == "selsos") righeExcel.push(mia_lista[f].sospeso);
        if (selezionati[19] == "selscad") righeExcel.push(mia_lista[f].scadenza);
        if (selezionati[20] == "seltf1") righeExcel.push(mia_lista[f].telefono1);
        if (selezionati[21] == "seltf2") righeExcel.push(mia_lista[f].telefono2);
        excel.push(righeExcel)
    }

    const wb = XLSX.utils.book_new();
    const ds = XLSX.utils.aoa_to_sheet(excel)
    XLSX.utils.book_append_sheet(wb, ds, "Report")
    XLSX.writeFile(wb, "Report.xlsx", { bookType: "xlsx" })
}
