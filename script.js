
$(document).ready(function() {
  var vismaAutoivoice = vismaAutoivoice || {};
  vismaAutoivoice.calculator = function() {
    var slider1 = document.getElementById("slider-autoinvoice-invoices"), //1 element to create slider
      slider2 = document.getElementById("slider-autoinvoice-digital"), //2 element to create slider
      savingRate = 0.7, //saved money kr per 1 invoice
      $result = $("#slider-result"); //calculation output element
    // Appending money-formatting (visual)
    var outputFormat = wNumb({
      prefix: "Руб ",
      decimals: 2,
      thousand: " ",
      mark: ","
    });
    //Create slider for invoice count
    noUiSlider.create(slider1, {
      start: 10000,
      step: 10000,
      tooltips: wNumb({
        decimals: 0,
        thousand: " "
      }),
      range: {
        min: 100000,
        max: 1000000
      },
      connect: "lower"
    });
    //Create slider for digital % of invoice count
    noUiSlider.create(slider2, {
      start: 50,
      step: 1,
      tooltips: wNumb({
        decimals: 0
      }),
      range: {
        min: 1,
        max: 12
      },
      connect: "lower"
    });

    function calculateSavings(invoices, digital) {
      digital = digital / 100;
      var result = invoices * (1 - digital) * savingRate;
      console.log("total result: ", result, invoices, digital);
      $result.html(outputFormat.to(result))
    }
    //Default result before interaction with sliders
    var invoiceCount = Number(slider1.noUiSlider.get()),
        digitalCount = Number(slider2.noUiSlider.get());
    console.log(
      invoiceCount,
      digitalCount,
      typeof invoiceCount,
    //  invoiceCount + digitalCount
    );
    //calculate saved hours and update calculation output element's content
    var calculateMoney = function() {
        //Show calculation result on screen
        $amountSpan.html(mod);
    };
    /* var digitalInvoices = 80;
    digitalInvoices = digitalInvoices / 100;
    console.log(outputFormat.to(1000 * (1 - digitalInvoices) * savingRate), slider1);
*/
    function calculateMoney() {
      //Formula: totalInvoices * (1 - digitalInvoices)*savingRate
    }

    //User can input calculation value by slider or directly into input field
    //When the slider value changes, update the input and calculation output element's content
    calculateSavings(invoiceCount, digitalCount);

    slider1.noUiSlider.on("update", function(values, handle) {
      invoiceCount = Number(values[handle]);

      calculateSavings(invoiceCount, digitalCount);
     // console.log(" slider 1 ", invoiceCount, typeof invoiceCount);
      return invoiceCount;
    });


    slider2.noUiSlider.on("update", function(values, handle) {
      digitalCount = Number(values[handle]);
      calculateSavings(invoiceCount, digitalCount);

    });
  };

  vismaAutoivoice.calculator();
});
