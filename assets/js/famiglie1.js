let famiglie = [] //crea un array vuoto

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

const INDICE_CF_CAPOFAMIGLIA = 0
const INDICE_COGNOME_CAPOFAMIGLIA = 2
const INDICE_COMPONENTI = 18
const INDICE_PUNTI_RESIDUI = 20        //PUNTI RESIDUI
const INDICE_PRESENTATO_DA = 23
const INDICE_SCADENZA = 24
const INDICE_SOSPESO = 25
const INDICE_CF_CONIUGE = 35
const INDICE_COGNOME_CONIUGE = 36
const INDICE_CF_FIGLIO_0 = 45
const INDICE_COGNOME_FIGLIO_0 = 46
const OFFSET_FIGLI = 10;

var Famiglie_dopo_scadenza

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
    //console.log(excelRows);




   famiglie=[] // va eliminato?

    for (let i in excelRows) {
        let famiglia = ParseFamiglia(excelRows[i]);// crea la var famiglia, e con la funzione ParseFamiglia creata dopo crea un oggetto strutturato per ogni familiare secondo la logica json 
        famiglie.push(famiglia)

    //console.log(famiglia.componenti);
   
    }
    console.log(famiglie);




    mostra_famiglie();

}
function mostra_famiglie(){
    if (famiglie.length ==0)return;
    var soglia = document.getElementById("soglia").value;
    var filtro_data = moment(soglia, "DD/MM/YYYY").toDate();
    console.log("filtro data")
    console.log(filtro_data)
    var comune_selezionato = document.querySelector('input[name="radioFilter"]:checked').value;
    
    if (soglia.length > 0) {
        if (comune_selezionato === "tutti"){
            Famiglie_dopo_scadenza = famiglie.filter((f) => f.scadenza >= filtro_data &&
                                     f.sospeso != 1 &&
                                     f.codice_fiscale != "ALTRO" &&
                                     f.codice_fiscale != "OPERASILENTE"                                                                        
                                     );
            let testo_messaggio = "Filtri applicati: Scadenza tessera, non considera sospesi, ALTRO e OPERA SILENTE";
            document.getElementById("Messaggio_Filtro").innerHTML = testo_messaggio;



        }
        else {
            Famiglie_dopo_scadenza = famiglie.filter((f) => f.scadenza >= filtro_data && 
                                        f.sospeso != 1 && 
                                        f.codice_fiscale != "ALTRO" &&
                                        f.codice_fiscale != "OPERASILENTE" &&
                                        f.presentato_da === comune_selezionato
                                        ); // filtro in base a data di scadenza e sospeso
            let testo_messaggio = "Filtri applicati: Scadenza tessera, Presentato da, non considera sospesi, ALTRO e OPERA SILENTE";
            document.getElementById("Messaggio_Filtro").innerHTML = testo_messaggio;       
            
        
        
        }
    }
    else
        Famiglie_dopo_scadenza = famiglie

console.log(Famiglie_dopo_scadenza);
    /*
    TABELLA HTML
    */
    var table = document.createElement("table");
    //table.setAttribute("id", "lista_completa");
    table.setAttribute("class", "display nowrap");
    table.setAttribute("style", "width:100%");
    table.border = "1";
    var head = table.createTHead();
    var body = table.createTBody();

    //CreaRiga(head.insertRow(), "th", ["Famiglia", "Tessera", "Scadenza", "Punti res.", "Componenti"]);
    var numero_componenti_famiglie = 0;    
    var ind = "";
    for (var i in Famiglie_dopo_scadenza) {
        var row = body.insertRow();
        FamigliaToTabella(row, Famiglie_dopo_scadenza[i])
        ind = parseInt(i)+1;
        numero_componenti_famiglie = numero_componenti_famiglie + parseInt(Famiglie_dopo_scadenza[i].componenti);
        console.log(Famiglie_dopo_scadenza[i].eta);
        //console.log(numero_componenti_famiglie);
    }
    console.log(ind + " Famiglie");
    console.log(numero_componenti_famiglie + " Componenti");     
    let testo_statistiche = ind + " famiglie " + numero_componenti_famiglie + " componenti";
    document.getElementById("Messaggio_Statistiche").innerHTML = testo_statistiche;







    function FamigliaToTabella(row, famiglia) {
        //CreaRiga(row, "td", [famiglia.nome, famiglia.tipo_tessera, famiglia.scadenza.toLocaleDateString(), famiglia.punti_residui]);
        row.appendChild(CreaTabellaPersone(famiglia));
    }

    function CreaTabellaPersone(famiglia) {
        var table = document.createElement("table");
        table.setAttribute("class", "display nowrap");
        table.setAttribute("style", "width:100%");
        table.border = "1";
        var head = table.createTHead();
        var body = table.createTBody();
        CreaRiga(head.insertRow(), "th", ["Ruolo", "CF", "Cognome", "Nome", "Data nascita", "Età"]);
        if (famiglia.genitore_1 != undefined)
            CreaRigaPersona(body.insertRow(), famiglia.genitore_1, "Genitore 1")
        if (famiglia.genitore_2 != undefined)
            CreaRigaPersona(body.insertRow(), famiglia.genitore_2, "Genitore 2")
        
        
            for (var f in famiglia.figli)
            CreaRigaPersona(body.insertRow(), famiglia.figli[f], "Figlio")
        return table;
    }

    function CreaRigaPersona(row, p, ruolo) {
        CreaRiga(row, "td", [ruolo, p.cf, p.cognome, p.nome, p.data_nascita.toLocaleDateString(), p.eta])
    }

    function CreaRiga(row, tipo, dati) {
        for (var i in dati) {
            r = document.createElement(tipo)
            if (dati[i] != undefined)
                r.innerHTML = dati[i];

            row.appendChild(r)
        }
    }



    var dvExcel = document.getElementById("dvExcel");
    dvExcel.innerHTML = "";
    dvExcel.appendChild(table);
    // crea il bottone per il download in alto a destra
    var dow = document.getElementById("dow");
    dow.innerHTML = '<button class="btn btn-primary" id="export" onclick="ExportExcel()">Download</button>';

    //ExportExcel(Famiglie_dopo_scadenza);
    //console.log(filtro_data)


}
//===================================== PARSEFAMIGLIA ==========================
function ParseFamiglia(dati) {
    let famiglia = {
        nome: dati[INDICE_COGNOME_CAPOFAMIGLIA],
        tipo_tessera: dati[INDICE_CF_CAPOFAMIGLIA + 1],
        ente: dati[INDICE_COGNOME_CAPOFAMIGLIA + 2],
        genitore_1: GetPersona(dati, INDICE_CF_CAPOFAMIGLIA, INDICE_COGNOME_CAPOFAMIGLIA),
        genitore_2: GetPersona(dati, INDICE_CF_CONIUGE, INDICE_COGNOME_CONIUGE),
        scadenza: moment(dati[INDICE_SCADENZA], "YYYY-MM-DD").toDate(),
        punti_residui: dati[INDICE_PUNTI_RESIDUI],
        sospeso: dati[INDICE_SOSPESO],
        componenti: dati[INDICE_COMPONENTI],        
        presentato_da: dati[INDICE_PRESENTATO_DA],
        codice_fiscale: dati[INDICE_CF_CAPOFAMIGLIA],
        figli: []

    }
    //console.log(famiglia.componenti);
    let figlio = 0;
    // controlla se il nome è non undefined per capire se è un figlio
    while (dati[INDICE_CF_FIGLIO_0 + figlio * OFFSET_FIGLI] != undefined) {
        famiglia.figli.push(GetPersona(dati, INDICE_CF_FIGLIO_0 + figlio * OFFSET_FIGLI, INDICE_COGNOME_FIGLIO_0 + figlio * OFFSET_FIGLI));
        figlio++;
    }
//console.log(famiglia);
    return famiglia;
}
//===================================== FINE PARSEFAMIGLIA ==========================


