import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { stat, readFile } from 'fs/promises';

const _filename = fileURLToPath(import.meta.url);
const _dirname = dirname(_filename);
const path = join(_dirname, 'files');
const file = join(path, 'fileToRead.txt');

const read = async () => {
    const checkFolder = await stat(path)
        .then((res) => res.isDirectory())
        .catch((err) => err.code === 'ENOENT' ? false : err);
    if (checkFolder === true) {
        const checkFile = await stat(file)
            .then((res) => res.isFile())
            .catch((err) => err.code === 'ENOENT' ? false : err)
        if (checkFile !== true) throw new Error('FS operation failed');
        const readText = await readFile(file, 'utf-8');
        return console.log(readText);
    } else {
        throw new Error('FS operation failed');
    }
};

await read();