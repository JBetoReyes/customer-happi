const chai = require('chai');
const Walk = require('../../../utils/files/walk');
const Path = require('path');
const expect = chai.expect;
const _ = require('lodash');

describe('walk', () => {

    describe('browseFiles', () => {
        it('Should browse through paths', async () => {
            const files = _.flattenDeep(
                await Walk.browseFiles(Path.resolve(__dirname, '../../../test'))
            );

            const fileFound = files.some((file) => /.*walk.unit.js$/.test(file));
            expect(fileFound).to.be.equal(true, `The expected file is not in the results; results ${files}`);
        });
    });  

    describe('filesDeep', () => {
        it('Should get nested files', async () => {
            const file = await Walk.filesDeep(Path.resolve(__dirname, '../../../test'));
            expect(/.*walk.unit.js$/.test(file)).to.be.equal(true, `The file is not the correct one; ${file}`);
        });
    });  

    describe('files', () => {
        it('Should get all the files inside a folder', async () => {
            const [file] = await Walk.files(Path.resolve(__dirname));
            expect(/.*walk.unit.js$/.test(file)).to.be.equal(true, 'The file are not correct');
        })
    });

    describe('metaData', () => {
        it('Should fetch the meta data of a file', async () => {
            const fileMetaData = await Walk.metaData(Path.resolve(__dirname, 'walk.unit.js'));
            expect(/.*walk.unit.js$/.test(fileMetaData.path)).to.be.equal(true, 'The path is not correct');
            expect(fileMetaData.isDir).to.be.equal(false, 'The path should not be for a directory');
        });
    });
});
