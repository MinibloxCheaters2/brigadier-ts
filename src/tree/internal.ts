import type { ArgumentCommandNode } from "./ArgumentCommandNode";
import type { CommandNode } from "./CommandNode";
import CommandNodeThing from "./internal2";
import type { LiteralCommandNode } from "./LiteralCommandNode";

export function isArgumentNode<A>(
	n: CommandNode<A>,
): n is ArgumentCommandNode<A, unknown> {
	return n._thing === CommandNodeThing.ARGUMENT;
}

export function isLiteralNode<A>(
	n: CommandNode<A>,
): n is LiteralCommandNode<A> {
	return n._thing === CommandNodeThing.LITERAL;
}
