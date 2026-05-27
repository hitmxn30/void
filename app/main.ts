import { createInterface } from "readline";

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

    if (command === 'exit') {
        console.log('Bye!')
        rl.close();
        return;
    }
    else if (command === 'echo') {
        console.log(rest)
    } else {
        console.log(`${command}: command not found`);
    }
    rl.prompt();
});
