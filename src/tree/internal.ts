import type { ArgumentCommandNode } from "./ArgumentCommandNode";
import type { CommandNode } from "./CommandNode";
import CommandNodeThing from "./internal2";

export function isArgumentNode<A>(
	n: CommandNode<A>,
): n is ArgumentCommandNode<A, unknown> {
	return n._thing === CommandNodeThing.ARGUMENT;
}
