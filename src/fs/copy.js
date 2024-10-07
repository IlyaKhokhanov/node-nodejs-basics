import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { stat, mkdir, readdir, copyFile } from 'fs/promises';

const _filename = fileURLToPath(import.meta.url);
const _dirname = dirname(_filename);
const path = _dirname + '/files';
const copyPath = _dirname + '/files_copy';

const copy = async () => {
    console.log(_dirname);
    const checkPath = await stat(path)
        .then((res) => res.isDirectory())
        .catch((err) => err.code === 'ENOENT' ? false : err);
    if (checkPath) {
        const checkCopyPath = await stat(copyPath)
            .then((res) => res.isDirectory())
            .catch((err) => err.code === 'ENOENT' ? false : err);
        if (!checkCopyPath) {
            await mkdir(copyPath);
            const files = await readdir(path);
            for (const file of files) {
                const source = join(path, file);
                const destination = join(copyPath, file);
                await copyFile(source, destination);
            }
            return console.log('All files are copied!');
        } else if (checkCopyPath) {
            throw new Error('FS operation failed');
        } else {
            throw new Error(checkCopyPath);
        }
    } else if (!checkPath) {
        throw new Error('FS operation failed');
    } else {
        throw new Error(checkPath);
    }
};

await copy();
