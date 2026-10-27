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
  - waiting for getByRole('option', { name: /USA/ })

```

# Page snapshot

```yaml
- generic:
  - generic:
    - generic:
      - generic:
        - generic:
          - generic:
            - img
            - generic: Supplier Portal
          - generic:
            - generic:
              - heading [level=1]: Join Our Supplier Network
              - paragraph: Register to access procurement opportunities from leading enterprises.
            - generic:
              - generic:
                - generic:
                  - img
                - generic:
                  - heading [level=3]: Simple Onboarding
                  - paragraph: AI-guided document upload and verification process
              - generic:
                - generic:
                  - img
                - generic:
                  - heading [level=3]: Fast Approval
                  - paragraph: Streamlined review workflow with real-time status updates
              - generic:
                - generic:
                  - img
                - generic:
                  - heading [level=3]: Business Opportunities
                  - paragraph: Access RFQs, tenders, and purchase orders from enterprises
              - generic:
                - generic:
                  - img
                - generic:
                  - heading [level=3]: Invoice & Payment Tracking
                  - paragraph: Upload invoices and track payment status in real-time
          - generic:
            - generic:
              - paragraph: 100+
              - paragraph: Categories
            - generic:
              - paragraph: AI
              - paragraph: Powered Review
            - generic:
              - paragraph: 24hr
              - paragraph: Fast Approval
      - generic:
        - banner:
          - generic:
            - link:
              - /url: /login
              - button:
                - img
          - link:
            - /url: /login
            - text: Already a member? Sign In
        - main:
          - generic:
            - generic:
              - heading [level=1]: Sign Up
            - generic:
              - generic:
                - generic:
                  - text: Organization Name
                  - generic: "*"
                  - img
                - generic:
                  - textbox:
                    - /placeholder: Enter your organization name
                    - text: Cole - Stroman
                  - img
              - generic:
                - generic: Contact Name *
                - textbox:
                  - /placeholder: Enter your full name
                  - text: Juana Schoen
              - generic:
                - generic:
                  - text: Email Id
                  - generic: "*"
                  - img
                - generic:
                  - img
                  - textbox:
                    - /placeholder: supplier@company.com
                    - text: Montana.Dickinson@yahoo.com
                  - img
              - generic:
                - generic:
                  - generic: Mobile Number *
                  - generic:
                    - button:
                      - generic: 🇦🇪
                      - generic: "+971"
                      - img
                    - textbox:
                      - /placeholder: 50 123 4567
                      - text: "374878503"
                  - paragraph:
                    - img
                    - text: Verified
                - generic:
                  - generic: Country *
                  - combobox [expanded]:
                    - generic: Select country
                    - img
                  - combobox
              - generic:
                - generic:
                  - text: Designation
                  - textbox:
                    - /placeholder: e.g. Manager
                - generic:
                  - text: Department
                  - textbox:
                    - /placeholder: e.g. Sales
              - generic:
                - generic:
                  - generic:
                    - text: Password
                    - generic: "*"
                    - img
                  - generic:
                    - textbox:
                      - /placeholder: Create password
                    - button:
                      - img
                - generic:
                  - generic: Confirm Password *
                  - generic:
                    - textbox:
                      - /placeholder: Confirm password
                    - button:
                      - img
              - generic:
                - generic:
                  - text: Captcha
                  - generic:
                    - generic:
                      - generic:
                        - img
                      - generic: PPMkS4
                    - button:
                      - img
                - generic:
                  - generic: Enter Captcha Value *
                  - textbox:
                    - /placeholder: Enter captcha
              - generic:
                - generic:
                  - checkbox
                  - checkbox
                  - generic: I accept Terms & Conditions
                - button: Sign Up
        - contentinfo: Copyright © 2026 Prokraya Tech Private Limited. All rights reserved.
    - list
  - listbox [ref=e1]:
    - option "Afghanistan" [active] [ref=e2]:
      - generic [ref=e4]: Afghanistan
    - option "Albania" [ref=e5]:
      - generic [ref=e7]: Albania
    - option "Algeria" [ref=e8]:
      - generic [ref=e10]: Algeria
    - option "Andorra" [ref=e11]:
      - generic [ref=e13]: Andorra
    - option "Angola" [ref=e14]:
      - generic [ref=e16]: Angola
    - option "Antigua and Barbuda" [ref=e17]:
      - generic [ref=e19]: Antigua and Barbuda
    - option "Argentina" [ref=e20]:
      - generic [ref=e22]: Argentina
    - option "Armenia" [ref=e23]:
      - generic [ref=e25]: Armenia
    - option "Australia" [ref=e26]:
      - generic [ref=e28]: Australia
    - option "Austria" [ref=e29]:
      - generic [ref=e31]: Austria
    - option "Azerbaijan" [ref=e32]:
      - generic [ref=e34]: Azerbaijan
    - option "Bahamas" [ref=e35]:
      - generic [ref=e37]: Bahamas
    - option "Bahrain" [ref=e38]:
      - generic [ref=e40]: Bahrain
    - option "Bangladesh" [ref=e41]:
      - generic [ref=e43]: Bangladesh
    - option "Barbados" [ref=e44]:
      - generic [ref=e46]: Barbados
    - option "Belarus" [ref=e47]:
      - generic [ref=e49]: Belarus
    - option "Belgium" [ref=e50]:
      - generic [ref=e52]: Belgium
    - option "Belize" [ref=e53]:
      - generic [ref=e55]: Belize
    - option "Benin" [ref=e56]:
      - generic [ref=e58]: Benin
    - option "Bhutan" [ref=e59]:
      - generic [ref=e61]: Bhutan
    - option "Bolivia" [ref=e62]:
      - generic [ref=e64]: Bolivia
    - option "Bosnia and Herzegovina" [ref=e65]:
      - generic [ref=e67]: Bosnia and Herzegovina
    - option "Botswana" [ref=e68]:
      - generic [ref=e70]: Botswana
    - option "Brazil" [ref=e71]:
      - generic [ref=e73]: Brazil
    - option "Brunei" [ref=e74]:
      - generic [ref=e76]: Brunei
    - option "Bulgaria" [ref=e77]:
      - generic [ref=e79]: Bulgaria
    - option "Burkina Faso" [ref=e80]:
      - generic [ref=e82]: Burkina Faso
    - option "Burundi" [ref=e83]:
      - generic [ref=e85]: Burundi
    - option "Cabo Verde" [ref=e86]:
      - generic [ref=e88]: Cabo Verde
    - option "Cambodia" [ref=e89]:
      - generic [ref=e91]: Cambodia
    - option "Cameroon" [ref=e92]:
      - generic [ref=e94]: Cameroon
    - option "Canada" [ref=e95]:
      - generic [ref=e97]: Canada
    - option "Central African Republic" [ref=e98]:
      - generic [ref=e100]: Central African Republic
    - option "Chad" [ref=e101]:
      - generic [ref=e103]: Chad
    - option "Chile" [ref=e104]:
      - generic [ref=e106]: Chile
    - option "China" [ref=e107]:
      - generic [ref=e109]: China
    - option "Colombia" [ref=e110]:
      - generic [ref=e112]: Colombia
    - option "Comoros" [ref=e113]:
      - generic [ref=e115]: Comoros
    - option "Congo" [ref=e116]:
      - generic [ref=e118]: Congo
    - option "Costa Rica" [ref=e119]:
      - generic [ref=e121]: Costa Rica
    - option "Croatia" [ref=e122]:
      - generic [ref=e124]: Croatia
    - option "Cuba" [ref=e125]:
      - generic [ref=e127]: Cuba
    - option "Cyprus" [ref=e128]:
      - generic [ref=e130]: Cyprus
    - option "Czech Republic" [ref=e131]:
      - generic [ref=e133]: Czech Republic
    - option "Denmark" [ref=e134]:
      - generic [ref=e136]: Denmark
    - option "Djibouti" [ref=e137]:
      - generic [ref=e139]: Djibouti
    - option "Dominica" [ref=e140]:
      - generic [ref=e142]: Dominica
    - option "Dominican Republic" [ref=e143]:
      - generic [ref=e145]: Dominican Republic
    - option "Ecuador" [ref=e146]:
      - generic [ref=e148]: Ecuador
    - option "Egypt" [ref=e149]:
      - generic [ref=e151]: Egypt
    - option "El Salvador" [ref=e152]:
      - generic [ref=e154]: El Salvador
    - option "Equatorial Guinea" [ref=e155]:
      - generic [ref=e157]: Equatorial Guinea
    - option "Eritrea" [ref=e158]:
      - generic [ref=e160]: Eritrea
    - option "Estonia" [ref=e161]:
      - generic [ref=e163]: Estonia
    - option "Eswatini" [ref=e164]:
      - generic [ref=e166]: Eswatini
    - option "Ethiopia" [ref=e167]:
      - generic [ref=e169]: Ethiopia
    - option "Fiji" [ref=e170]:
      - generic [ref=e172]: Fiji
    - option "Finland" [ref=e173]:
      - generic [ref=e175]: Finland
    - option "France" [ref=e176]:
      - generic [ref=e178]: France
    - option "Gabon" [ref=e179]:
      - generic [ref=e181]: Gabon
    - option "Gambia" [ref=e182]:
      - generic [ref=e184]: Gambia
    - option "Georgia" [ref=e185]:
      - generic [ref=e187]: Georgia
    - option "Germany" [ref=e188]:
      - generic [ref=e190]: Germany
    - option "Ghana" [ref=e191]:
      - generic [ref=e193]: Ghana
    - option "Greece" [ref=e194]:
      - generic [ref=e196]: Greece
    - option "Grenada" [ref=e197]:
      - generic [ref=e199]: Grenada
    - option "Guatemala" [ref=e200]:
      - generic [ref=e202]: Guatemala
    - option "Guinea" [ref=e203]:
      - generic [ref=e205]: Guinea
    - option "Guinea-Bissau" [ref=e206]:
      - generic [ref=e208]: Guinea-Bissau
    - option "Guyana" [ref=e209]:
      - generic [ref=e211]: Guyana
    - option "Haiti" [ref=e212]:
      - generic [ref=e214]: Haiti
    - option "Honduras" [ref=e215]:
      - generic [ref=e217]: Honduras
    - option "Hungary" [ref=e218]:
      - generic [ref=e220]: Hungary
    - option "Iceland" [ref=e221]:
      - generic [ref=e223]: Iceland
    - option "India" [ref=e224]:
      - generic [ref=e226]: India
    - option "Indonesia" [ref=e227]:
      - generic [ref=e229]: Indonesia
    - option "Iran" [ref=e230]:
      - generic [ref=e232]: Iran
    - option "Iraq" [ref=e233]:
      - generic [ref=e235]: Iraq
    - option "Ireland" [ref=e236]:
      - generic [ref=e238]: Ireland
    - option "Israel" [ref=e239]:
      - generic [ref=e241]: Israel
    - option "Italy" [ref=e242]:
      - generic [ref=e244]: Italy
    - option "Jamaica" [ref=e245]:
      - generic [ref=e247]: Jamaica
    - option "Japan" [ref=e248]:
      - generic [ref=e250]: Japan
    - option "Jordan" [ref=e251]:
      - generic [ref=e253]: Jordan
    - option "Kazakhstan" [ref=e254]:
      - generic [ref=e256]: Kazakhstan
    - option "Kenya" [ref=e257]:
      - generic [ref=e259]: Kenya
    - option "Kiribati" [ref=e260]:
      - generic [ref=e262]: Kiribati
    - option "Kosovo" [ref=e263]:
      - generic [ref=e265]: Kosovo
    - option "Kuwait" [ref=e266]:
      - generic [ref=e268]: Kuwait
    - option "Kyrgyzstan" [ref=e269]:
      - generic [ref=e271]: Kyrgyzstan
    - option "Laos" [ref=e272]:
      - generic [ref=e274]: Laos
    - option "Latvia" [ref=e275]:
      - generic [ref=e277]: Latvia
    - option "Lebanon" [ref=e278]:
      - generic [ref=e280]: Lebanon
    - option "Lesotho" [ref=e281]:
      - generic [ref=e283]: Lesotho
    - option "Liberia" [ref=e284]:
      - generic [ref=e286]: Liberia
    - option "Libya" [ref=e287]:
      - generic [ref=e289]: Libya
    - option "Liechtenstein" [ref=e290]:
      - generic [ref=e292]: Liechtenstein
    - option "Lithuania" [ref=e293]:
      - generic [ref=e295]: Lithuania
    - option "Luxembourg" [ref=e296]:
      - generic [ref=e298]: Luxembourg
    - option "Madagascar" [ref=e299]:
      - generic [ref=e301]: Madagascar
    - option "Malawi" [ref=e302]:
      - generic [ref=e304]: Malawi
    - option "Malaysia" [ref=e305]:
      - generic [ref=e307]: Malaysia
    - option "Maldives" [ref=e308]:
      - generic [ref=e310]: Maldives
    - option "Mali" [ref=e311]:
      - generic [ref=e313]: Mali
    - option "Malta" [ref=e314]:
      - generic [ref=e316]: Malta
    - option "Marshall Islands" [ref=e317]:
      - generic [ref=e319]: Marshall Islands
    - option "Mauritania" [ref=e320]:
      - generic [ref=e322]: Mauritania
    - option "Mauritius" [ref=e323]:
      - generic [ref=e325]: Mauritius
    - option "Mexico" [ref=e326]:
      - generic [ref=e328]: Mexico
    - option "Micronesia" [ref=e329]:
      - generic [ref=e331]: Micronesia
    - option "Moldova" [ref=e332]:
      - generic [ref=e334]: Moldova
    - option "Monaco" [ref=e335]:
      - generic [ref=e337]: Monaco
    - option "Mongolia" [ref=e338]:
      - generic [ref=e340]: Mongolia
    - option "Montenegro" [ref=e341]:
      - generic [ref=e343]: Montenegro
    - option "Morocco" [ref=e344]:
      - generic [ref=e346]: Morocco
    - option "Mozambique" [ref=e347]:
      - generic [ref=e349]: Mozambique
    - option "Myanmar" [ref=e350]:
      - generic [ref=e352]: Myanmar
    - option "Namibia" [ref=e353]:
      - generic [ref=e355]: Namibia
    - option "Nauru" [ref=e356]:
      - generic [ref=e358]: Nauru
    - option "Nepal" [ref=e359]:
      - generic [ref=e361]: Nepal
    - option "Netherlands" [ref=e362]:
      - generic [ref=e364]: Netherlands
    - option "New Zealand" [ref=e365]:
      - generic [ref=e367]: New Zealand
    - option "Nicaragua" [ref=e368]:
      - generic [ref=e370]: Nicaragua
    - option "Niger" [ref=e371]:
      - generic [ref=e373]: Niger
    - option "Nigeria" [ref=e374]:
      - generic [ref=e376]: Nigeria
    - option "North Korea" [ref=e377]:
      - generic [ref=e379]: North Korea
    - option "North Macedonia" [ref=e380]:
      - generic [ref=e382]: North Macedonia
    - option "Norway" [ref=e383]:
      - generic [ref=e385]: Norway
    - option "Oman" [ref=e386]:
      - generic [ref=e388]: Oman
    - option "Pakistan" [ref=e389]:
      - generic [ref=e391]: Pakistan
    - option "Palau" [ref=e392]:
      - generic [ref=e394]: Palau
    - option "Palestine" [ref=e395]:
      - generic [ref=e397]: Palestine
    - option "Panama" [ref=e398]:
      - generic [ref=e400]: Panama
    - option "Papua New Guinea" [ref=e401]:
      - generic [ref=e403]: Papua New Guinea
    - option "Paraguay" [ref=e404]:
      - generic [ref=e406]: Paraguay
    - option "Peru" [ref=e407]:
      - generic [ref=e409]: Peru
    - option "Philippines" [ref=e410]:
      - generic [ref=e412]: Philippines
    - option "Poland" [ref=e413]:
      - generic [ref=e415]: Poland
    - option "Portugal" [ref=e416]:
      - generic [ref=e418]: Portugal
    - option "Qatar" [ref=e419]:
      - generic [ref=e421]: Qatar
    - option "Romania" [ref=e422]:
      - generic [ref=e424]: Romania
    - option "Russia" [ref=e425]:
      - generic [ref=e427]: Russia
    - option "Rwanda" [ref=e428]:
      - generic [ref=e430]: Rwanda
    - option "Saint Kitts and Nevis" [ref=e431]:
      - generic [ref=e433]: Saint Kitts and Nevis
    - option "Saint Lucia" [ref=e434]:
      - generic [ref=e436]: Saint Lucia
    - option "Saint Vincent and the Grenadines" [ref=e437]:
      - generic [ref=e439]: Saint Vincent and the Grenadines
    - option "Samoa" [ref=e440]:
      - generic [ref=e442]: Samoa
    - option "San Marino" [ref=e443]:
      - generic [ref=e445]: San Marino
    - option "Sao Tome and Principe" [ref=e446]:
      - generic [ref=e448]: Sao Tome and Principe
    - option "Saudi Arabia" [ref=e449]:
      - generic [ref=e451]: Saudi Arabia
    - option "Senegal" [ref=e452]:
      - generic [ref=e454]: Senegal
    - option "Serbia" [ref=e455]:
      - generic [ref=e457]: Serbia
    - option "Seychelles" [ref=e458]:
      - generic [ref=e460]: Seychelles
    - option "Sierra Leone" [ref=e461]:
      - generic [ref=e463]: Sierra Leone
    - option "Singapore" [ref=e464]:
      - generic [ref=e466]: Singapore
    - option "Slovakia" [ref=e467]:
      - generic [ref=e469]: Slovakia
    - option "Slovenia" [ref=e470]:
      - generic [ref=e472]: Slovenia
    - option "Solomon Islands" [ref=e473]:
      - generic [ref=e475]: Solomon Islands
    - option "Somalia" [ref=e476]:
      - generic [ref=e478]: Somalia
    - option "South Africa" [ref=e479]:
      - generic [ref=e481]: South Africa
    - option "South Korea" [ref=e482]:
      - generic [ref=e484]: South Korea
    - option "South Sudan" [ref=e485]:
      - generic [ref=e487]: South Sudan
    - option "Spain" [ref=e488]:
      - generic [ref=e490]: Spain
    - option "Sri Lanka" [ref=e491]:
      - generic [ref=e493]: Sri Lanka
    - option "Sudan" [ref=e494]:
      - generic [ref=e496]: Sudan
    - option "Suriname" [ref=e497]:
      - generic [ref=e499]: Suriname
    - option "Sweden" [ref=e500]:
      - generic [ref=e502]: Sweden
    - option "Switzerland" [ref=e503]:
      - generic [ref=e505]: Switzerland
    - option "Syria" [ref=e506]:
      - generic [ref=e508]: Syria
    - option "Taiwan" [ref=e509]:
      - generic [ref=e511]: Taiwan
    - option "Tajikistan" [ref=e512]:
      - generic [ref=e514]: Tajikistan
    - option "Tanzania" [ref=e515]:
      - generic [ref=e517]: Tanzania
    - option "Thailand" [ref=e518]:
      - generic [ref=e520]: Thailand
    - option "Timor-Leste" [ref=e521]:
      - generic [ref=e523]: Timor-Leste
    - option "Togo" [ref=e524]:
      - generic [ref=e526]: Togo
    - option "Tonga" [ref=e527]:
      - generic [ref=e529]: Tonga
    - option "Trinidad and Tobago" [ref=e530]:
      - generic [ref=e532]: Trinidad and Tobago
    - option "Tunisia" [ref=e533]:
      - generic [ref=e535]: Tunisia
    - option "Turkey" [ref=e536]:
      - generic [ref=e538]: Turkey
    - option "Turkmenistan" [ref=e539]:
      - generic [ref=e541]: Turkmenistan
    - option "Tuvalu" [ref=e542]:
      - generic [ref=e544]: Tuvalu
    - option "Uganda" [ref=e545]:
      - generic [ref=e547]: Uganda
    - option "Ukraine" [ref=e548]:
      - generic [ref=e550]: Ukraine
    - option "United Arab Emirates" [ref=e551]:
      - generic [ref=e553]: United Arab Emirates
    - option "United Kingdom" [ref=e554]:
      - generic [ref=e556]: United Kingdom
    - option "United States" [ref=e557]:
      - generic [ref=e559]: United States
    - option "Uruguay" [ref=e560]:
      - generic [ref=e562]: Uruguay
    - option "Uzbekistan" [ref=e563]:
      - generic [ref=e565]: Uzbekistan
    - option "Vanuatu" [ref=e566]:
      - generic [ref=e568]: Vanuatu
    - option "Vatican City" [ref=e569]:
      - generic [ref=e571]: Vatican City
    - option "Venezuela" [ref=e572]:
      - generic [ref=e574]: Venezuela
    - option "Vietnam" [ref=e575]:
      - generic [ref=e577]: Vietnam
    - option "Yemen" [ref=e578]:
      - generic [ref=e580]: Yemen
    - option "Zambia" [ref=e581]:
      - generic [ref=e583]: Zambia
    - option "Zimbabwe" [ref=e584]:
      - generic [ref=e586]: Zimbabwe
    - img [ref=e588]
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
  33 |         await this.page.getByRole('option', { name: new RegExp(mobileCountry) }).click();
  34 | 
  35 |         await this.page.getByTestId(this.mobileNumberInput).fill(mobileNumber);
  36 | 
  37 |         // Country dropdown
  38 |         await this.page.getByTestId(this.countryInput).click();
  39 |         await this.page.waitForSelector('[role="option"]', { state: 'visible' });
> 40 |         await this.page.getByRole('option', { name: new RegExp(country) }).click();
     |                                                                            ^ TimeoutError: locator.click: Timeout 10000ms exceeded.
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