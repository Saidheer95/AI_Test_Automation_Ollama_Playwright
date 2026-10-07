const {
    spawn
} = require('child_process');
const fs = require('fs');
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

const REPORTS_DIR = path.join(__dirname, '..', 'reports');

function runAllureReport(executionId, resultsDir, reportDir) {
    const command = `npx --no-install allure generate "${resultsDir}" --clean --output "${reportDir}"`;

    return new Promise(resolve => {
        let output = '';
        let settled = false;
        let child;

        try {
            child = spawn(
                'cmd.exe',
                ['/d', '/s', '/c', command],
                {
                    cwd: PLAYWRIGHT_PROJECT,
                    windowsHide: true
                }
            );
        } catch (error) {
            resolve({ success: false, message: error.message });
            return;
        }

        child.stdout.on('data', data => {
            output += data.toString();
        });
        child.stderr.on('data', data => {
            output += data.toString();
        });
        child.on('error', error => {
            if (!settled) {
                settled = true;
                resolve({ success: false, message: error.message });
            }
        });
        child.on('close', code => {
            if (settled) return;
            settled = true;
            resolve({
                success: code === 0,
                message: code === 0
                    ? ''
                    : output.trim() || `Allure CLI exited with code ${code}`
            });
        });
    });
}


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

    const executionReportDir = path.join(REPORTS_DIR, executionId);
    const allureResultsDir = path.join(executionReportDir, 'allure-results');
    const allureHtmlDir = path.join(executionReportDir, 'allure-report');

    fs.mkdirSync(allureResultsDir, { recursive: true });


    updateExecution(
        executionId,
        {
            status: 'RUNNING',
            startedAt:
                new Date().toISOString(),
            report: {
                status: 'GENERATING',
                url: null,
                message: null
            }
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
                        dataFile,
                    ALLURE_RESULTS_DIR:
                        allureResultsDir
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
                report: {
                    status: 'FAILED',
                    url: null,
                    message: 'Playwright could not be started.'
                },
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
                    report: {
                        status: 'FAILED',
                        url: null,
                        message: 'Playwright could not be started.'
                    },
                    completedAt:
                        new Date().toISOString()
                }
            );
        }
    );


    child.on(
        'close',
        async code => {
            const reportResult = await runAllureReport(
                executionId,
                allureResultsDir,
                allureHtmlDir
            );

            const report = reportResult.success
                ? {
                    status: 'READY',
                    url: `/api/tests/execution/${executionId}/report/`,
                    message: null
                }
                : {
                    status: 'FAILED',
                    url: null,
                    message: reportResult.message
                };

            if (reportResult.success) {
                addLog(executionId, 'Allure report generated successfully');
            } else {
                addLog(
                    executionId,
                    `Allure report generation failed: ${reportResult.message}`
                );
            }

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
                        report,
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
                        report,
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
