import { Book } from "./book";

const resolvers = {
  books(): Pick<Required<Book>, "id">[] {
    return [{ id: 0 }, { id: 1 }];
  },
};

export default resolvers;
