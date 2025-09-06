# 🎵 RaagaRangam - Interactive Carnatic Music Gaming Platform

A modern web application that teaches Carnatic music through gesture recognition and gamification. Experience the beauty of Indian classical music with innovative hand gesture controls and immersive gameplay.

![RaagaRangam Banner](https://images.pexels.com/photos/164821/pexels-photo-164821.jpeg?auto=compress&cs=tinysrgb&w=1200&h=400&fit=crop)

## ✨ Features

### 🎮 Three Game Modes
- **Traditional Mode** 🎵: Customizable finger mappings for authentic playing
- **One-Hand Virtuoso** 🤚: Master all swaras with single-hand gestures  
- **Gamaka Master** 🎭: Advanced ornamentations and expressions

### 🎼 Authentic Carnatic Music
- Complete raga database with precise swarasthanas
- Tala system with visual beat indicators
- Tanpura drone with volume control
- Octave control (Mandra/Madhya/Tara)

### 🚀 Advanced Technology
- Real-time gesture recognition using MediaPipe
- 60fps camera performance with adaptive optimization
- Authentic audio synthesis with Tone.js
- Beautiful glassmorphism UI with animations
- Multilingual support (English/Telugu/Hindi)

### 📊 Gamification
- Performance tracking and scoring
- Leaderboards and community rankings
- Daily and weekly challenges
- Achievement system
- Progress analytics

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Animations**: Framer Motion
- **Audio**: Tone.js with Web Audio API
- **Computer Vision**: MediaPipe Tasks Vision
- **State Management**: Zustand
- **UI Components**: Radix UI, Heroicons
- **Fonts**: Poppins, Noto Sans Telugu/Devanagari

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18.0 or higher)
- **npm** or **yarn** package manager
- **Git** for version control
- **Modern web browser** with camera access
- **HTTPS connection** (required for camera access)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
# Clone the repository
git clone https://github.com/yourusername/raaga-rangam.git

# Navigate to the project directory
cd raaga-rangam
```

### 2. Install Dependencies

```bash
# Install all dependencies
npm install

# If you encounter dependency conflicts, use:
npm install --legacy-peer-deps
```

### 3. Start Development Server

```bash
# Start the development server
npm run dev
```

The application will be available at `http://localhost:3000`

