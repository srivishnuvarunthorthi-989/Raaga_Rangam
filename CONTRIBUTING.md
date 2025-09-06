# Contributing to RaagaRangam

Thank you for your interest in contributing to RaagaRangam! This document provides guidelines and information for contributors.

## 🎯 Project Vision

RaagaRangam aims to preserve and innovate Carnatic music education through modern technology, making this beautiful art form accessible to learners worldwide while maintaining cultural authenticity.

## 🤝 How to Contribute

### Types of Contributions

We welcome various types of contributions:

- **Bug Reports**: Help us identify and fix issues
- **Feature Requests**: Suggest new features or improvements
- **Code Contributions**: Submit bug fixes or new features
- **Documentation**: Improve documentation and guides
- **Music Theory**: Enhance Carnatic music accuracy and authenticity
- **Translations**: Add support for more languages
- **Testing**: Help test the application on different devices
- **Design**: Improve UI/UX and visual elements

### Getting Started

1. **Fork the Repository**
   ```bash
   # Fork on GitHub, then clone your fork
   git clone https://github.com/yourusername/raaga-rangam.git
   cd raaga-rangam
   ```

2. **Set Up Development Environment**
   ```bash
   # Install dependencies
   npm install --legacy-peer-deps
   
   # Start development server
   npm run dev
   ```

3. **Create a Branch**
   ```bash
   # Create a feature branch
   git checkout -b feature/your-feature-name
   
   # Or for bug fixes
   git checkout -b fix/bug-description
   ```

## 📝 Development Guidelines

### Code Style

- **TypeScript**: Use strict typing, avoid `any`
- **Components**: Use functional components with hooks
- **Naming**: Use descriptive names (camelCase for variables, PascalCase for components)
- **Comments**: Add JSDoc comments for complex functions
- **Imports**: Use absolute imports with `@/` prefix

### File Organization

```
components/
├── game/           # Game-specific components
├── ui/             # Reusable UI components
├── layout/         # Layout components
└── sections/       # Page sections

lib/
├── stores/         # State management
├── utils/          # Utility functions
└── types/          # TypeScript types
```

### Commit Messages

Use conventional commit format:

```
type(scope): description

feat(audio): add gamaka ornament synthesis
fix(camera): resolve MediaPipe memory leak
docs(readme): update installation instructions
style(ui): improve button hover animations
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

### Testing

- Test on multiple browsers (Chrome, Firefox, Safari, Edge)
- Verify camera functionality with HTTPS
- Test gesture recognition accuracy
- Check audio synthesis quality
- Validate responsive design on mobile devices

## 🎼 Carnatic Music Guidelines

### Authenticity Requirements

- **Swarasthanas**: Use precise frequency ratios from classical texts
- **Ragas**: Ensure accurate swara combinations and characteristics
- **Talas**: Implement correct beat patterns and subdivisions
- **Pronunciation**: Use proper Sanskrit/Tamil terminology
- **Cultural Sensitivity**: Respect traditional practices and contexts

### Music Theory Contributions

When contributing music theory content:

1. **Research**: Verify information from authoritative sources
2. **Citations**: Include references to classical texts or renowned musicians
3. **Accuracy**: Double-check swara sequences and raga characteristics
4. **Context**: Provide cultural and historical context where relevant

## 🌐 Internationalization

### Adding New Languages

1. **Language Files**: Add translations to `contexts/language-context.tsx`
2. **Fonts**: Include appropriate fonts for the script
3. **RTL Support**: Consider right-to-left languages if applicable
4. **Cultural Adaptation**: Adapt content for cultural context

### Translation Guidelines

- **Accuracy**: Ensure technical terms are correctly translated
- **Consistency**: Use consistent terminology throughout
- **Cultural Context**: Adapt examples and references appropriately
- **Native Review**: Have native speakers review translations

## 🐛 Bug Reports

### Before Reporting

1. **Search**: Check existing issues for duplicates
2. **Reproduce**: Ensure the bug is reproducible
3. **Environment**: Test on different browsers/devices
4. **Updates**: Ensure you're using the latest version

### Bug Report Template

```markdown
**Bug Description**
A clear description of the bug.

**Steps to Reproduce**
1. Go to '...'
2. Click on '...'
3. See error

**Expected Behavior**
What you expected to happen.

**Screenshots**
Add screenshots if applicable.

**Environment**
- OS: [e.g., macOS 12.0]
- Browser: [e.g., Chrome 96.0]
- Device: [e.g., MacBook Pro, iPhone 13]
- Camera: [e.g., Built-in, External USB]

**Additional Context**
Any other relevant information.
```

## ✨ Feature Requests

### Feature Request Template

```markdown
**Feature Description**
A clear description of the feature you'd like to see.

**Problem Statement**
What problem does this feature solve?

**Proposed Solution**
How would you like this feature to work?

**Alternatives Considered**
Other solutions you've considered.

**Additional Context**
Screenshots, mockups, or examples.

**Music Theory Relevance**
How does this relate to Carnatic music education?
```

## 🔄 Pull Request Process

### Before Submitting

1. **Code Quality**: Ensure code follows project standards
2. **Testing**: Test thoroughly on multiple devices
3. **Documentation**: Update relevant documentation
4. **Conflicts**: Resolve any merge conflicts
5. **Size**: Keep PRs focused and reasonably sized

### PR Template

```markdown
**Description**
Brief description of changes.

**Type of Change**
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

**Testing**
- [ ] Tested on Chrome
- [ ] Tested on Firefox
- [ ] Tested on mobile
- [ ] Camera functionality verified
- [ ] Audio synthesis tested

**Checklist**
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No breaking changes (or documented)
```

### Review Process

1. **Automated Checks**: Ensure all CI checks pass
2. **Code Review**: Address reviewer feedback
3. **Testing**: Verify functionality works as expected
4. **Approval**: Get approval from maintainers
5. **Merge**: Maintainers will merge approved PRs

## 🏆 Recognition

Contributors will be recognized in:

- **README.md**: Contributors section
- **GitHub**: Contributor graphs and statistics
- **Releases**: Acknowledgment in release notes
- **Website**: Hall of fame for significant contributors

## 📞 Getting Help

### Communication Channels

- **GitHub Issues**: For bugs and feature requests
- **GitHub Discussions**: For questions and general discussion
- **Email**: For sensitive or private matters

### Response Times

- **Issues**: We aim to respond within 48 hours
- **PRs**: Initial review within 72 hours
- **Questions**: Response within 24 hours during weekdays

## 📄 License

By contributing to RaagaRangam, you agree that your contributions will be licensed under the same license as the project (MIT License).

## 🙏 Code of Conduct

### Our Pledge

We pledge to make participation in our project a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity and expression, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.

### Our Standards

**Positive behavior includes:**
- Using welcoming and inclusive language
- Being respectful of differing viewpoints
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

**Unacceptable behavior includes:**
- Harassment, trolling, or discriminatory comments
- Publishing others' private information without permission
- Other conduct which could reasonably be considered inappropriate

### Enforcement

Project maintainers are responsible for clarifying standards and will take appropriate action in response to unacceptable behavior.

---

**Thank you for contributing to RaagaRangam!** 

Your efforts help preserve and innovate the beautiful tradition of Carnatic music for future generations. 🎵