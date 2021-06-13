module.exports = function () {
  var csvToJson = require("convert-csv-to-json");
  let fileInputName = "traces.csv";
  let fileOutputName = "myOutputFile.json";
  csvToJson.generateJsonFileFromCsv(fileInputName, fileOutputName);
};
