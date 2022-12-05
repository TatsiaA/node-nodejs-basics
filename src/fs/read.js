import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import * as url from 'url';

const filename = url.fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const fileToRead = path.join(dirname, '/files/fileToRead.txt');

const read = async () => {
    fs.access(fileToRead, fs.constants.R_OK).then(async() => {
        try {
            const content = await fs.readFile(fileToRead, { encoding: 'utf8' });
            console.log(content);
        } catch (err) {
            console.error(err.message);
        }
    }).catch(() => {
        throw new Error('FS operation failed');
    })
};

await read();
