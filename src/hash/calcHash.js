import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { createHash } from 'crypto';
import { readFile, stat } from 'fs/promises';

const _filename = fileURLToPath(import.meta.url);
const _dirname = dirname(_filename);
const path = join(_dirname, 'files');
const pathFile = join(path, 'fileToCalculateHashFor.txt');

const calculateHash = async () => {
    const checkFile = await stat(pathFile)
        .then((res) => res.isFile())
        .catch((err) => err.code === 'ENOENT' ? false : err);
    if (!checkFile) throw new Error('File not found');
    const text = await readFile(pathFile);
    const hash = createHash('sha256')
        .update(text)
        .digest('hex');
    return console.log(hash);
};

await calculateHash();