const glob = require("fast-glob");
const { parse } = require("graphql");
const { readFileSync } = require("fs");

module.exports = function load(docString) {
  const files = glob.sync(docString);
  return parse(
    files.map((file) => readFileSync(file, { encoding: "utf-8" })).join("\n")
  );
};
