import { GraphQLScalarType, Kind } from "graphql";
import { formatDate, parseDate } from "@utils/index";

interface Resolvers {
	Date: GraphQLScalarType;
}

const resolvers: Resolvers = {
	Date: new GraphQLScalarType({
		name: "Date",
		serialize(value): string | null {
			return typeof value === "string" ? formatDate(new Date(value)) : null;
		},
		parseValue(value): Date | null {
			return typeof value === "string" ? parseDate(value) : null;
		},
		parseLiteral(ast): Date | null {
			if (ast.kind === Kind.STRING) {
				return parseDate(ast.value);
			} else {
				return null;
			}
		},
	}),
};

export default resolvers;
