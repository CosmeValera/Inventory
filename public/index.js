async function addProduct(evt) {
  let instrument = {
    id: 4,
    type: "String",
    subtype: null,
    name: "Violin",
    img: "violin.png",
    sonority: 73,
    price: 2200,
    summary: "Beethoven's violin",
  };
  console.log("gonna fetch");
  // var fetchValue = await fetch("./inventory", {
  //     method: "POST",
  //     body: JSON.stringify(instrument)
  // })

  var fetchValue = await fetch("./inventory", {
    method: "POST",
    body: JSON.stringify(instrument),
  }).then(function (response) {
    return response.text();
  });
  console.log(fetchValue);
  console.log("fetch done :)");

  //Do I have to change the html like this?
  document.querySelector("body").innerHTML = fetchValue;
}

document.querySelector("#add-product").addEventListener("click", addProduct);
