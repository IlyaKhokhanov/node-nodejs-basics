import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { pipeline } from 'stream';
import { createWriteStream, createReadStream } from 'fs';
import { createGzip } from 'zlib';

const __fileName = fileURLToPath(import.meta.url);
const __dirname = dirname(__fileName);
const path = join(__dirname, 'files');
const sourcePath = join(path, 'fileToCompress.txt');
const filePath = join(path, 'archive.gz');

const compress = async () => {
    pipeline(
        createReadStream(sourcePath),
        createGzip(),
        createWriteStream(filePath),
        (err) => {
            if (err) {
                console.error('compress failed.', err);
            } else {
                console.log('compress succeeded.');
            }
        }
    );
};

await compress();