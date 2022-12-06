import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import * as url from 'url';

const filename = url.fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const filesFolder = path.join(dirname, '/files');

const list = async () => {
    fs.access(filesFolder, fs.constants.F_OK).then(() => {
        fs.readdir(filesFolder).then((files) => {
            for (const file of files) {
                console.log(file);
            }
        }).catch((err) => {
            console.error(err);
        })
    }).catch(() => {
        throw new Error('FS operation failed');
    })
};

await list();
