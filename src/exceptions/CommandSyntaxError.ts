const CONTEXT_AMOUNT = 10;

export class CommandSyntaxError extends Error {
	private input: string;
	private cursor: number;

	constructor(message: string, input?: string, cursor?: number) {
		super(message);
		Object.setPrototypeOf(this, CommandSyntaxError.prototype);
		this.input = input;
		this.cursor = cursor;

		if (input && cursor >= 0) {
			this.message += ` at position ${cursor}: `;
			const cursor2 = Math.min(this.input.length, this.cursor);
			this.message += cursor > CONTEXT_AMOUNT ? "..." : "";
			this.message += this.input.substring(
				Math.max(0, cursor2 - CONTEXT_AMOUNT),
				cursor2,
			);
			this.message += "<--[HERE]";
		}
	}
}
