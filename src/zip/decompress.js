import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { pipeline } from 'stream';
import { createWriteStream, createReadStream } from 'fs';
import { createUnzip } from 'zlib';

const __fileName = fileURLToPath(import.meta.url);
const __dirname = dirname(__fileName);
const path = join(__dirname, 'files');
const sourcePath = join(path, 'archive.gz');
const filePath = join(path, 'fileToCompress.txt');

const decompress = async () => {
    pipeline(
        createReadStream(sourcePath),
        createUnzip(),
        createWriteStream(filePath),
        (err) => {
            if (err) {
                console.error('decompress failed.', err);
            } else {
                console.log('decompress succeeded.');
            }
        }
    );
};

await decompress();