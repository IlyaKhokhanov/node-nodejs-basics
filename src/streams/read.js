import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createReadStream } from 'fs';
import { stdout } from 'process';

const __fileName = fileURLToPath(import.meta.url);
const __dirname = dirname(__fileName);
const path = join(__dirname, 'files');
const sourcePath = join(path, 'fileToRead.txt');

const read = async () => {
    const readable = createReadStream(sourcePath);

    readable.pipe(stdout);

    readable.on('end', () => readable.unpipe(stdout));

    readable.on('error', (err) => {
        throw new Error(err);
    })
};

await read();