import { useEffect, useRef, useState } from 'react';

const API = 'http://localhost:3001/api/tests';

const examples = [
    'Create a PR for 5 laptops',
    'Create an RFQ for 10 monitors',
    'Approve PR PR_00709',
    'Create contract to PR'
];

export default function App() {
    const [prompt, setPrompt] = useState('');
    const [execution, setExecution] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const timer = useRef(null);

    useEffect(() => {
        return () => clearInterval(timer.current);
    }, []);

    async function runPrompt() {
        if (!prompt.trim()) return;

        clearInterval(timer.current);
        setLoading(true);
        setError('');
        setExecution(null);

        try {
            const response = await fetch(`${API}/prompt`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    prompt: prompt.trim()
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Request failed');
            }

            await pollExecution(data.executionId);
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    }

    async function pollExecution(id) {
        const poll = async () => {
            const response = await fetch(
                `${API}/execution/${id}`
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || 'Execution lookup failed'
                );
            }

            setExecution(data.execution);

            if (
                data.execution.status === 'PASSED' ||
                data.execution.status === 'FAILED'
            ) {
                clearInterval(timer.current);
            }
        };

        await poll();

        timer.current = setInterval(
            poll,
            1000
        );
    }

    function useExample(value) {
        setPrompt(value);
        setError('');
    }

    return (
        <div className="page">
            <div className="container">
                <header>
                    <div>
                        <div className="eyebrow">
                            AI TEST AUTOMATION
                        </div>
                        <h1>Run Playwright with natural language</h1>
                        <p>
                            Describe the automation you want. Ollama
                            resolves the intent and the backend executes
                            only registered Playwright workflows.
                        </p>
                    </div>
                    <div className="status-dot">
                        <span />
                        Ollama Local
                    </div>
                </header>

                <section className="card prompt-card">
                    <label>Automation prompt</label>

                    <textarea
                        value={prompt}
                        onChange={e => setPrompt(e.target.value)}
                        placeholder="Example: Create a PR for 5 laptops"
                        rows={5}
                        onKeyDown={e => {
                            if (
                                e.key === 'Enter' &&
                                (e.ctrlKey || e.metaKey)
                            ) {
                                runPrompt();
                            }
                        }}
                    />

                    <div className="examples">
                        {examples.map(example => (
                            <button
                                key={example}
                                onClick={() =>
                                    useExample(example)
                                }
                            >
                                {example}
                            </button>
                        ))}
                    </div>

                    <button
                        className="run-button"
                        onClick={runPrompt}
                        disabled={loading || !prompt.trim()}
                    >
                        {loading
                            ? 'Running...'
                            : 'Run Automation'}
                    </button>

                    <div className="hint">
                        Ctrl + Enter to run
                    </div>
                </section>

                {error && (
                    <section className="card error">
                        <strong>Automation not started</strong>
                        <div>{error}</div>
                    </section>
                )}

                {execution && (
                    <section className="card">
                        <div className="execution-header">
                            <div>
                                <label>Execution</label>
                                <h2>
                                    {execution.workflow}
                                </h2>
                            </div>

                            <span
                                className={`badge ${execution.status.toLowerCase()}`}
                            >
                                {execution.status}
                            </span>
                        </div>

                        <div className="meta">
                            <div>
                                <span>Test</span>
                                {execution.testId}
                            </div>
                            <div>
                                <span>Parameters</span>
                                <code>
                                    {JSON.stringify(
                                        execution.parameters
                                    )}
                                </code>
                            </div>
                        </div>

                        <label>Playwright logs</label>

                        <div className="logs">
                            {execution.logs.map(
                                (log, index) => (
                                    <div
                                        className="log"
                                        key={`${log.timestamp}-${index}`}
                                    >
                                        <span>
                                            {new Date(
                                                log.timestamp
                                            ).toLocaleTimeString()}
                                        </span>
                                        <pre>
                                            {log.message}
                                        </pre>
                                    </div>
                                )
                            )}
                        </div>

                    </section>
                )}
            </div>
        </div>
    );
}
