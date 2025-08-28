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
        openWebsite(browser="brave-browser", state="private", website="https://github.com/SoufianeEch") // your can choose browser, window state & website
      }
    }
  });
});

function openWebsite(
  browser = "brave-browser",
  state = "private",
  website = "https://youtube.com"
) {
  let mode = "";

  if (state.includes("public")) mode = "--new-window";
  if (state.includes("private")) mode = "--incognito";

  exec(`${browser} ${mode} ${website}`, (err, stdout, stderr) => {
    if (err) {
      console.error("Error:", err);
      return;
    }
    console.log(stdout);
  });
}
