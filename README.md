 ITPM (IT3040) – Assignment 1  
 Singlish to Sinhala Automation Testing
 

Student ID:IT23177246 A.S.P.L.T Pushpakumara 


 📌 Project Overview
This project implements automation testing for the SwiftTranslator (Singlish to Sinhala) web application using Playwright.

The assignment focuses on validating:
- Functional correctness
- UI behavior
- Error handling
through automated test execution.




📁 Project Structure

IT23177246PlayWrite-ITPM-Assignment-01/
├─ .github/
│
├─ node_modules/
│
├─ playwright-report/
│
├─ screenshots/
│
├─ test-results/
│
├─ tests/
│  ├─negative_function
│  ├─ positive_function
│  └─ ui
│
├─ .gitignore
├─ package-lock.json
├─ package.json
├─ playwright.config.js
└─ README.md



all file run 

npx playwright test --workers=1  :    npx playwright test tests/UI/IT23177246-Pos-UI-0001.spec.js --workers=1

Run Positive Functional Test Cases:   npx playwright test tests/Negative_Function --workers=1

Run Negative Functional Test Cases:    npx playwright test tests/Negative_Function --workers=1

UI Test Case:  npx playwright test tests/UI --workers=1

Run Single file : Example 
npx playwright test tests/Positive_Function/pos-fun-0020.spec.js --workers=1
npx playwright test tests/UI/IT23177246-Pos-UI-0001.spec.js --workers=1 --headed

