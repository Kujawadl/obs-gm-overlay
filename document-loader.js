const { readFileSync } = require("fs");
const glob = require("fast-glob");
const { parse } = require("graphql");

module.exports = function load(docString) {
  const files = glob.sync(docString);
  return parse(
    files.map((file) => readFileSync(file, { encoding: "utf-8" })).join("\n")
  );
};
