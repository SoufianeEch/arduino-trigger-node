const fs = require("fs");
const { exec } = require("child_process");

const path = "/dev/ttyACM0"; // select your SerialMontor Port Path
const stream = fs.createReadStream(path, {
  encoding: "utf-8",
});

let buffer = "";

stream.on("data", (chunk) => {
  buffer += chunk;
  let lines = buffer.split("\n");
  buffer = lines.pop();

  lines.forEach((line) => {
    line = line.trim();
    if (line) {
      console.log(line);
      if (line == "1") {
        openWebsite() // your can choose browser, window state & website
      }
    }
  });
});

function openWebsite(
  browser = "brave-browser",
  state = "private",
  website = "https://youtube.com")
  {
  if (state.includes("public")) state = "--new-window";
  if (state.includes("private")) state = "--incognito";

  exec(`${browser} ${state} ${website}`, (err, stdout, stderr) => {
    console.log(stdout);
  });
}
