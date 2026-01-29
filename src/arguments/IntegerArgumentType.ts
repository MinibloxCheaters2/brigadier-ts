import { INTEGER_TOO_BIG, INTEGER_TOO_SMALL } from "../exceptions/StandardErrorTypes";
import type { StringReader } from "../StringReader";
import { NumberArgumentType } from "./NumberArgumentType";

export class IntegerArgumentType extends NumberArgumentType {
	constructor(minimum = -2147483648, maximum = 2147483647) {
		super(minimum, maximum);
	}

	readNumber(reader: StringReader): number {
		return reader.readInt();
	}

	getTooSmallError() {
		return INTEGER_TOO_SMALL;
	}

	getTooBigError() {
		return INTEGER_TOO_BIG;
	}
}
