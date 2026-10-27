const fs = require('fs');
const path = require('path');

const DATA_DIR =
    path.join(
        __dirname,
        '..',
        'executions'
    );


function createExecutionData(
    executionId,
    data
) {
    fs.mkdirSync(
        DATA_DIR,
        {
            recursive: true
        }
    );


    const filePath =
        path.join(
            DATA_DIR,
            `${executionId}.json`
        );


    const executionData = {
        executionId,

        workflow:
            data.workflow,

        testId:
            data.testId || null,

        parameters:
            data.parameters || {},

        createdAt:
            new Date().toISOString(),

        result:
            null
    };


    fs.writeFileSync(
        filePath,
        JSON.stringify(
            executionData,
            null,
            2
        ),
        'utf8'
    );


    return filePath;
}


module.exports = {
    createExecutionData
};
