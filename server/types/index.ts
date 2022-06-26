import { gql } from "apollo-server";
import Book from "./book";

const Root = gql`
  type Query
`;

const typeDefs = [Root, Book];

export default typeDefs;
