# RESTAURANT
# Ember Trattoria — Website

A 4-page restaurant site: Home, Menu, Reservations, Contact. Plain HTML/CSS/JS, no build step, no server required.

## Folder structure
```
restaurant-website/
├── index.html          Home page
├── menu.html            Full menu
├── reservations.html    Reservation form
├── contact.html         Contact form + info
├── css/style.css        All styles (design tokens at the top)
├── js/script.js         Nav toggle + form validation/submission
├── images/               Put your photos here
└── README.md
```

## Tools you need
- **A code editor** — VS Code (free) is the standard choice.
- **A browser** — Chrome or Firefox, with DevTools for testing responsive layouts.
- **A form backend** — since this is a static site with no server, the reservation/contact forms need
  a third-party form handler:
  - [Formspree](https://formspree.io) (free tier, easiest) — sign up, create a form, copy your endpoint.
  - Alternatives: [Getform](https://getform.io), [Web3Forms](https://web3forms.com), or EmailJS.
- **Hosting** (free options, just drag-and-drop this folder):
  - [Netlify](https://netlify.com) — drag the folder into their dashboard.
  - [Vercel](https://vercel.com)
  - [GitHub Pages](https://pages.github.com) — push to a repo, enable Pages in settings.
- **Optional:** a domain name from Namecheap/Google Domains if you want a custom URL instead of the free subdomain.

## Setup steps
1. **Open the site locally.** Just open `index.html` in a browser — no server needed to look around.
   For live-reload while editing, install the VS Code extension "Live Server" and click "Go Live."
2. **Replace placeholder content:**
   - Restaurant name/logo text in the `<header>` of every page.
   - Address, phone, email, hours (appear in the footer of every page + the Contact/Home pages).
   - Menu items and prices in `menu.html`.
   - Add real photos to `images/` and reference them where you'd like (currently the design uses no
     stock photos — swap in your own for the hero/dish sections if desired).
3. **Wire up the forms:**
   - Sign up at Formspree (or your chosen provider), create a new form, and copy the endpoint URL.
   - In `reservations.html` and `contact.html`, replace
     `action="https://formspree.io/f/YOUR_FORM_ID"` with your real endpoint.
   - Until you do this, the forms run in "demo mode" (see `js/script.js`) and simulate success without
     actually sending anything.
4. **Update the map.** The embedded map on `index.html` uses a placeholder OpenStreetMap bounding box —
   replace the `src` in the `<iframe>` with your actual location (search your address on
   openstreetmap.org, click Share → Embed, and copy the URL), or swap in a Google Maps embed.
5. **Test on mobile.** Use DevTools' device toolbar, or just open the site on your phone (if hosted, or
   via your computer's local IP on the same Wi-Fi).
6. **Deploy.** Drag the whole `restaurant-website` folder onto Netlify's dashboard (or push to GitHub
   and connect it) — you'll get a live URL in under a minute.

## Notes
- All styling lives in `css/style.css`; color/type variables are defined at the top under `:root` if
  you want to adjust the palette.
- The hero's ember glow animation respects `prefers-reduced-motion` automatically.
- Forms validate on the client (required fields, email format, phone length, date not in the past)
  before submitting.
