# AI Test Automation Platform

This repository is a demo of an AI-powered test automation flow that turns natural-language prompts into controlled Playwright executions.

The main idea is simple: a user types a business request in plain English, the backend asks a local Ollama model to resolve the intent, and only a registered workflow is allowed to run. This keeps the system safe and predictable instead of allowing arbitrary test execution.

## Demo purpose

This project demonstrates how to:

- accept natural-language prompts in a frontend
- send the prompt to a local Ollama model for intent resolution
- validate the resolved workflow against a fixed registry
- execute only approved Playwright workflows
- stream execution status and logs back to the UI

This is a proof-of-concept for AI-driven automation where the LLM chooses from a known set of workflows rather than being given unrestricted command execution.

## Architecture

Frontend -> Express API -> Ollama intent resolver -> workflow registry -> Playwright runner

The flow is intentionally constrained:

- the model only returns a registered workflow ID
- parameter validation is enforced before execution starts
- the Playwright project path is configured in the backend
- every execution is stored with logs and status updates

## Prompt design used in this project

This project uses a combination of prompt types that are all designed to keep the automation safe and structured.

### 1. Intent-based prompting

The core idea is intent resolution. The AI does not receive a free-form command to run anything. Instead, it reads the user's request and decides which business workflow the request represents.

Example prompts:

```text
Create a PR for 5 laptops
Create an RFQ for 10 monitors
Approve PR PR_00709
Create PR to bid flow
```

These are natural-language business requests that map to a workflow such as `CREATE_PR`, `CREATE_RFQ`, or `APPROVE_PR`.

The intent resolution logic is handled in:

- `backend/services/ollama.service.js`
- `backend/services/intentResolver.js`

### 2. Natural-language command prompting

The actual prompt is entered by the user in the React UI and submitted to the backend. This is the dynamic prompt that changes per execution.

The UI for this is in:

- `frontend/src/App.jsx`

The example prompts are defined there as preset buttons, and the frontend sends them to the API through:

- `POST /api/tests/prompt`

This is where the business request reaches the AI layer.

### 3. Structured-output prompting

The model is not allowed to reply with free-form text. Instead, the backend defines a strict JSON schema so the model returns only a safe, predictable response.

In `backend/services/ollama.service.js`, the model is instructed to return:

```json
{
  "workflow": "CREATE_PR",
  "parameters": {
    "item": "laptops",
    "quantity": 5
  }
}
```

The schema enforces:

- exact workflow selection
- allowed parameter names only
- no arbitrary fields
- no commands or file paths

This is what makes the system structured and safe.

### 4. Workflow-selection prompting

The system uses a fixed registry of valid workflows. The model must choose one workflow from that registry. This is defined in:

- `backend/testRegistry.js`

The available workflows are:

- `CREATE_PR`
- `CREATE_RFQ`
- `APPROVE_PR`
- `PR_TO_BID`

The AI is given those workflow names and descriptions in the system message, and the backend validates the result before running Playwright. If the request does not match a registered workflow, it is rejected.

### Prompt flow summary

1. User enters a natural-language prompt in the frontend.
2. The backend sends that prompt to Ollama with a system prompt and JSON schema.
3. The model resolves the intent and selects one valid workflow.
4. The backend checks the workflow against the registry and validates required parameters.
5. Only then does the Playwright test run.

This is the exact pattern used by this project: natural-language input -> intent detection -> workflow selection -> validated execution.

## Files used in this project

### Frontend

- `frontend/src/App.jsx`  
  React UI for entering prompts, running automation, and viewing execution results

### Backend

- `backend/server.js`  
  Starts the Express API and health endpoint

- `backend/routes/test.route.js`  
  Exposes the prompt and execution endpoints

- `backend/testRegistry.js`  
  Defines the supported workflows, their descriptions, and the target Playwright test files

- `backend/services/ollama.service.js`  
  Calls the local Ollama `/api/chat` endpoint and asks for structured JSON output

- `backend/services/intentResolver.js`  
  Validates the prompt and resolves it into a registered workflow and parameters

- `backend/services/test.runner.js`  
  Starts the matching Playwright test for the selected workflow

- `backend/services/executionStore.js`  
  Tracks queued/running/passed/failed executions and logs

