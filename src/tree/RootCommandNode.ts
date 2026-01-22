import type { CommandContext } from "../context/CommandContext";
import type { CommandContextBuilder } from "../context/CommandContextBuilder";
import type { StringReader } from "../StringReader";
import { Suggestions } from "../suggestion/Suggestions";
import type { SuggestionsBuilder } from "../suggestion/SuggestionsBuilder";
import { CommandNode } from "./CommandNode";

export class RootCommandNode<S> extends CommandNode<S> {
	constructor() {
		super(
			null,
			async (_) => true,
			null,
			(_) => null,
			false,
		);
	}

	// biome-ignore lint/correctness/noUnusedFunctionParameters: no-op
	parse(reader: StringReader, contextBuilder: CommandContextBuilder<S>): void {}

	getName(): string {
		return "";
	}

	getUsageText(): string {
		return "";
	}

	listSuggestions(
		// biome-ignore lint/correctness/noUnusedFunctionParameters: no-op
		context: CommandContext<S>,
		// biome-ignore lint/correctness/noUnusedFunctionParameters: no-op
		builder: SuggestionsBuilder,
	): Promise<Suggestions> {
		return Suggestions.empty();
	}
}
