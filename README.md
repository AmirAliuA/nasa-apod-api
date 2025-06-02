# 🌌 NASA APOD Explorer

<p float="left" align="center">
  <img src="https://raw.githubusercontent.com/AmirAliuA/nasa-apod-api/refs/heads/master/preview-screenshots/light-theme.jpeg" width="48%" alt="Light Theme Preview" />
  <img src="https://raw.githubusercontent.com/AmirAliuA/nasa-apod-api/refs/heads/master/preview-screenshots/dark-theme.jpeg" width="48%" alt="Dark Theme Preview" />
</p>

A sleek and responsive web app for discovering NASA's **Astronomy Picture of the Day** archive — from today back to 1995.

---

## 🚀 Overview

**NASA APOD Explorer** is a Next.js-powered application that leverages the NASA APOD API to showcase a stunning gallery of daily astronomy images. Users can browse the archive, view detailed metadata for each image, and explore the universe one day at a time.

---

## ✨ Features

- 🔭 Browse NASA’s APOD archive from 1995 to the present  
- 📅 Search for specific dates or date ranges  
- 🖼️ View detailed image info: title, date, explanation, and copyright  
- 📱 Responsive layout for mobile, tablet, and desktop  
- ⚡ Fast, modern, and optimized with Next.js, Tailwind CSS, and shadcn/ui  

---

## ⚙️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (React-based, SSR + SSG support)  
- **Language:** TypeScript for type safety and maintainability  
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) for rapid UI development  
- **Component Library:** [shadcn/ui](https://ui.shadcn.com/) for accessible, customizable components  
- **API:** [NASA APOD API](https://api.nasa.gov/) for astronomy content  

---

## 🛠 Getting Started

To run the app locally:

```bash
# Clone the repo
git clone https://github.com/AmirAliuA/nasa-apod-api.git

# Navigate to the project folder
cd nasa-apod-api

# Install dependencies
npm install --force

# Run the development server
npm run dev
```

---

### 🔐 Environment Variables
Before running the app, create a .env file in the root of your project with the following contents:

```env
NASA_API_KEY=yourprivatekey  # Generate one at https://api.nasa.gov/
NASA_API_URL="https://api.nasa.gov/planetary/apod"
```
> 🚨 Do not share or commit this file publicly. Your API key is private.

---

### 🤝 Contributing
Contributions are welcome!

---

### 📄 License
This project is licensed under the [CC BY-NC 4.0 International License](https://creativecommons.org/licenses/by-nc/4.0/deed.en) .