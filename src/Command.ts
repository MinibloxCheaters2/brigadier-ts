import type { CommandContext } from "./";

// biome-ignore lint/suspicious/noConfusingVoidType: `return undefined` :sob:
export type Command<S> = (c: CommandContext<S>) => Promise<number | void>;
