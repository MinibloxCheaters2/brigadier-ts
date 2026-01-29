# Brigadier-ts

Fork of [brigadier-ts](https://github.com/misode/brigadier-ts) with some changes:

- (breaking change) Predicates and Commands are async
- Non-literal arguments don't unconditionally return empty suggestions (WHY DID THIS EXIST???)
- No circular dependencies
- Update branding

(not many, but we'll probably add more later)

## Migration from original

See [our wiki page](https://github.com/MinibloxCheaters2/brigadier-ts/wiki/Migrating-from-Misode-brigadier%E2%80%90ts)

## Installation

```
npm install @wq2/brigadier-ts
```

## Usage

#### Example using a command source

```js
import {
    CommandDispatcher,
    IntegerArgumentType,
    literal,
    argument
} from "@wq2/brigadier-ts";

class CommandSource {
    private a: number;
    constructor(a: number) {
        this.a = a;
    }
    getA(): number {
        return this.a;
    }
}

const dispatcher = new CommandDispatcher<CommandSource>();
dispatcher.register(literal("random")
    .executes(async c => 4)
);
dispatcher.register(literal("double")
    .then(argument("value", new IntegerArgumentType())
        .executes(async c => 2 * c.get("value"))
    )
);
dispatcher.register(literal("add")
    .executes(async c => 4 + c.getSource().getA())
);

console.log(await dispatcher.execute("random", null)); // 4
console.log(await dispatcher.execute("double 3", null)); // 6
console.log(await dispatcher.execute("add", new CommandSource(3))); // 7
```

#### Example using redirection and forking

```ts
import {
    CommandDispatcher,
    IntegerArgumentType,
    literal,
    argument
} from "@wq2/brigadier-ts";

const dispatcher = new CommandDispatcher<number>();
const execute = dispatcher.register(literal("execute"));

dispatcher.register(literal("execute")
    .then(literal("run")
        .redirect(dispatcher.getRoot())
    )
    .then(literal("enumerate")
        .then(argument("nums", new IntegerArgumentType())
            .fork(async execute, c => {
                let list: number[] = [];
                for (let i = c.get("nums"); i > 0; i--) {
                    list.push(i);
                }
                return list;
            })
        )
    )
);

dispatcher.register(literal("say")
    .executes(async c => {
        console.log(c.getSource());
    })
)

console.log(await dispatcher.execute("execute enumerate 5 run say", 0));
```

#### Example using suggestions and errors
```ts
import {
    CommandDispatcher,
    IntegerArgumentType,
    literal,
    argument
} from "@wq2/brigadier-ts";

const dispatcher = new CommandDispatcher<number>();
dispatcher.register(literal("double")
    .then(argument("value", new IntegerArgumentType())
        .executes(async c => 2 * c.get("value"))
    )
);

const getFeedback = async (command: string): Promise<string> => {
    const parseResults = await dispatcher.parse(command, null);
    if (parseResults.getErrors().size > 0) {
        return command + " >> " + parseResults.getErrors().values().next().value.message;
    }
    const suggestions = await dispatcher.getCompletionSuggestions(parseResults);
    if (suggestions.getList().length > 0) {
        const s = suggestions.getList()[0];
        return command + " >> S " + s.getText() + " (" + s.getRange().getStart() + ", " + s.getRange().getEnd() + ")";
    }
    const usage = await dispatcher.getAllUsage(parseResults.getContext().getRootNode(), null, false);
    if (usage.length > 0) {
        return command + " >> U " + usage[0];
    }
    return command;
}

getFeedback("dou").then(f => console.log(f)); // dou >> S double
getFeedback("double").then(f => console.log(f)); // double >> U double <value>
getFeedback("double ").then(f => console.log(f)); // double  >> Expected integer at position 7: double <--[HERE]
```
