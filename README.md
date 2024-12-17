# Multi-Project Runner

This repository contains two Next.js projects: **Calculator** and **Timer**. The parent app allows you to select which project to run, install dependencies, and start the development server.

---

## **How to run**
- Open the project and run `npm run dev` in the parent folder
- choose the project to run
- let the magic happen

## **Features**
- Run multiple Next.js projects from a single parent app.
- Prompt-based project selection.
- Automatic dependency installation and server startup.

---

## **Project Structure**

```plaintext
root/
├── calculator/       # Next.js project: Calculator
├── timer/            # Next.js project: Timer
├── select-project.js # Script to select and run a project
└── package.json      # Parent project setup
