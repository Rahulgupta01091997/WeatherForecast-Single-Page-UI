(function () {
  //--------------------------------- Fetch list of cities using api--------------//
  var headers = new Headers();
  var finalcitylist = [];
  headers.append(
    "Authorization",
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJyYWluYXJhaHVsMTkxOTk3QGdtYWlsLmNvbSIsImFwaV90b2tlbiI6ImVxVkpfYnNXMnRRTXB1Q092eUVncGVSaFNvbnhOdDlfd0NSTHY5bXRFd05VMTBpZFVpY1h1RWUyem1odGhOZ3RLMkUifSwiZXhwIjoxNjM5MjMzOTQyfQ.HzgOz64mIHw7udV0UR93E5kiQgNPDk67YtRfbUQU1Rg"
  );
  var requestOptions = {
    method: "GET",
    headers: headers,
    Accept: "application/json",
  };

  fetch(
    "https://www.universal-tutorial.com/api/cities/Maharashtra",
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      (resultjson = JSON.parse(result)),
        (finalcitylist = resultjson.map(function (cityobj) {
          return cityobj.city_name;
        }));
    })
    .catch((error) => console.log("error", error));
  //-------------------------Autocomplete Javascript -------------------------------//
  //   const citylistname = ["mumbai", "pune", "thane"];
  var inputvalue = document.querySelector("input");
  var selectvalue = document.getElementById("citylist");
  inputvalue.addEventListener("keyup", showdropdown);
  selectvalue.addEventListener("click", function () {
    setValue(this);
  });
  function showdropdown() {
    var dropddown = document.getElementById("citydropdown");
    dropddown.style.display = "none";
    selectvalue.options.length = 0;
    if (inputvalue.value) {
      let cityvalue = inputvalue.value;
      selectvalue.size = 3;
      for (var i = 0; i < finalcitylist.length; i++) {
        if (
          finalcitylist[i]
            .toLocaleLowerCase()
            .match(cityvalue.toLocaleLowerCase())
        ) {
          dropddown.style.display = "block";
          var createoptions = document.createElement("option");
          selectvalue.appendChild(createoptions);
          createoptions.text =
            finalcitylist[i].charAt(0).toUpperCase() +
            finalcitylist[i].substr(1);
          createoptions.value =
            finalcitylist[i].charAt(0).toUpperCase() +
            finalcitylist[i].substr(1);
        }
      }
      var listsize = dropddown.children[0].children;
      if (listsize.length > 0) {
        var defaultSize = 25;
        if (listsize.length < 10) {
          defaultSize *= listsize.length;
        } else {
          defaultSize *= 10;
        }
        dropddown.children[0].style.height = defaultSize + "px";
      }
    }
  }
  function setValue(selectedVal) {
    inputvalue.value = selectedVal.value;
    document.getElementById("citydropdown").style.display = "none";
  }
  //------------------------------MODAL Javascript --------------------------------//
  var modal = document.getElementById("modal");
  var closemodal = document.getElementById("close");
  var modalopen = document.getElementById("continue");
  modalopen.addEventListener("click", function () {
    if (selectvalue.value) {
      modal.style.display = "block";
      document.getElementById("citynameforecast").innerHTML = selectvalue.value;
    } else {
      alert("Please Select a City First");
    }
  });
  closemodal.addEventListener("click", function () {
    modal.style.display = "none";
  });
  window.addEventListener("click", function (evn) {
    if (evn.target == modal) {
      modal.style.display = "none";
    }
  });
})();
