# Govind Sharma // Tech Portfolio

A modern, responsive portfolio website for Govind Sharma—a technology enthusiast exploring cybersecurity, AI, coding, robotics, and web development.

## 📁 Project Structure

```
.
├── index.html          # Main HTML file
├── style.css           # Stylesheet
├── script.js           # JavaScript functionality
├── README.md           # Documentation (this file)
└── .gitignore          # Git ignore file (optional)
```

## 🚀 Features

- **Responsive Design** — Works seamlessly on desktop, tablet, and mobile devices
- **Smooth Animations** — Scroll reveal effects, smooth transitions, and interactive elements
- **Progress Bar** — Visual scroll progress indicator
- **Mobile Menu** — Hamburger navigation for smaller screens
- **Active Navigation** — Highlights current section while scrolling
- **Skill Bars** — Animated progress bars that fill on scroll
- **Copy to Clipboard** — Email copy functionality with toast notifications
- **Performance Optimized** — Clean, efficient code with minimal dependencies
- **Dark Theme** — Modern dark mode with cyan/purple gradient accents
- **Accessibility** — Semantic HTML, ARIA labels, and keyboard navigation

## 📋 Sections

1. **Hero** — Introduction and call-to-action
2. **About** — Personal profile and learning journey context
3. **Interests** — Six key areas of focus
4. **Skills** — Learning stack with progress indicators
5. **Projects** — Selected projects with descriptions
6. **Journey** — Timeline of progress
7. **Goals** — Future direction and aspirations
8. **Contact** — Email and social links

## 🛠️ Technologies Used

- **HTML5** — Semantic markup
- **CSS3** — Modern styling with CSS variables and gradients
- **Vanilla JavaScript** — No frameworks or dependencies
- **Google Fonts** — Inter, Space Grotesk, JetBrains Mono

## 💻 Installation & Setup

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/pn4986446-dotcom/portfolio.git
cd portfolio
```

2. Open in your browser:
   - Simply double-click `index.html`, or
   - Use a local server (recommended):
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   
   # Node.js (with http-server)
   npx http-server
   ```

3. Visit `http://localhost:8000` in your browser

### GitHub Pages Deployment

The site is ready for GitHub Pages:

1. Push to GitHub:
```bash
git add .
git commit -m "Initial portfolio setup"
git push origin main
```

2. Enable GitHub Pages in repository settings:
   - Go to Settings → Pages
   - Select "Deploy from a branch"
   - Choose `main` branch and `/root` folder
   - Save

3. Your site will be live at: `https://username.github.io/portfolio`

## 📝 Customization

### Update Email Address
Replace `govindfinancehub@gmail.com` with your email in:
- Line in Contact section
- Lines in Footer links
- JavaScript email variable in `script.js`

### Update GitHub URL
Replace `https://github.com/pn4986446-dotcom` with your GitHub profile URL

### Modify Colors
Edit CSS variables in `style.css` (`:root` section):
```css
:root {
  --cyan: #22d3ee;        /* Primary accent */
  --blue: #3b82f6;        /* Secondary accent */
  --purple: #a855f7;      /* Tertiary accent */
  --text: #f8fafc;        /* Text color */
  --bg: #030712;          /* Background */
}
```

### Add Projects
Duplicate a project card in the Projects section:
```html
<div class="card project reveal">
  <span class="tag">TAG</span>
  <h3>Project Name</h3>
  <p>Description</p>
  <div class="stack">
    <span>Tech</span>
    <span>Stack</span>
  </div>
  <a class="project-link" href="#" target="_blank">View GitHub →</a>
</div>
```

### Update Skills
Modify the skill bars in the Skills section. Change the percentage and `data-width` attribute:
```html
<div class="skill">
  <div class="skilltop">
    <span>Skill Name</span>
    <span>75%</span>
  </div>
  <div class="bar"><b data-width="75%"></b></div>
</div>
```

## 🎨 Design Details

- **Color Scheme** — Dark mode with cyan/purple gradient accents
- **Typography** — Space Grotesk (headings), Inter (body), JetBrains Mono (code/details)
- **Animations** — 0.8s ease-in-out for reveals, 1.4s for skill bars
- **Spacing** — Responsive padding with clamp() for fluid typography
- **Grid** — CSS Grid for layouts, responsive columns on mobile

## ♿ Accessibility

- Semantic HTML structure
- ARIA labels on buttons
- Proper heading hierarchy
- Good color contrast ratios
- Keyboard navigation support
- Focus states on interactive elements
- Alt text ready for images
- Prefers-reduced-motion support

## 📱 Browser Support

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to fork this project and adapt it for your own portfolio!

## 📞 Contact

- **Email:** govindfinancehub@gmail.com
- **GitHub:** [@pn4986446-dotcom](https://github.com/pn4986446-dotcom)

## 🙏 Credits

- Font families from [Google Fonts](https://fonts.google.com)
- Icons are Unicode/Emoji
- Inspired by modern web design principles

---

**Last Updated:** 2024

Built with ❤️ using HTML, CSS, and JavaScript.
