/**
 * Takes the DocumentNode array from ./server/types/index.ts and converts it
 * into a GQL SDL string, then converts that string into a GraphQLSchema object
 * that gql-codegen can actually understand.
 */

require("ts-node/register");

const { buildSchema, print } = require("graphql");

module.exports = (schemaString) => {
  const typeDefs = require(schemaString).default;
  return buildSchema(typeDefs.map(print).join("\n"));
};
