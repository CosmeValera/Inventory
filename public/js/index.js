async function loadInstrumentsFromDB() {
  const response = await fetch("/inventory");

  if (response.ok) {
    var instrumentsJson = await response.json();
    document.querySelector("tbody").innerHTML = insertInstruments({
      instruments: instrumentsJson,
    });
  } else {
    alert("Server found an issue, " + response.statusText);
  }
}

loadInstrumentsFromDB();
