// const { testRegistry } = require('../testRegistry');
// const { resolveWithOllama } = require('./ollama.service');

// function validateParameters(workflow, parameters) {
//     const test = testRegistry[workflow];
//     const missing = [];

//     for (const name of test.requiredParameters || []) {
//         if (
//             parameters[name] === undefined ||
//             parameters[name] === null ||
//             parameters[name] === ''
//         ) {
//             missing.push(name);
//         }
//     }

//     if (missing.length) {
//         return {
//             valid: false,
//             message: `Missing required parameter(s): ${missing.join(', ')}`
//         };
//     }

//     if (
//         parameters.quantity !== undefined &&
//         (!Number.isInteger(parameters.quantity) ||
//             parameters.quantity <= 0)
//     ) {
//         return {
//             valid: false,
//             message: 'Quantity must be a positive integer'
//         };
//     }

//     return { valid: true };
// }

// async function resolvePrompt(prompt) {
//     if (!prompt || !prompt.trim()) {
//         return {
//             success: false,
//             message: 'Prompt is required'
//         };
//     }

//     const workflows = Object.keys(testRegistry);
//     const result = await resolveWithOllama(prompt, workflows);

//     if (!result.workflow || result.workflow === 'UNKNOWN') {
//         return {
//             success: false,
//             message: 'No supported workflow matched the prompt. No Playwright test was started.'
//         };
//     }

//     const test = testRegistry[result.workflow];

//     if (!test) {
//         return {
//             success: false,
//             message: 'The requested workflow is not registered. No Playwright test was started.'
//         };
//     }

//     const validation = validateParameters(
//         result.workflow,
//         result.parameters || {}
//     );

//     if (!validation.valid) {
//         return {
//             success: false,
//             message: validation.message
//         };
//     }

//     return {
//         success: true,
//         workflow: result.workflow,
//         parameters: result.parameters || {},
//         test
//     };
// }

// module.exports = {
//     resolvePrompt
// };

// const { testRegistry } = require('../testRegistry');
// const { resolveWithOllama } = require('./ollama.service');
// const { getLatestCreatedPR } = require('./executionDataResolver');

// function validateParameters(workflow, parameters) {
//     const test = testRegistry[workflow];
//     const missing = [];

//     for (const name of test.requiredParameters || []) {
//         if (
//             parameters[name] === undefined ||
//             parameters[name] === null ||
//             parameters[name] === ''
//         ) {
//             missing.push(name);
//         }
//     }

//     if (missing.length) {
//         return {
//             valid: false,
//             message: `Missing required parameter(s): ${missing.join(', ')}`
//         };
//     }

//     if (
//         parameters.quantity !== undefined &&
//         (!Number.isInteger(parameters.quantity) ||
//             parameters.quantity <= 0)
//     ) {
//         return {
//             valid: false,
//             message: 'Quantity must be a positive integer'
//         };
//     }

//     return { valid: true };
// }

// async function resolvePrompt(prompt) {
//     if (!prompt || !prompt.trim()) {
//         return {
//             success: false,
//             message: 'Prompt is required'
//         };
//     }

//     const workflows = Object.keys(testRegistry);

//     const result = await resolveWithOllama(
//         prompt,
//         workflows
//     );

//     if (!result.workflow || result.workflow === 'UNKNOWN') {
//         return {
//             success: false,
//             message:
//                 'No supported workflow matched the prompt. No Playwright test was started.'
//         };
//     }

//     const test = testRegistry[result.workflow];

//     if (!test) {
//         return {
//             success: false,
//             message:
//                 'The requested workflow is not registered. No Playwright test was started.'
//         };
//     }

//     const parameters = {
//         ...(result.parameters || {})
//     };

//     // Approval without PR number:
//     // automatically use the previously created PR.
//     if (
//         result.workflow === 'approval' &&
//         !parameters.prNumber
//     ) {
//         const latestPR = getLatestCreatedPR();

//         if (!latestPR) {
//             return {
//                 success: false,
//                 message:
//                     'No previously created purchase requisition was found. Please create a PR first.'
//             };
//         }

//         parameters.prNumber =
//             latestPR.result.prNumber;
//     }

//     const validation = validateParameters(
//         result.workflow,
//         parameters
//     );

//     if (!validation.valid) {
//         return {
//             success: false,
//             message: validation.message
//         };
//     }

//     return {
//         success: true,
//         workflow: result.workflow,
//         parameters,
//         test
//     };
// }

// module.exports = {
//     resolvePrompt
// };


const {
    testRegistry
} = require('../testRegistry');

const {
    resolveWithOllama
} = require('./ollama.service');

const {
    getLatestCreatedPR
} = require('./executionDataResolver');


function validateParameters(
    workflow,
    parameters
) {
    const test =
        testRegistry[workflow];

    if (!test) {
        return {
            valid: false,
            message:
                'Workflow is not registered'
        };
    }

    const missing = [];

    for (
        const name of test.requiredParameters || []
    ) {
        if (
            parameters[name] === undefined ||
            parameters[name] === null ||
            parameters[name] === ''
        ) {
            missing.push(name);
        }
    }

    if (missing.length) {
        return {
            valid: false,
            message:
                `Missing required parameter(s): ${missing.join(', ')}`
        };
    }

    if (
        parameters.quantity !== undefined &&
        (
            !Number.isInteger(
                parameters.quantity
            ) ||
            parameters.quantity <= 0
        )
    ) {
        return {
            valid: false,
            message:
                'Quantity must be a positive integer'
        };
    }

    return {
        valid: true
    };
}


async function resolvePrompt(prompt) {
    if (
        !prompt ||
        !prompt.trim()
    ) {
        return {
            success: false,
            message:
                'Prompt is required'
        };
    }

    let result;

    try {
        result =
            await resolveWithOllama(
                prompt,
                testRegistry
            );
    } catch (error) {
        return {
            success: false,
            message:
                `Intent resolution failed: ${error.message}`
        };
    }

    if (
        !result ||
        !result.workflow ||
        result.workflow === 'UNKNOWN'
    ) {
        return {
            success: false,
            message:
                'No supported workflow matched the prompt. No Playwright test was started.'
        };
    }

    const test =
        testRegistry[result.workflow];

    if (!test) {
        return {
            success: false,
            message:
                'The requested workflow is not registered. No Playwright test was started.'
        };
    }

    const parameters = {
        ...(result.parameters || {})
    };


    /*
     * APPROVE_PR without an explicit PR number:
     *
     * Example:
     *
     * "approve the PR"
     *
     * The system will use the most recently created PR.
     */
    if (
        result.workflow === 'APPROVE_PR' &&
        !parameters.prNumber
    ) {
        const latestPR =
            getLatestCreatedPR();

        if (!latestPR) {
            return {
                success: false,
                message:
                    'No previously created purchase requisition was found. Please create a PR first.'
            };
        }

        parameters.prNumber =
            latestPR.result.prNumber;
    }


    const validation =
        validateParameters(
            result.workflow,
            parameters
        );

    if (!validation.valid) {
        return {
            success: false,
            message:
                validation.message
        };
    }

    return {
        success: true,
        workflow: result.workflow,
        parameters,
        test
    };
}


module.exports = {
    resolvePrompt
};
