var finale = [];
var intestanumerfam = [];
var numerfam = [];

function visualizzaScontrini() {
    var scontrini = document.getElementById('scontrini').value
    var righe = scontrini.split("\n")

    var scrematura = []
    for (var i = 0; i < righe.length; i++) {
        var campi = righe[i].split("\t")
        scrematura.push({
            data: campi[1],
            cognom: campi[2],
            cf: campi[3]
        });
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
        for (var z = 0; z < listafamigliePerData[i].length; z++) {
            const giorno = listafamigliePerData[i][z].data.substr(0, 2);
            const mese = listafamigliePerData[i][z].data.substr(3, 2) - 1;
            const anno = listafamigliePerData[i][z].data.substr(6, 4);
            const date = new Date(anno, mese, giorno);
            var giornoSett = new Intl.DateTimeFormat('it-IT', { weekday: 'long' }).format(date)
            x.data = listafamigliePerData[i][z].data
            x.giornoSett = giornoSett
            x.nfam = parseInt(z) + 1
        }
        finale.push(x)
    }

    for (var i = 0; i < finale.length; i++) {
        var data = finale[i].data
        var elem = finale[i].nfam
        intestanumerfam.push(data)
        numerfam.push(elem)
    }

    var result = "<table  id='tabella' class='table table-striped table-responsive{-sm|-md|-lg|-xl}'>" +
        "<thead id = 'riga_intestazione'>" +
        "<tr>" +
        "<th>Data</th>" +
        "<th>Giorno sett.</th>" +
        "<th>N_Fam</th>" +
        "</tr>" +
        "</thead>";

    for (var i = 0; i < finale.length; i++) {
        result += "<tbody><tr id = 'riga'>" +
            "<td>" + finale[i].data + "</td>" +
            "<td>" + finale[i].giornoSett + "</td>" +
            "<td>" + finale[i].nfam + "</td>" +
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
    righeExcel.push("N_Fam..");
    excel.push(righeExcel)

    for (var f in finale) {
        righeExcel = []
        righeExcel.push(finale[f].data);
        righeExcel.push(finale[f].giornoSett);
        righeExcel.push(finale[f].nfam);

        excel.push(righeExcel)
    }

    const wb = XLSX.utils.book_new();
    const ds = XLSX.utils.aoa_to_sheet(excel)
    XLSX.utils.book_append_sheet(wb, ds, "Report")
    XLSX.writeFile(wb, "Report.xlsx", { bookType: "xlsx" })






}


function visualizzaGrafico() {
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: intestanumerfam,
            datasets: [{
                label: '# Famiglie',
                data: numerfam,
                trendlineLinear: {
                    style: "#3e95cd",
                    lineStyle: "line",
                    width: 1
                },
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

}
