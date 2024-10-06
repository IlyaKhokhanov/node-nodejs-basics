import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { stat, writeFile } from 'fs/promises';

const path = fileURLToPath(import.meta.url);
const pathFile = join(dirname(path), 'files', 'fresh.txt');

const create = async () => {
    const checkFile = await stat(pathFile)
        .then((res) => res.isFile())
        .catch((err) => err.code === 'ENOENT' ? false : err);
    if (!checkFile) {
        return await writeFile(pathFile, 'I am fresh and young');
    } else {
        throw new Error('FS operation failed');
    }
}


await create();
