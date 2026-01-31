# ITPM (IT3040) – Assignment 1  
## Singlish to Sinhala Automation Testing

**Student ID:** IT23177246  
**Student Name:** A.S.P.L.T Pushpakumara  

---

## 📌 Project Overview
This project implements **automation testing** for the  
**SwiftTranslator (Singlish to Sinhala)** web application using **Playwright**.

The assignment focuses on validating the following aspects through automated test execution:

- Functional correctness  
- UI behavior  
- Error handling  

---

## 📁 Project Structure
```text
IT23177246PlayWrite-ITPM-Assignment-01/
├─ .github/
├─ node_modules/
├─ playwright-report/
├─ screenshots/
├─ test-results/
├─ tests/
│  ├─ negative_function/
│  ├─ positive_function/
│  └─ ui/
├─ .gitignore
├─ package-lock.json
├─ package.json
├─ playwright.config.js
└─ README.md

▶️ How to Run the Project (VS Code & Terminal)

Open a terminal and make sure you are inside the **project root folder**.


🔹 Ensure Node.js is Installed
node -v
npm -v
If Node.js is not installed, download and install it from:
https://nodejs.org/

🔹 Install Project Dependencies
npm install

🔹 Run All Playwright Tests
npx playwright test --workers=1

🔹 View the HTML Test Report
npx playwright show-report

▶️ Run Tests Individually (Terminal Commands)

▶️ Run UI Test Cases
npx playwright test tests/ui --workers=1

▶️ Run Positive Functional Test Cases
npx playwright test tests/positive_function --workers=1

▶️ Run Negative Functional Test Cases
npx playwright test tests/negative_function --workers=1

▶️ Run a Single Functional Test File (Example)
npx playwright test tests/positive_function/pos-fun-0020.spec.js --workers=1

▶️ Run a UI Test in Headed Mode (Browser Visible)
npx playwright test tests/ui/IT23177246-Pos-UI-0001.spec.js --workers=1 --headed
