import type { CommandContext } from "./context/CommandContext";

// biome-ignore lint/suspicious/noConfusingVoidType: `return undefined` :sob:
export type Command<S> = (c: CommandContext<S>) => Promise<number | void>;
