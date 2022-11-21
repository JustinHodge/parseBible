import fs from 'fs';
import jsonrepair from 'jsonrepair';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';

export const write = (json, fileName) => {
    fs.writeFileSync(fileName, JSON.stringify(json));
};

export const getDirName = () => {
    return dirname(fileURLToPath(import.meta.url));
};

export const pushToDB = (path, collection) => {
    if (!collection?.length) {
        console.log('No Collection Provided');
        return;
    }

    if (!fs.existsSync(path)) {
        console.log(`File ${path} could not be found`);
        return;
    }

    exec(
        `mongoimport --uri mongodb+srv://OurMargins:mt9ewYq6vE7Zvxsc@cluster0.o2xw9tk.mongodb.net/OurMargins --collection ${collection} --type json --file ${path}`
    );
};

export const getJsonFromFile = (filePath) => {
    const file = fs.readFileSync(filePath, 'utf-8');
    const repaired = jsonrepair(file);
    return JSON.parse(repaired);
};

export const getSupportedVersions = () => {
    return ['asv', 'kjv'];
};
