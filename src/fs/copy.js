import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import * as url from 'url';

const filename = url.fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const sourceDir = path.join(dirname, "./files");
const destinationDir = path.join(dirname, "./files_copy")

const copy = async () => {
    fs.access(sourceDir, fs.constants.F_OK).then(() => {
        fs.access(destinationDir, fs.constants.F_OK).then(() => {
        console.error('FS operation failed');
        })
        .catch(async() => {
            try {
                const entries = await fs.readdir(sourceDir,{withFileTypes:true});
                await fs.mkdir(destinationDir);
                for (let entry of entries) {
                    const srcPath = path.join(sourceDir, entry.name);
                    const destPath = path.join(destinationDir, entry.name);
                    if (entry.isDirectory()) {
                        await copyDir(srcPath, destPath);
                    } else {
                        await fs.copyFile(srcPath, destPath);
                    }
                }
            } catch (err) {
            console.error('FS operation failed');
            }
        });
    })
    .catch(err => console.error('FS operation failed'));
};

copy();
