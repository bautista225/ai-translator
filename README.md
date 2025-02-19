# 🔤🤖 AI translator
![React](https://img.shields.io/badge/react-%2320232a.svg?style=flat-square&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=flat-square&logo=typescript&logoColor=white)
![Bootstrap](https://img.shields.io/badge/bootstrap-%238511FA.svg?style=flat-square&logo=bootstrap&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=flat-square&logo=vite&logoColor=white)
[![pages-build-deployment](https://github.com/bautista225/ai-translator/actions/workflows/pages/pages-build-deployment/badge.svg)](https://github.com/bautista225/ai-translator/actions/workflows/pages/pages-build-deployment)

<p align="center">
   <img alt="AI translator page" src="https://github.com/user-attachments/assets/90a3ccf0-fd62-4cce-a6f5-2b39ed565ccf" />
</p>

## 🔎 Overview

React SPA to translate text to different languages (yes, even to emojis 🌟!!).

Using Cohere AI technologies, developed with Typescript.

## 🌱 Key features
- Translation to a high range of languages:
   - English
   - French
   - German
   - Spanish
   - Portuguese
   - Italian
   - Mandarin
   - Korean
   - Japanese
   - Arabic
   - Emojis 🌟 (yes, it's actually true)
- Interchange of translations, to modify for example the target translation one.
- Speech of the translation.
- Copy of the translation to clipboard.

## 📖 Usage
- In the left side selector you can select the source language, as shown in the image bellow, or leave the Cohere AI to auto detect it. 
- In the right selector you must chose one language from the list.
- You are able to interchange language texts when the auto detect option is not selected.
- Both translation areas provide copy to clipboard and hearing the text with the speech functionality.

![Language selector](https://github.com/user-attachments/assets/d08248ca-1244-49d6-a276-b834dc97f640)

## 🖥 Installation in local
### Obtaining a Cohere API client ID
1. Log into the Cohere dashboard
2. Navigate to API Keys section
3. Create a new one, indicating a related name

### Configuration and execution
After clonning the repository, add a `.env` file with the following content:
```
VITE_COHERE_API_KEY=YOUR-COHERE-DEVELOPER-CLIENT-ID
```
In the root directory of the repo, install the NPM packages with:
```
pnpm install
```
Run an instance in localhost:5173 with:
```
pnpm run dev
```
