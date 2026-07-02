import { createInterface } from "readline";
import { findExecutable } from "./utils";
import { spawnSync } from "child_process";
import fs from 'fs';

enum BuiltIn {
    ECHO = 'echo',
    EXIT = 'exit',
    TYPE = 'type',
    PWD = 'pwd',
    CD = 'cd'
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
            const result = findExecutable(rest)
            if (result) {
                console.log(`${rest} is ${result}`)
            } else {
                console.log(`${rest}: not found`)
            }
        }
    } else if (command === BuiltIn.PWD) {
        console.log(process.cwd())
    } else if (command === BuiltIn.CD) {
        const dirPath = args[0];
        const exists = fs.existsSync(dirPath);
        if (exists) {
            process.chdir(dirPath);
        } else {
            console.log(`cd: ${dirPath}: No such file or directory`);
        }
    }
    else if (findExecutable(command)) {
        spawnSync(command, args, { stdio: 'inherit' })
    }
    else {
        console.log(`${command}: command not found`);
    }
    rl.prompt();
});
