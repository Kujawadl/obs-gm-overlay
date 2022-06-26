export interface Book {
  id?: number;
  title: string;
  author: string;
}

const books: Book[] = [
  {
    title: "The Awakening",
    author: "Kate Chopin",
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
  },
];

const resolvers = {
  title(parent: Pick<Required<Book>, "id">): Book["title"] {
    return books[parent.id].title;
  },
  author(parent: Pick<Required<Book>, "id">): Book["author"] {
    return books[parent.id].author;
  },
};

export default resolvers;
