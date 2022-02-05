async function loadInstrumentsFromDB(evt) {
  console.log(evt);
  // console.log(evt.target);
  // console.log(evt.target.value);
  const response = await fetch("/inventory");

  if (response.ok) {
    var instrumentsJson = await response.json();
    if (evt) {
      //When clicking the checkbox
      if (evt.target.checked) {
        document.querySelector("tbody").innerHTML = insertBigInstruments({
          instruments: instrumentsJson,
        });
      } else {
        document.querySelector("tbody").innerHTML = insertInstruments({
          instruments: instrumentsJson,
        });
      }
    } else {
      //Load screen first time
      document.querySelector("tbody").innerHTML = insertInstruments({
        instruments: instrumentsJson,
      });
    }
  } else {
    alert("Server found an issue, " + response.statusText);
  }
}

document
  .getElementById("switchBigImg")
  .addEventListener("change", loadInstrumentsFromDB);

loadInstrumentsFromDB();
