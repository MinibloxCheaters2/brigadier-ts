import type { ArgumentType } from "../arguments/ArgumentType";
import type { RedirectModifier } from "../builder/ArgumentBuilder";
import type { Command } from "../Command";
import type { CommandContext } from "../context/CommandContext";
import type { CommandContextBuilder } from "../context/CommandContextBuilder";
import { ParsedArgument } from "../context/ParsedArgument";
import type { Predicate } from "../Predicate";
import type { StringReader } from "../StringReader";
import type { Suggestions } from "../suggestion/Suggestions";
import type { SuggestionsBuilder } from "../suggestion/SuggestionsBuilder";
import { CommandNode } from "./CommandNode";
import CommandNodeThing from "./internal2";

export class ArgumentCommandNode<S, T> extends CommandNode<S> {
	name: string;
	type: ArgumentType<T>;
	_thing: CommandNodeThing = CommandNodeThing.ARGUMENT;

	constructor(
		name: string,
		type: ArgumentType<T>,
		command: Command<S>,
		requirement: Predicate<S>,
		redirect: CommandNode<S>,
		modifier: RedirectModifier<S>,
		forks: boolean,
	) {
		super(command, requirement, redirect, modifier, forks);
		this.name = name;
		this.type = type;
	}

	getType(): ArgumentType<T> {
		return this.type;
	}

	parse(reader: StringReader, contextBuilder: CommandContextBuilder<S>): void {
		const start = reader.getCursor();
		const result = this.type.parse(reader);
		const parsed = new ParsedArgument<T>(start, reader.getCursor(), result);
		contextBuilder.withArgument(this.name, parsed);
		contextBuilder.withNode(this, parsed.getRange());
	}

	getName(): string {
		return this.name;
	}

	getUsageText(): string {
		return `<${this.name}>`;
	}

	listSuggestions(
		context: CommandContext<S>,
		builder: SuggestionsBuilder,
	): Promise<Suggestions> {
		return this.type.listSuggestions(context, builder);
	}
}
