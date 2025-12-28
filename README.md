# 💕 Wedding Invitation Web App

एक सुंदर और आकर्षक वेब ऐप्लिकेशन जो Abhishek और Divya की शादी का निमंत्रण कार्ड प्रदर्शित करता है।

## ✨ Features

- 🎨 Beautiful animated landing page
- 📜 Traditional wedding invitation card design
- 📱 Fully responsive (mobile, tablet, desktop)
- 🌊 Interactive animations and effects
- 📤 Share functionality
- 🎯 Easy to host and deploy

## 🚀 Quick Start

### Installation

```bash
npm install
```

### Run Development Server

```bash
npm start
```

ऐप `http://localhost:3000` पर खुलेगा।

### Build for Production

```bash
npm run build
```

यह `build` folder में production-ready files बनाएगा।

## 🌐 Hosting Options

### Option 1: Netlify (सबसे आसान)

1. GitHub पर code push करें
2. [Netlify](https://www.netlify.com) पर जाएं
3. "New site from Git" चुनें
4. Repository connect करें
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `build`
6. Deploy करें!

### Option 2: Vercel

1. [Vercel](https://vercel.com) पर जाएं
2. "New Project" चुनें
3. GitHub repository import करें
4. Auto-detect settings use करें
5. Deploy करें!

### Option 3: GitHub Pages

1. `package.json` में add करें:
```json
"homepage": "https://yourusername.github.io/wedding-invitation"
```

2. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

3. Scripts add करें:
```json
"predeploy": "npm run build",
"deploy": "gh-pages -d build"
```

4. Deploy:
```bash
npm run deploy
```

### Option 4: Firebase Hosting

1. Firebase CLI install करें:
```bash
npm install -g firebase-tools
```

2. Login:
```bash
firebase login
```

3. Initialize:
```bash
firebase init hosting
```

4. Build और deploy:
```bash
npm run build
firebase deploy
```

## 📝 Customization

आप निम्नलिखित files में changes करके invitation को customize कर सकते हैं:

- `src/components/WeddingCard.js` - Invitation content
- `src/components/LandingPage.js` - Landing page content
- `src/components/*.css` - Styling और colors

## 🎨 Design Features

- Gradient backgrounds
- Floating particles
- Smooth animations
- Traditional Indian design elements
- Peacock and swan illustrations
- Responsive design

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 📄 License

Personal use for wedding invitation.

---

Made with ❤️ for Abhishek & Divya's special day