- `backend/services/executionData.js`  
  Saves per-execution JSON payloads into `backend/executions`

- `backend/services/executionDataResolver.js`  
  Reads execution files to resolve context like the most recent created PR

### Runtime configuration

- `backend/.env`  
  Local configuration for Ollama and the Playwright project path

## Supported demo workflows

The registry currently includes these workflows:

- `CREATE_PR` - create a purchase requisition
- `CREATE_RFQ` - create a request for quotation
- `APPROVE_PR` - approve a purchase requisition
- `PR_TO_BID` - complete the full PR-to-bid flow

Only these IDs are recognized by the system. If a request does not match a registered workflow, it is rejected.

## Example prompts

These are valid demo prompts:

```text
Create a PR for 5 laptops
Create an RFQ for 10 monitors
Approve PR PR_00709
Create PR to bid flow
```

This prompt is intentionally rejected:

```text
Create contract to PR
```

The backend will not start a workflow because `CONTRACT_TO_PR` is not in `testRegistry.js`.

## How the demo works

1. User enters a prompt in the React frontend.
2. The frontend sends the prompt to `POST /api/tests/prompt`.
3. The backend calls Ollama with a fixed system prompt and JSON schema.
4. Ollama returns one workflow ID and a set of extracted parameters.
5. The backend validates the workflow and required input.
6. The execution is created and stored with logs.
7. The matching Playwright command is launched from the project configured in `.env`.
8. The frontend polls `GET /api/tests/execution/:id` until the execution finishes.

## Local setup

This project supports both Ollama and OpenAI as the AI provider.

### 1. Choose your AI provider

Set the provider in `backend/.env`:

```env
AI_PROVIDER=ollama
```

or:

```env
AI_PROVIDER=openai
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-4o-mini
```

### 2. Install and run Ollama (for local model option)

If you are using Ollama, make sure it is installed and the model is available.

```bash
ollama list
ollama pull qwen3:8b
```

If needed, start the local Ollama service:

```bash
ollama serve
```

### 3. Configure backend

```bash
cd backend
npm install
```

Update `backend/.env` if your Playwright project path is different.

Example config for Ollama:

```env
AI_PROVIDER=ollama
OLLAMA_URL=http://127.0.0.1:11434
OLLAMA_MODEL=qwen3:8b
PLAYWRIGHT_PROJECT=D:\ai_project\project_playwright_ai
```

Example config for OpenAI:

```env
AI_PROVIDER=openai
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-4o-mini
PLAYWRIGHT_PROJECT=D:\ai_project\project_playwright_ai
```

Start the backend:

```bash
npm start
```

API health check:

```text
http://localhost:3001/api/health
```

### 4. Start the frontend

```bash
cd frontend
npm install
npm run dev
```

Open the app in the browser:

```text
http://localhost:5173
```

## Important implementation note

This demo does not allow unrestricted shell execution. The model is not permitted to invent commands or select arbitrary files. It resolves only against the known workflow registry in `backend/testRegistry.js`.

The runner starts Playwright by using the configured workflow file and passes execution data through the environment variable `TEST_EXECUTION_DATA`.

## Output artifacts

Each execution creates a JSON file under:

```text
backend/executions
```

These files capture:

- workflow name
- test ID
- resolved parameters
- timestamp
- execution result

This makes it easy to inspect the exact data that was sent to the Playwright layer for each test run.

When the Playwright project has the Allure Playwright reporter configured, the backend directs its results to a unique folder under `backend/reports` and generates an HTML report when the test completes. The report is displayed in the execution panel and can also be opened separately.

Install and configure the Allure packages in the Playwright project referenced by `PLAYWRIGHT_PROJECT`:

```bash
npm install --save-dev allure-playwright allure-commandline
```

Add the reporter to that project's `playwright.config.js` (keep any existing reporters as needed):

```js
reporter: [
  ['list'],
  ['allure-playwright']
]
```

The backend preserves the reporter configuration from the Playwright project and sets `ALLURE_RESULTS_DIR` for each run. Allure report generation requires the Allure CLI and Java to be available in that project's environment.

## Summary

This repository is a working demo for safe, local AI orchestration of Playwright test automation. It is designed to show that natural-language prompts can be translated into controlled, validated business workflows without exposing the system to unrestricted automation or command execution.
