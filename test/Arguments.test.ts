import {
	argument,
	CommandDispatcher,
	FloatArgumentType,
	IntegerArgumentType,
	LongArgumentType,
	literal,
} from "../src";

describe("Arguments", () => {
	test("Integer", async () => {
		const dispatcher = new CommandDispatcher();
		dispatcher.register(
			literal("foo").then(
				argument("bar", new IntegerArgumentType()).executes(
					async (ctx) => ctx.get<number>("bar") * 2,
				),
			),
		);
		const result = await dispatcher.execute("foo 6", undefined);
		expect(result).toEqual(12);
	});

	test("Long", async () => {
		const dispatcher = new CommandDispatcher();
		dispatcher.register(
			literal("foo").then(
				argument("bar", new LongArgumentType()).executes(
					async (ctx) => ctx.get<bigint>("bar").toString().length,
				),
			),
		);
		const result = await dispatcher.execute("foo 123456789012345", undefined);
		expect(result).toEqual(15);
	});

	test("Float", async () => {
		const dispatcher = new CommandDispatcher();
		dispatcher.register(
			literal("foo").then(
				argument("bar", new FloatArgumentType()).executes(async (ctx) =>
					Math.floor(ctx.get("bar")),
				),
			),
		);
		const result = await dispatcher.execute("foo 6.2", undefined);
		expect(result).toEqual(6);
	});
});
