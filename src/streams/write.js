import { createWriteStream } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { stdin, stdout } from 'process';

const __fileName = fileURLToPath(import.meta.url);
const __dirname = dirname(__fileName);
const path = join(__dirname, 'files');
const sourcePath = join(path, 'fileToWrite.txt');

const write = async () => {
    const writable = createWriteStream(sourcePath);

    stdout.write('Please write what you want to write to the file fileToWrite.txt\n');

    stdin.on('data', (chunk) => {
        writable.write(chunk.toString());
        stdout.write('Please write more if you want\n');
    });

    stdin.on('error', (err) => {
        throw new Error(err);
    })

    process.on('SIGINT', () => {
        process.exit();
    });

    process.on('exit', () => {
        stdout.write('Thanks for check!\n');
    });
};

await write();