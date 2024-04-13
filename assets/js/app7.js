var oggi = moment();
var data = []; // viene generato dal file upload
var famiglie = [];
var famiglieFiltrate = [];
var famiglieFiltratePerRangeAnni = [];


function applicaFiltroDateInizioFine() {
    famiglie = [];
    famiglieFiltrate = [];
    famiglieFiltratePerRangeAnni = [];

    CreaListaFamiglie(data);
    mostra_mia_lista();
    mostraTabellaHTML();
}


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

            for (var i = 1; i < table.rows.length; i++) {
                var rowData = [];
                var rowCells = table.rows[i].cells;
                for (var j = 0; j < rowCells.length; j++) {
                    rowData.push(rowCells[j].textContent.trim());
                }
                data.push(rowData);
            }
            // Do something with the table data here

        }
        //call file reader onload
        myReader.readAsText(theFile.files[0]);
    }
    else {
        alert("This browser does not support HTML5.");
    }
    return false;
}

// QUESTA FUNZIONE CREA LA VARIABILE FAMIGLIE CON COMPONENTI
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
    var filtro_comune_selezionato = document.querySelector('input[name="radioFilter"]:checked').value;

    if (filtro_comune_selezionato !== "tutti") {
        var messaggio_Comune_Selezionato = "<span style='color:red;'>| " + filtro_comune_selezionato + " </span>";
        var comune_selezionato = "si"
    }
    else var messaggio_Comune_Selezionato = "";


    function filtraFamiglie(lista) {
        var condizioni = [];
        if (comune_selezionato === "si") {
            condizioni.push(function (f) { return f.presentato_da == filtro_comune_selezionato });
        }
        condizioni.push(function (f) { return f.sospeso !== "1"; });
        condizioni.push(function (f) { return moment(f.scadenza, "YYYY-MM-DD") >= oggi });
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
    const dataInizioISO = document.getElementById("dataInizio").value;
    const dataFineISO = document.getElementById("dataFine").value;
    famiglieFiltratePerRangeAnni = filtraFamigliePerRangeAnni(famiglieFiltrate, "'" + dataInizioISO + "'", "'" + dataFineISO + "'")
    console.log(famiglieFiltratePerRangeAnni)

    var totaleMembri = 0;
    for (let i = 0; i < famiglieFiltratePerRangeAnni.length; i++) {
        const ruolo = famiglieFiltratePerRangeAnni[i].membri[0].Ruolo;
        for (let j = 1; j < famiglieFiltratePerRangeAnni[i].membri.length; j++) {
            const altroRuolo = famiglieFiltratePerRangeAnni[i].membri[j].Ruolo;
            if (altroRuolo !== ruolo) {
                totaleMembri++;
            }
        }
    }
    //console.log(totaleMembri);

    var dow = document.getElementById("dowPdf");
    dow.innerHTML = '<button class="btn btn-success" id="export_pdf" onclick="exportPDF(' + famiglieFiltratePerRangeAnni.length + ', ' + totaleMembri + ')">PDF</button>';
    // crea il bottone per il download
    var dowExcel = document.getElementById("dowExcel");
    dowExcel.innerHTML = '<button class="btn btn-primary" id="export" onclick="ExportExcel()">Excel</button>';
    //console.log(famiglieFiltratePerRangeAnni.length)

    let testo_filtro = "Filtri applicati: " +
        messaggio_Comune_Selezionato +
        "<br>" + famiglieFiltratePerRangeAnni.length + " famiglie " + totaleMembri + " componenti" + "<hr />"
        ;
    document.getElementById("Messaggio_Filtro").innerHTML = testo_filtro;
    mostraTabellaHTML();
}

