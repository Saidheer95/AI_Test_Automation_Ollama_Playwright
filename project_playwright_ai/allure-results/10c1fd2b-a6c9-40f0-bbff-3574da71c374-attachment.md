# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\tests\signuprandom.spec.js >> Signup with random faker data
- Location: tests\tests\signuprandom.spec.js:5:1

# Error details

```
TimeoutError: locator.click: Timeout 10000ms exceeded.
Call log:
  - waiting for getByRole('option', { name: /Canada/ })

```

# Page snapshot

```yaml
- generic [ref=e2]:
  - generic [ref=e3]:
    - generic [ref=e8]:
      - generic [ref=e9]:
        - img "Prokraya" [ref=e10]
        - generic [ref=e11]: Supplier Portal
      - generic [ref=e12]:
        - generic [ref=e13]:
          - heading "Join Our Supplier Network" [level=1] [ref=e14]
          - paragraph [ref=e15]: Register to access procurement opportunities from leading enterprises.
        - generic [ref=e16]:
          - generic [ref=e17]:
            - img [ref=e19]
            - generic [ref=e23]:
              - heading "Simple Onboarding" [level=3] [ref=e24]
              - paragraph [ref=e25]: AI-guided document upload and verification process
          - generic [ref=e26]:
            - img [ref=e28]
            - generic [ref=e31]:
              - heading "Fast Approval" [level=3] [ref=e32]
              - paragraph [ref=e33]: Streamlined review workflow with real-time status updates
          - generic [ref=e34]:
            - img [ref=e36]
            - generic [ref=e39]:
              - heading "Business Opportunities" [level=3] [ref=e40]
              - paragraph [ref=e41]: Access RFQs, tenders, and purchase orders from enterprises
          - generic [ref=e42]:
            - img [ref=e44]
            - generic [ref=e47]:
              - heading "Invoice & Payment Tracking" [level=3] [ref=e48]
              - paragraph [ref=e49]: Upload invoices and track payment status in real-time
      - generic [ref=e50]:
        - generic [ref=e51]:
          - paragraph [ref=e52]: 100+
          - paragraph [ref=e53]: Categories
        - generic [ref=e54]:
          - paragraph [ref=e55]: AI
          - paragraph [ref=e56]: Powered Review
        - generic [ref=e57]:
          - paragraph [ref=e58]: 24hr
          - paragraph [ref=e59]: Fast Approval
    - generic [ref=e60]:
      - banner [ref=e61]:
        - link [ref=e63] [cursor=pointer]:
          - /url: /login
          - button [ref=e64]:
            - img
        - link "Already a member? Sign In" [ref=e65] [cursor=pointer]:
          - /url: /login
      - main [ref=e66]:
        - generic [ref=e67]:
          - heading "Sign Up" [level=1] [ref=e69]
          - generic [ref=e70]:
            - generic [ref=e71]:
              - generic [ref=e72]:
                - text: Organization Name
                - generic [ref=e73]: "*"
                - img [ref=e74]
              - generic [ref=e76]:
                - textbox "Organization Name *" [ref=e77]:
                  - /placeholder: Enter your organization name
                  - text: Wunsch Group
                - img [ref=e78]
            - generic [ref=e81]:
              - generic [ref=e82]: Contact Name *
              - textbox "Contact Name *" [ref=e83]:
                - /placeholder: Enter your full name
                - text: Brandt Runte
            - generic [ref=e84]:
              - generic [ref=e85]:
                - text: Email Id
                - generic [ref=e86]: "*"
                - img [ref=e87]
              - generic [ref=e89]:
                - img [ref=e90]
                - textbox "Email Id *" [ref=e93]:
                  - /placeholder: supplier@company.com
                  - text: Einar.Stamm64@yahoo.com
                - img [ref=e94]
            - generic [ref=e97]:
              - generic [ref=e98]:
                - generic [ref=e99]: Mobile Number *
                - generic [ref=e100]:
                  - button "Select country code" [expanded] [ref=e101] [cursor=pointer]:
                    - generic [ref=e102]: 🇺🇸
                    - generic [ref=e103]: "+1"
                    - img [ref=e104]
                  - listbox "Country codes" [ref=e106]:
                    - textbox "Search countries" [active] [ref=e108]:
                      - /placeholder: Search country...
                      - text: Canada
                    - generic [ref=e109]: No countries found
                  - textbox "50 123 4567" [ref=e110]
              - generic [ref=e111]:
                - generic [ref=e112]: Country *
                - combobox [ref=e113] [cursor=pointer]:
                  - generic: Select country
                  - img [ref=e114]
                - combobox [ref=e116]
            - generic [ref=e117]:
              - generic [ref=e118]:
                - text: Designation
                - textbox "Designation" [ref=e119]:
                  - /placeholder: e.g. Manager
              - generic [ref=e120]:
                - text: Department
                - textbox "Department" [ref=e121]:
                  - /placeholder: e.g. Sales
            - generic [ref=e122]:
              - generic [ref=e123]:
                - generic [ref=e124]:
                  - text: Password
                  - generic [ref=e125]: "*"
                  - img [ref=e126]
                - generic [ref=e128]:
                  - textbox "Password *" [ref=e129]:
                    - /placeholder: Create password
                  - button [ref=e130] [cursor=pointer]:
                    - img [ref=e131]
              - generic [ref=e134]:
                - generic [ref=e135]: Confirm Password *
                - generic [ref=e136]:
                  - textbox "Confirm Password *" [ref=e137]:
                    - /placeholder: Confirm password
                  - button [ref=e138] [cursor=pointer]:
                    - img [ref=e139]
            - generic [ref=e142]:
              - generic [ref=e143]:
                - text: Captcha
                - generic [ref=e144]:
                  - generic [ref=e145]:
                    - img [ref=e147]
                    - generic [ref=e151]: Zaqmna
                  - button [ref=e152] [cursor=pointer]:
                    - img
              - generic [ref=e153]:
                - generic [ref=e154]: Enter Captcha Value *
                - textbox "Enter captcha" [ref=e155]
            - generic [ref=e156]:
              - generic [ref=e157]:
                - checkbox "I accept Terms & Conditions" [ref=e158] [cursor=pointer]
                - checkbox
                - generic [ref=e159] [cursor=pointer]: I accept Terms & Conditions
              - button "Sign Up" [ref=e160] [cursor=pointer]
      - contentinfo [ref=e161]: Copyright © 2026 Prokraya Tech Private Limited. All rights reserved.
  - region "Notifications (F8)":
    - list
```

