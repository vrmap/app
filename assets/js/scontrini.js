var finale = [];
var intestanumerfam = [];
var numerfam = [];

function visualizzaScontrini() {
    var scontrini = document.getElementById('scontrini').value
    var righe = scontrini.split("\n")

    var scrematura = []
    for (var i = 0; i < righe.length; i++) {
        var campi = righe[i].split("\t")
        if (campi[3] != "ALTRO" && campi[3] != "OPERASILENTE") {
            scrematura.push({
                data: campi[1],
                cognom: campi[2],
                cf: campi[3],
                numArticoli: campi[4],
                puntiSpesi: campi[5]
            });
        }
    }

    //console.log(scrematura)

    var listafamiglie = []
    for (var i = 0; i < scrematura.length; i++) {
        if (scrematura[i].cf != undefined && scrematura[i].cf != "") {
            var data = scrematura[i].data.substring(0, 10);
            listafamiglie.push({
                data: data,
                cognom: scrematura[i].cognom,
                cf: scrematura[i].cf,
                numArticoli: scrematura[i].numArticoli,
                puntiSpesi: scrematura[i].puntiSpesi
            });
        }
    }

    //console.log(listafamiglie)

    const listafamigliePerData = listafamiglie.reduce((group, product) => {
        const { data } = product;
        group[data] = group[data] ?? [];
        group[data].push(product);
        return group;
    }, {});
    //console.log(listafamigliePerData);

    for (var i in listafamigliePerData) {
        var x = {};
        var puntiGiorno = 0
        var articoliGiorno = 0
        for (var z = 0; z < listafamigliePerData[i].length; z++) {
            const giorno = listafamigliePerData[i][z].data.substr(0, 2);
            const mese = listafamigliePerData[i][z].data.substr(3, 2) - 1;
            const anno = listafamigliePerData[i][z].data.substr(6, 4);
            const date = new Date(anno, mese, giorno);
            var giornoSett = new Intl.DateTimeFormat('it-IT', { weekday: 'long' }).format(date)
            var punti = parseInt(listafamigliePerData[i][z].puntiSpesi)
            var articoli = parseInt(listafamigliePerData[i][z].numArticoli)
            puntiGiorno = puntiGiorno + punti
            articoliGiorno = articoliGiorno + articoli
            x.dataFormattata = moment(date).format('YYYY-MM-DD');
            x.data = listafamigliePerData[i][z].data
            x.giornoSett = giornoSett
            x.nfam = parseInt(z) + 1
            x.aGiorno = articoliGiorno
            x.pGiorno = puntiGiorno
        }
        finale.push(x)
    }

    // ordina per date crescenti
    finale.sort((a, b) => {
        return new Date(a.dataFormattata) - new Date(b.dataFormattata);
    })

    //console.log(finale);

    var result = "<table  id='tabella' class='table table-striped table-responsive{-sm|-md|-lg|-xl}'>" +
        "<thead id = 'riga_intestazione'>" +
        "<tr>" +
        "<th>Data</th>" +
        "<th>Giorno sett.</th>" +
        "<th>N_Fam</th>" +
        "<th>Articoli</th>" +
        "<th>Punti</th>" +
        "</thead>";

    for (var i = 0; i < finale.length; i++) {
        result += "<tbody><tr id = 'riga'>" +
            "<td>" + finale[i].data + "</td>" +
            "<td>" + finale[i].giornoSett + "</td>" +
            "<td>" + finale[i].nfam + "</td>" +
            "<td>" + finale[i].aGiorno + "</td>" +
            "<td>" + finale[i].pGiorno + "</td>" +
            "</tr></tbody>";
    }

    result += "</table>";
    var div = document.getElementById('dataTable');
    div.innerHTML = result;
}

function ExportExcel() {
    var excel = [];
    var righeExcel = []

    righeExcel.push("Data");
    righeExcel.push("Giorno sett.");
    righeExcel.push("N_Fam");
    righeExcel.push("Articoli");
    righeExcel.push("Punti");
    excel.push(righeExcel)

    for (var f in finale) {
        righeExcel = []
        righeExcel.push(finale[f].data);
        righeExcel.push(finale[f].giornoSett);
        righeExcel.push(finale[f].nfam);
        righeExcel.push(finale[f].aGiorno);
        righeExcel.push(finale[f].pGiorno);
        excel.push(righeExcel)
    }

    const wb = XLSX.utils.book_new();
    const ds = XLSX.utils.aoa_to_sheet(excel)
    XLSX.utils.book_append_sheet(wb, ds, "Report")
    XLSX.writeFile(wb, "Report.xlsx", { bookType: "xlsx" })
}

