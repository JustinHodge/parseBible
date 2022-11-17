import fs from 'fs';
import jsonrepair from 'jsonrepair';

import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

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
        }
    );
}

// buildKJV();
// buildASV();

// const buildAll = () => {
//     buildASV();
//     buildKJV();
// };

// buildAll();
