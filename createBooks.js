import fs from 'fs';

import {
    getDirName,
    getJsonFromFile,
    getSupportedVersions,
    pushToDB,
} from './utils.js';

const __dirname = getDirName();

const texts = {};

const updateTexts = (json) => {
    Object.values(json).forEach(
        ({ chapter, verse, text, translation_id, book_id, book_name }) => {
            const label = translation_id + book_id;

            if (!texts[label]) {
                texts[label] = {
                    bookId: book_id,
                    bookName: book_name,
                    translation: translation_id,
                    chapters: {},
                };
            }
            if (!texts[label].chapters[chapter]) {
                texts[label].chapters[chapter] = {
                    chapterNumber: chapter,
                    verses: {},
                };
            }
            texts[label].chapters[chapter].verses[verse] = text;
        }
    );
};

const createBooks = () => {
    let sanityCheck = '\n ----- START ----- \n';
    const versions = getSupportedVersions();
    fs.writeFileSync('texts.json', '');

    versions.forEach((version) => {
        const filePath = `./${version}.json`;
        updateTexts(getJsonFromFile(filePath));
    });

    const stream = fs.createWriteStream('./texts.json', { flags: 'a' });

    Object.values(texts).forEach((book) => {
        sanityCheck += `\t${book.bookName}\n`;

        Object.values(book.chapters).forEach((chapter) => {
            sanityCheck += `\t\t${chapter.chapterNumber}\n`;

            const chapterObject = {
                bookId: book.bookId,
                bookName: book.bookName,
                chapterNumber: chapter.chapterNumber,
                version: book.translation,
                verses: chapter.verses,
            };

            stream.write(JSON.stringify(chapterObject));
            stream.write('\n');
        });
    });

    stream.end(undefined, undefined, () => {
        // pushToDB(__dirname + '/texts.json', 'Texts');
    });

    fs.writeFileSync('./sanityCheck.txt', sanityCheck);
};

createBooks();
