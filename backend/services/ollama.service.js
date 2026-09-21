// const OLLAMA_URL =
//     process.env.OLLAMA_URL || 'http://127.0.0.1:11434';

// const OLLAMA_MODEL =
//     process.env.OLLAMA_MODEL || 'qwen2.5:3b';

// async function resolveWithOllama(prompt, workflows) {
//     const schema = {
//         type: 'object',
//         properties: {
//             workflow: {
//                 type: 'string',
//                 enum: [...workflows, 'UNKNOWN']
//             },
//             parameters: {
//                 type: 'object',
//                 properties: {
//                     item: { type: 'string' },
//                     quantity: { type: 'integer' },
//                     prNumber: { type: 'string' },
//                     supplier: { type: 'string' }
//                 },
//                 additionalProperties: false
//             }
//         },
//         required: ['workflow', 'parameters'],
//         additionalProperties: false
//     };

//     const systemPrompt = `
// You are an intent resolver for a Playwright test automation platform.

// Available workflows:
// ${workflows.join('\n')}

// Rules:
// - Understand the complete user intent, not individual keywords.
// - "Create a PR" is CREATE_PR.
// - "Create a purchase requisition" is CREATE_PR.
// - "Create an RFQ" is CREATE_RFQ.
// - "Approve PR PR_001" is APPROVE_PR.
// - "Create contract to PR" is NOT CREATE_PR.
// - If the requested operation is not represented by an available workflow, return UNKNOWN.
// - Never invent a workflow.
// - Never return a Playwright file path.
// - Never return shell commands.
// - Extract useful parameters such as item, quantity, prNumber, supplier when explicitly present.
// - Return only the requested JSON structure.
// `;

//     const response = await fetch(`${OLLAMA_URL}/api/chat`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             model: OLLAMA_MODEL,
//             stream: false,
//             format: schema,
//             options: {
//                 temperature: 0
//             },
//             messages: [
//                 {
//                     role: 'system',
//                     content: systemPrompt
//                 },
//                 {
//                     role: 'user',
//                     content: prompt
//                 }
//             ]
//         })
//     });

//     if (!response.ok) {
//         throw new Error(`Ollama HTTP ${response.status}`);
//     }

//     const data = await response.json();

//     if (!data.message || !data.message.content) {
//         throw new Error('Ollama returned an empty response');
//     }

//     try {
//         return JSON.parse(data.message.content);
//     } catch {
//         throw new Error('Ollama returned invalid JSON');
//     }
// }

// module.exports = {
//     resolveWithOllama
// };


const OLLAMA_URL =
    process.env.OLLAMA_URL ||
    'http://127.0.0.1:11434';

const OLLAMA_MODEL =
    process.env.OLLAMA_MODEL ||
    'qwen3.5:8b';

async function resolveWithOllama(prompt, testRegistry) {
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

    try {
        const result =
            JSON.parse(data.message.content);

        return result;
    } catch (error) {
        throw new Error(
            'Ollama returned invalid JSON'
        );
    }
}

module.exports = {
    resolveWithOllama
};
