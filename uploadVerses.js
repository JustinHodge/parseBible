import { getDirName, getSupportedVersions, pushToDB } from './utils.js';

const __dirname = getDirName();

const versions = getSupportedVersions();

versions.forEach((version) => {
    pushToDB(`${__dirname}/${version}.json`, 'Texts');
});
