import * as path from 'node:path';
import * as fs from 'node:fs/promises';
import * as url from 'url';

const filename = url.fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const create = async () => {
    fs.access(path.join(dirname, 'files/fresh.txt'), fs.constants.F_OK).then(() => {
        console.error('FS operation failed');
    }).catch(() => {
        fs.writeFile(
            path.join(dirname, 'files/fresh.txt'),
            'I am fresh and young',
            (err) => {
                if (err) throw err;
            }
        )
    });
};

await create();
