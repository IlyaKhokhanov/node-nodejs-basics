import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { stat, readdir } from 'fs/promises';

const _filename = fileURLToPath(import.meta.url);
const _dirname = dirname(_filename);
const path = join(_dirname, 'files');

const list = async () => {
    const checkFolder = await stat(path)
        .then((res) => res.isDirectory())
        .catch((err) => err.code === 'ENOENT' ? false : err);
    if (checkFolder) {
        const files = await readdir(path);
        if (files.length) return console.log(files);
        throw new Error('FS operation failed')
    } else {
        throw !checkFolder ? new Error('FS operation failed') : new Error(checkFolder);
    }
};

await list();