# Test source

```ts
  1  | exports.signUpRandom =
  2  | class signUpRandom {
  3  |     constructor(page) {
  4  |         this.page = page;
  5  |         this.url = 'https://qa.prokraya.ai/register';
  6  |         this.organizationNameInput = 'input-company-name';
  7  |         this.contactNameInput      = 'input-contact-name';
  8  |         this.emailInput            = 'input-email';
  9  |         this.mobileNumbercountry   = 'input-phone-country';
  10 |         this.mobileNumberInput     = 'input-phone';
  11 |         this.countryInput          = 'select-country';
  12 |         this.designationInput      = 'input-designation';
  13 |         this.departmentInput       = 'input-department';
  14 |         this.passwordInput         = 'input-password';
  15 |         this.confirmPasswordInput  = 'input-confirm-password';
  16 |         this.refreshCaptchaButton  = 'button-refresh-captcha';
  17 |         this.captchaInput          = 'input-captcha';
  18 |         this.termsCheckbox         = 'checkbox-terms';
  19 |         this.signupButton          = 'button-signup';
  20 |     }
  21 |     async goto() {
  22 |         await this.page.goto(this.url);
  23 |     }
  24 | 
  25 |     async signup(organizationName, contactName, emailId, mobileCountry, mobileNumber, country, designation, department, password, confirmPassword) {
  26 |         await this.page.getByTestId(this.organizationNameInput).fill(organizationName);
  27 |         await this.page.getByTestId(this.contactNameInput).fill(contactName);
  28 |         await this.page.getByTestId(this.emailInput).fill(emailId);
  29 | 
  30 |         // Mobile country dropdown
  31 |         await this.page.getByTestId(this.mobileNumbercountry).click();
  32 |         await this.page.getByPlaceholder('Search country...').fill(mobileCountry);
> 33 |         await this.page.getByRole('option', { name: new RegExp(mobileCountry) }).click();
     |                                                                                  ^ TimeoutError: locator.click: Timeout 10000ms exceeded.
  34 | 
  35 |         await this.page.getByTestId(this.mobileNumberInput).fill(mobileNumber);
  36 | 
  37 |         // Country dropdown
  38 |         await this.page.getByTestId(this.countryInput).click();
  39 |         await this.page.waitForSelector('[role="option"]', { state: 'visible' });
  40 |         await this.page.getByRole('option', { name: new RegExp(country) }).click();
  41 | 
  42 |         await this.page.getByTestId(this.designationInput).fill(designation);
  43 |         await this.page.getByTestId(this.departmentInput).fill(department);
  44 |         await this.page.getByTestId(this.passwordInput).fill(password);
  45 |         await this.page.getByTestId(this.confirmPasswordInput).fill(confirmPassword);
  46 |         await this.page.waitForTimeout(10000);
  47 |         await this.page.getByTestId(this.termsCheckbox).check();
  48 |         await this.page.getByTestId(this.signupButton).click();
  49 |     }
  50 | }
```