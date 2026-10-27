const OLLAMA_URL =
    process.env.OLLAMA_URL ||
    'http://127.0.0.1:11434';

const OLLAMA_MODEL =
    process.env.OLLAMA_MODEL ||
    'qwen3:8b';

const AI_PROVIDER =
    (process.env.AI_PROVIDER || 'ollama')
        .toLowerCase();

const OPENAI_API_KEY =
    process.env.OPENAI_API_KEY;

const OPENAI_MODEL =
    process.env.OPENAI_MODEL ||
    'gpt-4o-mini';

const OPENAI_URL =
    process.env.OPENAI_URL ||
    'https://api.openai.com/v1/chat/completions';

function getWorkflowContext(testRegistry) {
    const workflowIds = Object.keys(testRegistry);

    const workflowDescriptions = workflowIds
        .map(workflowId => {
            const workflow = testRegistry[workflowId];

            return [
                `ID: ${workflowId}`,
                `Name: ${workflow.name}`,
                `Description: ${workflow.description || workflow.name}`
            ].join('\n');
        })
        .join('\n\n');

    const schema = {
        type: 'object',
        properties: {
            workflow: {
                type: 'string',
                enum: [
                    ...workflowIds,
                    'UNKNOWN'
                ]
            },

            parameters: {
                type: 'object',
                properties: {
                    item: {
                        type: 'string'
                    },

                    quantity: {
                        type: 'integer'
                    },

                    prNumber: {
                        type: 'string'
                    },

                    supplier: {
                        type: 'string'
                    }
                },
                additionalProperties: false
            }
        },

        required: [
            'workflow',
            'parameters'
        ],

        additionalProperties: false
    };

    const systemPrompt = `
You are an intent resolver for a Playwright test automation platform.

Your job is to understand the user's COMPLETE request and select exactly
ONE workflow from the available workflows.

AVAILABLE WORKFLOWS:

${workflowDescriptions}

IMPORTANT RULES:

1. Understand the complete business intent, not individual keywords.

2. Match the user's complete request against the workflow name
   and workflow description.

3. Do not select a workflow merely because it represents one
   step inside a larger requested business flow.

4. If the user requests an end-to-end, complete, or multi-step
   business process, select the workflow that represents that
   complete process.

5. For example:

   User:
   "create a PR"

   This means the user wants only the PR creation operation.

6. For example:

   User:
   "create PR to bid flow"

   This means the user wants the complete process from PR creation
   through the bidding process.

   Do NOT select a workflow that only creates the PR if an available
   workflow represents the complete PR-to-Bid process.

7. Use ONLY the workflow IDs provided in AVAILABLE WORKFLOWS.

8. Never invent a workflow ID.

9. If no available workflow matches the user's complete intent,
   return UNKNOWN.

10. Extract parameters only when the user explicitly provides them.

11. Possible parameters include:
    - item
    - quantity
    - prNumber
    - supplier

12. Do not invent parameter values.

13. Do not return Playwright file paths.

14. Do not return shell commands.

15. Return only the JSON structure requested by the schema.
`;

    return {
        workflowIds,
        workflowDescriptions,
        schema,
        systemPrompt
    };
}

function parseJsonResponse(content) {
    if (!content) {
        throw new Error(
            'Model returned an empty response'
        );
    }

    try {
        return JSON.parse(content);
    } catch (error) {
        throw new Error(
            'Model returned invalid JSON'
        );
    }
}


