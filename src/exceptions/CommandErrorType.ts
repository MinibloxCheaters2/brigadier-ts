import type { StringReader } from "../StringReader";
import { CommandSyntaxError } from "./CommandSyntaxError";

type CommandErrorFunction = <A = unknown>(...args: A[]) => string;

export class CommandErrorType {
	private func: CommandErrorFunction;
	constructor(func: CommandErrorFunction) {
		this.func = func;
	}

	create(...args: unknown[]): CommandSyntaxError {
		const message = this.func(...args);
		return new CommandSyntaxError(message);
	}

	createWithContext(
		reader: StringReader,
		...args: unknown[]
	): CommandSyntaxError {
		const message = this.func(...args);
		return new CommandSyntaxError(
			message,
			reader.getString(),
			reader.getCursor(),
		);
	}
}
