# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\tests\vendor.spec.js >> Vendor Registration - End to End
- Location: tests\tests\vendor.spec.js:5:1

# Error details

```
TimeoutError: locator.fill: Timeout 10000ms exceeded.
Call log:
  - waiting for getByTestId('input-address-1')

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

# Test source

```ts
  17  |             this.city ='input-city';
  18  |             this.state ='input-state';
  19  |             this.countryInput ='select-country';
  20  |             this.zipCode ='input-postalcode';
  21  |             this.website ='input-website';
  22  |             this.legalEntity ='select-legal-entity';
  23  |             this.PAN ='input-pan';
  24  |             this.IncorporationDate ='input-incorporation-date';
  25  |             this.LicenseNumber ='input-license-number';
  26  |             this.licenseExpiryDate ='input-license-expiry';
  27  |             this.licenceplaceofissue ='input-place-of-issue';
  28  |             this.workWeekFrom ='select-workweek-from';
  29  |             this.workWeekTo ='select-workweek-to';
  30  |             this.AnnualTurnover ='input-annual-turnover';
  31  |             this.TurnoverCurrency ='select-turnover-currency';
  32  |             this.opentime ='select-open-time';
  33  |             this.closetime ='select-close-time';
  34  |             this.GSTRegistrationNumber ='input-tax-reg';
  35  |             this.PaymentTerms ='select-payment-terms';
  36  |             this.TIN ='input-tin';
  37  |             this.TaxEffectiveDate ='input-tax-effective-date';
  38  |             this.saveButton ='button-save-continue';
  39  | 
  40  | 
  41  |             this.contactsmodule='Contacts';
  42  |             this.addContactButton ='button-add-contact';
  43  |             this.contactName ='input-contact-name';
  44  |             this.category ='select-contact-category';
  45  |             this.Email ='input-contact-email';
  46  |             this.department ='input-contact-department';
  47  |             this.designation ='input-contact-designation';
  48  |             this.mobileCountry ='input-contact-mobile-country';
  49  |             this.mobileNumber ='input-contact-mobile';
  50  |             this.isPrimary ='select-is-primary';
  51  |             this.authorizedSignatory ='select-auth-signatory';
  52  |             this.buttonSaveContact ='button-save-contact';
  53  |             this.saveContactButton ='button-save-continue';
  54  | 
  55  |             this.scopeOfSupplyNav='nav-step-scope-of-supply';
  56  |             this.parentCategory ='select-parent-category';
  57  |             this.subCategory ='select-sub-category';
  58  |             this.categorytype ='select-category-type';
  59  |             this.buttonAddCategory ='button-add-category';
  60  |             this.serviceDescription ='input-service-description';
  61  |             this.domesticExperience ='input-domestic-experience';
  62  |             this.internationalExperience ='input-international-experience';
  63  |             this.saveScopeButton ='button-save-continue';
  64  | 
  65  |             this.banking='nav-step-banking'
  66  |             this.addBankButton ='button-add-bank';
  67  |             this.bankCountry ='select-bank-country';
  68  |             this.bankCurrency ='select-currency';  
  69  |             this.bankName ='input-bank-name';
  70  |             this.bankBranchName ='input-branch-name';
  71  |             this.SWIFTCode ='input-swift';
  72  |             this.ABARoutingNumber ='input-aba-routing';
  73  |             this.IFSCCode ='input-ifsc';
  74  |             this.bankAddress ='input-bank-address';
  75  |             this.beneficiaryName ='input-beneficiary-name'; 
  76  |             this.bankAccountNumber ='input-account-no';
  77  |             this.confirmAccountNumber ='input-confirm-account-no';
  78  |             this.bankAccountType ='select-account-type';
  79  |             this.street ='input-street';
  80  |             this.beneficiaryAddress ='input-beneficiary-address';
  81  |             this.bankCity ='input-bank-city';
  82  |             this.bankRegion ='input-bank-region';
  83  |             this.IBAN ='input-iban';
  84  |             this.bankPostalCode ='input-bank-postal';
  85  |             this.radiobuttonYes ='radio-primary-account';
  86  |             this.bankDocumentType ='select-doc-type';
  87  |             this.inputFileUpload='input[type="file"]';
  88  |             this.buttonSaveBank ='button-save-bank';
  89  |             this.saveBankButton ='button-save-continue';
  90  | 
  91  |             
  92  |             this.certificates ='nav-step-certificates';
  93  |             this.docType ='select-doc-type';
  94  |             this.expiryRequired ='checkbox-expiry-required';
  95  |             this.docExpiry ='input-doc-expiry';
  96  |             this.docRemarks ='input-doc-remarks';
  97  |             this.certificateDetailsUpload   = 'input-file-upload';
  98  |              this.saveDocumentButton ='button-save-document';
  99  |             this.saveCertificateButton ='button-save-continue';
  100 |             this.reviewProfile ='Review Profile';
  101 |             this.agreeTerms ='checkbox-agree-terms';
  102 |             this.submitRegistrationButton ='button-submit-registration';
  103 |             this.confirmSubmitButton ='button-confirm-submit';
  104 | 
  105 |         }
  106 |         async goto() {
  107 |     await this.page.goto(this.url);
  108 |   }
  109 | 
  110 |     async login(email, password) {
  111 |     await this.page.getByTestId(this.emailInput).fill(email);
  112 |     await this.page.getByTestId(this.passwordInput).fill(password);
  113 |     await this.page.getByTestId(this.loginButton).click();
  114 |   }
  115 | 
  116 |        async companyDetails(address1,address2,city,state,country,zipCode,website,legalEntity,PAN,IncorporationDate,LicenseNumber,licenseExpiryDate,licenceplaceofissue,workWeekFrom,workWeekTo,AnnualTurnover,TurnoverCurrency,opentime,closetime,GSTRegistrationNumber,PaymentTerms,TIN,TaxEffectiveDate){
> 117 |         await this.page.getByTestId(this.address1).fill(address1);
      |                                                    ^ TimeoutError: locator.fill: Timeout 10000ms exceeded.
  118 |         await this.page.getByTestId(this.address2).fill(address2);
  119 |         await this.page.getByTestId(this.city).fill(city);
  120 |         await this.page.getByTestId(this.state).fill(state);
  121 |         await this.page.getByTestId(this.countryInput).click();
  122 |         await this.page.waitForSelector('[role="option"]', { state: 'visible' });
  123 |         await this.page.getByRole('option', { name: new RegExp(country) }).click();
  124 |         await this.page.getByTestId(this.zipCode).fill(zipCode);
  125 |         await this.page.getByTestId(this.website).fill(website);
  126 |         await this.page.getByTestId(this.legalEntity).click();
  127 |         await this.page.waitForSelector('[role="option"]', { state: 'visible' });
  128 |         await this.page.getByRole('option', { name: new RegExp(legalEntity) }).click();
  129 |         await this.page.getByTestId(this.PAN).fill(PAN);
  130 |         await this.page.getByTestId(this.IncorporationDate).fill(IncorporationDate);
  131 |         await this.page.getByTestId(this.LicenseNumber).fill(LicenseNumber);
  132 |         await this.page.getByTestId(this.licenseExpiryDate).fill(licenseExpiryDate);
  133 |         await this.page.getByTestId(this.licenceplaceofissue).fill(licenceplaceofissue);
  134 |         await this.page.getByTestId(this.workWeekFrom).click();
  135 |         await this.page.waitForSelector('[role="option"]', { state: 'visible' });
  136 |         await this.page.getByRole('option', { name: new RegExp(workWeekFrom) }).click();
  137 |         await this.page.getByTestId(this.workWeekTo).click();
  138 |         await this.page.waitForSelector('[role="option"]', { state: 'visible' });
  139 |         await this.page.getByRole('option', { name: new RegExp(workWeekTo) }).click();
  140 |         await this.page.getByTestId(this.AnnualTurnover).fill(AnnualTurnover);
  141 |         await this.page.getByTestId(this.TurnoverCurrency).click();
  142 |         await this.page.waitForSelector('[role="option"]', { state: 'visible' });
  143 |         await this.page.getByRole('option', { name: new RegExp(TurnoverCurrency) }).click();
  144 |         await this.page.getByTestId(this.opentime).click();
  145 |         await this.page.waitForSelector('[role="option"]', { state: 'visible' });
  146 |         await this.page.getByRole('option', { name: new RegExp(opentime) }).click();
  147 |         await this.page.getByTestId(this.closetime).click();
  148 |         await this.page.waitForSelector('[role="option"]', { state: 'visible' });
  149 |         await this.page.getByRole('option', { name: new RegExp(closetime) }).click();
  150 |         await this.page.getByTestId(this.GSTRegistrationNumber).fill(GSTRegistrationNumber);
  151 |         await this.page.getByTestId(this.PaymentTerms).click();
  152 |         await this.page.waitForSelector('[role="option"]', { state: 'visible' });
  153 |         await this.page.getByRole('option', { name: new RegExp(PaymentTerms) }).click();
  154 |         await this.page.getByTestId(this.TIN).fill(TIN);
  155 |         await this.page.getByTestId(this.TaxEffectiveDate).fill(TaxEffectiveDate);
  156 |         await this.page.getByTestId(this.saveButton).click();
  157 |     }
  158 | 
  159 |     async contactDetails(contactName, category, Email, department, designation, mobileCountry, mobileNumber, isPrimary, authorizedSignatory) {
  160 |     await this.page.getByTestId(this.addContactButton).click();
  161 |     await this.page.getByTestId(this.contactName).fill(contactName);
  162 |     await this.page.getByTestId(this.category).click();
  163 |     await this.page.waitForSelector('[role="option"]', { state: 'visible' });
  164 |     await this.page.getByRole('option', { name: new RegExp(category) }).click();
  165 |     await this.page.getByTestId(this.Email).fill(Email);
  166 |     await this.page.getByTestId(this.department).fill(department);
  167 |     await this.page.getByTestId(this.designation).fill(designation);
  168 |     await this.page.getByTestId(this.mobileCountry).click();
  169 |     await this.page.getByPlaceholder('Search country...').fill(mobileCountry);
  170 |     await this.page.waitForSelector('[role="option"]', { state: 'visible' });
  171 |     await this.page.getByRole('option', { name: new RegExp(mobileCountry) }).click();
  172 |     await this.page.getByTestId(this.mobileNumber).fill(mobileNumber);
  173 |     await this.page.getByTestId(this.isPrimary).click();
  174 |     await this.page.waitForSelector('[role="option"]', { state: 'visible' });
  175 |     await this.page.getByRole('option', { name: isPrimary }).click();
  176 |     await this.page.getByTestId(this.authorizedSignatory).click();
  177 |     await this.page.waitForSelector('[role="option"]', { state: 'visible' });
  178 |     await this.page.getByRole('option', { name: authorizedSignatory }).click();
  179 |     await this.page.getByTestId(this.buttonSaveContact).click();
  180 |   
  181 | }
  182 |     async saveAndContinueContacts() {
  183 |      await this.page.getByTestId(this.saveContactButton).click();
  184 | }
  185 | 
  186 |         async scopeOfSupply(parentCategory,subCategory, parentCategoryType,serviceDescription,domesticExperience,internationalExperience){
  187 |             
  188 |            // await this.page.getByTestId(this.scopeOfSupplyNav).click();
  189 |             await this.page.getByTestId(this.parentCategory).click();
  190 |             await this.page.waitForSelector('[role="option"]', { state: 'visible' });
  191 |             await this.page.getByRole('option', { name: new RegExp(parentCategory) }).click();
  192 |             await this.page.getByTestId(this.subCategory).click();
  193 |             await this.page.waitForSelector('[role="option"]', { state: 'visible' });
  194 |             await this.page.getByRole('option', { name: new RegExp(subCategory) }).click();
  195 |             await this.page.getByTestId(this.categorytype).click();
  196 |             await this.page.waitForSelector('[role="option"]', { state: 'visible' });
  197 |             await this.page.getByRole('option', { name: new RegExp(parentCategoryType) }).click();
  198 |             await this.page.getByTestId(this.buttonAddCategory).click();
  199 |             await this.page.waitForTimeout(3000);
  200 |             await this.page.getByTestId(this.serviceDescription).fill(serviceDescription);
  201 |             await this.page.getByTestId(this.domesticExperience).fill(domesticExperience);
  202 |             await this.page.getByTestId(this.internationalExperience).fill(internationalExperience);
  203 |             await this.page.getByTestId(this.saveScopeButton).click();
  204 | 
  205 |         }
  206 | 
  207 |         async bankingDetails(bankDocumentType,docFilePath,bankName,bankBranchName,SWIFTCode,ABARoutingNumber,IFSCCode,bankAddress,beneficiaryName,bankAccountNumber,confirmAccountNumber,bankAccountType,street,beneficiaryAddress,bankCity,bankRegion,IBAN,bankPostalCode,bankCountry,bankCurrency){
  208 |             //await this.page.getByTestId(this.banking).click()
  209 |             await this.page.getByTestId(this.addBankButton).click();
  210 |             await this.page.getByTestId(this.bankDocumentType).click();
  211 |             await this.page.waitForSelector('[role="option"]', { state: 'visible' });
  212 |             await this.page.getByRole('option', { name: new RegExp(bankDocumentType) }).click();
  213 | 
  214 |             await this.page.locator(this.inputFileUpload).setInputFiles('tests/Files/Bank_Letter_NovaSpark 1.pdf');
  215 |             await this.page.waitForTimeout(5000);
  216 |             // await this.page.getByTestId(this.bankCountry).click();
  217 |             // await this.page.waitForSelector('[role="option"]', { state: 'visible' });
```