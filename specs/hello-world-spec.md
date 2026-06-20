# GetMan Marketing Site — Astro Static Site Spec

## Overview

A static marketing and documentation site for GetMan, built with Astro.
The site serves the developer adoption funnel: discover → understand → try → integrate.

**Live domain**: `getman.dev`
**Tech stack**: Astro (static output), Tailwind CSS, TypeScript
**Assets**: reuse the brand assets from the main repo (`public/logo.png`, `public/getman-icon.svg`)

---

## Theme — Warm Indie

Chosen from the theme proposals (`site-theme-proposals.html`, Theme C).
Personality: approachable, handcrafted, indie hacker.
Reference vibes: Buttondown, HEY, Pika.

### Typography

| Role | Font | Weight |
|---|---|---|
| Body, UI | Space Grotesk | 400, 500, 600 |
| Headlines | Space Grotesk | 700, 800 |
| Code / snippets | JetBrains Mono | 400, 500 |

Google Fonts import:
```
Space Grotesk: 400, 500, 600, 700, 800
JetBrains Mono: 400, 500, 700
```

### Color Palette

| Token | Value | Usage |
|---|---|---|
| `bg` | `#faf8f5` | Page background |
| `bg-hero` | `linear-gradient(160deg, #fff9f0 0%, #faf8f5 60%)` | Hero section background |
| `border` | `#e8e0d5` | Nav border, card borders |
| `text-primary` | `stone-900` / `#1c1917` | Headlines, strong text |
| `text-secondary` | `stone-500` / `#78716c` | Body copy, subtitles |
| `text-muted` | `stone-400` / `#a8a29e` | Captions, labels |
| `accent` | `#f97316` (orange-500) | Primary buttons, links, highlights |
| `accent-shadow` | `#c2410c` (orange-700) | Flat button shadow |
| `accent-hover` | `#ea6e00` | Button hover state |
| `badge-bg` | `#fef3c7` | "Open source" badge background |
| `badge-text` | `#92400e` | Badge text |
| `badge-border` | `#fde68a` | Badge border |
| `code-bg` | `#1c1917` (stone-900) | Code block background |
| `code-border` | `#292524` (stone-800) | Code block border |

### Button Style

The signature element of this theme: **flat offset shadow** (not a box shadow blur — a hard offset).

```css
/* Primary button */
background: #f97316;
color: white;
font-weight: 700;
border-radius: 12px;        /* rounded-xl */
box-shadow: 3px 3px 0 #c2410c;

/* Hover: shift button up-left, grow shadow */
transform: translate(-1px, -1px);
box-shadow: 4px 4px 0 #c2410c;

/* Secondary / outline button */
border: 2px solid #d6d3d1;
background: white;
color: stone-700;
box-shadow: 3px 3px 0 #d6d3d1;
```

### Highlight Effect

Inline text emphasis uses a highlighter-style underlay instead of bold or color:
```css
background: linear-gradient(transparent 55%, #fed7aa 55%); /* warm peach */
```

### Code Blocks

Dark warm-toned background (`#1c1917`) with a 1px border (`#292524`).
Rounded corners `rounded-2xl`. A small "Quick install" label above in `text-[10px] uppercase tracking-widest text-stone-500`.

### Badges / Tags

Pill-shaped. Amber tones (`bg: #fef3c7`, `text: #92400e`, `border: #fde68a`).
Used for the "Free & open source" callout in the hero.

### Nav

- Background: `#faf8f5` (same as page — no contrast shift)
- Border-bottom: `1px solid #e8e0d5`
- Logo: outlined square icon (`border-2 border-orange-500`) with orange "G" letter
- Nav links: `stone-500`, hover `stone-900`, `font-medium`
- CTA in nav: primary button style (flat orange shadow)

### Copy — Hero

**Headline (two lines):**
> The OpenAPI explorer  
> you'll actually enjoy using.

The word "enjoy" sits on the second line with the highlighter peach underlay effect (`linear-gradient(transparent 55%, #fed7aa 55%)`).

**Subheading:**
> Embeddable in any page with a single script tag. No bloat, no vendor lock-in — just a clean, fast API explorer.

---

## Site Map

```
/                  Home
/examples          Examples gallery — open sample specs in the explorer
/explorer          Full-screen GetMan instance driven by ?spec=<url>
/docs              QuickStart documentation
```

No changelog page → links out to GitHub Releases.
No pricing page → free & MIT, surfaced in Home and footer.

---

## Pages

---

### 1. Home (`/`)

**Purpose**: Land developers, communicate value instantly, get them to try or integrate GetMan.

#### Layout

Standard page layout: TopBar → Hero → Features → Install → Footer.

#### Sections

##### TopBar
- Left: `logo.png` + "GetMan" wordmark
- Right: nav links — `Examples`, `Docs`, `GitHub` (external, opens in new tab)
- Sticky on scroll, subtle backdrop blur when scrolled