var contaFamiglie = 1
function exportPDF(numeroFamiglie, numeroMembri) {

    const dataInizio = moment(document.getElementById("dataInizio").value).format("DD/MM/YYYY");
    const dataFine = moment(document.getElementById("dataFine").value).format("DD/MM/YYYY");
    //console.log(dataInizio)

    var documento = {
        content: [],
        styles: {
            header: {
                fontSize: 18,
                bold: true,
                margin: [0, 0, 0, 10]
            },
            subheader: {
                fontSize: 16,
                bold: true,
                margin: [0, 10, 0, 5]
            },
            tableExample: {
                margin: [0, 5, 0, 15],
                fontSize: 8
            },
            tableOpacityExample: {
                margin: [0, 5, 0, 15],
                fillColor: 'blue',
                fillOpacity: 0.3
            },
            tableHeader: {
                bold: true,
                fontSize: 13,
                color: 'black'
            }
        },
        defaultStyle: {
            // alignment: 'justify'
            fontSize: 10,  //funziona
            //alignment: 'center' //funziona
        }
    };
    documento.content.push("Numero famiglie: " + numeroFamiglie + " Numero beneficiari: " + numeroMembri + "    Filtro applicato: dal " + dataInizio + " al " + dataFine)

    // crea la tabella per ogni famiglia

    for (var id in famiglieFiltratePerRangeAnni) {
        //console.log(famiglieFiltratePerRangeAnni[id])
        var tabella = {
            layout: 'noBorders',
            table: {
                color: '#FFFFFF',
                dontBreakRows: true,
                fontSize: 8,
                body: [[
                    {
                        table: CreaTabellaFamiglia(famiglieFiltratePerRangeAnni[id])

                    }
                ]]
            }
        }
        documento.content.push(tabella)
        documento.content.push("\n")
    }
    const pdf = createPdf(documento);
    pdf.download('listaFamiglie.pdf');
}


function filtraFamigliePerRangeAnni(famiglie, data_Inizio, data_Fine) {
    const formatoData = 'YYYY-MM-DD';
    const dataInizioMoment = moment(data_Inizio, formatoData);
    const dataFineMoment = moment(data_Fine, formatoData);

    const famiglieFiltratePerRangeAnni = [];

    for (let i = 0; i < famiglie.length; i++) {
        const membri = famiglie[i].membri;
        const famigliaFiltrata = [];
        let titolare = null;
        const comune = famiglie[i].presentato_da;
        const telefono = parseInt(famiglie[i].cellulare);

        for (let j = 0; j < membri.length; j++) {
            const membro = membri[j];

            if (membro.Ruolo.toLowerCase() === 'titolare') {
                titolare = membro;
            }

            if (moment(membro.Data_nascita, formatoData).isBetween(dataInizioMoment, dataFineMoment, undefined, '[]')) {
                famigliaFiltrata.push(membro);
            }
        }

        if (famigliaFiltrata.length > 0) {
            if (titolare) {
                famigliaFiltrata.unshift(titolare);
            } else {
                famigliaFiltrata.push(membri[0]);
            }
            //famiglieFiltratePerRangeAnni.push({ famiglia: famiglie[i], membri: famigliaFiltrata });
            famiglieFiltratePerRangeAnni.push({ comune: comune, telefono: telefono, membri: famigliaFiltrata });
        }
    }

    return famiglieFiltratePerRangeAnni;
}

