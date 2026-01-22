import type { CommandContext } from "../context/CommandContext";
import type { StringReader } from "../StringReader";
import type { Suggestions } from "../suggestion/Suggestions";
import type { SuggestionsBuilder } from "../suggestion/SuggestionsBuilder";
import { ArgumentType } from "./ArgumentType";

export class BoolArgumentType extends ArgumentType<boolean> {
	parse(reader: StringReader): boolean {
		return reader.readBoolean();
	}

	listSuggestions(
		_ctx: CommandContext<unknown>,
		builder: SuggestionsBuilder,
	): Promise<Suggestions> {
		if ("true".startsWith(builder.getRemaining().toLowerCase())) {
			return builder.suggest("true").buildPromise();
		}
		if ("false".startsWith(builder.getRemaining().toLowerCase())) {
			return builder.suggest("false").buildPromise();
		}
		return builder.buildPromise();
	}
}

export function bool(): BoolArgumentType {
	return new BoolArgumentType();
}
