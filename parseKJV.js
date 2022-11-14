import fs from 'fs';
import jsonrepair from 'jsonrepair';

// function read() {
//     let data = '';
//     const readStream = fs.createReadStream('kjv.json', 'utf-8');
//     readStream.on('error', (error) => console.log(error.message));
//     readStream.on('data', (chunk) => console.log(chunk, '\n ---- \n'));
//     readStream.on('end', () => console.log('Reading complete'));
// }
let kjv = {};
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
            if (!kjv[book_id]) {
                kjv[book_id] = { bookName: book_name, chapters: {} };
            }

            if (!kjv[book_id].chapters[chapter]) {
                kjv[book_id].chapters[chapter] = {};
            }

            if (!kjv[book_id].chapters[chapter][verse]) {
                kjv[book_id].chapters[chapter][verse] = { text: text };
            }
        }
    );
}

const write = (json) => {
    fs.writeFileSync('reformatKJV.json', JSON.stringify(json));
};

read();
write(kjv);