function CreaTabellaFamiglia(famiglia) {
    //console.log(famiglia.membri[0].Cognome)
    var tabella = {
        //style: 'tableExample',
        //headerRows: 1,
        //keepWithHeaderRows: true,
        color: '#444',
        //unbreakable: true,
        widths: [25, 100, 100, 60, 20, 30, 145],
        //unbreakable: true,
        body: [],
        dontBreakRows: true,
    }
    tabella.body.push([
        { text: 'Famiglia nr. ' + contaFamiglie + '   Titolare nucleo familiare: ' + famiglia.membri[0].Cognome + ' ' + famiglia.membri[0].Nome, colSpan: 6, rowSpan: 1, alignment: 'center' },
        {},
        {},
        {},
        {},
        {},
        {}
    ])

    //tabella.body.push(["Num", "Codice Fiscale", "Cognome", "Nome", "Data di Nascita"]);
    tabella.body.push([
        { text: 'Num', italics: true, alignment: 'center' },
        //{ text: 'Codice Fiscale', italics: true, alignment: 'center' },
        { text: 'Cognome', italics: true, alignment: 'center' },
        { text: 'Nome', italics: true, alignment: 'center' },
        { text: 'Data_nascita', italics: true, alignment: 'center' },
        { text: 'Età', italics: true, alignment: 'center' },
        { text: 'Sesso', italics: true, alignment: 'center' },
        { text: 'Consegnato/Note', italics: true, alignment: 'center' },
    ])
    for (var i in famiglia.membri) {
        //var membro = famiglia.membri[i];
        //console.log(membro)
        if (i != 0) {
            var cnt = parseInt(i)
            tabella.body.push([
                //cnt,
                { text: cnt, alignment: 'center' },
                //{ text: membro.codice_fiscale, alignment: 'center' },
                //membro.codice_fiscale,
                //membro.cognome,
                { text: famiglia.membri[i].Cognome },
                //membro.nome,
                { text: famiglia.membri[i].Nome },
                //moment(membro.data_nascita).format("DD/MM/YYYY")
                { text: moment(famiglia.membri[i].Data_nascita).format("DD/MM/YYYY"), alignment: 'center' },
                { text: famiglia.membri[i].Eta, alignment: 'center' },
                { text: famiglia.membri[i].Sesso, alignment: 'center' },
                { text: " [   ]" }

            ]);
        }
    }
    contaFamiglie++
    return tabella
}



function mostraTabellaHTML() {

    //var result = "ciao"
    var result = "<table  id='tabella' class='table table-striped table-responsive{-sm|-md|-lg|-xl}'>" +
        "<thead id = 'riga_intestazione'>" +
        "<tr>" +
        "<th>" + "N." + "</th>" +
        "<th>" + "Titolare" + "</th>" +
        "<th>" + "Componenti selezionati" + "</th>" +
        "<th>" + "Sesso" + "</th>" +
        "<th>" + "Data nascita" + "</th>" +
        "<th>" + "Età" + "</th>" +
        "<th>" + "Comune" + "</th>" +
        "<th>" + "Telefono" + "</th>" +       
        "</tr>" +
        "</thead>" +
        "<tbody>";

    var z = 1
    for (var i = 0; i < famiglieFiltratePerRangeAnni.length; i++) {

        for (var k = 0; k < famiglieFiltratePerRangeAnni[i].membri.length; k++) {

            var cognomeTitolare = famiglieFiltratePerRangeAnni[i].membri[0].Cognome
            var nomeTitolare = famiglieFiltratePerRangeAnni[i].membri[0].Nome
            var cognomeComponente = famiglieFiltratePerRangeAnni[i].membri[k].Cognome
            var nomeComponente = famiglieFiltratePerRangeAnni[i].membri[k].Nome
            var sessoComponente = famiglieFiltratePerRangeAnni[i].membri[k].Sesso
            var dataNascitaComponente = moment(famiglieFiltratePerRangeAnni[i].membri[k].Data_nascita).format("DD/MM/YYYY")
            var etaComponente = famiglieFiltratePerRangeAnni[i].membri[k].Eta
            var comuneProponente = famiglieFiltratePerRangeAnni[i].comune 
            var telefonoFamiglia = parseInt(famiglieFiltratePerRangeAnni[i].telefono);  

            if (k === 1) {
                result += "<tr>" +
                    "<td style='text-align:center'>" + z + "</td>" +
                    "<td>" + cognomeTitolare + " " + nomeTitolare + "</td>" +
                    "<td>" + cognomeComponente + " " + nomeComponente + "</td>" +
                    "<td style='text-align:center'>" + sessoComponente + "</td>" +
                    "<td style='text-align:center'>" + dataNascitaComponente + "</td>" +
                    "<td style='text-align:center'>" + etaComponente + "</td>" +
                    "<td style='text-align:center'>" + comuneProponente + "</td>" +
                    "<td style='text-align:center'>" + telefonoFamiglia + "</td>" +   
                    "</tr>";
                z++
            }
            if (k > 1) {
                result += "<tr>" +
                    "<td style='text-align:center'>" + z + "</td>" +
                    "<td>" + "" + "</td>" +
                    "<td>" + cognomeComponente + " " + nomeComponente + "</td>" +
                    "<td style='text-align:center'>" + sessoComponente + "</td>" +
                    "<td style='text-align:center'>" + dataNascitaComponente + "</td>" +
                    "<td style='text-align:center'>" + etaComponente + "</td>" +
                    "<td style='text-align:center'>" + comuneProponente + "</td>" +
                    "<td style='text-align:center'>" + telefonoFamiglia + "</td>" +   
                    "</tr>";
                z++
            }
        }
    }



    result += "</tbody></table>";

    var tabella = document.getElementById("tabellaHTML");
    tabella.innerHTML = result;
}


