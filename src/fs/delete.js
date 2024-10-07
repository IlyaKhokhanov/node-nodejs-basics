import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { stat, rm } from 'fs/promises';

const _filename = fileURLToPath(import.meta.url);
const _dirname = dirname(_filename);
const path = join(_dirname, 'files');
const deleteFilePath = join(path, 'fileToRemove.txt');

const remove = async () => {
    const checkFolder = await stat(path)
        .then((res) => res.isDirectory())
        .catch((err) => err.code === 'ENOENT' ? false : err);
    if (checkFolder) {
        const checkFile = await stat(deleteFilePath)
            .then((res) => res.isFile())
            .catch((err) => err.code === 'ENOENT' ? false : err)
        if (checkFile) return await rm(deleteFilePath, {force: true}) || console.log('File removed!');
        throw !checkFile ? new Error('FS operation failed') : new Error(checkFile);
    } else {
        throw !checkFolder ? new Error('Incorrect path!') : new Error(checkFolder);
    }
};

await remove();