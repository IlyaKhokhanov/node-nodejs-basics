import { spawn } from 'child_process';
import { stdin, exit } from 'process';

const spawnChildProcess = async (args) => {
    const ls = spawn('node', ['src/cp/files/script.js', ...args]);

    ls.stdout.on('data', (data) => console.log(`stdout: ${data}`));

    ls.stderr.on('data', (data) => console.error(`stderr: ${data}`));

    ls.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
        exit()
    });

    stdin.on('data', (ch) => ls.stdin.write(ch))
};

spawnChildProcess(['arg1', 'arg2']);