var myChartFamiglie
$('#modChartFamiglie').on('shown.bs.modal', function (event) {
    var intestanumerfam =[]
    var numerfam=[]
    for (var i = 0; i < finale.length; i++) {
        var data = finale[i].data
        var elem = finale[i].nfam
        intestanumerfam.push(data)
        numerfam.push(elem)
    }
    var modal = $(this);
    var canvas = modal.find('.modal-body canvas');
    canvas.innerHTML = ""
    var ctx = canvas[0].getContext("2d");
    myChartFamiglie = new Chart(ctx, {
        type: 'line',
        data: {
            labels: intestanumerfam,
            datasets: [{
                label: '# Famiglie',
                data: numerfam,
                trendlineLinear: {
                    style: "#FF0000",
                    lineStyle: "dotted|solid",
                    width: 1,
                    projection: false
                },
                backgroundColor: [

                    'rgba(54, 162, 235, 0.2)'
                ],
                borderColor: [

                    'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}).on('hidden.bs.modal', function (event) {
    myChartFamiglie.destroy()
    // reset canvas size
    var modal = $(this);
    var canvas = modal.find('.modal-body canvas');
    canvas.attr('width', '568px').attr('height', '300px');
    // destroy modal
    $(this).data('bs.modal', null);
});

var myChartProdotti
$('#modChartProdotti').on('shown.bs.modal', function (event) {
    var intestanumerfam =[]
    var numerfam=[]
    for (var i = 0; i < finale.length; i++) {
        var data = finale[i].data
        var elem = finale[i].aGiorno
        intestanumerfam.push(data)
        numerfam.push(elem)
    }
    var modal = $(this);
    var canvas = modal.find('.modal-body canvas');
    canvas.innerHTML = ""
    var ctx = canvas[0].getContext("2d");
    myChartProdotti = new Chart(ctx, {
        type: 'line',
        data: {
            labels: intestanumerfam,
            datasets: [{
                label: '# Prodotti',
                data: numerfam,
                trendlineLinear: {
                    style: "#FF0000",
                    lineStyle: "dotted|solid",
                    width: 1,
                    projection: false
                },
                backgroundColor: [

                    'rgba(54, 162, 235, 0.2)'
                ],
                borderColor: [

                    'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}).on('hidden.bs.modal', function (event) {
    myChartProdotti.destroy()
    // reset canvas size
    var modal = $(this);
    var canvas = modal.find('.modal-body canvas');
    canvas.attr('width', '568px').attr('height', '300px');
    // destroy modal
    $(this).data('bs.modal', null);
});

var myChartPunti
$('#modChartPunti').on('shown.bs.modal', function (event) {
    var intestanumerfam =[]
    var numerfam=[]
    for (var i = 0; i < finale.length; i++) {
        var data = finale[i].data
        var elem = finale[i].pGiorno
        intestanumerfam.push(data)
        numerfam.push(elem)
    }
    var modal = $(this);
    var canvas = modal.find('.modal-body canvas');
    canvas.innerHTML = ""
    var ctx = canvas[0].getContext("2d");
    myChartPunti = new Chart(ctx, {
        type: 'line',
        data: {
            labels: intestanumerfam,
            datasets: [{
                label: '# Punti',
                data: numerfam,
                trendlineLinear: {
                    style: "#FF0000",
                    lineStyle: "dotted|solid",
                    width: 1,
                    projection: false
                },
                backgroundColor: [

                    'rgba(54, 162, 235, 0.2)'
                ],
                borderColor: [

                    'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}).on('hidden.bs.modal', function (event) {
    myChartPunti.destroy()
    // reset canvas size
    var modal = $(this);
    var canvas = modal.find('.modal-body canvas');
    canvas.attr('width', '568px').attr('height', '300px');
    // destroy modal
    $(this).data('bs.modal', null);
});
