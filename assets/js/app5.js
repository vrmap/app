var oggi = moment();
var famiglie = [];
var csv = "";
var famiglieFiltrate = [];
function Upload() {
    //get file
    var theFile = document.getElementById("fileUploadHTML");
    //check if browser support FileReader
    if (typeof (FileReader) != "undefined") {
        //create html5 file reader object
        var myReader = new FileReader();
        // call filereader.onload function
        myReader.onload = function (e) {
            var content = myReader.result;
            // Parse the HTML content here
            var parser = new DOMParser();
            var htmlDoc = parser.parseFromString(content, "text/html");
            // Get the table element
            var table = htmlDoc.getElementsByTagName("table")[0];
            // Get the table data
            var data = [];
            for (var i = 1; i < table.rows.length; i++) {
                var rowData = [];
                var rowCells = table.rows[i].cells;
                for (var j = 0; j < rowCells.length; j++) {
                    rowData.push(rowCells[j].textContent.trim());
                }
                data.push(rowData);
            }
            // Do something with the table data here
            CreaListaFamiglie(data)
            mostra_mia_lista()
        }
        //call file reader onload
        myReader.readAsText(theFile.files[0]);
    }
    else {
        alert("This browser does not support HTML5.");
    }
    return false;
}

function CreaListaFamiglie(data) {

    for (let i in data) {
        let riga = data[i];
        famiglie.push(CreaFamigia(riga));
    }
    //console.log(famiglie)
}

function CreaFamigia(dati) {
    let famiglia = {
        codiceFiscale: dati[0],
        tipoTessera: dati[1],
        cognome: dati[2],
        nome: dati[3],
        ente: dati[4],
        data_nascita: dati[5],
        eta: dati[6],
        luogo_nascita: dati[7],
        nazione: dati[8],
        nazionalita: dati[9],
        sesso: dati[10],
        indirizzo: dati[11],
        località: dati[12],
        cap: dati[13],
        comune: dati[14],
        telefono: dati[15],
        cellulare: dati[16],
        email: dati[17],
        componenti: dati[18],
        punti_totali: dati[19],
        punti_residui: dati[20],
        esenzione: dati[21],
        iscritto_da: dati[22],
        presentato_da: dati[23],
        scadenza: dati[24],
        sospeso: dati[25],
        sospeso_da: dati[26],
        sospeso_a: dati[27],
        non_autos: dati[28],
        val_Isee: dati[29],
        fascia_Isee: dati[30],
        scadenza_Isee: dati[31],
        tipo_alloggio: dati[32],
        creato_nel_mese: dati[33],
        note: dati[34],
        membri: []
    }

    let persona = {
        CodiceFiscale: famiglia.codiceFiscale,
        Cognome: famiglia.cognome,
        Nome: famiglia.nome,
        Ruolo: "Titolare",
        Data_nascita: famiglia.data_nascita,
        Eta: famiglia.eta,
        Luogo_nascita: famiglia.luogo_nascita,
        Nazione: famiglia.nazione,
        Nazionalita: famiglia.nazionalita,
        Sesso: famiglia.sesso,
    }
    famiglia.membri.push(persona);

    let len = dati.length;
    let curr = 35
    while (curr + 9 < len) {
        famiglia.membri.push(CreaComponente(dati, curr));
        curr = curr + 10;
    }
    return famiglia;
}

function CreaComponente(dati, inizio) {
    let persona = {
        CodiceFiscale: dati[inizio + 0].trim(),
        Cognome: dati[inizio + 1].trim(),
        Nome: dati[inizio + 2].trim(),
        Ruolo: dati[inizio + 3].trim(),
        Data_nascita: dati[inizio + 4].trim(),
        Eta: dati[inizio + 5].trim(),
        Luogo_nascita: dati[inizio + 6].trim(),
        Nazione: dati[inizio + 7].trim(),
        Nazionalita: dati[inizio + 8].trim(),
        Sesso: dati[inizio + 9].trim(),
    }
    return persona;
}





