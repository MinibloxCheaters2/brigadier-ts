import {
	type CommandContext,
	type StringReader,
	Suggestions,
	type SuggestionsBuilder,
} from "..";

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
