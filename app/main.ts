import { createInterface } from "readline";

const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "$ ",
});


rl.prompt();

rl.on("line", (cmd) => {
    const command = cmd.trim();
    if (command === 'exit') {
        console.log('Bye!')
        rl.close();
        return;
    }
    console.log(`${cmd}: command not found`)
    rl.prompt();
});