##### Hero
- Headline: **"A beautiful OpenAPI explorer — drop it anywhere."**
- Subheading (1–2 sentences): embeddable, zero-dependency, works in React / Vue / plain HTML
- Two CTAs side by side:
    - Primary: **"Try a live demo"** → `/examples`
    - Secondary: **"View on GitHub"** → GitHub repo (external)
- Below CTAs: a single-line install snippet (CDN `<script>` tag) with a copy button

##### Inline Demo
- A live GetMan instance embedded directly on the page (not an iframe — use `mountApiExplorer`)
- Pre-loaded with the Petstore 3.0 JSON spec
- Container height: `600px`, rounded corners, subtle border/shadow
- Framed with a small label: "Live — fully interactive"

##### Features Grid
2-column grid on desktop, 1-column on mobile. Each item: icon + title + one-sentence description.

| Feature | Description |
|---|---|
| OpenAPI 3.0 & 3.1 | JSON and YAML specs, loaded by URL or file upload |
| Try It Out | Send real HTTP requests from the browser — no proxy needed |
| Auth support | API key, Bearer, Basic, OAuth 2.0, OpenID Connect |
| Schema browser | Expand nested schemas, follow `$ref`s, see examples |
| Dark mode | System preference detected; persisted across sessions |
| Deep linking | Every endpoint and schema has a shareable URL |
| Command palette | `⌘K` to jump anywhere without the mouse |
| Resizable panes | Drag to resize nav, docs, and playground panels |
| Zero dependencies | Single IIFE script — no framework required on the host page |
| MIT licensed | Free to use, self-host, and embed commercially |

##### Quick Install
- Section title: **"One script tag. That's it."**
- A code block showing the minimal HTML embed (CDN `<script>` + `mountApiExplorer` call)
- Link below: **"See all integration options →"** → `/docs`

##### Footer
- Left: logo + tagline + MIT license badge
- Center: nav links (Home, Examples, Docs)
- Right: GitHub link, version badge
- Bottom bar: "© GetMan — MIT License · GitHub"

---

### 2. Examples (`/examples`)

**Purpose**: Let developers explore real-world OpenAPI specs in GetMan without any setup.

#### Layout

TopBar (shared) → Page header → Filter bar → Cards grid → Footer (shared)

#### Sections

##### Page Header
- Title: **"Explore OpenAPI Specs"**
- Subtitle: "Open any of these real-world specs in the interactive explorer — no login, no setup."

##### Filter Bar
- Filter chips: **All** · **JSON** · **YAML** · **Simple** · **Complex**
- Clicking a chip filters the grid client-side (Astro Island with minimal JS)

##### Cards Grid
3-column grid on desktop, 2 on tablet, 1 on mobile.

Each card contains:
- Spec name (bold)
- Short description (1 sentence)
- Format badge: `JSON` or `YAML` (color-coded)
- Complexity badge: `Simple` / `Medium` / `Complex`
- **"Open in Explorer"** button → navigates to `/explorer?spec=<encoded-url>`

**Initial spec list:**

| Name | Format | Complexity | Spec URL | Description |
|---|---|---|---|---|
| Petstore 3.0 | JSON | Simple | `https://petstore3.swagger.io/api/v3/openapi.json` | The classic OpenAPI sample — CRUD for a pet store |
| Petstore YAML | YAML | Simple | `https://petstore3.swagger.io/api/v3/openapi.yaml` | Same spec in YAML format |
| GitHub REST API | JSON | Complex | `https://raw.githubusercontent.com/github/rest-api-description/main/descriptions/api.github.com/api.github.com.json` | GitHub's full public REST API (large spec) |
| Stripe API | YAML | Complex | `https://raw.githubusercontent.com/stripe/openapi/master/openapi/spec3.yaml` | Stripe's payments API |
| JSON Placeholder | JSON | Simple | (host a hand-written spec in the repo under `public/samples/`) | Simple REST API for prototyping |
| OpenAI API | YAML | Medium | `https://raw.githubusercontent.com/openai/openai-openapi/master/openapi.yaml` | OpenAI's public API spec |

> **Note**: For specs hosted externally, verify CORS headers allow browser fetches. For any that don't,
> proxy or mirror them under `public/samples/` in the Astro project.

---

### 3. Explorer (`/explorer`)

**Purpose**: Full-screen GetMan instance that loads whichever spec is passed via `?spec=<url>`.
Used as the destination when a user clicks "Open in Explorer" on the Examples page.

#### Layout

Minimal chrome: thin TopBar (logo + "← Back to Examples" link) → full-height GetMan instance → no footer.

#### Behavior

- On page load, read `?spec` query param
- Call `mountApiExplorer(container, { url: decodedSpecUrl })`
- If no `?spec` param: show a centered message — "No spec provided. Choose one from [Examples](/examples) or paste a URL below." + a URL input field that mounts the spec on submit
- Container fills remaining viewport height (`calc(100vh - topbar-height)`)

