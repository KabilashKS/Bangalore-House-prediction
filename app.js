function getBathValue() {
  var uiBathrooms = document.getElementsByName("uiBathrooms");
  for (let i = 0; i < uiBathrooms.length; i++) {
    if (uiBathrooms[i].checked) {
      return parseInt(uiBathrooms[i].value);
    }
  }
  return -1;
}

function getBHKValue() {
  var uiBHK = document.getElementsByName("uiBHK");
  for (let i = 0; i < uiBHK.length; i++) {
    if (uiBHK[i].checked) {
      return parseInt(uiBHK[i].value);
    }
  }
  return -1;
}

function onClickedEstimatePrice() {
  console.log("Estimate price button clicked");

  var sqft = document.getElementById("uiSqft").value;
  var bhk = getBHKValue();
  var bath = getBathValue();
  var location = document.getElementById("uiLocations").value;
  var estPrice = document.getElementById("uiEstimatedPrice");

  var url = "http://127.0.0.1:5002/predict_home_price"; // backend Flask server

  $.ajax({
    url: url,
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({
      total_sqft: parseFloat(sqft),
      bhk: bhk,
      bath: bath,
      location: location
    }),
    success: function (data) {
      console.log(data.estimated_price);
      estPrice.innerHTML = "<h2>💰 Estimated Price: " + data.estimated_price + " Lakh</h2>";
    },
    error: function (xhr, status, error) {
      console.error("Error:", error);
    }
  });
}

function onPageLoad() {
  console.log("Document loaded");

  var url = "http://127.0.0.1:5002/get_location_names";

  $.get(url, function (data, status) {
    console.log("Got response for get_location_names request");
    if (data) {
      var locations = data.locations;
      var uiLocations = document.getElementById("uiLocations");
      $('#uiLocations').empty();
      for (var i in locations) {
        var opt = new Option(locations[i]);
        $('#uiLocations').append(opt);
      }
    }
  });
}

window.onload = onPageLoad;
