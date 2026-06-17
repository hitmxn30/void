import which from 'which';

export function findExecutable(command: string) {
    return which.sync(command, { nothrow: true });
}