const Path = require('path');
const fs = require('fs');
const _ = require('lodash');

module.exports = class Walk {

    static files(path) {
        return new Promise((resolve, reject) => {
            fs.readdir(path, (err, files) => {
                if (err) return reject(err);

                resolve(
                    files
                        .map(file => Path.resolve(path, file))
                );
            });  
        });
    }

    static async filesDeep(path) {
        return _.flattenDeep(await this.browseFiles(path)); 
    }

    static metaData(path) {
        return new Promise((resolve, reject) => {
            fs.stat(path, (err, metaData) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve({ path, isDir: metaData.isDirectory() });
            }); 
        }); 
    }

    static async browseFiles(path) {
        const pathFiles = await this.files(path);
        const results = pathFiles.map((file) => {
            return new Promise(async (resolve, reject) => {
                const metaData = await this.metaData(file);
                
                if (metaData.isDir) {
                    resolve(await this.browseFiles(metaData.path)); 
                } else {
                    resolve(metaData.path);
                }
            });
        }); 
        return Promise.all(results);
    }

}
