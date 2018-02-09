// build.js
// Very simple build script to run angular build
// Needed because all the cross platform things I tried didn't work

// No command line arguments, we're just going to use the env vars

let ng_cmd = "ng build"

if (process.env.NG_CMD && process.env.NG_CMD=="nobuild") {
    exit;
}
if (process.env.NG_CMD) {
    ng_cmd = "ng build --environment " + process.env.NG_CMD 
}
const { exec } = require('child_process');
console.log("Building " + ng_cmd)
exec(ng_cmd, (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
});
