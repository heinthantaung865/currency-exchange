let changedCurrency;
let otherCurrency;
let changedCurrencyInput;
let otherCurrencyInput;
$(document).ready(function () {
  addCurrencyCodes();
  $("#input1").keyup(function () {
    updateCurrencyConversion("input1");
  });

  $("#input2").keyup(function () {
    updateCurrencyConversion("input1");
  });

  $("#select1").change(function () {
    updateCurrencyConversion("select1");
  });

  $("#select2").change(function () {
    updateCurrencyConversion("select2");
  });
});

function addCurrencyCodes() {
  fetch(
    "https://v6.exchangerate-api.com/v6/304ddff2e33daf78e57874be/latest/USD"
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      for (const key in data.conversion_rates) {
        console.log(key);
        $("#select1").append(`<option value="${key}">${key}</option>`);
        $("#select2").append(`<option value="${key}">${key}</option>`);
      }
    });
}

function calculateCurrency(
  changedCurrency,
  otherCurrency,
  changedCurrencyInput,
  otherCurrencyInput
) {
  fetch(
    `https://v6.exchangerate-api.com/v6/304ddff2e33daf78e57874be/latest/${changedCurrency}`
  )
    .then((res) => res.json())
    .then((data) => {
      let changedCurrencyValue = Number($(`#${changedCurrencyInput}`).val());
      let result = data.conversion_rates[otherCurrency] * changedCurrencyValue;
      if (changedCurrencyValue == 0) {
        $(`#${otherCurrencyInput}`).val(" ");
      } else {
        $(`#${otherCurrencyInput}`).val(result);
      }

      console.log(data.conversion_rates[otherCurrency]);
      console.log(changedCurrencyValue);
      console.log(data.conversion_rates[otherCurrency] * changedCurrencyValue);
    });
}
function updateCurrencyConversion(element) {
  if (element == "input1" || element == "select1" || element == "select2") {
    changedCurrency = $("#select1").val();
    otherCurrency = $("#select2").val();
    changedCurrencyInput = "input1";
    otherCurrencyInput = "input2";
    console.log($("#select2").val());
    calculateCurrency(
      changedCurrency,
      otherCurrency,
      changedCurrencyInput,
      otherCurrencyInput
    );
  } else {
    changedCurrency = $("#select2").val();
    otherCurrency = $("#select1").val();
    changedCurrencyInput = "input2";
    otherCurrencyInput = "input1";
    console.log($("#select1").val());
    calculateCurrency(
      changedCurrency,
      otherCurrency,
      changedCurrencyInput,
      otherCurrencyInput
    );
  }
}
