export default abstract class Model<Type, Input> {
	protected boolean(value: boolean): 0 | 1 {
		return value ? 1 : 0;
	}

	abstract get(...ids: string[]): Type | undefined;

	abstract list(...args: any[]): Type[];

	abstract create(input: Input): Type;

	abstract update(value: Type, input: Input): Type;

	abstract delete(...ids: string[]): boolean;
}
