# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\PurchaseRequisition\createPR.spec.js >> Purchase Requisition Page >> should create a new purchase requisition
- Location: tests\PurchaseRequisition\createPR.spec.js:10:5

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Tearing down "context" exceeded the test timeout of 30000ms.
```

# Page snapshot

```yaml
- generic [ref=e2]:
  - generic [ref=e3]:
    - generic [ref=e8]:
      - generic [ref=e9]:
        - img "Prokraya" [ref=e10]
        - text: AI Agentic Procurement
      - generic [ref=e11]:
        - generic [ref=e12]:
          - heading "Transform Your Procurement with AI" [level=1] [ref=e13]
          - paragraph [ref=e14]: Experience the future of Source-to-Pay with intelligent automation and conversational AI agents.
        - generic [ref=e15]:
          - generic [ref=e16]:
            - img [ref=e18]
            - generic [ref=e21]:
              - heading "6 Specialized AI Agents" [level=3] [ref=e22]
              - paragraph [ref=e23]: Sourcing, Vendor, Contract, Invoice, Spend & Compliance agents working together
          - generic [ref=e24]:
            - img [ref=e26]
            - generic [ref=e30]:
              - heading "Agentic Workflows" [level=3] [ref=e31]
              - paragraph [ref=e32]: Configure trigger-based automation that executes procurement tasks autonomously
          - generic [ref=e33]:
            - img [ref=e35]
            - generic [ref=e37]:
              - heading "Natural Language Interface" [level=3] [ref=e38]
              - paragraph [ref=e39]: Describe what you need in plain English - AI handles the execution
          - generic [ref=e40]:
            - img [ref=e42]
            - generic [ref=e44]:
              - heading "Enterprise Ready" [level=3] [ref=e45]
              - paragraph [ref=e46]: Built for scale with compliance, security, and audit trails
      - generic [ref=e47]:
        - generic [ref=e48]:
          - paragraph [ref=e49]: "6"
          - paragraph [ref=e50]: AI Agents
        - generic [ref=e51]:
          - paragraph [ref=e52]: 35+
          - paragraph [ref=e53]: Workflow Templates
        - generic [ref=e54]:
          - paragraph [ref=e55]: 24/7
          - paragraph [ref=e56]: Autonomous Execution
    - main [ref=e58]:
      - generic [ref=e59]:
        - generic [ref=e60]:
          - heading "Sign In" [level=2] [ref=e61]
          - paragraph [ref=e62]: Sign in to QA
        - generic [ref=e63]:
          - generic [ref=e64]:
            - text: Domain Name
            - generic [ref=e65]:
              - img [ref=e66]
              - textbox "Domain Name" [disabled] [ref=e69]:
                - /placeholder: your-company
                - text: qa
              - generic [ref=e70]: .prokraya.ai
          - generic [ref=e71]:
            - generic [ref=e72]:
              - text: Email
              - generic [ref=e73]:
                - img [ref=e74]
                - textbox "Email" [ref=e77]:
                  - /placeholder: Enter your email
            - generic [ref=e78]:
              - text: Password
              - generic [ref=e79]:
                - img [ref=e80]
                - textbox "Password" [ref=e83]:
                  - /placeholder: Enter your password
                - button [ref=e84] [cursor=pointer]:
                  - img [ref=e85]
              - link "Forgot password?" [ref=e89] [cursor=pointer]:
                - /url: /forgot-password
            - button "Sign In" [ref=e90] [cursor=pointer]
          - generic [ref=e95]: Other Signin Options
          - button "Sign in With OTP" [ref=e96] [cursor=pointer]:
            - img
            - text: Sign in With OTP
          - generic [ref=e97]:
            - button "Google" [ref=e98] [cursor=pointer]:
              - img
              - text: Google
            - button "Microsoft" [ref=e99] [cursor=pointer]:
              - img
              - text: Microsoft
        - generic [ref=e101]:
          - img [ref=e103]
          - generic [ref=e107]:
            - paragraph [ref=e108]: New Supplier?
            - paragraph [ref=e109]: Register your company to become an approved supplier
            - button "Register as Supplier" [ref=e110] [cursor=pointer]:
              - text: Register as Supplier
              - img
        - generic [ref=e111]:
          - generic [ref=e112]:
            - generic [ref=e113] [cursor=pointer]: Terms & Conditions
            - generic [ref=e114]: "|"
            - generic [ref=e115] [cursor=pointer]: Privacy Policy
            - generic [ref=e116]: "|"
            - link "Security" [ref=e117] [cursor=pointer]:
              - /url: "#"
          - paragraph [ref=e118]: Copyright © 2026 Prokraya Tech Private Limited, All rights reserved.
  - region "Notifications (F8)":
    - list
```