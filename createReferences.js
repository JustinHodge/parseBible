import {
    write,
    pushToDB,
    getSupportedVersions,
    getJsonFromFile,
    getDirName,
} from './utils.js';

const __dirname = getDirName();

const createReferences = () => {
    const references = { books: {} };
    const versions = getSupportedVersions();
    versions.forEach((version) => {
        const json = getJsonFromFile(`./${version}.json`);

        Object.values(json).forEach(
            ({ chapter, verse, text, translation_id, book_id, book_name }) => {
                if (!references.books[book_id]) {
                    references.books[book_id] = {
                        bookName: book_name,
                        bookId: book_id,
                        chapters: {},
                    };
                }

                if (!references.books[book_id].chapters[chapter]) {
                    references.books[book_id].chapters[chapter] = {
                        chapterNumber: chapter,
                        verses: [],
                    };
                }

                if (
                    !references.books[book_id].chapters[chapter].verses.some(
                        (seenVerse) => seenVerse === verse
                    )
                ) {
                    references.books[book_id].chapters[chapter].verses.push(
                        verse
                    );
                }
            }
        );
    });

    write(references, './references.json');
    pushToDB(__dirname + '/references.json', 'References');
};

createReferences();
