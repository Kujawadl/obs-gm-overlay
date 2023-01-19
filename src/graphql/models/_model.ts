/* eslint-disable unused-imports/no-unused-vars */
export default interface Model<Type, Input> {
	get(...ids: string[]): Promise<Type | undefined>;

	list(...args: any[]): Promise<Type[]>;

	create(input: Input): Promise<Type>;

	update(value: Type, input: Input): Promise<Type>;

	delete(...ids: string[]): Promise<boolean>;
}
