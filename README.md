# Barkada Bonding Invite 🐱💕

A cute, single-page cat-themed invitation built with plain HTML, CSS, and vanilla JavaScript. No frameworks, no build step, no backend, and no RSVP form — just share the link in your group chat.

## What's inside

```text
index.html         Invitation content, meta tags, inline SVG cat pattern
style.css          Kawaii theme, responsive layout, animations
script.js          Share button, clipboard fallback, background image detection
assets/
  cats-bg.jpg      Optional tiled background image (already wired up)
  og-image.png     1200x630 social-sharing preview image
README.md
```

The site works by opening `index.html` directly. If `assets/cats-bg.png` (or `.jpg`, `.jpeg`, `.webp`) is missing, the built-in inline SVG cat pattern is used instead.

## Edit the invitation

1. Open `index.html`.
2. Look for the `✏️ QUICK EDIT GUIDE` and the `EDIT:` comments near the top.
3. Update the heading, subtitle, date, time, place, and what to bring inside the `.details` section.
4. Update the `<title>`, description, and Open Graph tags in `<head>`.
5. Change colors or animation timing in the `THEME TOKENS` section at the top of `style.css`.
6. Edit the closing note and share button text near the bottom of the invitation card.

### Change the background

- Use your own image: save it as `assets/cats-bg.png`. Other supported names are `cats-bg.jpg`, `cats-bg.jpeg`, and `cats-bg.webp`.
- The image is tiled with `background-repeat: repeat`.
- Remove the image to fall back to the inline SVG cat pattern in `index.html`.

## Share it with the group chat

The **I-share sa GC** button uses the phone's native share sheet when available. If the Web Share API is unavailable, it copies the invite link to the clipboard instead.

For best results, share the deployed link (not the local file path), since friends need an online URL to open it.

## Run it locally

Option 1: double-click `index.html`.

Option 2 (recommended for testing clipboard/share behaviour): start a tiny local server from this folder:

```powershell
python -m http.server 8000
```

Then open <http://localhost:8000>.

The browser only allows some share/clipboard features on HTTPS or `localhost`, which is why the local server is useful for testing.

## Deploy for free

### GitHub Pages

1. Create a new GitHub repository and upload this folder (or push it).
2. Open the repository's **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, then select `main` and `/ (root)`.
4. Save. Your invite will be at `https://YOUR-USERNAME.github.io/YOUR-REPO/`.

### Netlify

1. Go to <https://app.netlify.com/drop>.
2. Drag this whole folder onto the page.
3. Netlify gives you a free shareable URL.

### Vercel

1. Go to <https://vercel.com>, import the repository, and deploy.
2. No build settings are needed; it is a static site.

After deploying, update this line in `index.html` with your real URL:

```html
<meta property="og:image" content="https://YOUR-SITE/assets/og-image.png">
```

An absolute image URL is important so Messenger, GC, and other link previews can load `og-image.png`. You can also add:

```html
<meta property="og:url" content="https://YOUR-SITE/">
```

## Notes

- No RSVP or backend is needed — just send the link to the group chat.
- The share button and clipboard fallback work without a server.
- Animations respect `prefers-reduced-motion`.
- The layout is mobile-first and tested at 320px, 375px, and desktop widths.
- To replace the social preview, make a new 1200x630 image and save it as `assets/og-image.png`.