function mostra_mia_lista() {
    console.log(famiglie)
    var filtro_elimina_sospesi = document.querySelector('input[name="radio_sospesi"]:checked').value;
    var filtro_tessera_valida = document.querySelector('input[name="radio_tessera_valida"]:checked').value;
    var filtro_comune_selezionato = document.querySelector('input[name="radioFilter"]:checked').value;

    if (filtro_elimina_sospesi === "si") {
        var no_sospesi = "si";
        var messaggio_Sospesi = "<span style='color:red;'>| elimina sospesi </span>";
    } else {
        //var no_sospesi = "";
        var messaggio_Sospesi = "";
    }
    if (filtro_tessera_valida === "si") {
        var ok_tessera = "si";
        var messaggio_Tessera_Valida = "<span style='color:red;'>| elimina tessera scaduta </span>";
    }
    else {
        var messaggio_Tessera_Valida = "";
        //var ok_tessera = "no";
    }

    if (filtro_comune_selezionato !== "tutti") {
        var messaggio_Comune_Selezionato = "<span style='color:red;'>| " + filtro_comune_selezionato + " </span>";
        var comune_selezionato = "si"
    }
    else var messaggio_Comune_Selezionato = "";


    function filtraFamiglie(lista) {
        var condizioni = [];
        if (no_sospesi === "si") {
            condizioni.push(function (f) { return f.sospeso !== "1"; });
        }
        if (ok_tessera === "si") {
            condizioni.push(function (f) { return moment(f.scadenza, "YYYY-MM-DD") >= oggi });
        }
        if (comune_selezionato === "si") {
            condizioni.push(function (f) { return f.presentato_da == filtro_comune_selezionato });
        }
        condizioni.push(function (f) { return f.codiceFiscale !== "ALTRO"; })
        condizioni.push(function (f) { return f.codiceFiscale !== "OPERASILENTE"; })
        condizioni.push(function (f) { return f.codiceFiscale !== "CARITAS"; })

        return lista.filter(function (f) {
            return condizioni.every(function (condizione) {
                return condizione(f);
            });
        });
    }
    famiglieFiltrate = filtraFamiglie(famiglie);
    console.log(famiglieFiltrate);
    console.log(famiglieFiltrate.length)

    let totaleMembri = 0;
    famiglieFiltrate.forEach((famiglia) => {
        totaleMembri += famiglia.membri.length;
    });

    console.log(totaleMembri);

    let testo_filtro = "Filtri applicati: " +
        messaggio_Sospesi +
        messaggio_Tessera_Valida +
        messaggio_Comune_Selezionato +
        "<br>" + famiglieFiltrate.length + " famiglie " + totaleMembri + " componenti" + "<hr />"
        ;
    document.getElementById("Messaggio_Filtro").innerHTML = testo_filtro;


    creaTabella(famiglieFiltrate)




    csv = 'CodiceFiscale,Cognome,Nome,Ruolo,Data_nascita,Eta,Luogo_nascita,Nazione,Nazionalita,Sesso\n';
    for (let i = 0; i < famiglieFiltrate.length; i++) {
        const membri = famiglieFiltrate[i].membri;
        for (let j = 0; j < membri.length; j++) {
            const membro = membri[j];
            csv += `${membro.CodiceFiscale},${membro.Cognome},${membro.Nome},${membro.Ruolo},${membro.Data_nascita},${membro.Eta},${membro.Luogo_nascita},${membro.Nazione},${membro.Nazionalita},${membro.Sesso}\n`;

        }
        csv += '\nCodiceFiscale,Cognome,Nome,Ruolo,Data_nascita,Eta,Luogo_nascita,Nazione,Nazionalita,Sesso\n';
    }
    // crea il bottone per il download in alto a destra
    var dow = document.getElementById("dow");
    dow.innerHTML = '<button class="btn btn-primary" id="export" onclick="generateCSV()">Download</button>';
    //console.log(csv);
    return csv; // Restituisci la stringa CSV creata
}

function downloadCSV(csv, filename) {
    var csvFile;
    var downloadLink;

    // Crea il file CSV
    csvFile = new Blob([csv], { type: "text/csv" });

    // Crea un link per il download
    downloadLink = document.createElement("a");

    // Aggiungi il link al file CSV
    downloadLink.download = filename;
    downloadLink.href = window.URL.createObjectURL(csvFile);
    downloadLink.style.display = "none";

    // Aggiungi il link al documento
    document.body.appendChild(downloadLink);

    // Clicca sul link per scaricare il file CSV
    downloadLink.click();
}

function generateCSV() {
    // Specifica il nome del file CSV
    var filename = "dati.csv";

    // Scarica il file CSV
    downloadCSV(csv, filename);
}

function creaTabella() {
    var result = ""
    for (let i = 0; i < famiglieFiltrate.length; i++) {
        const membri = famiglieFiltrate[i].membri;
        result += "<table id='tabella' name='tabella'class='table table-striped table-responsive{-sm|-md|-lg|-xl}'>";
        result += "<thead id = 'riga_intestazione'><tr><th>CodiceFiscale</th><th>Cognome</th><th>Nome</th><th>Ruolo</th><th>Data_nascita</th><th>Eta</th><th>Luogo_nascita</th><th>Nazione</th><th>Nazionalita</th><th>Sesso<tr></thead>";
        for (let j = 0; j < membri.length; j++) {
            const membro = membri[j];
            result += `<tr id = 'riga'><td>${membro.CodiceFiscale}</td><td>${membro.Cognome}</td><td>${membro.Nome}</td><td>${membro.Ruolo}</td><td>${membro.Data_nascita}</td><td>${membro.Eta}</td><td>${membro.Luogo_nascita}</td><td>${membro.Nazione}</td><td>${membro.Nazionalita}</td><td>${membro.Sesso}</td></tr>`;
        }
        result += '</table><br>'
    }
    var div = document.getElementById('tabellaHTML');
    div.innerHTML = result;
}
