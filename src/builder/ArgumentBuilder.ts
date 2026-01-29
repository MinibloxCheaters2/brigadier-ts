import type { Command } from "../Command";
import type { CommandContext } from "../context/CommandContext";
import type { Predicate } from "../Predicate";
import { CommandNode } from "../tree/CommandNode";
import { RootCommandNode } from "../tree/RootCommandNode";

export type RedirectModifier<S> = (context: CommandContext<S>) => S | S[];

export abstract class ArgumentBuilder<S, T extends ArgumentBuilder<S, T>> {
	private arguments: RootCommandNode<S>;
	private command: Command<S>;
	private requirement: Predicate<S>;
	private target: CommandNode<S>;
	private modifier: RedirectModifier<S>;
	private forks: boolean;

	constructor() {
		this.arguments = new RootCommandNode();
		this.requirement = async (_) => true;
	}

	abstract getThis(): T;

	// biome-ignore lint/suspicious/noThenProperty: proof?
	then<A extends ArgumentBuilder<S, A>>(
		argument: ArgumentBuilder<S, A> | CommandNode<S>,
	): T {
		const child = argument instanceof CommandNode ? argument : argument.build();
		this.arguments.addChild(child);
		return this.getThis();
	}

	executes(command: Command<S>): T {
		this.command = command;
		return this.getThis();
	}

	requires(requirement: Predicate<S>): T {
		this.requirement = requirement;
		return this.getThis();
	}

	redirect(target: CommandNode<S>, modifier: RedirectModifier<S> = null): T {
		return this.forward(target, modifier, false);
	}

	fork(target: CommandNode<S>, modifier: RedirectModifier<S>): T {
		return this.forward(target, modifier, true);
	}

	forward(
		target: CommandNode<S>,
		modifier: RedirectModifier<S>,
		forks: boolean,
	): T {
		this.target = target;
		this.modifier = modifier;
		this.forks = forks;
		return this.getThis();
	}

	getArguments(): CommandNode<S>[] {
		return this.arguments.getChildren();
	}

	getCommand(): Command<S> {
		return this.command;
	}

	getRequirement(): Predicate<S> {
		return this.requirement;
	}

	getRedirect(): CommandNode<S> {
		return this.target;
	}

	getRedirectModifier(): RedirectModifier<S> {
		return this.modifier;
	}

	isFork(): boolean {
		return this.forks;
	}

	abstract build(): CommandNode<S>;
}
