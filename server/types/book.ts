import { gql } from "apollo-server";

const typeDefs = gql`
  type Book {
    id: ID!
    title: String!
    author: String!
  }

  extend type Query {
    books: [Book!]!
  }
`;

export default typeDefs;
