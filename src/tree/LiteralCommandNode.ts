import type { RedirectModifier } from "../builder/ArgumentBuilder";
import type { Command } from "../Command";
import type { CommandContext } from "../context/CommandContext";
import type { CommandContextBuilder } from "../context/CommandContextBuilder";
import { StringRange } from "../context/StringRange";
import { LITERAL_INCORRECT } from "../exceptions/StandardErrorTypes";
import type { Predicate } from "../Predicate";
import type { StringReader } from "../StringReader";
import { Suggestions } from "../suggestion/Suggestions";
import type { SuggestionsBuilder } from "../suggestion/SuggestionsBuilder";
import { CommandNode } from "./CommandNode";
import CommandNodeThing from "./internal2";

export class LiteralCommandNode<S> extends CommandNode<S> {
	private literal: string;
	_thing: CommandNodeThing = CommandNodeThing.LITERAL;

	constructor(
		literal: string,
		command: Command<S>,
		requirement: Predicate<S>,
		redirect: CommandNode<S>,
		modifier: RedirectModifier<S>,
		forks: boolean,
	) {
		super(command, requirement, redirect, modifier, forks);
		this.literal = literal;
	}

	parse(reader: StringReader, contextBuilder: CommandContextBuilder<S>): void {
		const start = reader.getCursor();
		const end = this.parseInternal(reader);
		if (end > -1) {
			contextBuilder.withNode(this, new StringRange(start, end));
			return;
		}
		throw LITERAL_INCORRECT.createWithContext(
			reader,
			this.literal,
		);
	}

	private parseInternal(reader: StringReader): number {
		const start = reader.getCursor();
		if (reader.canRead(this.literal.length)) {
			const end = start + this.literal.length;
			if (
				reader.getString().substring(start, this.literal.length) ===
				this.literal
			) {
				reader.setCursor(end);
				if (!reader.canRead() || reader.peek() === " ") {
					return end;
				} else {
					reader.setCursor(start);
				}
			}
		}
		return -1;
	}

	getName(): string {
		return this.literal;
	}

	getUsageText(): string {
		return this.literal;
	}

	listSuggestions(
		// biome-ignore lint/correctness/noUnusedFunctionParameters: yes
		context: CommandContext<S>,
		builder: SuggestionsBuilder,
	): Promise<Suggestions> {
		if (
			this.literal
				.toLowerCase()
				.startsWith(builder.getRemaining().toLowerCase())
		) {
			return builder.suggest(this.literal).buildPromise();
		} else {
			return Suggestions.empty();
		}
	}
}
