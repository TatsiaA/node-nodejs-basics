import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import * as url from 'url';

const filename = url.fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const oldFile = dirname + '/files/wrongFilename.txt';
const newFile = dirname + '/files/properFilename.md';

const rename = async () => {
    fs.access(oldFile, fs.constants.F_OK).then(() => {
        fs.access(newFile, fs.constants.F_OK).then(() => {
            console.error('FS operation failed');
        }).catch(() => {
            fs.rename(oldFile, newFile);
        })
    }).catch(err => console.error('FS operation failed'))
};

await rename();
