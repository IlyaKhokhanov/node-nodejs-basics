import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { stat, rm } from 'fs/promises';

const _filename = fileURLToPath(import.meta.url);
const _dirname = dirname(_filename);
const path = join(_dirname, 'files');
const deleteFilePath = join(path, 'fileToRemove.txt');

const remove = async () => {
    const checkFolder = await stat(path)
        .then((res) => res.isDirectory())
        .catch((err) => err.code === 'ENOENT' ? false : err);
    if (checkFolder === true) {
        const checkFile = await stat(deleteFilePath)
            .then((res) => res.isFile())
            .catch((err) => err.code === 'ENOENT' ? false : err)
        if (checkFile === true) return await rm(deleteFilePath, {force: true}) || console.log('File removed!');
        throw checkFile === false ? new Error('FS operation failed') : new Error(checkFile);
    } else {
        throw checkFolder === false ? new Error('Incorrect path!') : new Error(checkFolder);
    }
};

await remove();