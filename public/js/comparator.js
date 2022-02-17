var modal;
var instrumentsJson = new Object();
var settings = new Object();
settings.filterSonority = false;

async function loadInstrumentsFromDBToVariable() {
    const response = await fetch("/inventory");
    if (response.ok) {
        instrumentsJson = await response.json();

        //TODO: another pug, that shows sonority instead of price
        // document.querySelector("tbody").innerHTML = insertInstruments({
        //     data: dataPug,
        // });
    } else {
        alert("Server found an issue, " + response.statusText);
    }
}

async function showInstrumentsInLeftTbody() {
    dataPug = {
        instruments : instrumentsJson,
        filterSonority : settings.filterSonority
    }
    document.querySelector("#left-tbody").innerHTML = insertInstrumentsComparator({
        data: dataPug,
    });
}

async function showInstrumentsInRightTbody() {
    dataPug = {
        instruments : instrumentsJson,
        filterSonority : settings.filterSonority
    }
    document.querySelector("#right-tbody").innerHTML = insertInstrumentsComparator({
        data: dataPug,
    });
}

async function main() {
    await loadInstrumentsFromDBToVariable();
    await showInstrumentsInLeftTbody();
    await showInstrumentsInRightTbody();
}
main();