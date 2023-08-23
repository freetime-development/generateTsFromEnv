// @ts-nocheck
const fs = require("fs");
const readline = require("readline");

(async () => {
  const arguments = process.argv.slice(2);

  const inputFlag = arguments.indexOf("-i");
  const inputFileArg = arguments[inputFlag + 1];
  const outputFlag = arguments.indexOf("-o");
  const outputFileArg = arguments[outputFlag + 1];

  async function getKeysFromEnvFile() {
    const keys = [];
    const fileStream = fs.createReadStream(inputFileArg);

    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });
    // Note: we use the crlfDelay option to recognize all instances of CR LF
    // ('\r\n') in input.txt as a single line break.

    for await (const line of rl) {
      const [key] = line.split("=");
      keys.push(key);
    }

    return keys;
  }

  const keys = await getKeysFromEnvFile();

  fs.writeFileSync(outputFileArg, `export type Env = {\n\t${keys.map((key) => `${key}: string`).join(",\n \t")} \n}`);
})();
