import { LONG_TOO_BIG, LONG_TOO_SMALL } from "../exceptions/StandardErrorTypes";
import type { StringReader } from "../StringReader";
import { NumberArgumentType } from "./NumberArgumentType";

export class LongArgumentType extends NumberArgumentType<bigint> {
	private static readonly MIN = -9223372036854775808n;
	private static readonly MAX = 9223372036854775807n;

	constructor(minimum = LongArgumentType.MIN, maximum = LongArgumentType.MAX) {
		super(minimum, maximum);
	}

	readNumber(reader: StringReader): bigint {
		return reader.readLong();
	}

	getTooSmallError() {
		return LONG_TOO_SMALL;
	}

	getTooBigError() {
		return LONG_TOO_BIG;
	}
}
