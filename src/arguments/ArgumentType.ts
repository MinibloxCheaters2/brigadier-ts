import type { CommandContext } from "../context/CommandContext";
import type { StringReader } from "../StringReader";
import { Suggestions } from "../suggestion/Suggestions";
import type { SuggestionsBuilder } from "../suggestion/SuggestionsBuilder";

export abstract class ArgumentType<T> {
	abstract parse(reader: StringReader): T;

	listSuggestions(
		// biome-ignore lint/correctness/noUnusedFunctionParameters: optional override
		context: CommandContext<unknown>,
		// biome-ignore lint/correctness/noUnusedFunctionParameters: optional override
		builder: SuggestionsBuilder,
	): Promise<Suggestions> {
		return Suggestions.empty();
	}
}
