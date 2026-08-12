# ZORRO Industries Group Limited — Corporate Website

A single-page, mobile-first corporate site built in plain HTML5, CSS3 and vanilla
JavaScript — no frameworks, no build step. Open `index.html` in a browser, or
deploy the folder as-is (e.g. GitHub Pages).

## Design language: "Technical Ledger"

The visual system borrows from engineering drawings and industrial spec sheets —
the world ZORRO itself operates in — rather than a generic corporate template:

- **Corner-bracket cards** (`.bp-card`, `.bp-frame`) — gold brackets draw in on
  hover/focus, echoing crop marks on a technical drawing.
- **FIG. / SEC. reference tags** on service cards and the hero panel, in a
  monospace face, like a drawing index.
- **Blueprint grid** overlay in the hero background.
- **Palette**: deep navy (`#0B1F3A`) + brass gold (`#C9A227`) — steel and
  machined metal, not a generic blue-and-orange SaaS look.
- **Type**: Poppins (display/body) paired with JetBrains Mono for
  labels, stats and reference tags — a technical-readout accent.

## Project structure

```
index.html
assets/
  css/
    style.css        — tokens, layout, components (desktop-first source of truth)
    responsive.css    — breakpoint overrides (tablet → phone) + mobile nav drawer
    animations.css     — scroll-reveal (fade up/left/right, zoom) + hero load sequence
  js/
    main.js           — nav, scroll-reveal, animated counters, gallery filter,
                         gallery lightbox (keyboard + prev/next), back-to-top
  images/              — placeholder folders for logos/hero/about/services/subsidiaries/gallery
  icons/
  fonts/
```

## What's real vs. placeholder

- All **copy, structure, services, subsidiaries, vision/mission, values and
  objectives** are written for ZORRO as briefed.
- **Logos are real**: `zorro-logo.png` (ZORRO Industries Group Limited),
  `zorro-agro-logo.png` (Zorro Agro Commodities Nig Limited) and
  `zorro-furniture-logo.png` (Zorro Furniture and Interior Decor Limited)
  are the official supplied artwork, in `assets/images/logos/`.
- **Photography is intentionally illustrative** (inline SVG line-art + Font
  Awesome icons in the gallery/hero/subsidiary panels), not stock photos —
  this keeps the file dependency-free and avoids using images ZORRO doesn't
  hold rights to. Drop real photography into the matching `assets/images/*`
  folder and swap the placeholder blocks for `<img>` tags when available.
- **Still placeholder — update before launch:**
  - Phone number (Contact section) — currently `[ Official phone number to be confirmed ]`
  - Email address (Contact section) — currently `[ Official email address to be confirmed ]`
  - Social media links (footer) — all point to `#`, update once accounts are confirmed
  - Team section — four "Staff Name / Position" placeholder cards, replace with real profiles and photos
  - Google Maps embed — currently a generic "Tudun Yola, Kano" search query; replace with exact coordinates once supplied
- **WhatsApp is live**: all CTAs (hero, services, subsidiaries, contact,
  footer, floating button) use `+234 904 890 9668` with context-specific
  pre-filled messages.
- **Developer credit** in the footer ("Developed by: mamude2") links to
  WhatsApp `+234 804 463 4758`.

## Technology

HTML5, CSS3, vanilla JS, Font Awesome 6 (CDN), Google Fonts (CDN). No
Bootstrap, jQuery, React or Tailwind, no backend — matching the brief.

## Notes for the next developer

- CSS uses `clamp()` for fluid type and CSS Grid for layout; both need
  evergreen browsers (all modern browsers since ~2017) — no IE11 support.
- `prefers-reduced-motion` is respected throughout (scroll-reveal and hero
  load animation both disable themselves).
- The mobile nav drawer is `position: fixed` and translated off-screen by
  default at *every* breakpoint (not just inside the mobile media query) so
  it can never intrude on the desktop layout — keep that base rule in
  `style.css` if you refactor the header.
- Hero stat counters render their final value in the HTML (e.g. `2023`) as a
  no-JS fallback, then JS resets to `0` and animates up only once the element
  scrolls into view — so the numbers are always correct even if JavaScript
  fails to load.
