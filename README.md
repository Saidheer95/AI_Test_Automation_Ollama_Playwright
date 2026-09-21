# AI Test Automation Platform

This project adds a local Ollama prompt layer in front of an existing Playwright project.

## Architecture

Frontend -> Node/Express -> Ollama -> validated workflow registry -> existing Playwright project

The LLM never receives permission to select arbitrary files or execute shell commands.

## Important

The backend currently passes prompt parameters through `TEST_EXECUTION_DATA`.

Your existing Playwright test can read it with:

```js
const fs = require('fs');

function getExecutionData() {
    const file = process.env.TEST_EXECUTION_DATA;

    if (!file) {
        return { parameters: {} };
    }

    return JSON.parse(
        fs.readFileSync(file, 'utf8')
    );
}
```

Use this only if your existing PR JSON/test-data mechanism does not already provide the correct integration point. Prefer adapting the generated parameters to your existing JSON structure.

## Setup

### 1. Backend

```cmd
cd C:\Users\SaiDheerAdabala\AI_Project\backend
copy .env.example .env
npm install
npm start
```

Edit `.env` if your Playwright project path is different.

Backend:
http://localhost:3001

Health:
http://localhost:3001/api/health

### 2. Ollama

Verify:

```cmd
ollama list
```

Verify API:

```cmd
curl http://127.0.0.1:11434/api/tags
```

The `.env` defaults to:

```text
OLLAMA_URL=http://127.0.0.1:11434
OLLAMA_MODEL=qwen2.5:3b
```

### 3. Frontend

```cmd
cd C:\Users\SaiDheerAdabala\AI_Project\frontend
npm install
npm run dev
```

Open:

http://localhost:5173

## Test prompts

```text
Create a PR for 5 laptops
Create an RFQ for 10 monitors
Approve PR PR_00709
```

This prompt should NOT start CREATE_PR:

```text
Create contract to PR
```

It should be rejected because CONTRACT_TO_PR is not registered.

## Existing Playwright project

The registry defaults to:

```text
C:\Users\SaiDheerAdabala\project_playwright_ai
```

The PR workflow defaults to:

```text
tests/PurchaseRequisition/createPR.spec.js
```

Change `backend/testRegistry.js` if your actual file paths differ.

## Existing JSON test data

This starter does not overwrite your existing test-data JSON.

It creates a separate per-execution JSON file under:

```text
backend/executions
```

That file contains the resolved prompt parameters.

For your actual framework, the recommended next step is to map these parameters into the exact JSON structure already consumed by `createPR.spec.js`, after inspecting your current `createPR.spec.js` and its JSON file.