function ExportExcel() {
    var excel = [];
    var righeExcel = []
    righeExcel.push("N.");
    righeExcel.push("Cognome Titolare");
    righeExcel.push("Nome Titolare");
    righeExcel.push("Cognome Componente");
    righeExcel.push("Nome Componente");
    righeExcel.push("Sesso");
    righeExcel.push("Data Nascita");
    righeExcel.push("Età");
    righeExcel.push("Comune"); 
    righeExcel.push("Telefono"); 
    excel.push(righeExcel)


    var z = 1
    for (var i = 0; i < famiglieFiltratePerRangeAnni.length; i++) {
        for (var k = 0; k < famiglieFiltratePerRangeAnni[i].membri.length; k++) {

            var cognomeTitolare = famiglieFiltratePerRangeAnni[i].membri[0].Cognome
            var nomeTitolare = famiglieFiltratePerRangeAnni[i].membri[0].Nome
            var cognomeComponente = famiglieFiltratePerRangeAnni[i].membri[k].Cognome
            var nomeComponente = famiglieFiltratePerRangeAnni[i].membri[k].Nome
            var sessoComponente = famiglieFiltratePerRangeAnni[i].membri[k].Sesso
            var dataNascitaComponente = moment(famiglieFiltratePerRangeAnni[i].membri[k].Data_nascita).format("DD/MM/YYYY")
            var etaComponente = parseInt(famiglieFiltratePerRangeAnni[i].membri[k].Eta)
            var comuneProponente = famiglieFiltratePerRangeAnni[i].comune;
            var telefonoFamiglia = parseInt(famiglieFiltratePerRangeAnni[i].telefono);  

            if (k === 1) {
                righeExcel = []
                righeExcel.push(z);
                righeExcel.push(cognomeTitolare);
                righeExcel.push(nomeTitolare);
                righeExcel.push(cognomeComponente);
                righeExcel.push(nomeComponente);
                righeExcel.push(sessoComponente);
                righeExcel.push(dataNascitaComponente);
                righeExcel.push(etaComponente);
                righeExcel.push(comuneProponente); 
                righeExcel.push(telefonoFamiglia);    
                excel.push(righeExcel)
                z++
            }
            if (k > 1) {
                righeExcel = []
                righeExcel.push(z);
                righeExcel.push("");
                righeExcel.push("");
                righeExcel.push(cognomeComponente);
                righeExcel.push(nomeComponente);
                righeExcel.push(sessoComponente);
                righeExcel.push(dataNascitaComponente);
                righeExcel.push(etaComponente);
                righeExcel.push(comuneProponente); 
                righeExcel.push(telefonoFamiglia);    
                excel.push(righeExcel)
                z++
            }
        }
    }
    console.log(excel)

    const wb = XLSX.utils.book_new();
    const ds = XLSX.utils.aoa_to_sheet(excel)
    XLSX.utils.book_append_sheet(wb, ds, "Report")
    XLSX.writeFile(wb, "Report filtrato dal "+ moment(document.getElementById('dataInizio').value).format('DD-MM-YYYY') + " al " + moment(document.getElementById('dataFine').value).format('DD-MM-YYYY') +".xlsx", { bookType: "xlsx" })
}
