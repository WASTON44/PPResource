# PPResource — VLE-Embeddable C Programming Course

An interactive, step-by-step C programming course that runs **fully in the browser** with no server required. Designed for embedding in Canvas VLE and other learning management systems.

![Course UI](https://github.com/user-attachments/assets/282e6792-b643-44b5-9756-bcf526b504cb)

## Features

- **HR-Style Course Shell** — Left sidebar navigation, top progress bar, step-gated Next button
- **In-Browser C Execution** — C code compiles and runs in the browser via [JSCPP](https://github.com/felixhao28/JSCPP)
- **Monaco/CodeMirror Editor** — Syntax-highlighted C editor with bracket matching
- **Auto-Checking Exercises** — Exact, contains, and regex output matching
- **Progress Persistence** — localStorage-based resume on refresh
- **No Server Required** — Fully static HTML/CSS/JS

## Course Content (MVP)

| Module | Lessons | Steps | Code Exercises |
|--------|---------|-------|----------------|
| Module 1: C Basics | Hello World, printf, Variables | 12 | 4 |
| Module 2: Control Flow | if/else, Loops | 8 | 3 |
| **Total** | | **20** | **7** |

## Project Structure

```
/
  index.html              # Entry point
  assets/
    css/app.css           # All styles
    js/
      app.js              # Main controller
      course-data.js      # Course content (JSON-like)
      storage.js          # localStorage progress
      ui-components.js    # DOM rendering
      editor.js           # CodeMirror wrapper
      runner.js           # C execution (JSCPP)
```

## Deployment

### Local / Development

```bash
python3 -m http.server 8080
# Open http://localhost:8080
```

### Canvas VLE Deployment

> ⚠️ Do **not** paste `index.html` directly into a Canvas Page — Canvas strips inline JavaScript.

**Recommended steps:**

1. Upload all files to an HTTPS host (university web space, GitHub Pages, AWS S3, etc.)
2. In Canvas, embed via:
   - **External Tool (LTI)** — preferred
   - **iframe** — acceptable fallback:
     ```html
     <iframe src="https://your-host/index.html"
             width="100%" height="700"
             allowfullscreen
             sandbox="allow-scripts allow-same-origin">
     </iframe>
     ```
3. Ask your Canvas admin to allowlist your host domain in CSP settings if needed.

## Adding New Content

All course content is defined in [`assets/js/course-data.js`](assets/js/course-data.js). No code changes are needed to add lessons — just extend the JSON structure:

```js
{
  id: "m1l1s1",
  type: "content" | "quiz" | "code",
  title: "My Lesson",
  body: "<p>HTML content...</p>",             // content only
  question: "...", options: [], correct: 0,  // quiz only
  starter_code: "...", expected_output: "...", // code only
}
```

## Browser Support

- Chrome / Edge (recommended)
- Firefox
- Safari 15+

## License

MIT

