import { FLOAT_TOO_BIG, FLOAT_TOO_SMALL } from "../exceptions/StandardErrorTypes";
import type { StringReader } from "../StringReader";
import { NumberArgumentType } from "./NumberArgumentType";

export class FloatArgumentType extends NumberArgumentType {
	constructor(minimum = -Infinity, maximum = Infinity) {
		super(minimum, maximum);
	}

	readNumber(reader: StringReader): number {
		return reader.readFloat();
	}

	getTooSmallError() {
		return FLOAT_TOO_SMALL;
	}

	getTooBigError() {
		return FLOAT_TOO_BIG;
	}
}
