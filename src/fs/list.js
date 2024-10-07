import { stat, readdir } from 'fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const _filename = fileURLToPath(import.meta.url);
const _dirname = dirname(_filename);
const path = join(_dirname, 'files');

const list = async () => {
    const checkFolder = await stat(path)
        .then((res) => res.isDirectory())
        .catch((err) => err.code === 'ENOENT' ? false : err);
    if (checkFolder === true) {
        const files = await readdir(path);
        if (files.length) return console.log(files);
        throw new Error('FS operation failed')
    } else {
        throw checkFolder === false ? new Error('FS operation failed') : new Error(checkFolder);
    }
};

await list();