import { CommandErrorType } from "./CommandErrorType";

export const DOUBLE_TOO_SMALL = new CommandErrorType(
	(found, min) => `Double must not be less than ${min}, found ${found}`,
);
export const DOUBLE_TOO_BIG = new CommandErrorType(
	(found, max) => `Double must not be more than ${max}, found ${found}`,
);
export const FLOAT_TOO_SMALL = new CommandErrorType(
	(found, min) => `Float must not be less than ${min}, found ${found}`,
);
export const FLOAT_TOO_BIG = new CommandErrorType(
	(found, max) => `Float must not be more than ${max}, found ${found}`,
);
export const INTEGER_TOO_SMALL = new CommandErrorType(
	(found, min) => `Integer must not be less than ${min}, found ${found}`,
);
export const INTEGER_TOO_BIG = new CommandErrorType(
	(found, max) => `Integer must not be more than ${max}, found ${found}`,
);
export const LONG_TOO_SMALL = new CommandErrorType(
	(found, min) => `Long must not be less than ${min}, found ${found}`,
);
export const LONG_TOO_BIG = new CommandErrorType(
	(found, max) => `Long must not be more than ${max}, found ${found}`,
);
export const LITERAL_INCORRECT = new CommandErrorType(
	(expected) => `Expected literal ${expected}`,
);

export const READER_EXPECTED_START_OF_QUOTE = new CommandErrorType(
	() => `Expected quote to start a string`,
);
export const READER_EXPECTED_END_OF_QUOTE = new CommandErrorType(
	() => `Unclosed quoted string`,
);
export const READER_INVALID_ESCAPE = new CommandErrorType(
	(character) => `Invalid escape sequence '${character}' in quoted string`,
);
export const READER_INVALID_BOOL = new CommandErrorType(
	(value) => `Invalid bool, expected true or false but found '${value}'`,
);
export const READER_EXPECTED_BOOL = new CommandErrorType(() => `Expected bool`);
export const READER_INVALID_INT = new CommandErrorType(
	(value) => `Invalid integer '${value}'`,
);
export const READER_EXPECTED_INT = new CommandErrorType(
	() => `Expected integer`,
);
export const READER_INVALID_FLOAT = new CommandErrorType(
	(value) => `Invalid float '${value}'`,
);
export const READER_EXPECTED_FLOAT = new CommandErrorType(
	() => `Expected float`,
);

export const DISPATCHER_UNKNOWN_COMMAND = new CommandErrorType(
	() => `Unknown Command`,
);
export const DISPATCHER_UNKNOWN_ARGUMENT = new CommandErrorType(
	() => `Incorrect argument for command`,
);
export const DISPATCHER_EXPECTED_ARGUMENT_SEPARATOR = new CommandErrorType(
	() => `Expected whitespace to end one argument, but found trailing data`,
);
export const DISPATCHER_PARSE_ERROR = new CommandErrorType(
	(message) => `Could not parse command: ${message}`,
);