**⚠️ Important**: For camera access to work, you may need to use HTTPS. See the [HTTPS Setup](#https-setup) section below.

## 🔧 Detailed Setup Instructions

### Environment Setup

1. **Node.js Installation**
   ```bash
   # Check if Node.js is installed
   node --version
   
   # If not installed, download from https://nodejs.org/
   # Recommended: Use Node Version Manager (nvm)
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
   nvm install 18
   nvm use 18
   ```

2. **Project Dependencies**
   ```bash
   # Core dependencies
   npm install next@13.5.1 react@18.2.0 react-dom@18.2.0 typescript@5.2.2
   
   # UI and Animation libraries
   npm install framer-motion@^12.23.12 @heroicons/react@^2.2.0 lucide-react@^0.446.0
   
   # Audio and Computer Vision
   npm install tone@^15.1.22 @mediapipe/tasks-vision@^0.10.22-rc.20250304
   
   # State Management and Utilities
   npm install zustand@^5.0.8 clsx@^2.1.1 tailwind-merge@^2.5.2
   
   # Radix UI Components (already included in package.json)
   ```

### HTTPS Setup

For camera access to work properly, you need HTTPS. Here are several options:

#### Option 1: Using mkcert (Recommended)

```bash
# Install mkcert
# On macOS
brew install mkcert
# On Windows (using Chocolatey)
choco install mkcert
# On Linux
sudo apt install libnss3-tools
wget -O mkcert https://github.com/FiloSottile/mkcert/releases/download/v1.4.4/mkcert-v1.4.4-linux-amd64
chmod +x mkcert
sudo mv mkcert /usr/local/bin/

# Create local CA
mkcert -install

# Generate certificates
mkcert localhost 127.0.0.1 ::1

# Start Next.js with HTTPS
HTTPS=true SSL_CRT_FILE=./localhost+2.pem SSL_KEY_FILE=./localhost+2-key.pem npm run dev
```

#### Option 2: Using ngrok

```bash
# Install ngrok
npm install -g ngrok

# In one terminal, start your app
npm run dev

# In another terminal, expose it via HTTPS
ngrok http 3000
```

#### Option 3: Using Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy to preview (automatically HTTPS)
vercel --prod
```

### Camera Permissions

1. **Browser Settings**: Ensure your browser allows camera access for localhost
2. **HTTPS Required**: Modern browsers require HTTPS for camera access
3. **Privacy Settings**: Check your system's privacy settings for camera permissions

## 📁 Project Structure

```
raaga-rangam/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with fonts and providers
│   ├── page.tsx                 # Landing page
│   ├── globals.css              # Global styles and design system
│   ├── dashboard/               # User dashboard
│   ├── play/[mode]/            # Game mode pages
│   ├── leaderboards/           # Community rankings
│   └── challenges/             # Daily/weekly challenges
├── components/                  # React components
│   ├── game/                   # Game-specific components
│   │   ├── camera-setup.tsx    # Camera initialization
│   │   ├── game-canvas.tsx     # Main game interface
│   │   ├── control-panel.tsx   # Raga/Tala controls
│   │   └── ...
│   ├── layout/                 # Layout components
│   ├── sections/               # Page sections
│   └── ui/                     # Reusable UI components
├── lib/                        # Utility libraries
│   ├── audio-engine.ts         # Tone.js audio synthesis
│   ├── gesture-recognition.ts  # MediaPipe integration
│   ├── carnatic-music.ts      # Music theory data
│   └── stores/                # Zustand state management
├── contexts/                   # React contexts
│   └── language-context.tsx   # Multilingual support
└── public/                     # Static assets
```

## 🎮 How to Play

### Traditional Mode
1. **Camera Setup**: Allow camera access when prompted
2. **Hand Position**: Place both hands in front of the camera
3. **Finger Gestures**:
   - **Left Hand**: Pinky→Sa, Ring→Ri, Middle→Ga, Index→Ma
   - **Right Hand**: Index→Pa, Middle→Da, Ring→Ni
4. **Play Notes**: Touch fingertips to thumb to trigger swaras
5. **Controls**: Use the control panel to change ragas, talas, and octaves

### Game Controls
- **Raga Selection**: Choose from 6 classical ragas
- **Tala Control**: Select rhythm patterns (Adi, Rupaka, etc.)
- **Tanpura**: Toggle drone accompaniment
- **Octave**: Switch between Mandra, Madhya, and Tara
- **Language**: Switch between English, Telugu, and Hindi

## 🔧 Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Type checking
npx tsc --noEmit     # Check TypeScript types
```

### Code Style

- **TypeScript**: Strict mode enabled
- **ESLint**: Next.js recommended configuration
- **Prettier**: Code formatting (configure as needed)
- **Tailwind CSS**: Utility-first styling

### Performance Optimization

The app includes several performance optimizations:

- **Adaptive FPS**: Automatically adjusts based on device capability
- **Frame Skipping**: Processes every 2nd/3rd frame on slower devices
- **WebWorker Processing**: Offloads computer vision to background thread
- **GPU Acceleration**: Uses hardware acceleration when available
- **Memory Management**: Proper cleanup of MediaPipe resources

## 🚀 Deployment

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

### Deploy to Netlify

```bash
# Build the project
npm run build

# Deploy to Netlify (drag and drop the 'out' folder)
# Or use Netlify CLI
npm install -g netlify-cli
netlify deploy --prod --dir=out
```

### Deploy to GitHub Pages

```bash
# Install gh-pages
npm install -g gh-pages

# Build and deploy
npm run build
gh-pages -d out
```

## 📚 GitHub Setup

### 1. Create GitHub Repository

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: RaagaRangam platform"

# Add remote origin (replace with your repository URL)
git remote add origin https://github.com/yourusername/raaga-rangam.git

# Push to GitHub
git push -u origin main
```

### 2. Repository Settings

Add these files to your repository:

- **README.md** (this file)
- **.gitignore** (already included)
- **LICENSE** (choose appropriate license)
- **CONTRIBUTING.md** (contribution guidelines)

### 3. GitHub Actions (Optional)

Create `.github/workflows/deploy.yml` for automatic deployment:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm install --legacy-peer-deps
      
    - name: Build
      run: npm run build
      
    - name: Deploy
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./out
```

## 🐛 Troubleshooting

### Common Issues

1. **Camera Not Working**
   - Ensure HTTPS is enabled
   - Check browser permissions
   - Try different browsers (Chrome recommended)

2. **Audio Issues**
   - Click anywhere on the page to enable audio context
   - Check browser audio permissions
   - Ensure speakers/headphones are connected

3. **Performance Issues**
   - Close other browser tabs
   - Ensure good lighting for camera
   - Try lowering video quality in browser settings

4. **Build Errors**
   - Clear node_modules: `rm -rf node_modules package-lock.json && npm install`
   - Use `--legacy-peer-deps` flag if needed
   - Check Node.js version compatibility

### Getting Help

- **Issues**: Report bugs on GitHub Issues
- **Discussions**: Use GitHub Discussions for questions
- **Documentation**: Check the `/docs` folder for detailed guides

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Development Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Test thoroughly
5. Commit: `git commit -m 'Add amazing feature'`
6. Push: `git push origin feature/amazing-feature`
7. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Carnatic Music Tradition**: Honoring the rich heritage of Indian classical music
- **MediaPipe**: Google's machine learning framework for gesture recognition
- **Tone.js**: Web Audio framework for music synthesis
- **Next.js**: React framework for production-ready applications
- **Community**: All contributors and users of RaagaRangam

## 📞 Support

- **Email**: support@raagarangam.com
- **GitHub**: [Issues](https://github.com/yourusername/raaga-rangam/issues)
- **Website**: [https://raagarangam.com](https://raagarangam.com)

---

**Made with ❤️ for the preservation and innovation of Carnatic music**

*Experience the timeless beauty of Indian classical music through modern technology*