import fs from 'fs';
import jsonrepair from 'jsonrepair';
/**
 * texts table
 * books{chapters{verses}}
 * gen: {
 *      1: {
 *          kjv: {
 *              full: allversestext,
 *              1: text,
 *          },
 *          {...}
 *      },
 *      {...}
 * }
 *
 * references table
 * {book{chapters{verses}}}
 *
 *
 *
 *
 *
 *
 */

const references = {};
const texts = {};

const buildReferences = ({
    chapter,
    verse,
    text,
    translation_id,
    book_id,
    book_name,
} = data) => {
    if (!references[book_id].chapters[chapter][verse]) {
        references[book_id].chapters[chapter][verse] = { text: text };
    }

    if (!references[book_id]) {
        references[book_id] = { bookName: book_name, chapters: {} };
    }

    if (!references[book_id].chapters[chapter]) {
        references[book_id].chapters[chapter] = {};
    }

    if (!references[book_id].chapters[chapter][verse]) {
        references[book_id].chapters[chapter][verse] = verse;
    }
};

const buildKJV = () => {
    const file = fs.readFileSync('./kjv.json', 'utf-8');
    const repaired = jsonrepair(file);
    const json = JSON.parse(repaired);

    Object.values(json).forEach(
        ({
            chapter,
            verse,
            text,
            translation_id,
            book_id,
            book_name,
        } = data) => {
            if (!reference[book_id]) {
                reference[book_id] = { bookName: book_name, chapters: {} };
            }

            if (!reference[book_id].chapters[chapter]) {
                reference[book_id].chapters[chapter] = {};
            }

            if (!reference[book_id].chapters[chapter][verse]) {
                reference[book_id].chapters[chapter][verse] = { text: text };
            }

            buildReferences(data);
        }
    );
};

function buildASV() {
    const file = fs.readFileSync('./asv.json', 'utf-8');
    const repaired = jsonrepair(file);
    const json = JSON.parse(repaired);

    Object.values(json).forEach(
        ({ chapter, verse, text, translation_id, book_id, book_name }) => {
            if (!reference[book_id]) {
                reference[book_id] = { bookName: book_name, chapters: {} };
            }

            if (!reference[book_id].chapters[chapter]) {
                reference[book_id].chapters[chapter] = {};
            }

            if (!reference[book_id].chapters[chapter][verse]) {
                reference[book_id].chapters[chapter][verse] = { text: text };
            }

            buildReferences(data);
        }
    );
}

const write = (json, fileName) => {
    fs.writeFileSync(fileName, JSON.stringify(json));
};

const buildAll = () => {
    buildASV();
    buildKJV();
};

buildAll();
