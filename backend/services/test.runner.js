const {
    spawn
} = require('child_process');

const {
    testRegistry,
    PLAYWRIGHT_PROJECT
} = require('../testRegistry');

const {
    addLog,
    updateExecution
} = require('./executionStore');

const {
    createExecutionData
} = require('./executionData');

function runTest(
    executionId,
    workflow,
    parameters
) {
    const test =
        testRegistry[workflow];

    if (!test) {
        updateExecution(
            executionId,
            {
                status: 'FAILED',
                result:
                    'Unsupported workflow',
                completedAt:
                    new Date().toISOString()
            }
        );

        return;
    }


    const dataFile =
        createExecutionData(
            executionId,
            {
                workflow,
                testId: test.testId,
                parameters
            }
        );

    updateExecution(
        executionId,
        {
            status: 'RUNNING',
            startedAt:
                new Date().toISOString()
        }
    );


    addLog(
        executionId,
        `Workflow: ${workflow}`
    );

    addLog(
        executionId,
        `Test: ${test.name}`
    );

    addLog(
        executionId,
        `Test file: ${test.file}`
    );

    addLog(
        executionId,
        `Playwright project: ${PLAYWRIGHT_PROJECT}`
    );

    addLog(
        executionId,
        `Execution data: ${dataFile}`
    );


    const args = [
        '/c',
        'npx',
        'playwright',
        'test',
        test.file
    ];


    addLog(
        executionId,
        `Starting: cmd.exe ${args.join(' ')}`
    );


    let child;

    try {
        child = spawn(
            'cmd.exe',
            args,
            {
                cwd: PLAYWRIGHT_PROJECT,

                windowsHide: false,

                env: {
                    ...process.env,

                    TEST_EXECUTION_DATA:
                        dataFile
                }
            }
        );
    } catch (error) {
        addLog(
            executionId,
            `Failed to start Playwright: ${error.message}`
        );

        updateExecution(
            executionId,
            {
                status: 'FAILED',
                result: error.message,
                completedAt:
                    new Date().toISOString()
            }
        );

        return;
    }


    child.stdout.on(
        'data',
        data => {
            const output =
                data.toString().trim();

            if (output) {
                addLog(
                    executionId,
                    output
                );
            }
        }
    );


    child.stderr.on(
        'data',
        data => {
            const output =
                data.toString().trim();

            if (output) {
                addLog(
                    executionId,
                    output
                );
            }
        }
    );


    child.on(
        'error',
        error => {
            addLog(
                executionId,
                `Execution error: ${error.message}`
            );

            updateExecution(
                executionId,
                {
                    status: 'FAILED',
                    result: error.message,
                    completedAt:
                        new Date().toISOString()
                }
            );
        }
    );


    child.on(
        'close',
        code => {
            if (code === 0) {
                addLog(
                    executionId,
                    'Playwright execution completed successfully'
                );

                updateExecution(
                    executionId,
                    {
                        status: 'PASSED',
                        result: 'PASSED',
                        completedAt:
                            new Date().toISOString()
                    }
                );
            } else {
                addLog(
                    executionId,
                    `Playwright exited with code ${code}`
                );

                updateExecution(
                    executionId,
                    {
                        status: 'FAILED',
                        result:
                            `Playwright exited with code ${code}`,
                        completedAt:
                            new Date().toISOString()
                    }
                );
            }
        }
    );
}


module.exports = {
    runTest
};
