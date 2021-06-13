// Only for create the json file (no need to re-run this)
//const create_json = require("./create_json");

var parsedJSON = require("./myOutputFile.json");
const arr = Object.values(parsedJSON);

let u = 0.001998;
let histDi =
  parseFloat(arr[0].receiver_timestamp) - parseFloat(arr[0].sender_timestamp);
let histVi = 0; // This value was assumed
let lostCount = 0;
let firstOfStream = true;
let pi;
let di_;
let vi_;

for (i = 0; i < arr.length; i++) {
  let type = arr[i].type;
  if (type == "D") {
    let r_time = parseInt(arr[i].receiver_timestamp);
    let s_time = parseInt(arr[i].sender_timestamp);

    let di = r_time - s_time;
    di_ = parseFloat((1 - u) * histDi + u * di);
    let vi = Math.abs(di_ - di);
    vi_ = parseFloat((1 - u) * histVi + u * vi);

    if (firstOfStream) {
      pi = 4 * vi_ + s_time + di_;
      firstOfStream = false;
    } else {
      pi += 160;
    }

    if (pi < r_time) {
      lostCount++;
    }

    histDi = di_;
    histVi = vi_;
  } else {
    firstOfStream = true;
  }
}

console.log(((lostCount / arr.length) * 100).toFixed(2) + "%");
