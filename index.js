async function addProduct(evt) {
  let response = await fetch("./initialImport.json").then((res) => res.json());
  document.querySelector("tbody").innerHTML = insertInstruments({
    instruments: response,
  });
}

document.querySelector("#add-product").addEventListener("click", addProduct);
