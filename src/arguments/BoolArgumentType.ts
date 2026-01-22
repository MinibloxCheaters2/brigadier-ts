import { ArgumentType } from "./ArgumentType";
import type { StringReader } from "../StringReader";
import type { CommandContext } from "../context/CommandContext";
import type { SuggestionsBuilder } from "../suggestion/SuggestionsBuilder";
import type { Suggestions } from "../suggestion/Suggestions";

export class BoolArgumentType extends ArgumentType<boolean> {
	parse(reader: StringReader): boolean {
		return reader.readBoolean();
	}

	listSuggestions(
		// biome-ignore lint/correctness/noUnusedFunctionParameters: optional override
		context: CommandContext<any>,
		builder: SuggestionsBuilder,
	): Promise<Suggestions> {
		if ("true".startsWith(builder.getRemaining().toLowerCase())) {
			builder.suggest("true");
		}
		if ("false".startsWith(builder.getRemaining().toLowerCase())) {
			builder.suggest("false");
		}
		return builder.buildPromise();
	}
}

export function bool(): BoolArgumentType {
	return new BoolArgumentType();
}
