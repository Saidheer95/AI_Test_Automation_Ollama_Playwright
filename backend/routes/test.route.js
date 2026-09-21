const express = require('express');

const {
    testRegistry
} = require('../testRegistry');

const {
    createExecution,
    getExecution,
    addLog
} = require('../services/executionStore');

const {
    resolvePrompt
} = require('../services/intentResolver');

const {
    runTest
} = require('../services/test.runner');

const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        success: true,
        tests: Object.values(testRegistry)
    });
});

router.post('/prompt', async (req, res) => {
    try {
        const { prompt } = req.body;

        const resolved = await resolvePrompt(prompt);

        if (!resolved.success) {
            return res.status(400).json(resolved);
        }

        const execution = createExecution({
            workflow: resolved.workflow,
            testId: resolved.test.testId,
            parameters: resolved.parameters
        });

        addLog(execution.id, `Prompt: ${prompt}`);
        addLog(
            execution.id,
            `Ollama workflow: ${resolved.workflow}`
        );
        addLog(
            execution.id,
            `Parameters: ${JSON.stringify(resolved.parameters)}`
        );

        runTest(
            execution.id,
            resolved.workflow,
            resolved.parameters
        );

        res.json({
            success: true,
            executionId: execution.id,
            workflow: resolved.workflow,
            parameters: resolved.parameters,
            test: resolved.test,
            status: execution.status
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

router.get('/execution/:id', (req, res) => {
    const execution = getExecution(req.params.id);

    if (!execution) {
        return res.status(404).json({
            success: false,
            message: 'Execution not found'
        });
    }

    res.json({
        success: true,
        execution
    });
});

module.exports = router;
