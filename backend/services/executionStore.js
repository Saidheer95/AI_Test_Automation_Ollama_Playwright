const executions = new Map();

function createExecution(data) {
    const execution = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        workflow: data.workflow,
        testId: data.testId,
        parameters: data.parameters || {},
        status: 'QUEUED',
        logs: [],
        startedAt: null,
        completedAt: null,
        result: null
    };

    executions.set(execution.id, execution);
    return execution;
}

function getExecution(id) {
    return executions.get(id);
}

function updateExecution(id, data) {
    const execution = executions.get(id);
    if (execution) Object.assign(execution, data);
}

function addLog(id, message) {
    const execution = executions.get(id);
    if (!execution) return;

    execution.logs.push({
        timestamp: new Date().toISOString(),
        message
    });
}

module.exports = {
    createExecution,
    getExecution,
    updateExecution,
    addLog
};
