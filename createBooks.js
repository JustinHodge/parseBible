import { exec } from 'child_process';
import fs from 'fs';
import jsonrepair from 'jsonrepair';

import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const buildReferences = () => {
    const file = fs.readFileSync('./asv.json', 'utf-8');
    const repaired = jsonrepair(file);
    const json = JSON.parse(repaired);

    const references = {};

    Object.values(json).forEach(
        ({ chapter, verse, text, translation_id, book_id, book_name }) => {
            if (!references[book_id]) {
                references[book_id] = {
                    bookName: book_name,
                    bookId: book_id,
                    chapters: {},
                };
            }

            if (!references[book_id].chapters[chapter]) {
                references[book_id].chapters[chapter] = {
                    chapterNumber: chapter,
                    verses: [],
                };
            }

            if (
                !references[book_id].chapters[chapter].verses.some(
                    (seenVerse) => seenVerse === verse
                )
            ) {
                references[book_id].chapters[chapter].verses.push(verse);
            }
        }
    );

    write(references, './references.json');
    pushToDB(__dirname + '/references.json', 'References');
};

const buildKJV = () => {
    const file = fs.readFileSync('./kjv.json', 'utf-8');
    const repaired = jsonrepair(file);
    const json = JSON.parse(repaired);

    Object.values(json).forEach(
        ({ chapter, verse, text, translation_id, book_id, book_name }) => {
            // if (!texts[book_id]) {
            //     texts[book_id] = { bookName: book_name, chapters: {} };
            // }

            // if (!texts[book_id].chapters[chapter]) {
            //     texts[book_id].chapters[chapter] = {};
            // }

            // if (!texts[book_id].chapters[chapter][verse]) {
            //     texts[book_id].chapters[chapter][verse][translation_id] = {
            //         text: text,
            //     };
            // }

            buildReferences({
                chapter,
                verse,
                book_id,
                book_name,
            });
        }
    );
};

function buildASV() {
    const file = fs.readFileSync('./asv.json', 'utf-8');
    const repaired = jsonrepair(file);
    const json = JSON.parse(repaired);

    Object.values(json).forEach(
        ({ chapter, verse, text, translation_id, book_id, book_name }) => {
            // if (!texts[book_id]) {
            //     texts[book_id] = { bookName: book_name, chapters: {} };
            // }

            // if (!texts[book_id].chapters[chapter]) {
            //     texts[book_id].chapters[chapter] = {};
            // }

            // if (!texts[book_id].chapters[chapter][verse]) {
            //     texts[book_id].chapters[chapter][verse][translation_id] = {
            //         text: text,
            //     };
            // }

            buildReferences({
                chapter,
                verse,
                text,
                translation_id,
                book_id,
                book_name,
            });
        }
    );
}

const write = (json, fileName) => {
    fs.writeFileSync(fileName, JSON.stringify(json));
};

const pushToDB = (path, collection) => {
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

// buildKJV();
// buildASV();
buildReferences();
// write(references, './references.json');
// pushToDB(__dirname + '/references.json', 'References');

// const buildAll = () => {
//     buildASV();
//     buildKJV();
// };

// buildAll();
