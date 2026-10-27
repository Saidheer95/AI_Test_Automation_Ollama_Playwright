// const {
//     spawn
// } = require('child_process');

// const {
//     testRegistry,
//     PLAYWRIGHT_PROJECT
// } = require('../testRegistry');

// const {
//     addLog,
//     updateExecution
// } = require('./executionStore');

// const {
//     createExecutionData
// } = require('./executionData');

// function runTest(
//     executionId,
//     workflow,
//     parameters
// ) {
//     const test =
//         testRegistry[workflow];

//     if (!test) {
//         updateExecution(
//             executionId,
//             {
//                 status: 'FAILED',
//                 result:
//                     'Unsupported workflow',
//                 completedAt:
//                     new Date().toISOString()
//             }
//         );

//         return;
//     }


//     const dataFile =
//         createExecutionData(
//             executionId,
//             {
//                 workflow,
//                 testId: test.testId,
//                 parameters
//             }
//         );

//     updateExecution(
//         executionId,
//         {
//             status: 'RUNNING',
//             startedAt:
//                 new Date().toISOString()
//         }
//     );


//     addLog(
//         executionId,
//         `Workflow: ${workflow}`
//     );

//     addLog(
//         executionId,
//         `Test: ${test.name}`
//     );

//     addLog(
//         executionId,
//         `Test file: ${test.file}`
//     );

//     addLog(
//         executionId,
//         `Playwright project: ${PLAYWRIGHT_PROJECT}`
//     );

//     addLog(
//         executionId,
//         `Execution data: ${dataFile}`
//     );


//     const args = [
//         '/c',
//         'npx',
//         'playwright',
//         'test',
//         test.file
//     ];


//     addLog(
//         executionId,
//         `Starting: cmd.exe ${args.join(' ')}`
//     );


//     let child;

//     try {
//         child = spawn(
//             'cmd.exe',
//             args,
//             {
//                 cwd: PLAYWRIGHT_PROJECT,

//                 windowsHide: false,

//                 env: {
//                     ...process.env,

//                     TEST_EXECUTION_DATA:
//                         dataFile
//                 }
//             }
//         );
//     } catch (error) {
//         addLog(
//             executionId,
//             `Failed to start Playwright: ${error.message}`
//         );

//         updateExecution(
//             executionId,
//             {
//                 status: 'FAILED',
//                 result: error.message,
//                 completedAt:
//                     new Date().toISOString()
//             }
//         );

//         return;
//     }


//     child.stdout.on(
//         'data',
//         data => {
//             const output =
//                 data.toString().trim();

//             if (output) {
//                 addLog(
//                     executionId,
//                     output
//                 );
//             }
//         }
//     );


//     child.stderr.on(
//         'data',
//         data => {
//             const output =
//                 data.toString().trim();

//             if (output) {
//                 addLog(
//                     executionId,
//                     output
//                 );
//             }
//         }
//     );


//     child.on(
//         'error',
//         error => {
//             addLog(
//                 executionId,
//                 `Execution error: ${error.message}`
//             );

//             updateExecution(
//                 executionId,
//                 {
//                     status: 'FAILED',
//                     result: error.message,
//                     completedAt:
//                         new Date().toISOString()
//                 }
//             );
//         }
//     );


//     child.on(
//         'close',
//         code => {
//             if (code === 0) {
//                 addLog(
//                     executionId,
//                     'Playwright execution completed successfully'
//                 );

//                 updateExecution(
//                     executionId,
//                     {
//                         status: 'PASSED',
//                         result: 'PASSED',
//                         completedAt:
//                             new Date().toISOString()
//                     }
//                 );
//             } else {
//                 addLog(
//                     executionId,
//                     `Playwright exited with code ${code}`
//                 );

//                 updateExecution(
//                     executionId,
//                     {
//                         status: 'FAILED',
//                         result:
//                             `Playwright exited with code ${code}`,
//                         completedAt:
//                             new Date().toISOString()
//                     }
//                 );
//             }
//         }
//     );
// }


