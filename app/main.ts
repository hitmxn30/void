import { createInterface } from "readline";

enum BuiltIn {
    ECHO = 'echo',
    EXIT = 'exit',
    TYPE = 'type'
}

const BuiltIns = new Set<string>(Object.values(BuiltIn))

const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "$ ",
});


rl.prompt();

rl.on("line", (cmd) => {
    const trimmed = cmd.trim();
    const command = trimmed.split(" ")[0];
    const rest = trimmed.slice(command.length).trim();
    const args = trimmed.split(' ').slice(1).filter(arg => arg !== '')

    if (command === BuiltIn.EXIT) {
        console.log('Bye!')
        rl.close();
        return;
    }
    else if (command === BuiltIn.ECHO) {
        console.log(rest)
    }
    else if (command === BuiltIn.TYPE) {
        if (BuiltIns.has(rest)) {
            console.log(`${rest} is a shell builtin`)
        } else {
            console.log(`${rest}: not found`)
        }
    }
    else {
        console.log(`${command}: command not found`);
    }
    rl.prompt();
});