async function resolveWithOpenAI(prompt, testRegistry) {

    console.log('');
    console.log('========== OPENAI RESOLUTION ==========');

    const {
        schema,
        systemPrompt
    } = getWorkflowContext(testRegistry);


    // --------------------------------------------------------
    // Validate API key
    // --------------------------------------------------------

    if (!OPENAI_API_KEY) {

        console.error(
            '[OpenAI] OPENAI_API_KEY is missing'
        );

        throw new Error(
            'OPENAI_API_KEY is required when AI_PROVIDER=openai'
        );
    }


    // --------------------------------------------------------
    // Debug information
    // --------------------------------------------------------

    console.log(
        '[OpenAI] Prompt:',
        prompt
    );

    console.log(
        '[OpenAI] Model:',
        OPENAI_MODEL
    );

    console.log(
        '[OpenAI] URL:',
        OPENAI_URL
    );

    console.log(
        '[OpenAI] API Key:',
        `${OPENAI_API_KEY.substring(0, 7)}...`
    );

    console.log(
        '[OpenAI] Available workflows:',
        Object.keys(testRegistry)
    );


    // --------------------------------------------------------
    // Send request
    // --------------------------------------------------------

    console.log(
        '[OpenAI] Sending request...'
    );


    const response = await fetch(
        OPENAI_URL,
        {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json',

                'Authorization':
                    `Bearer ${OPENAI_API_KEY}`
            },

            body: JSON.stringify({

                model: OPENAI_MODEL,

                temperature: 0,

                response_format: {
                    type: 'json_object'
                },

                messages: [

                    {
                        role: 'system',
                        content: systemPrompt
                    },

                    {
                        role: 'user',
                        content: prompt
                    }

                ]
            })
        }
    );


    // --------------------------------------------------------
    // HTTP error handling
    // --------------------------------------------------------

    console.log(
        '[OpenAI] HTTP status:',
        response.status
    );


    if (!response.ok) {

        const errorText =
            await response.text();

        console.error(
            '[OpenAI] API error:',
            errorText
        );

        throw new Error(
            `OpenAI HTTP ${response.status}: ${errorText}`
        );
    }


    // --------------------------------------------------------
    // Read response
    // --------------------------------------------------------

    const data =
        await response.json();


    console.log(
        '[OpenAI] Response received'
    );


    const raw =
        data.choices?.[0]?.message?.content;


    console.log(
        '[OpenAI] Raw model response:',
        raw
    );


    if (!raw) {

        throw new Error(
            'OpenAI returned an empty response'
        );
    }


    // --------------------------------------------------------
    // Parse JSON
    // --------------------------------------------------------

    let result;

    try {

        result =
            JSON.parse(raw);

    } catch (error) {

        console.error(
            '[OpenAI] Invalid JSON:',
            raw
        );

        throw new Error(
            'OpenAI returned invalid JSON'
        );
    }


    console.log(
        '[OpenAI] Parsed result:',
        JSON.stringify(result, null, 2)
    );


    // --------------------------------------------------------
    // IMPORTANT:
    // Support workflowId returned by OpenAI
    // --------------------------------------------------------

    const workflow =
        result.workflow ||
        result.workflowId;


    console.log(
        '[OpenAI] Resolved workflow:',
        workflow
    );


    // --------------------------------------------------------
    // Validate workflow
    // --------------------------------------------------------

    const workflowIds =
        Object.keys(testRegistry);


    if (!workflow) {

        console.warn(
            '[OpenAI] No workflow returned'
        );

        return {
            workflow: 'UNKNOWN',
            parameters: {}
        };
    }


    if (
        !workflowIds.includes(workflow)
    ) {

        console.error(
            '[OpenAI] Unsupported workflow:',
            workflow
        );

        console.error(
            '[OpenAI] Supported workflows:',
            workflowIds
        );

        return {
            workflow: 'UNKNOWN',
            parameters: {}
        };
    }


    // --------------------------------------------------------
    // Parameters
    // --------------------------------------------------------

    const parameters =
        result.parameters || {};


    // --------------------------------------------------------
    // Final normalized result
    // --------------------------------------------------------

    const finalResult = {
        workflow,
        parameters
    };


    console.log(
        '[OpenAI] FINAL RESULT:',
        JSON.stringify(
            finalResult,
            null,
            2
        )
    );


    console.log(
        '======================================'
    );


    return finalResult;
}





async function resolveWithOllama(prompt, testRegistry) {
    const { schema, systemPrompt } = getWorkflowContext(testRegistry);

    const response = await fetch(
        `${OLLAMA_URL}/api/chat`,
        {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                model: OLLAMA_MODEL,

                stream: false,

                format: schema,

                options: {
                    temperature: 0
                },

                messages: [
                    {
                        role: 'system',
                        content: systemPrompt
                    },

                    {
                        role: 'user',
                        content: prompt
                    }
                ]
            })
        }
    );

    if (!response.ok) {
        const errorText = await response.text();

        throw new Error(
            `Ollama HTTP ${response.status}: ${errorText}`
        );
    }

    const data = await response.json();

    if (
        !data.message ||
        !data.message.content
    ) {
        throw new Error(
            'Ollama returned an empty response'
        );
    }

    return parseJsonResponse(data.message.content);
}

async function resolveWithAI(prompt, testRegistry) {
    if (AI_PROVIDER === 'openai') {
        return resolveWithOpenAI(prompt, testRegistry);
    }

    if (AI_PROVIDER === 'ollama') {
        return resolveWithOllama(prompt, testRegistry);
    }

    throw new Error(
        `Unsupported AI provider: ${AI_PROVIDER}. Use 'ollama' or 'openai'.`
    );
}

module.exports = {
    resolveWithAI,
    resolveWithOllama,
    resolveWithOpenAI
};