// module.exports = {
//     runTest
// };


const { spawn } = require('child_process');
const path = require('path');

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

function runTest(executionId, workflow, parameters) {
    const test = testRegistry[workflow];

    // Validate workflow
    if (!test) {
        updateExecution(executionId, {
            status: 'FAILED',
            result: 'Unsupported workflow',
            completedAt: new Date().toISOString()
        });

        return;
    }

    let child;
    let finalized = false;

    // Resolve the Playwright project directory
    const projectDir = path.resolve(PLAYWRIGHT_PROJECT);

    // Create execution data
    let dataFile;

    try {
        dataFile = createExecutionData(executionId, {
            workflow,
            testId: test.testId,
            parameters
        });
    } catch (error) {
        addLog(
            executionId,
            `Failed to create execution data: ${error.message}`
        );

        updateExecution(executionId, {
            status: 'FAILED',
            result: error.message,
            completedAt: new Date().toISOString()
        });

        return;
    }

    // Update execution status
    updateExecution(executionId, {
        status: 'RUNNING',
        startedAt: new Date().toISOString()
    });

    // Log execution details
    addLog(executionId, `Workflow: ${workflow}`);
    addLog(executionId, `Test: ${test.name}`);
    addLog(executionId, `Test file: ${test.file}`);
    addLog(
        executionId,
        `Playwright project: ${projectDir}`
    );
    addLog(executionId, `Execution data: ${dataFile}`);

    // Resolve Playwright CLI from the target project
    let playwrightCli;

    try {
        playwrightCli = require.resolve(
            '@playwright/test/cli',
            { paths: [projectDir] }
        );
    } catch (error) {
        const message =
            `Playwright CLI not found in ${projectDir}. ` +
            'Ensure @playwright/test is installed in the project. ' +
            error.message;

        addLog(executionId, message);

        updateExecution(executionId, {
            status: 'FAILED',
            result: message,
            completedAt: new Date().toISOString()
        });

        return;
    }

    // Execute Playwright directly without cmd.exe or npx
    const args = [
        playwrightCli,
        'test',
        test.file
    ];

    addLog(
        executionId,
        `Starting: ${process.execPath} ${args.join(' ')}`
    );

    try {
        child = spawn(
            process.execPath,
            args,
            {
                cwd: projectDir,
                windowsHide: true,
                env: {
                    ...process.env,
                    TEST_EXECUTION_DATA: dataFile
                },
                stdio: ['ignore', 'pipe', 'pipe']
            }
        );
    } catch (error) {
        addLog(
            executionId,
            `Failed to start Playwright: ${error.message}`
        );

        updateExecution(executionId, {
            status: 'FAILED',
            result: error.message,
            completedAt: new Date().toISOString()
        });

        return;
    }

    // Prevent multiple terminal status updates
    function finalize(status, result) {
        if (finalized) {
            return;
        }

        finalized = true;

        updateExecution(executionId, {
            status,
            result,
            completedAt: new Date().toISOString()
        });
    }

    // Capture standard output
    child.stdout.on('data', data => {
        const output = data.toString().trim();

        if (output) {
            addLog(executionId, output);
        }
    });

    // Capture error output
    child.stderr.on('data', data => {
        const output = data.toString().trim();

        if (output) {
            addLog(executionId, output);
        }
    });

    // Handle process startup errors
    child.on('error', error => {
        addLog(
            executionId,
            `Execution error: ${error.message}`
        );

        finalize('FAILED', error.message);
    });

    // Handle process completion
    child.on('close', (code, signal) => {
        if (finalized) {
            return;
        }

        if (code === 0) {
            addLog(
                executionId,
                'Playwright execution completed successfully'
            );

            finalize('PASSED', 'PASSED');
        } else {
            const result = signal
                ? `Playwright terminated by signal ${signal}`
                : `Playwright exited with code ${code}`;

            addLog(executionId, result);

            finalize('FAILED', result);
        }
    });
}

module.exports = {
    runTest
};
