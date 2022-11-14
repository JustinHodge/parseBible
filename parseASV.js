import fs from 'fs';
import jsonrepair from 'jsonrepair';

let asv = {};
let translation_id = '';
let books = {};

// const mock = {
//     translation_id: {
//         {
//             book_id: {
//                 book_name,
//                 chapterNumber: {
//                     verseNumber: {
//                         text
//                     }
//                 }
//             }
//         }
//     }
// }

function read() {
    const file = fs.readFileSync('./kjv.json', 'utf-8');
    const repaired = jsonrepair(file);
    const json = JSON.parse(repaired);

    Object.values(json).forEach(
        ({ chapter, verse, text, translation_id, book_id, book_name }) => {
            if (!asv[book_id]) {
                asv[book_id] = { bookName: book_name, chapters: {} };
            }

            if (!asv[book_id].chapters[chapter]) {
                asv[book_id].chapters[chapter] = {};
            }

            if (!asv[book_id].chapters[chapter][verse]) {
                asv[book_id].chapters[chapter][verse] = { text: text };
            }
        }
    );
}

const write = (json) => {
    fs.writeFileSync('reformatASV.json', JSON.stringify(json));
};

read();
write(asv);