#### TopBar (Explorer variant)
- Left: logo (small) + "← Back to Examples"
- Right: spec URL display (truncated, read-only) + "Share" button (copies current URL to clipboard)
- No other nav links — keeps focus on the explorer

---

### 4. Docs — QuickStart (`/docs`)

**Purpose**: Get a developer from zero to a working GetMan embed in under 5 minutes.

#### Layout

TopBar (shared) → Page header → Docs content (single long-form page) → Footer (shared)

#### Sections

##### Page Header
- Title: **"QuickStart"**
- Subtitle: "Embed GetMan in any web page in 3 steps."

##### Step 1 — Add the container
Code block:
```html
<div id="api-docs" style="height: 100vh"></div>
```
Note below: "Give the container an explicit height — GetMan fills it via `height: 100%`."

##### Step 2 — Load the script
Code block: CDN `<script src="...">` tag pinned to the latest release tag.
Note: "The script injects all required styles and fonts — no separate CSS import needed."

##### Step 3 — Mount
Code block: `GetMan.mountApiExplorer(...)` call with `url` option.

##### Framework Integration Examples
Tabbed or accordion — one tab/section per framework:

- **Plain HTML** — the 3-step embed above, combined
- **React** — `useEffect` + `useRef` example
- **Vue 3** — `onMounted` / `onUnmounted` + `useTemplateRef` example

##### API Reference
Table: `mountApiExplorer(target, options?)` — target param, options object, return value.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `target` | `HTMLElement` | Yes | DOM element to mount into |
| `options.url` | `string` | No | URL of the OpenAPI spec to load on startup |

Return value: `() => void` — call to unmount and clean up.

##### Deep Linking
Short section explaining `#endpoints/<operationId>` and `#schemas/<Name>` fragment format.

##### Need Help?
- Link to GitHub Issues
- Link to the Examples page to see it working live

---

## Shared Components

### TopBar
Two variants (controlled by a prop):
- `default` — logo + full nav (Examples, Docs, GitHub)
- `explorer` — logo + back link + spec URL display + Share button

### Footer
Standard footer used on Home, Examples, Docs. Not shown on Explorer.

### Code Block
Syntax-highlighted, with a copy-to-clipboard button. Used in Docs and Home.

---

## Assets & Data

- **Logo**: `public/logo.png` (from main repo)
- **Icon**: `public/getman-icon.svg` (from main repo)
- **Sample specs** (those that need mirroring): stored under `public/samples/` in the Astro project
- **Spec list data**: a TypeScript data file `src/data/examples.ts` — array of `ExampleSpec` objects with `{ name, description, url, format, complexity }`

---

## Implementation Tasks

These are ordered by dependency — complete each before starting the next group.

### Phase 1 — Project scaffold
1. Init a new Astro project (`npm create astro@latest`) in a sibling directory (e.g. `getman-site/`)
2. Install and configure Tailwind CSS for Astro
3. Copy brand assets (`logo.png`, `getman-icon.svg`) into `public/`
4. Set up base layout (`src/layouts/BaseLayout.astro`) with shared `<head>`, TopBar, and Footer slots
5. Set up `src/data/examples.ts` with the initial spec list

### Phase 2 — Home page
6. Build the `TopBar` component (default variant)
7. Build the `Footer` component
8. Build the Hero section (headline, subheading, CTAs, install snippet with copy button)
9. Implement the inline GetMan demo embed (Astro Island — client-side only)
10. Build the Features Grid
11. Build the Quick Install section
12. Assemble the Home page (`src/pages/index.astro`)

### Phase 3 — Examples page
13. Build the `ExampleCard` component
14. Build the filter bar (client-side island for chip filtering)
15. Mirror any externally-hosted specs that lack CORS headers into `public/samples/`
16. Assemble the Examples page (`src/pages/examples.astro`)

### Phase 4 — Explorer page
17. Build the Explorer TopBar variant
18. Build the Explorer page (`src/pages/explorer.astro`) with query-param spec loading and the fallback URL input

### Phase 5 — Docs page
19. Build the `CodeBlock` component with copy button
20. Build the tabbed/accordion framework integration examples
21. Build the API reference table
22. Assemble the Docs page (`src/pages/docs.astro`)

### Phase 6 — Polish
23. Responsive layout pass — test all pages at mobile (375px), tablet (768px), desktop (1280px)
24. Dark mode support (detect system preference, apply Tailwind `dark:` classes)
25. SEO: `<title>`, `<meta description>`, Open Graph tags for each page
26. Verify all external spec URLs load correctly in the Explorer (CORS check)
27. Lighthouse audit — target 95+ performance, 100 accessibility on Home and Docs

---

## Out of Scope (for this spec)

- Blog / news section
- Changelog page (use GitHub Releases)
- Pricing page (free & MIT)
- Search across docs
- i18n / localization
- Server-side rendering or API routes