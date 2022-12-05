import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import * as url from 'url';

const filename = url.fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const fileToRemove = dirname + '/files/fileToRemove.txt';

const remove = async () => {
    try {
        fs.access(fileToRemove).then(() => {
            fs.rm(fileToRemove);
        }).catch(() => {
            throw new Error('FS operation failed');
        })
    } catch (err) {
        console.error(err);
    }
};

await remove();
