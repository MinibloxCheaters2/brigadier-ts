import {
	type StringReader,
	type CommandContext,
	Suggestions,
	type SuggestionsBuilder,
} from "..";

export abstract class ArgumentType<T> {
	abstract parse(reader: StringReader): T;

	listSuggestions(
		// biome-ignore lint/correctness/noUnusedFunctionParameters: optional override
		context: CommandContext<any>,
		// biome-ignore lint/correctness/noUnusedFunctionParameters: optional override
		builder: SuggestionsBuilder,
	): Promise<Suggestions> {
		return Suggestions.empty();
	}
}