// GetPersona serve alla funzione madre ParseFamiglia

function GetPersona(dati, indice_cf, indice_cognome) {
    if (dati[indice_cognome] == undefined) return;
    return {
        cf: dati[indice_cf],
        nome: dati[indice_cognome + 1],
        cognome: dati[indice_cognome],
        data_nascita: moment(dati[indice_cognome + 3], "YYYY-MM-DD").toDate(),
        eta: dati[indice_cognome + 4]
    };
}

function ExportExcel() {
    var excel = [];
    // intestazione 
    excel[0] = ["Ruolo", "CF", "Cognome", "Nome", "Data nascita", "Età"]

    for (var f in Famiglie_dopo_scadenza) {
        var famiglia = Famiglie_dopo_scadenza[f];

        if (famiglia.genitore_1 != undefined)
            excel.push(CreaRigaExcelPersona(famiglia.genitore_1, "Genitore 1"))
        if (famiglia.genitore_2 != undefined)
            excel.push(CreaRigaExcelPersona(famiglia.genitore_2, "Genitore 2"))
        for (var f in famiglia.figli)
            excel.push(CreaRigaExcelPersona(famiglia.figli[f], "Figlio"))
    }
console.log(excel)
    const wb = XLSX.utils.book_new();
    const ds = XLSX.utils.aoa_to_sheet(excel)
    XLSX.utils.book_append_sheet(wb, ds, "Report")
    XLSX.writeFile(wb, "Report.xlsx", { bookType: "xlsx" })
}

function CreaRigaExcelPersona(p, ruolo) {
    return [ruolo, p.cf, p.cognome, p.nome, p.data_nascita.toLocaleDateString(), p.eta];
}


