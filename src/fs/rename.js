import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as fsProm from 'fs/promises';

const _filename = fileURLToPath(import.meta.url);
const _dirname = dirname(_filename);
const path = join(_dirname, 'files');
const oldPath = join(path, 'wrongFilename.txt');
const newPath = join(path, 'properFilename.md');

const rename = async () => {
    const checkPath = await fsProm.stat(path)
        .then((res) => res.isDirectory())
        .catch((err) => err.code === 'ENOENT' ? false : err);
    if (checkPath === true) {
        const newFile = await fsProm.stat(newPath)
            .then((res) => res.isFile())
            .catch((err) => err.code === 'ENOENT' ? false : err)
        const oldFile = await fsProm.stat(oldPath)
            .then((res) => res.isFile())
            .catch((err) => err.code === 'ENOENT' ? false : err)
        if (newFile === false && oldFile === true) {
            const result = await fsProm.rename(oldPath, newPath);
            return result === undefined ? console.log('Rename complete!') : result;
        }
        throw new Error('FS operation failed');
    } else if (checkPath === false) {
        throw new Error('FS operation failed');
    } else {
        throw new Error(checkPath);
    }
};

await rename();