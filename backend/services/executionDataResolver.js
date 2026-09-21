// const fs = require('fs');
// const path = require('path');

// const DATA_DIR = path.join(__dirname, '..', 'executions');

// function getLatestCreatedPR() {
//     if (!fs.existsSync(DATA_DIR)) {
//         return null;
//     }

//     const files = fs
//         .readdirSync(DATA_DIR)
//         .filter(file => file.endsWith('.json'));

//     if (!files.length) {
//         return null;
//     }

//     let latest = null;

//     for (const file of files) {
//         const filePath = path.join(DATA_DIR, file);

//         try {
//             const data = JSON.parse(
//                 fs.readFileSync(filePath, 'utf8')
//             );

//             if (
//                 data.workflow === 'createPR' &&
//                 data.result &&
//                 data.result.prNumber
//             ) {
//                 if (
//                     !latest ||
//                     new Date(data.createdAt) >
//                     new Date(latest.createdAt)
//                 ) {
//                     latest = data;
//                 }
//             }
//         } catch (error) {
//             console.log(
//                 `Skipping invalid execution file: ${file}`
//             );
//         }
//     }

//     return latest;
// }

// module.exports = {
//     getLatestCreatedPR
// };



const fs = require('fs');
const path = require('path');

const DATA_DIR =
    path.join(
        __dirname,
        '..',
        'executions'
    );


function getLatestCreatedPR() {
    if (!fs.existsSync(DATA_DIR)) {
        return null;
    }


    const files =
        fs
            .readdirSync(DATA_DIR)
            .filter(
                file =>
                    file.endsWith('.json')
            );


    if (!files.length) {
        return null;
    }


    let latest = null;


    for (const file of files) {
        const filePath =
            path.join(
                DATA_DIR,
                file
            );


        try {
            const data =
                JSON.parse(
                    fs.readFileSync(
                        filePath,
                        'utf8'
                    )
                );


            /*
             * Only consider executions
             * that actually represent
             * CREATE_PR.
             */
            if (
                data.workflow !==
                'CREATE_PR'
            ) {
                continue;
            }


            /*
             * The PR number must have
             * been written into result.
             */
            if (
                !data.result ||
                !data.result.prNumber
            ) {
                continue;
            }


            if (
                !latest ||
                new Date(
                    data.createdAt
                ) >
                new Date(
                    latest.createdAt
                )
            ) {
                latest = data;
            }

        } catch (error) {
            console.log(
                `Skipping invalid execution file: ${file}`
            );
        }
    }


    return latest;
}


module.exports = {
    getLatestCreatedPR
};
