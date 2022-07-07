export default function stripTypename(obj: any): any {
	if (typeof obj === "object" && obj) {
		const { __typename, ...rest } = obj;
		return Object.entries(rest).reduce(
			(acc, [key, value]) =>
				Object.assign(acc, { [key]: stripTypename(value) }),
			{}
		);
	} else {
		return obj;
	}
}
