import { CommandDispatcher, literal } from "../src";

describe("CommandDispatcher", () => {
	test("create", () => {
		new CommandDispatcher();
	});

	test("execute", async () => {
		const dispatcher = new CommandDispatcher();
		dispatcher.register(literal("foo").executes(async () => 2));
		const result = await dispatcher.execute("foo", undefined);
		expect(result).toEqual(2);
	});

	test("execute (zero result)", async () => {
		const dispatcher = new CommandDispatcher();
		dispatcher.register(literal("foo").executes(async () => 0));
		const result = await dispatcher.execute("foo", undefined);
		expect(result).toEqual(0);
	});
});
