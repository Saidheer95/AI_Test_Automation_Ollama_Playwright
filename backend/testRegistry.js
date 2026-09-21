const PLAYWRIGHT_PROJECT =
    process.env.PLAYWRIGHT_PROJECT ||
    'D:\\ai_project\\project_playwright_ai';

const testRegistry = {
    CREATE_PR: {
        testId: 'createPR',
        name: 'Create Purchase Requisition',
        description:
            'Creates a purchase requisition (PR) only.',
        file: 'tests/PurchaseRequisition/createPR.spec.js',
        requiredParameters: []
    },

    CREATE_RFQ: {
        testId: 'createRFQ',
        name: 'Create RFQ',
        description:
            'Creates a request for quotation (RFQ).',
        file: 'tests/RFQ/createRFQ.spec.js',
        requiredParameters: []
    },

    APPROVE_PR: {
        testId: 'approval',
        name: 'Approve Purchase Requisition',
        description:
            'Approves an existing purchase requisition.',
        file: 'tests/ApprovalFlow/approval.spec.js',
        requiredParameters: []
    },

    PR_TO_BID: {
        testId: 'EndtoEndFlow',
        name: 'PR to Bid',
        description:
            'Complete end-to-end business flow starting from purchase requisition creation and continuing through the bidding process.',
        file: 'tests/EndtoEndFlow/PR-Bid.spec.js',
        requiredParameters: []
    }
};

module.exports = {
    testRegistry,
    PLAYWRIGHT_PROJECT
};
