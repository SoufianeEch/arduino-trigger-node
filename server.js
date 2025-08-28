// const http = require("http");
// const path = require("path");
// const fs = require("fs/promises");

// const PORT = 3000;

// const server = http.createServer((req, res) => {

// })

// server.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`)
// })

// --------------------

// const {
//   SerialPort,
//   ReadlineParser,
// } = require("../Code/server/node_modules/serialport");

// const port = new SerialPort({
//   path: "/dev/ttyACM0",
//   baudRate: 9600,
// });

// // 2. Split incoming data by newline (\n)
// const parser = port.pipe(new ReadlineParser({ delimiter: "\n" }));

// let buffer = "";
// let count = 0;

// port.on("data", (chunk) => {
//   buffer += chunk.toString();

//   let lines = buffer.split("\n")
//   buffer = lines.pop()

//   lines.forEach(line => {
//     line = line.trim()
//     // console.log(line);
//     if (line == "1") {
//       count+=1;
//       console.log(`Button Pressed ${count}`)
//     }
//   })
// })

// -------

const fs = require("fs")
const { exec } = require("child_process")

const path = "/dev/ttyACM0"
const stream = fs.createReadStream(path, {
  encoding: "utf-8"
})

let buffer = "";

stream.on("data", (chunk) => {
  buffer += chunk
  let lines = buffer.split("\n")
  buffer = lines.pop()

  lines.forEach(line => {
    line = line.trim()
    if (line) {
      console.log(line)
      if (line == "1") {
        exec("brave-browser --incognito https://youtube.com", (err, stdout, stderr) => {
          console.log(stdout);
        })
      }
    }
  });
})