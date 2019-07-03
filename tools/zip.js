
function zip() {
    return new Promise((resolve, reject) => {
        const fs = require('fs');
        const archiver = require('archiver');
        const path = require('path');

        const archive = archiver('zip');
        const zipPath = `dist/build/brandActivity-assets` //process.argv[3];
        const fileName = `static.zip` //process.argv[5];
        const output = fs.createWriteStream(path.resolve(zipPath, '..', fileName));

        archive.on('error', function (err) {
            return reject('failed to zip static');
        });
        archive.on('end', function (err) {
            setTimeout(()=>{
                return resolve();
            }, 3000)
        });
        archive.pipe(output);
        archive.directory(zipPath, false);
        archive.finalize();
    })
}
export default zip;